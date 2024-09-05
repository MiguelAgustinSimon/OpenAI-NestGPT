import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const prosConsDicusserUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
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
    const jsonResponse = JSON.parse(completion.choices[0].message.content);
    return jsonResponse;

    //Respuesta Hardcodeada a modo testing
    //     const resp = `{
    //     "pros": [
    //         "Las PC suelen tener un rendimiento superior, son más personalizables y actualizables, suelen tener un mejor sistema de refrigeración y son generalmente más duraderas.",
    //         "Las laptops son portátiles, a menudo vienen con todo lo necesario (pantalla, teclado, trackpad), suelen tener una batería incorporada para usar sin necesidad de estar conectadas a la corriente y son más convenientes para espacios reducidos o para viajar."
    //     ],
    //     "cons": [
    //         "Las PC son menos portátiles, requieren de un espacio dedicado, no suelen venir con todo lo necesario (monitor, teclado, ratón, altavoces) y pueden consumir más energía.",
    //         "Las laptops suelen tener un rendimiento inferior al de una PC de escritorio equivalente, son menos personalizables y actualizables, suelen tener un peor sistema de refrigeración y la batería puede degradarse con el tiempo."
    //     ]
    // }`
    //     const jsonResponse = JSON.parse(resp);
    //     return jsonResponse;


}