import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { WithEasyLoader } from 'easy-loader';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  @WithEasyLoader()
  simpleGetReq(d: number = 0): Observable<any> {
    return this.http.get("https://api.ipify.org?format=json").pipe(
      delay(d)
    );
  }
}
