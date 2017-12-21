import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient) { }

  public async testingMultipleAwaits() {
    const sampleData1 = await this.testCall1();
    const sampleData2 = await this.testCall2();

    return [sampleData1, sampleData2];
  }

  private async testCall1() {
    const sampleData1 = await this.http.get('https://jsonplaceholder.typicode.com/posts/1').toPromise();
    console.log(sampleData1);
    return sampleData1;
  }

  private async testCall2() {
    const sampleData2 = await this.http.get('https://jsonplaceholder.typicode.com/posts/2').toPromise();
    console.log(sampleData2);
    return sampleData2;
  }
}
