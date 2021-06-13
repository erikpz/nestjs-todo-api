import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
  ],
})
export class AppModule {}
