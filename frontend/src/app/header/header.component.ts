import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {
  }

  titleHeader = "To Do List";

  ngOnInit(): void {
  }

  logoutButton(): void {
    this.authService.logout();
  }
}
