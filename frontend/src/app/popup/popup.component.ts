import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Task } from "../models/task.model";
import { TaskService } from "../task.service";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"]
})
export class PopupComponent implements OnInit, OnDestroy {

  @Input() activePopup?: boolean;
  @Input() title?: string;
  @Input() listId?: string;

  private subs: Subscription;

  activePopupTask = false;
  task: Task;
  titleTask: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subs = this.taskService.activePopupTask$.subscribe((active: boolean) => {
      this.activePopupTask = active;
    });

    this.subs = this.taskService.popupTask$.subscribe((task: Task) => {
      this.task = task;
      this.titleTask = task.title;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closePopup(): void {
    this.activePopup = false;
    this.activePopupTask = false;
  }

  onDeletion(): void {
    this.taskService.deleteList(this.listId).subscribe(() => {
      this.activePopup = false;
      this.router.navigate(["/lists", "all-tasks"]);
      this.taskService.openEditList(false);
    });
  }

  onDeletionTask(): void {
    this.taskService.deleteTask(this.task._listId, this.task._id).subscribe(() => {
      this.taskService.passingListId(this.listId);
      this.activePopupTask = false;
      this.taskService.openEditTask(false);
    });
  }
}
