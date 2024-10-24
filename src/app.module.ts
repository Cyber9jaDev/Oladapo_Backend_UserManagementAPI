import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptor/user.interceptor';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
