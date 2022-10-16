import { Module } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { RedisCacheModule } from '../../redis-cache/redis-cache.module'

@Module({
  imports: [RedisCacheModule],
  providers: [CustomerService],
  exports: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
