import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import {Config} from "../config/config";

@Injectable()
export class AppService {

  constructor(private http: HttpClient,
              private config: Config) {
  }

  saveCandidate(name: any, mobile: any, company: any) {
    const that = this;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return that.http.post('/savecandidate', {name, mobile, company}, {headers: headers})
      .toPromise()
      .then(response => response)
      .catch(that.handleError);
  }

  generateUrl(longUrl: any) {
    const that = this;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return that.http.post('https://www.googleapis.com/urlshortener/v1/url?key=' + that.config.id,
      {longUrl}, {headers: headers})
      .toPromise()
      .then(response => response)
      .catch(that.handleError);
  }

  sendMessage(mobile: any, message: any) {
    const that = this;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return that.http.post('/sendmessage', {mobile, message}, {headers: headers})
      .toPromise()
      .then(response => response)
      .catch(that.handleError);
  }

  getCandidate(id: any) {
    const that = this;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('id', id);
    return that.http.get('/getcandidate', {headers: headers})
      .toPromise()
      .then(response => response)
      .catch(that.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
