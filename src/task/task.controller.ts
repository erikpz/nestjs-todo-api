import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':userName')
  async getTasks(@Param('userName') userName) {
    const tasks = await this.taskService.getTasks(userName);
    return {
      ok: true,
      status: 200,
      data: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userName/:taskId')
  async getTask(@Param('taskId') taskId) {
    const tasks = await this.taskService.getTask(taskId);
    return {
      ok: true,
      status: 200,
      data: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':userName/create-task')
  async createTask(@Param('userName') userName, @Body() body: CreateTaskDTO) {
    const task = await this.taskService.createTask(userName, body);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userName/delete-task/:taskId')
  async deleteTask(@Param('taskId') taskId) {
    const task = await this.taskService.deleteTask(taskId);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':userName/update-task/:taskId')
  async updateTask(@Param('taskId') taskId, @Body() body: CreateTaskDTO) {
    const task = await this.taskService.updateTask(taskId, body);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }
}
