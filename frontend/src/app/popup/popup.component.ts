import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
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

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closePopup(): void {
    this.activePopup = false;
  }

  onDeletion(): void {
    this.taskService.deleteList(this.listId).subscribe(() => {
      this.activePopup = false;
      this.router.navigate(["/lists", "all-tasks"]);
      this.taskService.openEditList(false);
    });
  }
}
