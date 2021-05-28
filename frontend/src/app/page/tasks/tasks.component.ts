import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
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
  listId: string;
  editList = false;
  formModelTitleList: FormGroup;
  activePopup = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formModelTitleList = new FormGroup({
      titleName: new FormControl(
        this.title,
        [
          Validators.required,
        ],
      )
    });

    this.subs = this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
      if (params.listId !== "all-tasks" &&
        params.listId !== "my-day" &&
        params.listId !== "important" &&
        params.listId !== "planned") {
        this.subs = this.taskService.getLists().subscribe((lists: List[]) => {
          this.lists = lists;

          for (let i = 0; this.lists.length !== i; i++) {
            if (this.lists[i]._id === params.listId) {
              this.title = this.lists[i].title;
              this.formModelTitleList.patchValue({
                titleName: this.title,
              });
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
      this.formModelTitleList.patchValue({
        titleName: this.title,
      });
    });

    this.subs = this.taskService.editList$.subscribe((editList: boolean) => {
      this.editList = editList;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  editTitleList(): void {
    this.editList = !this.editList;
  }

  onSubmitForm(): void {
    if (this.formModelTitleList.value.titleName !== this.title) {
      this.taskService.updateList(this.listId, this.formModelTitleList.value.titleName).subscribe(() => {
        // this.router.navigate(["/lists", this.listId]);
        this.subs = this.taskService.getOneList(this.listId).subscribe((list: List) => {
          this.title = list.title;

          this.taskService.update(true);
        });
      });
      this.editList = !this.editList;
    }
  }

  delList(): void {
    this.activePopup = true;
  }
}
