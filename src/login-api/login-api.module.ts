import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginController } from './login-api.controller';
import { DatabaseModule } from 'database/database.module';
import session from 'express-session';



@Module({imports: [
  DatabaseModule,
],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(session({ secret: 'your_secret', resave: false, saveUninitialized: false }))
      .forRoutes('*');
  }
}
