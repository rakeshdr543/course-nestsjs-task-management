import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: CreateTaskDto) {
    const { title, description, status } = task;
    const newTask = {
      id: uuid(),
      title,
      description,
      status,
    };
    this.tasks.push(newTask);
  }
}
