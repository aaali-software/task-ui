import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task, TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-dashboard',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss',
})
export class TaskDashboard implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);

  priorities = ['LOW', 'MEDIUM', 'HIGH'];
  statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

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
      next: (response) => {
        this.tasks = response.content;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load tasks', error);
        this.errorMessage = 'Failed to load tasks. Please sign in again or try refreshing.';
        this.isLoading = false;
      },
    });
  }

  createForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['MEDIUM', Validators.required],
    status: ['PENDING', Validators.required],
    dueDate: ['', Validators.required],
  });

  createTask(): void {
    if (this.createForm.invalid) {
      return;
    }

    const formValue = this.createForm.getRawValue();

    this.taskService
      .createTask({
        ...formValue,
        dueDate: `${formValue.dueDate}T12:00:00`,
      })
      .subscribe({
        next: () => {
          this.createForm.reset({
            title: '',
            description: '',
            priority: 'MEDIUM',
            status: 'PENDING',
            dueDate: '',
          });
          this.loadTasks();
        },
        error: (error) => {
          console.error('Failed to create task', error);
          this.errorMessage = 'Failed to create task. Please try again.';
        },
      });
  }
}
