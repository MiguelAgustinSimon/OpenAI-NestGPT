import * as path from "path";
import * as fs from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { audioToTextUseCase } from "./use-cases/audio-to-text.use-case";
import { AudioToTextDto } from "./dtos/audio-to-text.dto";
import { ImageGenerationDto } from "./dtos/image-generation.dto";
import { imageGenerationUseCase } from "./use-cases/image-generation.use-case";
import { imageVariationUseCase } from "./use-cases/image-variation.use-case";
import { ImageVariationDto } from "./dtos/image-variation.dto";


@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    //solo va llamar casos de uso
    async orthographycheck(orthographyDto: OrthographyDto) {
        return await orthographyUseCase(this.openai, {
            prompt: orthographyDto.prompt
        });
    }

    async translateText(translateDto: TranslateDto) {
        return await translateUseCase(this.openai, {
            prompt: translateDto.prompt,
            lang: translateDto.lang,
        });
    }

    async textToAudio({ prompt, voice }: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, { prompt, voice });
    }

    async textToAudioGetter(fileId: string) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException(`File ${fileId} not found.`);
        }
        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, { prompt }: AudioToTextDto) {
        return await audioToTextUseCase(this.openai, { prompt, audioFile });
    }

    async imageGeneration(imageGenerationDto: ImageGenerationDto) {
        return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
    }


    async getGeneratedImage(filename: string) {
        const filePath = path.resolve(__dirname, '../../generated/images/', `${filename}.png`);
        //const filePath = path.resolve('./', './generated/images/', filename);
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException(`File ${filename} not found.`);
        }
        return filePath;
    }


    async geneateImageVariation({ baseImage }: ImageVariationDto) {
        return await imageVariationUseCase(this.openai, { baseImage });
    }
}
