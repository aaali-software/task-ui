import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task, TaskService } from '../../../core/services/task';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-dashboard',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss'
})
export class TaskDashboard implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];
  errorMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: response => {
        this.tasks = response.content;
        this.isLoading = false;
      },
      error: error => {
        console.error('Failed to load tasks', error);
        this.errorMessage = 'Failed to load tasks. Please sign in again or try refreshing.';
        this.isLoading = false;
      }
    });
  }
}