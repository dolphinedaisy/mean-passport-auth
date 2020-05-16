import { Component, OnInit } from '@angular/core';
import { KEY_ACCESSTOKEN } from "../constants/const";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private onSignOut() {
    localStorage.removeItem(KEY_ACCESSTOKEN);
    this.router.navigate(['/']);
  }

}
