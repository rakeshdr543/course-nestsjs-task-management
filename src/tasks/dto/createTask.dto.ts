import { TaskStatus } from '../task.model';

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
