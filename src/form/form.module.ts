import { FormService } from './form.service';
import { FormController } from './form.controller';
import { DatabaseModule } from 'database/database.module';
import { Module,  MiddlewareConsumer } from '@nestjs/common';
import { LoginService } from 'src/login-api/login-api.service';




@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [FormService,LoginService],
})
export class FormModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(BusinessDeveloperMiddleware)
  //     .forRoutes(FormController); 
  //   consumer
  //     .apply(AccountOfficerMiddleware)
  //     .forRoutes(FormController); 
  // }
}
