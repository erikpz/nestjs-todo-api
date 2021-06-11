import * as fs from 'fs';
import { parse } from 'dotenv';
require('dotenv').config()

export class ConfigService {
  private readonly envConfig: {
    [key: string]: string;
  };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log('.env file no existe');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      PORT: process.env.PORT || 3000;
      MONGO_URI: process.env.MONGO_URI;
    }
  }
}
