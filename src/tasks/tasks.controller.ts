import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { Task } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterTaskDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getSingleTask(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.getSingleTask(taskId);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') taskId, @Body('') updateTaskDto: UpdateTaskDto) {
    const { status } = updateTaskDto;
    return this.tasksService.updateTask(taskId, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }
}
