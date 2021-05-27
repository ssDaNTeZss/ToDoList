import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Task } from "src/app/models/task.model";
import { TaskService } from "../task.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  tasks: Task[];
  listId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subs = this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;

      this.subs = this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    });

    this.subs = this.taskService.listId$.subscribe((listId) => {
      this.listId = listId;

      this.subs = this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  whetherChosen(taskId: string, listId: string, important: boolean): void {
    let newImportant = {
      "important": !important
    };

    this.subs = this.taskService.updateTask(listId, taskId, newImportant).subscribe(() => {
      this.subs = this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    });
  }
}
