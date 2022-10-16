import { AuthService } from './auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { RedisCacheModule } from '../../redis-cache/redis-cache.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

describe('AuthService', () => {
  let authService: AuthService
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
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should do login', async () => {})
})
