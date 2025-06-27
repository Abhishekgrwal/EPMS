import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _http: HttpClient) {}

  getProjectList() {
    return this._http.get(`${environment.url}/projects`);
  }

  createProjects(projects: any) {
    const obj = {
      id: Date.now().toString(),
      name: projects.name,
      description: projects.description,
      startDate: projects.startDate,
      endDate: projects.endDate,
      assignedUsers: projects.assignedUsers,
    };

    return this._http.post(`${environment.url}/projects`, obj);
  }

  updateProject(projects: any, projectId: string) {
    const obj = {
      name: projects.name,
      description: projects.description,
      startDate: projects.startDate,
      endDate: projects.endDate,
      assignedUsers: projects.assignedUsers,
    };
    return this._http.put(`${environment.url}/projects/${projectId}`, obj);
  }

  getProjectById(projectid: string) {
    return this._http.get(`${environment.url}/projects/${projectid}`);
  }

  deleteProject(projectId: string) {
    return this._http.delete(`${environment.url}/projects/${projectId}`);
  }
}
