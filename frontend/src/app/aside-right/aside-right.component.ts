import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { List } from "../models/list.model";
import { Task } from "../models/task.model";
import { TaskService } from "../task.service";

@Component({
  selector: "app-aside-right",
  templateUrl: "./aside-right.component.html",
  styleUrls: ["./aside-right.component.css"]
})
export class AsideRightComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  formModelTask: FormGroup;
  openEditTask = false;
  listId: string;
  taskId: string;
  task: Task;
  create = false;
  titleButton: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.formModelTask = new FormGroup({
      title: new FormControl(
        "",
        [
          Validators.required,
        ],
      ),
      date_of_completion: new FormControl(
        "",
        [],
      ),
      description: new FormControl(
        "",
        [],
      ),
    });

    this.subs = this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
      this.taskId = params.taskId;
    });

    this.subs = this.taskService.task$.subscribe((task) => {
      this.task = task;
      this.formModelTask.patchValue({
        title: task.title,
        date_of_completion: task.date_of_completion,
        description: task.description,
      });
    });

    this.subs = this.taskService.editTask$.subscribe((openEditTask: boolean) => {
      this.openEditTask = openEditTask;
      this.create = false;
    });

    this.subs = this.taskService.create$.subscribe((create: boolean) => {
      this.formModelTask.reset();
      this.create = create;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get _title(): AbstractControl {
    return this.formModelTask.get("title");
  }

  onSubmitForm(): void {
    const FMT = this.formModelTask.value;

    if (this.create) {
      this.taskService.createTask(this.listId, FMT).subscribe(() => {
        this.openEditTask = false;
        this.taskService.passingListId(this.listId);
      });
    } else {
      this.taskService.updateTask(this.task._listId, this.task._id, FMT).subscribe(() => {
        this.taskService.passingListId(this.listId);
      });
    }
  }

  closeEditTask(): void {
    this.openEditTask = false;
  }

  deleteTask(): void {
    this.taskService.openPopupTask(true, this.task);
    this.taskService.deleteTask(this.task._listId, this.task._id).subscribe(() => {
    });
    this.openEditTask = false;
  }
}
