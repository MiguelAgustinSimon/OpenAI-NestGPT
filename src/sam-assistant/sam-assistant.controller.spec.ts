import { Test, TestingModule } from '@nestjs/testing';
import { SamAssistantController } from './sam-assistant.controller';
import { SamAssistantService } from './sam-assistant.service';

describe('SamAssistantController', () => {
  let controller: SamAssistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamAssistantController],
      providers: [SamAssistantService],
    }).compile();

    controller = module.get<SamAssistantController>(SamAssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
