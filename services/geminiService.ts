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
Your response must be a JSON object containing two keys: 'files' and 'thought'.
- The 'files' key should be an array of objects, where each object has a 'name' (e.g., 'index.html', 'style.css', 'script.js') and a 'content' (the code).
- The 'thought' key should contain a friendly, conversational message explaining what you've created, as if you were a helpful AI assistant.

IMPORTANT CONSTRAINTS:
1.  You must generate a root HTML file named 'index.html' which will serve as the entry point for the application.
2.  All CSS should be in a 'style.css' file and all JavaScript in a 'script.js' file. You must link them correctly in 'index.html' using <link rel="stylesheet" href="style.css"> and <script src="script.js" defer></script>.
3.  You must create complete, user-friendly, and modern web applications.
4.  AESTHETIC GUIDELINES: For the initial version, you must follow a minimalist and clean aesthetic.
    - The <body> background must be either pure white (#FFFFFF) or pure black (#000000).
    - All buttons must be pill-shaped (e.g., border-radius: 9999px;).
    - Buttons must have high contrast with the background (black buttons on white, white buttons on black).
    - Ensure your HTML is semantically correct and your CSS is well-organized. Use modern features like Flexbox or Grid for layout.
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

export interface CodeModificationResponse extends CodeGenerationResponse {
    plan: string;
    todo: string[];
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

const modifyCodeSystemInstruction = `You are an expert web developer specializing in modern, clean HTML, CSS, and JavaScript. You function as a meticulous senior engineer. The user has provided you with the current set of code files for their project. Your task is to modify the code based on the user's request, ensuring you maintain the integrity and functionality of the existing application.

**Your primary task is to apply the user's requested change to the provided code.**

**Core Directives:**
1.  **Preserve Existing Functionality:** You MUST NOT remove or break existing features unless the user explicitly asks for their removal or modification. Your goal is to cleanly integrate new changes with the existing codebase.
2.  **Maintain Code Quality:** Write clean, well-organized, and readable code. Do not generate messy or incomplete code.
3.  **Return Complete Files:** You must return the **full, final content for every single file in the project**, even if no changes were made to a specific file. This is critical. Do not return diffs or partial code snippets.

**Response Format:**
Your response MUST be a JSON object with four keys:
- 'plan': A short, high-level plan outlining your approach to the changes.
- 'todo': A detailed, step-by-step to-do list for implementing the plan.
- 'files': An array of objects representing the full, updated state of all project files. Each object must have 'name' and 'content' keys.
- 'thought': A concise and organized summary of the changes you've made. It should be a short, friendly sentence followed by a bulleted list of the key modifications. Keep it brief and easy to read.`;

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