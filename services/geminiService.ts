import { GoogleGenAI, Type } from "@google/genai";
import { CodeFile } from '../types';

const getApiClient = () => {
    const apiKey = localStorage.getItem('gemini_api_key');
    const modelName = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';

    if (!apiKey) {
        throw new Error("Gemini API Key not found. Please set it in the Settings page.");
    }
    
    if (modelName !== 'gemini-2.5-flash' && modelName !== 'gemini-2.5-pro') {
        throw new Error(`Unsupported model: ${modelName}. Please select a valid model in Settings.`);
    }
    
    const ai = new GoogleGenAI({ apiKey });
    return { ai, modelName };
}

const planSystemInstruction = `You are a principal software architect. Based on the user's prompt, create a high-level plan and a detailed to-do list for building the application using Svelte and Tailwind CSS. The plan should be a short paragraph. The todo list should be a bulleted list of actionable steps.
Your response must be a JSON object with two keys: 'plan' (a string) and 'todo' (an array of strings).`;

const planResponseSchema = {
    type: Type.OBJECT,
    properties: {
        plan: { type: Type.STRING },
        todo: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["plan", "todo"],
};

export interface PlanResponse {
    plan: string;
    todo: string[];
}

export const generatePlan = async (prompt: string): Promise<PlanResponse> => {
    const { ai, modelName } = getApiClient();
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                systemInstruction: planSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: planResponseSchema,
            },
        });
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Error generating plan:", error);
        throw new Error("Failed to generate a plan for your app.");
    }
};

const initialCodeSystemInstruction = `You are an expert web developer specializing in Svelte and Tailwind CSS.
Your task is to generate complete, production-ready code for a web application based on the user's prompt.
The user is in an online editor, so you must not presume they have a complex setup.
Your response must be a JSON object containing two keys: 'files' and 'thought'.
- The 'files' key should be an array of objects, where each object has a 'name' (e.g., 'App.svelte', 'styles.css', 'utils.js') and a 'content' (the code).
- The 'thought' key should contain a friendly, conversational message explaining what you've created, as if you were a helpful AI assistant.

IMPORTANT CONSTRAINTS:
1.  You must generate a root Svelte component named 'App.svelte' which will serve as the entry point for the application.
2.  You can create multiple Svelte components (.svelte files) and import them into each other or into 'App.svelte'.
3.  If you use Tailwind CSS, you must include the CDN script link within a <svelte:head> tag in App.svelte, like this: <svelte:head><script src="https://cdn.tailwindcss.com"></script></svelte:head>.
4.  Do not generate a 'main.js' or 'index.html' file. The preview environment handles mounting 'App.svelte'.
`;

const codeResponseSchema = {
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

export interface CodeGenerationResponse {
    files: CodeFile[];
    thought: string;
}

const handleApiError = (error: unknown): never => {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("Your Gemini API Key is not valid. Please check it in the Settings page.");
    }
    throw new Error("Failed to get a response from the AI. Please check your API Key and network connection.");
};

export const generateInitialCode = async (prompt: string): Promise<CodeGenerationResponse> => {
    const { ai, modelName } = getApiClient();
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                systemInstruction: initialCodeSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: codeResponseSchema,
            },
        });
        const parsedResponse = JSON.parse(response.text.trim());
        if (!parsedResponse.files || !parsedResponse.thought) {
            throw new Error("Invalid response structure from API");
        }
        return parsedResponse;
    } catch (error) {
        handleApiError(error);
    }
};

const modifyCodeSystemInstruction = `You are an expert web developer specializing in Svelte and Tailwind CSS. The user has provided you with the current set of code files for their project. Your task is to modify the code based on the user's request.
Ensure you return the **complete, updated content for all files**, not just the changed parts.
Your Svelte code must have a root component named 'App.svelte'. You can create and modify other '.svelte' files as needed.
If you use Tailwind CSS, ensure the CDN script tag is present in a <svelte:head> tag in App.svelte.

Your response must be a JSON object containing two keys: 'files' and 'thought'.
- The 'files' key should be an array of objects representing the full, updated state of all project files.
- The 'thought' key should contain a friendly, conversational message explaining the changes you've made.`;


export const modifyCode = async (prompt: string, existingFiles: CodeFile[]): Promise<CodeGenerationResponse> => {
    const { ai, modelName } = getApiClient();

    const fileContentString = existingFiles.map(file => 
        `// FILE: ${file.name}\n\n${file.content}\n\n// END FILE: ${file.name}`
    ).join('\n\n---\n\n');

    const fullPrompt = `Here is the current code:\n${fileContentString}\n\nNow, please apply this change: ${prompt}`;

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: fullPrompt,
            config: {
                systemInstruction: modifyCodeSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: codeResponseSchema,
            },
        });
        const parsedResponse = JSON.parse(response.text.trim());
        if (!parsedResponse.files || !parsedResponse.thought) {
            throw new Error("Invalid response structure from API");
        }
        return parsedResponse;
    } catch (error) {
        handleApiError(error);
    }
};