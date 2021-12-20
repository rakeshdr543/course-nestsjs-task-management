import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { Task } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterTaskDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getSingleTask(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getSingleTask(taskId, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') taskId,
    @Body('') updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    const { status } = updateTaskDto;
    return this.tasksService.updateTask(taskId, status, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(taskId, user);
  }
}
