import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config()
@Module({
  imports: [
    UserModule,
    ConfigModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI
    ),
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
