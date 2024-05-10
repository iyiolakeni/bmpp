import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login-api.controller';
import { LoginService } from './login-api.service';

describe('LoginApiController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
