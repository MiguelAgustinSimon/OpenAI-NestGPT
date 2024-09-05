import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ProsConsDiscusserService } from './pros-cons-discusser.service';
import { ProsConsDiscusserDto } from './dto/pros-cons-discusser.dto';
import { Response } from 'express';

interface SimulatedResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
      index: number;
      delta: {
          content?: string;
      };
      finish_reason: string | null;
  }[];
}


@Controller('pros-cons-discusser')
export class ProsConsDiscusserController {
  constructor(private readonly prosConsDiscusserService: ProsConsDiscusserService) { }

  @Post()
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.prosConsDiscusserService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream = await this.prosConsDiscusserService.prosConsDicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }

  // @Post('stream')
  // async prosConsDicusserStream(
  //     @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
  //     @Res() res: Response,
  // ) {
  //     const stream = await this.prosConsDiscusserService.prosConsDicusserStream(prosConsDiscusserDto);
      
  //     res.setHeader('Content-Type', 'application/json');
  //     res.status(HttpStatus.OK);

  //     stream.on('data', (chunk: SimulatedResponse) => {
  //         const piece = chunk.choices[0].delta.content || '';
  //         res.write(piece);
  //     });

  //     stream.on('end', () => {
  //         res.end();
  //     });
  // }

}
