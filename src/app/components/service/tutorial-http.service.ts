import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Tutorial} from "../../entity/tutorial";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TutorialHttpService {
  private readonly TUTORIAL_REST : string = 'http://localhost:8080/api/tutorial'; // my base api I build
  private httpClient : HttpClient
  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient
  }
  reads() {
    return this.httpClient.get<Tutorial>(this.TUTORIAL_REST+`/reads`);
  }
  /*
    or
    cut private httpClient : HttpClient
    then
    constructor(private httpClient : HttpClient) {
      this.httpClient = httpClient
    }
  */

  read(tid : any) {
    return this.httpClient.get<Tutorial>(
      this.TUTORIAL_REST+`/read/`+tid ,
      { headers: this.httpHeaders }
    )
  }
  create(tutorial: Tutorial): Observable<any> {
    return this.httpClient.post(this.TUTORIAL_REST+`/create`, tutorial)
  }

  delete(tid : any) : Observable<any> {
    return this.httpClient.delete(this.TUTORIAL_REST+'/delete/'+tid,{ headers : this.httpHeaders })
  }
  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.TUTORIAL_REST+'/delete-all');
  }
  update (tutorial : Tutorial) : Observable<any> {
    // console.log(tutorial)
    // this is request I send to back end Tutorial {_tid: 8, _title: 'Kotlin + Andriod Studio', _description: 'https://github.com/ttknpde-v', _published: 'true'}
    // and remember in backend name attribute must be same name request
    // in this case _tid , _title , ...
    return this.httpClient.put(this.TUTORIAL_REST+`/update/`+tutorial.tid, tutorial)
  }

}
