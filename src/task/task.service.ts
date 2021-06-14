import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from 'src/dto/task.dto';
import { Task } from 'src/interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(userName: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ author: userName });
    return tasks;
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async createTask(userName: string, task: CreateTaskDTO): Promise<Task> {
    const taskCreated = await this.taskModel.create({
      ...task,
      author: userName,
      updatedAt: null,
    });
    return taskCreated;
  }

  async deleteTask(id: string): Promise<Task> {
    const taskDeleted = await this.taskModel.findByIdAndRemove(id);
    return taskDeleted;
  }

  async updateTask(id: string, task: CreateTaskDTO): Promise<Task> {
    const taskUpdated = await this.taskModel.findByIdAndUpdate(id, {
        ...task,
        updatedAt: new Date()
    }, {
      new: true,
    });
    return taskUpdated;
  }
}
