import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/orthography.dto';
import { TranslateDto } from './dtos/translate.dto';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { AudioToTextDto } from './dtos/audio-to-text.dto';
import { ImageGenerationDto } from './dtos/image-generation.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @Post('orthography-check')
  orthographycheck(
    @Body() orthographyDto: OrthographyDto,
  ) {
    return this.gptService.orthographycheck(orthographyDto);
  }

  @Post('translate')
  translateText(
    @Body() translateDto: TranslateDto,
  ) {
    return this.gptService.translateText(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string,
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${uuid()}.${fileExtension}`;
          return callback(null, fileName);
        }
      })
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: 'File is bigger than 5mb.' }),
          //new FileTypeValidator({ fileType: /(audio|video)\/(webm|ogg|mp3|flac|wav)/ })
          new FileTypeValidator({ fileType: 'audio/*' })
        ]
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto,
  ) {
    return this.gptService.audioToText(file, audioToTextDto);
  }

  @Post('image-generation')
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto,
  ) {
    return this.gptService.imageGeneration(imageGenerationDto);

  }
}