import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './Projects/project-list/project-list.component';
import { ProjectCreationComponent } from './Projects/project-creation/project-creation.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreationComponent } from './Task/task-creation/task-creation.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'project-list',
    component: ProjectListComponent,
  },
  {
    path: 'project-creation',
    component: ProjectCreationComponent,
  },
  {
    path: 'edit-project/:id',
    component: ProjectCreationComponent,
  },
  {
    path: ':id/task-list',
    component: TaskListComponent,
  },

  {
    path: ':id/task-creation',
    component: TaskCreationComponent,
  },
  {
    path: ':id/edit-task/:taskid',
    component: TaskCreationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectModuleRoutingModule {}
