import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { WebRequestService } from "./web-request.service";
import { Task } from "./models/task.model";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  constructor(private webReqService: WebRequestService) {
  }

  public listId$ = new Subject<any>();
  public titleList$ = new Subject<any>();
  public update$ = new Subject<boolean>();
  public editList$ = new Subject<boolean>();
  public task$ = new Subject<Task>();
  public editTask$ = new Subject<Boolean>();
  public activePopupTask$ = new Subject<Boolean>();
  public popupTask$ = new Subject<Task>();
  public create$ = new Subject<boolean>();

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

  createTask(listId: string, obj: Object) {
    // We want to send a web request to create a task
    return this.webReqService.post(`lists/${listId}/tasks`, obj);
  }

  updateTask(listId: string, taskId: string, obj: Object): Observable<Object> {
    return this.webReqService.put(`lists/${listId}/tasks/${taskId}`, obj);
  }

  deleteTask(listId: string, taskId: string): Observable<Object> {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

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

  public passingTask(task: Task): void {
    this.task$.next(task);
  }

  public openEditTask(editTask: boolean): void {
    this.editTask$.next(editTask);
  }

  public openPopupTask(activePopupTask: boolean, task: Task): void {
    this.activePopupTask$.next(activePopupTask);
    this.popupTask$.next(task);
  }

  public passingCreate(create: boolean): void {
    this.create$.next(create);
  }
}
