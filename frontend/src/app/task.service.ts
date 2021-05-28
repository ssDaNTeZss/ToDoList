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

  getOneList(id: string): Observable<Object> {
    return this.webReqService.get(`lists/${id}`);
  }

  createList(title: string): Observable<Object> {
    return this.webReqService.post("lists", {title});
  }

  updateList(id: string, title: string): Observable<Object> {
    // We want to send a web request to update a list
    return this.webReqService.put(`lists/${id}`, { title });
  }

  deleteList(id: string): Observable<Object> {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string): Observable<Object> {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  updateTask(listId: string, taskId: string, obj: Object): Observable<Object> {
    return this.webReqService.put(`lists/${listId}/tasks/${taskId}`, obj);
  }

  public listId$ = new Subject<any>();
  public titleList$ = new Subject<any>();
  public update$ = new Subject<boolean>();
  public editList$ = new Subject<boolean>();

  public passingListId(listId: string): void {
    this.listId$.next(listId);
  }

  public passingTitleList(titleList: string): void {
    this.titleList$.next(titleList);
  }

  public update(update: boolean): void {
    this.update$.next(update);
  }

  public openEditList(editList: boolean): void {
    this.editList$.next(editList);
  }

}
