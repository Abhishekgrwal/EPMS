import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectModuleRoutingModule } from './project-module-routing.module';
import { ProjectListComponent } from './Projects/project-list/project-list.component';
import { ProjectCreationComponent } from './Projects/project-creation/project-creation.component';
import { SharedModuleModule } from '../sharedModule/shared-module/shared-module.module';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreationComponent } from './Task/task-creation/task-creation.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectCreationComponent, TaskListComponent, TaskCreationComponent],
  imports: [CommonModule, ProjectModuleRoutingModule, SharedModuleModule],
})
export class ProjectModuleModule {}
