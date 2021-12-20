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
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: FilterTaskDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.getFilterTasks(filterTaskDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getSingleTask(@Param('id') taskId) {
    return this.tasksService.getSingleTask(taskId);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') taskId, @Body('') updateTaskDto: UpdateTaskDto) {
    const { status } = updateTaskDto;
    return this.tasksService.updateTask(taskId, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId) {
    return this.tasksService.deleteTask(taskId);
  }
}
