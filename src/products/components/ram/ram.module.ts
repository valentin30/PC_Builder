import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from 'src/products/product/product.module'
import { RAMController } from './ram.controller'
import { RAMRepository } from './ram.repository'
import { RAMService } from './ram.service'

@Module({
    imports: [TypeOrmModule.forFeature([RAMRepository]), ProductModule],
    providers: [RAMService],
    controllers: [RAMController],
    exports: [RAMService]
})
export class RAMModule {}
