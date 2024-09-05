import { Module } from '@nestjs/common';
import { ProsConsDiscusserService } from './pros-cons-discusser.service';
import { ProsConsDiscusserController } from './pros-cons-discusser.controller';

@Module({
  controllers: [ProsConsDiscusserController],
  providers: [ProsConsDiscusserService],
})
export class ProsConsDiscusserModule {}
