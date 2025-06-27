import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModuleModule } from '../sharedModule/shared-module/shared-module.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardModuleRoutingModule, SharedModuleModule],
})
export class DashboardModuleModule {}
