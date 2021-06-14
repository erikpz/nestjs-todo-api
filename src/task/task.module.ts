import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
