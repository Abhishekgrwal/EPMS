import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; //
import { TableComponent } from '../table/table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [FilterPipe, ConfirmationModalComponent, TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSortModule,
    DragDropModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    FilterPipe,
    MatGridListModule,
    ConfirmationModalComponent,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TableComponent,
    MatMenuModule,
    MatSortModule,
    DragDropModule,
  ],
})
export class SharedModuleModule {}
