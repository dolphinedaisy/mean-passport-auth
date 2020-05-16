import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupData = { name:'', email: '', password:'', confirmPassword: '' };
  message = '';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    this.message = '';
    this.http.post('/api/signup',this.signupData).subscribe((resp: any) => {
      if(resp.success)
        this.router.navigate(['login']);
      else
        this.message = resp.msg;
    }, err => {
      this.message = err.error.msg;
    });
  }

}
