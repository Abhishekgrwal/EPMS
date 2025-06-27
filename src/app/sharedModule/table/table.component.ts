import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() column: any[] = [];
  @Output() actionClick = new EventEmitter<{ row: any; action: string }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['column']) {
      // Update displayedColumns based on columnDefinitions keys
      this.displayedColumns = this.column.map((col) => col.key);
      this.dataSource.data = this.data; // Update data source when data input changes

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onActionClick(row: any, action: string): void {
    console.log(row);

    this.actionClick.emit({ row, action });
  }

  isActionColumn(column: any): boolean {
    return column.type === 'action';
  }
  isDateColumn(column: any): boolean {
    return column.type === 'date';
  }

  trackByUserId(index: number, user: any): number {
    console.log(user);

    return user.id;
  }
}
