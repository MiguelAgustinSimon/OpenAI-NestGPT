import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, lang } = options;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        //max_tokens: 100,
        messages: [
            {
                role: "system",
                content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`
            },
            { role: "user", content: prompt }
        ],
    });

    return { message: response.choices[0].message.content };
}