import { GoogleGenAI, Type } from "@google/genai";
import { CodeFile } from '../types';

// FIX: Updated to align with API key and model usage guidelines.
const getApiClient = () => {
    // Per coding guidelines, API key must be obtained from process.env.API_KEY.
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        throw new Error("Gemini API Key not found. Please ensure process.env.API_KEY is set.");
    }
    
    // Per coding guidelines, only 'gemini-2.5-flash' should be used for general text tasks.
    // Model selection from UI/localStorage is not permitted.
    const modelName = 'gemini-2.5-flash';
    
    const ai = new GoogleGenAI({ apiKey });
    return { ai, modelName };
}

const planSystemInstruction = `You are a principal software architect. Based on the user's prompt, create a high-level plan and a detailed to-do list for building the application using modern HTML, CSS, and JavaScript. The plan should be a short paragraph. The todo list should be a bulleted list of actionable steps that includes creating the HTML structure, CSS styling (following the modern aesthetic of black/white background and pill buttons), and JavaScript functionality.
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

const initialCodeSystemInstruction = `You are an expert web developer specializing in modern HTML, CSS, and JavaScript.
Your task is to generate complete, production-ready code for a web application based on the user's prompt.
The user is in an online editor, so you must not presume they have a complex setup.
Your response must be a JSON object containing keys: 'files', 'thought', and optionally 'requestsApiKey'.
- 'files': An array of objects, where each object has 'name' and 'content'.
- 'thought': A friendly, conversational message explaining what you've created.
- 'requestsApiKey': A boolean set to true ONLY if you add an AI feature requiring an API key.

IMPORTANT CONSTRAINTS:
1.  Generate a root 'index.html', a 'style.css', and a 'script.js'. Link them correctly.
2.  Create complete, user-friendly, and modern web applications.
3.  AESTHETIC GUIDELINES: The initial version must follow a minimalist aesthetic (black/white background, pill-shaped buttons with high contrast).
4.  AI FEATURE GENERATION:
    If the user's prompt asks for an AI feature (e.g., 'AI chatbot', 'text summarizer'), you MUST:
    a. In your JSON response, set the 'requestsApiKey' flag to true.
    b. In 'script.js', generate client-side JavaScript to call the Google Gemini API. Assume 'import { GoogleGenAI } from "@google/genai";' will work due to an existing importmap.
    c. The JS code MUST get the API key from a placeholder constant: \`const GEMINI_API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";\`. Do NOT add a UI for the key in the generated app.
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
        requestsApiKey: { type: Type.BOOLEAN },
    },
    required: ["files", "thought"],
};

export interface CodeGenerationResponse {
    files: CodeFile[];
    thought: string;
    requestsApiKey?: boolean;
}

export interface CodeModificationResponse extends CodeGenerationResponse {
    plan: string;
    todo: string[];
}

const handleApiError = (error: unknown): never => {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("Your Gemini API Key is not valid. Please check it in the Settings page.");
    }
    // FIX: Updated error message to reflect API key source.
    throw new Error("Failed to get a response from the AI. Please check your network connection and ensure the API key is correctly configured in the environment.");
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

const modifyCodeSystemInstruction = `You are an expert web developer specializing in modern, clean HTML, CSS, and JavaScript. You function as a meticulous senior engineer. The user has provided you with the current set of code files for their project. Your task is to modify the code based on the user's request, ensuring you maintain the integrity and functionality of the existing application.

**Core Directives:**
1.  **Preserve Existing Functionality:** You MUST NOT remove or break existing features unless explicitly asked.
2.  **Maintain Code Quality:** Write clean, well-organized, and readable code.
3.  **Return Complete Files:** You must return the **full, final content for every single file**, even if unchanged.

**Response Format:**
Your response MUST be a JSON object with keys: 'plan', 'todo', 'files', 'thought', and optionally 'requestsApiKey'.
- 'plan': A short, high-level plan for the changes.
- 'todo': A detailed, step-by-step to-do list.
- 'files': An array of objects for all updated project files ('name' and 'content').
- 'thought': A concise, bulleted summary of the changes made.
- 'requestsApiKey': A boolean set to true ONLY if you add an AI feature requiring an API key.

**AI FEATURE GENERATION:**
If the user's request is to add an AI feature (e.g., 'add an AI chatbot'):
a. In your JSON response, set the 'requestsApiKey' flag to true.
b. In 'script.js', add the necessary client-side code to call the Gemini API. Assume 'import { GoogleGenAI } from "@google/genai";' will work due to an existing importmap.
c. The JS code MUST get the API key from a placeholder constant: \`const GEMINI_API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";\`. Do NOT add a UI for the key in the generated app.
`;

const modifyCodeResponseSchema = {
    type: Type.OBJECT,
    properties: {
        plan: { type: Type.STRING },
        todo: { type: Type.ARRAY, items: { type: Type.STRING } },
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
        requestsApiKey: { type: Type.BOOLEAN },
    },
    required: ["plan", "todo", "files", "thought"],
};

export const modifyCode = async (prompt: string, existingFiles: CodeFile[]): Promise<CodeModificationResponse> => {
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
                responseSchema: modifyCodeResponseSchema,
            },
        });
        const parsedResponse = JSON.parse(response.text.trim());
        if (!parsedResponse.files || !parsedResponse.thought || !parsedResponse.plan || !parsedResponse.todo) {
            throw new Error("Invalid response structure from API");
        }
        return parsedResponse;
    } catch (error) {
        handleApiError(error);
    }
};