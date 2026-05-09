import { Component, inject, OnInit } from '@angular/core';
import { Task, TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-dashboard',
  imports: [],
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