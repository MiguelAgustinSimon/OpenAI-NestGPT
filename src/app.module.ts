import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ProsConsDiscusserModule } from './pros-cons-discusser/pros-cons-discusser.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    ProsConsDiscusserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
