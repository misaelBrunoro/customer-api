import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { customer } from './mocks';
import { CustomerService } from '../customer.service';
import { CustomerModule } from '../customer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '../../../redis-cache/redis-cache.module';

describe('Customers', () => {
  let app: INestApplication;
  let customerService = { store: () => customer, index: () => [customer], put: () => customer, show: () => customer };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
          }),
          CustomerModule,
        ],
        providers: [ConfigService]
    })
      .overrideProvider(CustomerService)
      .useValue(customerService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  /*it(`/GET customers`, () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect(customerService.index())
  })

  it(`/POST customers`, () => {
    return request(app.getHttpServer())
      .post('/customers')
      .expect(200)
      .expect(customerService.store())
  })

  it(`/GET customers`, () => {
    return request(app.getHttpServer())
      .get('/customers/1')
      .expect(200)
      .expect(customerService.show())
  })

  it(`/PUT customers/1`, () => {
    return request(app.getHttpServer())
      .put('/customers')
      .expect(200)
      .expect(customerService.put())
  })*/

  afterAll(async () => {
    await app.close()
  })
})