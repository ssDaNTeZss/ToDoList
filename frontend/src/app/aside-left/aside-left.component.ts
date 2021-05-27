import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { List } from "src/app/models/list.model";
import { Task } from "src/app/models/task.model";
import { TaskService } from "../task.service";

@Component({
  selector: "app-aside-left",
  templateUrl: "./aside-left.component.html",
  styleUrls: ["./aside-left.component.css"]
})
export class AsideLeftComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  formModelList: FormGroup;
  activateForm = false;
  lists: List[];
  tasks: Task[];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.formModelList = new FormGroup({
      listName: new FormControl(
        "",
        [
          Validators.required,
        ],
      )
    });

    this.subs = this.route.params.subscribe((params: Params) => {
      // console.log(params);
      // this.subs = this.taskService.getTasks(params.listId).subscribe((tasks: any[]) => {
      //   this.tasks = tasks;
      //   console.log(this.tasks);
      // });
      this.taskService.passingListId(params.listId);
    });

    this.subs = this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setList(title: string): void {
    this.taskService.passingTitleList(title);
  }

  onSubmitForm(): void {
    const FML = this.formModelList.value;

    if (this.activateForm === true && FML.listName) {
      this.subs = this.taskService.createList(FML.listName).subscribe((response) => {
        this.subs = this.taskService.getLists().subscribe((lists: List[]) => {
          this.lists = lists;
        });
      });

      setTimeout(() => {
        this.activateForm = false;
      }, 1);
    }

    if (this.activateForm === true && !FML.listName) {
      setTimeout(() => {
        this.activateForm = false;
      }, 1);
    }

    if (this.activateForm === false) {
      this.activateForm = true;
    }
  }
}
