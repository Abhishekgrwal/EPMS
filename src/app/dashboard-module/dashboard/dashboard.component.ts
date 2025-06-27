import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  chart: any = [];

  KPIData = [
    {
      count: 100,
      title: 'Project Count',
    },
    {
      count: 200,
      title: 'Active User',
    },
    {
      count: 300,
      title: 'Overdue Task',
    },
    {
      count: 400,
      title: 'Completed Task',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    Chart.register(PieController, ArcElement, Tooltip, Legend);
    this.chart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Completed Task', 'BackLogs', 'WIP'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  ngAfterViewInit() {}
}
