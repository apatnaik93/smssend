import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient,
              private appService: AppService) {
  }

  ngOnInit() {
  }

  saveCandidate(form: NgForm) {
    const that = this;
    that.appService.saveCandidate(form.value.name, form.value.mobile, form.value.company)
      .then((candidate) => {
        console.log('Candidate: ' + JSON.stringify(candidate, null, 2));
        that.appService.generateUrl('https://www.metademy.com/#/schedule/' + candidate._id)
          .then((url) => {
            console.log('Url: ' + JSON.stringify(url, null, 2));
            that.appService.sendMessage(form.value.mobile, form.value.message + url.id + '.')
              .then((result) => {
                console.log('Msg Status: ' + JSON.stringify(result, null, 2));
              });
          });
      });
  }

  getCandidate(form: NgForm) {
    const that = this;
    that.appService.getCandidate(form.value.id)
      .then((candidate) => {
        console.log('Candidate: ' + JSON.stringify(candidate, null, 2));
      });
  }
}
