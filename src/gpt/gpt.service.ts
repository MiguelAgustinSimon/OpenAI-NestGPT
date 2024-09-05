import { Injectable } from '@nestjs/common';
import { orthographyCaseUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    //solo va llamar casos de uso
    async orthographycheck(orthographyDto: OrthographyDto) {
        return await orthographyCaseUseCase(this.openai,{
            prompt: orthographyDto.prompt
        });
    }
}
