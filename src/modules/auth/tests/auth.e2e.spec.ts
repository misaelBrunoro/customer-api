import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { authResponse } from './mocks';
import { AuthService } from '../auth.service';

describe('Auth', () => {
  let app: INestApplication;
  let authService = { doLogin: () => authResponse };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/POST auth/login`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(201)
      .expect(authService.doLogin())
  })

  afterAll(async () => {
    await app.close()
  })
})