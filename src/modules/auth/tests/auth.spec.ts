import { AuthService } from '../auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { RedisCacheModule } from '../../../redis-cache/redis-cache.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { AuthController } from '../auth.controller'
import { AuthDto } from '../dto/auth.dto'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { authResponse } from './mocks'

describe('AuthService', () => {
  let authService: AuthService
  let authController: AuthController
  let moduleRef: TestingModule

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
        }),
        RedisCacheModule,
        HttpModule,
      ],
      providers: [AuthService, ConfigService],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    authController = new AuthController(authService);
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  /*describe('service', () => {
    it('should do login service', async () => {})
  });*/

  describe('controller', () => {
    it('should get error in username', async () => {
      const auth: AuthDto = {
        username: '',
        password: '123'
      }
      const myDtoObject = plainToInstance(AuthDto, auth)
      const errors = await validate(myDtoObject)
      const stringErrors = JSON.stringify(errors)
      expect(stringErrors.length).not.toBe(0)
      expect(stringErrors).toContain('username should not be empty')
    });

    it('should get error in password', async () => {
      const auth: AuthDto = {
        username: '123',
        password: ''
      }
      const myDtoObject = plainToInstance(AuthDto, auth)
      const errors = await validate(myDtoObject)
      const stringErrors = JSON.stringify(errors)
      expect(stringErrors.length).not.toBe(0)
      expect(stringErrors).toContain('password should not be empty')
    });

    it('should return AuthResponseDto', async () => {
     
      jest.spyOn(authService, 'doLogin').mockImplementation(() => Promise.resolve(authResponse))

      const auth: AuthDto = {
        username: 'test',
        password: 'test'
      }
      expect(await authController.store(auth)).toBe(authResponse)
    });
  });
})
