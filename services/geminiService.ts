import { GoogleGenAI, Type } from "@google/genai";
import { CodeFile } from '../types';

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
    const apiKey = localStorage.getItem('gemini_api_key');
    const modelName = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

    if (!apiKey) {
        throw new Error("Gemini API Key not found. Please set it in the Settings page.");
    }
    
    if (modelName !== 'gemini-2.5-flash' && modelName !== 'gemini-2.5-pro') {
        throw new Error(`Unsupported model: ${modelName}. Please select a valid model in Settings.`);
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: modelName,
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
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("Your Gemini API Key is not valid. Please check it in the Settings page.");
        }
        throw new Error("Failed to generate code. Please check your API Key and network connection.");
    }
};