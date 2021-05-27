import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { WebRequestService } from "./web-request.service";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  constructor(private webReqService: WebRequestService) {
  }

  getLists(): Observable<Object> {
    return this.webReqService.get("lists");
  }

  createList(title: string): Observable<Object> {
    return this.webReqService.post("lists", {title});
  }

  getTasks(listId: string): Observable<Object> {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  updateTask(listId: string, taskId: string, obj: Object): Observable<Object> {
    return this.webReqService.put(`lists/${listId}/tasks/${taskId}`, obj);
  }

  public listId$ = new Subject<any>();
  public titleList$ = new Subject<any>();

  public passingListId(listId: string): void {
    this.listId$.next(listId);
  }

  public passingTitleList(titleList: string): void {
    this.titleList$.next(titleList);
  }
}
