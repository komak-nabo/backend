import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersMongoService } from './services/users.mongo.service';
import { AuthService } from './auth/services/auth.service';
import { MongoModule } from '@backend/mongo';
import { ConfigModule } from '@backend/config';
import { AppleService } from './auth/services/apple.service';
import { GoogleService } from './auth/services/google.service';
import { RecaptchaService } from './auth/services/captcha.service';
import { LoggerModule } from '@backend/logger';
import { ExceptionsModule } from '@backend/exceptions';
import { FacebookService } from './auth/services/facebook.service';

@Module({
  providers: [
    UsersService,
    UsersMongoService,
    AuthService,
    AppleService,
    GoogleService,
    RecaptchaService,
    FacebookService,
  ],
  controllers: [UsersController],
  imports: [MongoModule, ConfigModule, LoggerModule, ExceptionsModule],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
