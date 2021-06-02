import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { SimpleService } from "../../simple.service";
import { passwordsValidator } from "../../validators/passwords.validator";


@Component({
  selector: "app-login-and-signup-page",
  templateUrl: "./login-and-signup-page.component.html",
  styleUrls: ["./login-and-signup-page.component.css"]
})

export class LoginAndSignupPageComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  status: boolean;
  pagePath: string;
  formModelLogin: FormGroup;
  formModelSignUp: FormGroup;
  doNotMatch = false;

  constructor(
    private readonly simpleService: SimpleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
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

    this.formModelLogin = new FormGroup({
      email: new FormControl(
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ),
      password: new FormControl(
        "",
        [
          Validators.required,
          // Validators.pattern(/(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{9,}/),
        ],
      ),

    });

    this.formModelSignUp = new FormGroup({
      email: new FormControl(
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ),
      password: new FormControl(
        "",
        [
          Validators.required,
          Validators.pattern(/(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{9,}/),
        ],
      ),
      password2: new FormControl(
        "",
        [
          Validators.required,
          Validators.pattern(/(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{9,}/),
        ],
      ),
    });

  }

  ngOnDestroy(): void {

  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formModelLogin.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  isControlInvalid2(controlName: string): boolean {
    const control = this.formModelSignUp.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  get _email(): AbstractControl {
    return this.formModelLogin.get("email");
  }

  get _password(): AbstractControl {
    return this.formModelLogin.get("password");
  }

  get __email(): AbstractControl {
    return this.formModelSignUp.get("email");
  }

  get __password(): AbstractControl {
    return this.formModelSignUp.get("password");
  }

  get __password2(): AbstractControl {
    return this.formModelSignUp.get("password2");
  }

  signIn(): void {
    this.simpleService.changeLoginOrSignup(false);
  }

  signUp(): void {
    this.simpleService.changeLoginOrSignup(true);
  }

  login(): void {
    const FML = this.formModelLogin.value;
    this.authService.login(FML.email, FML.password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      if (res.status === 200) {
        this.router.navigate(["/lists", "all-tasks"]);
      }
    });
  }

  registration(): void {
    const FMS = this.formModelSignUp.value;

    if (FMS.password === FMS.password2) {
      this.authService.signup(FMS.email, FMS.password2).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigate(["/lists", "all-tasks"]);
      });
    } else {
      this.formModelSignUp.patchValue(
        { password: "",
          password2: ""},
        { emitEvent: false },
      );
      this.doNotMatch = true;
    }
  }
}
