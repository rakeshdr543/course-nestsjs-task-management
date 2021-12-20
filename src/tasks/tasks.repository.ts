import { EntityRepository, QueryBuilder, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.create(createTaskDto);
    await this.save(newTask);
    return newTask;
  }

  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
}
