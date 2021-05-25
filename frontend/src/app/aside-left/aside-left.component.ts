import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";

@Component({
  selector: "app-aside-left",
  templateUrl: "./aside-left.component.html",
  styleUrls: ["./aside-left.component.css"]
})
export class AsideLeftComponent implements OnInit {

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  createNewList(): any {
    this.taskService.createList("Testing").subscribe((response: any) => {
      console.log(response);
    });
  }
}
