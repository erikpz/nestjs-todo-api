import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService)=>({
        uri:configService.get(Configuration.MONGO_URI),
        useNewUrlParser:true
      }),
      inject: [ConfigService]
    }),
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
