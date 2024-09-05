import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const prosConsDicusserStreamUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;

    return await openai.chat.completions.create({
        stream:true,
        model: "gpt-4",
        temperature: 0.3,
        max_tokens: 500,
        messages: [
            {
                role: "system",
                content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras.
                        La respuesta debe ser un objeto JSON con los siguientes campos: 
                        {"pros": ["lista de pros"], "cons": ["lista de contras"]}.`
            },
            { role: "user", content: prompt }
        ],
    });

}




//Respuesta Hardcodeada a modo testing
// import { EventEmitter } from 'events';

// interface Options {
//     prompt: string;
// }

// interface SimulatedResponse {
//     id: string;
//     object: string;
//     created: number;
//     model: string;
//     choices: {
//         index: number;
//         delta: {
//             content?: string;
//         };
//         finish_reason: string | null;
//     }[];
// }

// export const prosConsDicusserStreamUseCase = async (openai: OpenAI,options: Options) => {
//     const { prompt } = options;

//     // Respuesta predefinida
//     const hardcodedResponse = {
//         pros: [
//             "Fácil de implementar",
//             "Rápido para pruebas",
//             "No requiere conexión a internet"
//         ],
//         cons: [
//             "No es dinámico",
//             "Limitado a un solo escenario",
//             "Puede volverse obsoleto rápidamente"
//         ]
//     };

//     // Crear un EventEmitter para simular el stream
//     const stream = new EventEmitter();

//     // Simular el streaming de la respuesta
//     process.nextTick(() => {
//         let responseStr = JSON.stringify(hardcodedResponse);
//         for (let i = 0; i < responseStr.length; i++) {
//             const chunk: SimulatedResponse = {
//                 id: 'chatcmpl-123',
//                 object: 'chat.completion.chunk',
//                 created: Date.now(),
//                 model: 'gpt-4',
//                 choices: [{
//                     index: 0,
//                     delta: {
//                         content: responseStr[i]
//                     },
//                     finish_reason: null
//                 }]
//             };
//             stream.emit('data', chunk);
//         }

//         // Enviar el chunk final
//         stream.emit('data', {
//             id: 'chatcmpl-123',
//             object: 'chat.completion.chunk',
//             created: Date.now(),
//             model: 'gpt-4',
//             choices: [{
//                 index: 0,
//                 delta: {},
//                 finish_reason: 'stop'
//             }]
//         });

//         stream.emit('end');
//     });

//     return stream;
// };