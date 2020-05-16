import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { KEY_ACCESSTOKEN } from "../constants/const";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = { email:'', password:'' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['welcome']);
    }
  }

  login() {
    this.http.post('/api/signin',this.loginData).subscribe(resp => {
      this.data = resp;
      if(this.data && this.data.token) {
        localStorage.setItem(KEY_ACCESSTOKEN, this.data.token);
        this.router.navigate(['welcome']);
        console.log('******* HOLA YOU GOT IT ********');
      } else {
        this.message = 'Some error occurred. Please try again';
      }
    }, err => {
      this.message = err.error.msg;
    });
  }

}
