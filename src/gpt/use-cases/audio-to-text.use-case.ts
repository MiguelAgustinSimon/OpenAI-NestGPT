import OpenAI from "openai";
import * as path from "path";
import * as fs from 'fs';

interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, audioFile } = options;

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt: prompt,// mismo idioma del audio obligatorio
        language: 'es',
        //response_format: 'srt' //'vtt'
        response_format: 'verbose_json'
    })
    return response;

}