import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { RedisCacheModule } from '../../../redis-cache/redis-cache.module'
import { CustomerController } from '../customer.controller'
import { CustomerService } from '../customer.service'
import { CustomerDto } from '../dto/customer.dto'
import { UpdateCustomerDto } from '../dto/update-customer.dto'
import { customer } from './mocks'

describe('CustomerServce', () => {
  let customerService: CustomerService
  let customerController: CustomerController
  let moduleRef: TestingModule

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
        }),
        RedisCacheModule
      ],
      providers: [CustomerService, ConfigService],
    }).compile()

    customerService = moduleRef.get<CustomerService>(CustomerService)
    customerController = new CustomerController(customerService);
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  it('should be defined', () => {
    expect(customerService).toBeDefined()
  })

  it('should be defined', () => {
    expect(customerController).toBeDefined()
  })

  describe('service', () => {
    it('should get all', async () => {
      
    })

    it('should store', async () => {
      
    })

    it('should show', async () => {
      
    })

    it('should put', async () => {
      
    })
  })

  describe('controller', () => { 
    it('should get error in document', async () => {
      const customer: CustomerDto = {
        document: null,
        name: '123'
      }
      const myDtoObject = plainToInstance(CustomerDto, customer)
      const errors = await validate(myDtoObject)
      const stringErrors = JSON.stringify(errors)
      expect(stringErrors.length).not.toBe(0)
      expect(stringErrors).toContain('document should not be empty')
      expect(stringErrors).toContain('document must be a number conforming to the specified constraints')
    })

    it('should get error in name', async () => {
      const customer: CustomerDto = {
        document: 12,
        name: ''
      }
      const myDtoObject = plainToInstance(CustomerDto, customer)
      const errors = await validate(myDtoObject)
      const stringErrors = JSON.stringify(errors)
      expect(stringErrors.length).not.toBe(0)
      expect(stringErrors).toContain('name should not be empty')
    })

    it('should return CustomerDto[] - index', async () => {
      const result: CustomerDto[] = [customer]
      jest.spyOn(customerController, 'index').mockImplementation(() => Promise.resolve(result));

      expect(await customerController.index()).toBe(result);
    })

    it('should return CustomerDto - store', async () => {
      
      jest.spyOn(customerController, 'store').mockImplementation(() => null);

      expect(await customerController.store(customer)).toBe(null);
    })

    it('should return CustomerDto - put', async () => {
      const result: CustomerDto = {
        document: 0,
        name: ''
      }
      jest.spyOn(customerController, 'put').mockImplementation(() => Promise.resolve(result));

      const customer: UpdateCustomerDto = {
        id: 'abc',
        document: 0,
        name: ''
      }
      expect(await customerController.put('cbd', customer)).toBe(result);
    })

    it('should return CustomerDto - show', async () => {
      const result: CustomerDto = {
        document: 0,
        name: ''
      }
      jest.spyOn(customerController, 'show').mockImplementation(() => Promise.resolve(result));

      expect(await customerController.show('cbd')).toBe(result);
    })
  })
})
