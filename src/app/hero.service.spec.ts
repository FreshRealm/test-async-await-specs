import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HeroService], fakeAsync((service: HeroService) => {
    expect(service).toBeTruthy();

    const outputPromise = service.testingMultipleAwaits();

    const req1 = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req1).toBeTruthy();
    req1.flush('testing1');

    tick();

    const req2 = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/2');
    expect(req2).toBeTruthy();
    req2.flush('testing2');

    tick();

    outputPromise.then((output) => {
      expect(output.length).toBe(2);
      expect(output).toEqual(['testing1', 'testing2']);
    });
  })));
});
