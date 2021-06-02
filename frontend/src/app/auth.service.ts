import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { WebRequestService } from "./web-request.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private webService: WebRequestService,
    private router: Router,
    private http: HttpClient,
  ) {
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get("x-access-token"), res.headers.get("x-refresh-token"));
        console.log("LOGGED IN!");
      }),
    );
  }

  signup(email: string, password: string): Observable<HttpResponse<any>> {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get("x-access-token"), res.headers.get("x-refresh-token"));
        console.log("Successfully signed up and now logged in!");
      }),
    );
  }

  logout(): void {
    this.removeSession();
    this.router.navigate(["/login"]);
  }

  getAccessToken(): string {
    return localStorage.getItem("x-access-token");
  }

  getRefreshToken(): string {
    return localStorage.getItem("x-refresh-token");
  }

  getUserId(): string {
    return localStorage.getItem("user-id");
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem("x-access-token", accessToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  private removeSession(): void {
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  getNewAccessToken(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        "x-refresh-token": this.getRefreshToken(),
        "_id": this.getUserId()
      },
      observe: "response"
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get("x-access-token"));
      }),
    );
  }
}
