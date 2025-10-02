import { GoogleGenAI, Type } from "@google/genai";
import { CodeFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an expert web developer specializing in React and Tailwind CSS. 
Your task is to generate complete, production-ready code for a single-file React component based on the user's prompt. 
The user is in an online editor, so you must not presume they have a complex setup.
Your response must be a JSON object containing two keys: 'files' and 'thought'.
- The 'files' key should be an array of objects, where each object has a 'name' (e.g., 'index.tsx', 'styles.css') and a 'content' (the code). 
- The 'thought' key should contain a friendly, conversational message explaining what you've created, as if you were a helpful AI assistant.
Always generate a single self-contained component in 'index.tsx'. Do not create an 'App.tsx' or a 'main.tsx' unless specifically asked.
The generated code should be runnable in a preview panel that renders the default export from 'index.tsx'.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        files: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    content: { type: Type.STRING },
                },
                required: ["name", "content"],
            },
        },
        thought: { type: Type.STRING },
    },
    required: ["files", "thought"],
};

interface GeminiResponse {
    files: CodeFile[];
    thought: string;
}

export const generateCode = async (prompt: string): Promise<GeminiResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (!parsedResponse.files || !parsedResponse.thought) {
            throw new Error("Invalid response structure from API");
        }

        return parsedResponse;
    } catch (error) {
        console.error("Error generating code:", error);
        throw new Error("Failed to generate code. Please check the console for details.");
    }
};
