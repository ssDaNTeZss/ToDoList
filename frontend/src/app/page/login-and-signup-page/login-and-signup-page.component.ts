import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleService} from "../../simple.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login-and-signup-page',
  templateUrl: './login-and-signup-page.component.html',
  styleUrls: ['./login-and-signup-page.component.css']
})
export class LoginAndSignupPageComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  status: boolean;
  pagePath: string;

  constructor(
    private readonly simpleService: SimpleService,
    private route: ActivatedRoute,
  ) {
    this.pagePath = this.route.snapshot.routeConfig.path;
  }



  ngOnInit(): void {
    setTimeout(() => {
    if (this.pagePath === "login") {
      this.status = false;
    }
    if (this.pagePath === "signup") {
      this.status = true;
    }
    }, 1);
  }

  ngOnDestroy(): void {

  }

  signIn() {
    this.simpleService.changeLoginOrSignup(false);
  }

  signUp() {
    this.simpleService.changeLoginOrSignup(true);
  }
}
