import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTasks(@Request() req: any) {
    const tasks = await this.taskService.getTasks(req.user.userName);
    return {
      ok: true,
      status: 200,
      data: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:taskId')
  async getTask(@Param('taskId') taskId, @Request() req: any) {
    const tasks = await this.taskService.getTask(taskId);
    return {
      ok: true,
      status: 200,
      data: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-task')
  async createTask(@Request() req: any, @Body() body: CreateTaskDTO) {
    const task = await this.taskService.createTask(req.user.userName, body);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-task/:taskId')
  async deleteTask(@Param('taskId') taskId) {
    const task = await this.taskService.deleteTask(taskId);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-task/:taskId')
  async updateTask(@Param('taskId') taskId, @Body() body: CreateTaskDTO) {
    const task = await this.taskService.updateTask(taskId, body);
    return {
      ok: true,
      status: 200,
      data: task,
    };
  }
}
