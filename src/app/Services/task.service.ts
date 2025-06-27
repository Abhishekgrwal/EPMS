import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  getTaskList(projectId: string) {
    return this._http.get(`${environment.url}/task?projectId=${projectId}`);
  }

  createTask(task: any) {
    const obj = {
      id: Date.now().toString(),
      name: task?.name,
      description: task?.description,
      status: task?.status,
      dueDate: task?.dueDate,
      priority: task?.priority,
      projectId: task?.projectId,
    };
    return this._http.post(`${environment.url}/task`, obj);
  }

  updateTask(task: any, taskId: string) {
    const obj = {
      name: task?.name,
      description: task?.description,
      status: task?.status,
      dueDate: task?.dueDate,
      priority: task?.priority,
      projectId: task?.projectId,
    };
    return this._http.put(`${environment.url}/task/${taskId}`, obj);
  }

  getTaskById(taskId: string) {
    return this._http.get(`${environment.url}/task/?id=${taskId}`);
  }

  deleteTask(taskId: string) {
    return this._http.delete(`${environment.url}/task/${taskId}`);
  }
}
