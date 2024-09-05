import { Injectable } from '@nestjs/common';
import { ProsConsDiscusserDto } from './dto/pros-cons-discusser.dto';
import OpenAI from 'openai';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-discusser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/pros-cons-stream.use-case';



@Injectable()
export class ProsConsDiscusserService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }
}
