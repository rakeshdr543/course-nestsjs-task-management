import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTaskDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async getSingleTask(taskId: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id: taskId });
    if (!found) {
      throw new NotFoundException(`task with id ${taskId} is not found`);
    }
    return found;
  }
  async updateTask(taskId, status): Promise<Task> {
    const task = await this.getSingleTask(taskId);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  async deleteTask(taskId): Promise<void> {
    const result = await this.tasksRepository.delete({ id: taskId });
    if (result.affected === 0) {
      throw new NotFoundException(`task with id ${taskId} is not found`);
    }
  }
}
