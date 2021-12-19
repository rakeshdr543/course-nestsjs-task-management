import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { title } from 'process';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTasks(filterTaskDto: FilterTaskDto) {
    const { search, status } = filterTaskDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => (task.status = status));
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(title) || task.description.includes(title),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description, status } = createTaskDto;
    const newTask = {
      id: uuid(),
      title,
      description,
      status,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getSingleTask(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  updateTask(taskId, status) {
    const task = this.getSingleTask(taskId);
    task.status = status;
    return task;
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
