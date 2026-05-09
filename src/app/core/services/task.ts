import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPage {
  content: Task[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getTasks(): Observable<TaskPage> {
    return this.http.get<TaskPage>(`${this.apiUrl}/api/tasks`);
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/tasks`, request);
  }
}
