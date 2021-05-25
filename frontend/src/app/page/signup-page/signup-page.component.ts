import { Component, OnInit } from '@angular/core';
import {traceDynamicValue} from "@angular/compiler-cli/src/ngtsc/partial_evaluator";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor() { }

  status = false;

  ngOnInit(): void {
  }

  signIn() {
    this.status = false;
  }

  signUp() {
    this.status = true;
  }
}
