import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  async getSingleTask(taskId: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id: taskId, user });
    if (!found) {
      throw new NotFoundException(`task with id ${taskId} is not found`);
    }
    return found;
  }
  async updateTask(taskId, status, user: User): Promise<Task> {
    const task = await this.getSingleTask(taskId, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTask(taskId, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id: taskId, user });
    if (result.affected === 0) {
      throw new NotFoundException(`task with id ${taskId} is not found`);
    }
  }
}
