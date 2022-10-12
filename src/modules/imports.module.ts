import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { CustomerModule } from "./customer/customer.module"

@Module({
  imports: [
   AuthModule,
   CustomerModule
  ],
  exports: [
    AuthModule,
    CustomerModule
  ],
})

export class ImportsModule {}