import { Routes } from "@angular/router";
import {LoginAndSignupPageComponent} from "./page/login-and-signup-page/login-and-signup-page.component";
import {TasksComponent} from "./page/tasks/tasks.component";


export const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginAndSignupPageComponent},
  {path: "signup", component: LoginAndSignupPageComponent},
  {path: "lists", component: TasksComponent},
  {path: "lists/:listId", component: TasksComponent},
  {path: "lists/:listId/edit-task/:taskId", component: TasksComponent},
  {path: "**", redirectTo: "/login", pathMatch: "full"},
];
