import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SimpleService {
  public loginOrSignup$ = new Subject<boolean>();

  public changeLoginOrSignup(loginOrSignup: boolean): void {
    this.loginOrSignup$.next(loginOrSignup);
  }
}
