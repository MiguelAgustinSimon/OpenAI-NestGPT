import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases/create-thread.use-case';
import { createMessageUseCase } from './use-cases/create-message.use-case';
import { QuestionDto } from './dto/question.dto';
import { createRunUseCase } from './use-cases/create-run.use-case';
import { checkCompleteStatusUseCase } from './use-cases/check-complete-status.use-case';
import { getMessageListUseCase } from './use-cases/get-message-list.use-case';

@Injectable()
export class SamAssistantService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    async createThread() {
        return createThreadUseCase(this.openai);
    }

    async userQuestion(questionDto: QuestionDto) {
        const { threadId, question } = questionDto;
        const message = await createMessageUseCase(this.openai, { threadId, question });
        const run = await createRunUseCase( this.openai, { threadId } );
        await checkCompleteStatusUseCase( this.openai, { runId: run.id, threadId: threadId } );

        const messages = await getMessageListUseCase(this.openai, { threadId });

        return messages.reverse();
    }
}
