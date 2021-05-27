import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { List } from "../../models/list.model";
import { Task } from "../../models/task.model";
import { TaskService } from "../../task.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  title: string;
  lists: List[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subs = this.route.params.subscribe((params: Params) => {
      if (params.listId !== "all-tasks" &&
        params.listId !== "my-day" &&
        params.listId !== "important" &&
        params.listId !== "planned") {
        this.subs = this.taskService.getLists().subscribe((lists: List[]) => {
          this.lists = lists;

          for (let i = 0; this.lists.length !== i; i++) {
            if (this.lists[i]._id === params.listId) {
              this.title = this.lists[i].title;
            }
          }
        });
      }

      if (params.listId === "all-tasks") {
        this.title = "Все задачи";
      }
      if (params.listId === "my-day") {
        this.title = "Мой день";
      }
      if (params.listId === "important") {
        this.title = "Важное";
      }
      if (params.listId === "planned") {
        this.title = "Запланированное";
      }
    });

    this.subs = this.taskService.titleList$.subscribe((title) => {
      this.title = title;
      console.log(this.title);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
