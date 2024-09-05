import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const orthographyCaseUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 100,
        response_format: {
            type: "json_object"
        },
        messages: [
            {
                role: "system",
                content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
                        Debes de responder en formato JSON, 
                        tu tarea es corregirlos y retornar información soluciones, 
                        también debes de dar un porcentaje de acierto por el usuario.
                        Si no hay errores, debes de retornar un mensaje de felicitaciones.
                        Ejemplo de salida:
                        {
                        userScore: number,
                        errors: string[], // ['error -> solución']
                        message: string, //  Usa emojis y texto para felicitar al usuario
                        }`
            },
            { role: "user", content: prompt }
        ],
    });

    const jsonResponse = JSON.parse(completion.choices[0].message.content);
    return jsonResponse;
}