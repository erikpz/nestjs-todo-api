import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
require('dotenv').config();
import * as mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
