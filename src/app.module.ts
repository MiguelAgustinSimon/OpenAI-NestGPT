import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ProsConsDiscusserModule } from './pros-cons-discusser/pros-cons-discusser.module';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    ProsConsDiscusserModule,
    SamAssistantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
