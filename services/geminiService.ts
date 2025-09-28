import { GoogleGenAI, Type } from "@google/genai";
import { Settings, GeneratedFile, TechStack, AiGeneratedTable } from "../types";

const createSystemInstruction = (prompt: string, settings: Settings, isEditing: boolean, techStack: TechStack): string => {
  let instruction;
  
  if (techStack === 'html') {
      instruction = `You are an expert web developer specializing in generating single-file HTML applications.
You must stream your response as a sequence of JSON objects, each on a new line.
First, you MUST output a 'plan' object that lists the single file path: "index.html".
Example: {"type": "plan", "files": ["index.html"]}

Then, you will output one 'file' object for "index.html".
Example: {"type": "file", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Finally, you MUST output a 'previewFile' object with the exact same content.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

The generated HTML file MUST be self-contained. It must use Tailwind CSS via the CDN ('<script src="https://cdn.tailwindcss.com"></script>') in the <head>. Any JavaScript logic should be in a <script> tag at the end of the <body>.
Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;
          
      if (isEditing) {
         instruction += `\nYour task is to update the provided HTML file based on the user's request. You will receive the current file content, followed by the modification request. You MUST output the complete, updated HTML file.`;
      } else {
         instruction += `\nYour task is to generate a complete, single-file HTML application based on the user's prompt.`;
      }
  } else { // 'react'
      instruction = `You are an expert React engineer specializing in generating and modifying fully functional, production-ready React TypeScript applications.
The code you generate MUST be complete and implement all requested features. Do not use placeholder comments or mock data. The final application must be fully interactive and usable.

You must stream your response as a sequence of JSON objects, each on a new line.
First, you MUST output a 'plan' object that lists all the file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["index.html", "public/sw.js", "manifest.json", "src/App.tsx", "src/index.tsx"]}

Then, for each file intended for 'multiFileCode', you will output a 'file' object containing its path and content.
Example: {"type": "file", "file": {"path": "src/App.tsx", "content": "import React from 'react';"}}

Finally, you will output a 'previewFile' object for the single, self-contained 'index.html' file for live browser preview.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

      if (isEditing) {
        instruction += `\nYour task is to update the provided application files based on the user's request. You will receive the current application files as a JSON array, followed by the user's modification request. You MUST output the complete, updated set of files.`;
      } else {
        instruction += `\nYour task is to generate a complete, multi-file React TypeScript application based on the user's prompt.`;
      }

      instruction += `\n
--- PWA & CUSTOMIZATION INSTRUCTIONS ---
All applications you generate for the 'multiFileCode' part MUST be Progressive Web Apps (PWAs).
This requires the following file structure and content:
1. A 'manifest.json' file in the root directory.
   - It must include 'name', 'short_name', 'icons', 'start_url', 'display', 'background_color', and 'theme_color'.
   - For the 'icons' array, you MUST reference an icon at the path "/icon-192x192.png" (size 192x192) and "/icon-512x512.png" (size 512x512). The user will provide the actual image file.
2. A service worker file, 'public/sw.js'. This should implement a basic cache-first or network-first strategy for assets to enable offline functionality.
3. In 'index.html' (for multiFileCode):
   - Add '<link rel="manifest" href="/manifest.json">' in the <head>.
   - Add a script block to register the 'public/sw.js' service worker.
   - It MUST use ES modules and import maps to load React from the provided CDN.

--- PREVIEW FILE INSTRUCTIONS (React) ---
The 'previewFile' is a CRITICAL part of the response. It MUST be a single, self-contained 'index.html' file that can be rendered in an iframe. To achieve this, you MUST follow these steps precisely:
1.  Start with a standard HTML5 boilerplate.
2.  In the <head>, include Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.
3.  In the <head>, include React, ReactDOM, and Babel Standalone for in-browser JSX transformation. Use these exact script tags:
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
4.  The <body> MUST contain a single root element, e.g., <div id="root"></div>.
5.  At the end of the <body>, add a single <script type="text/babel"> tag.
6.  Inside this script tag, you MUST place all the necessary JavaScript code to run the application. This means combining the logic from all your generated '.tsx' files into this one script block.
    - Define all your React components using JSX syntax.
    - Ensure components are defined before they are used to avoid reference errors.
    - Remove any 'export' or 'import' statements between your components, as they are all in the same script scope.
7.  The script MUST conclude with the standard React rendering code:
    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
8.  Do NOT include service worker registration or a link to manifest.json in the previewFile.
`;
  }

  const hasSupabase = settings.supabaseUrl && settings.supabaseAnonKey;
  const hasStripe = settings.stripePublicKey && settings.stripeSecretKey;
  
  const promptLower = prompt.toLowerCase();
  const wantsSupabase = hasSupabase && /\b(supabase|database|auth|authentication|login|signup|users)\b/i.test(promptLower);
  const wantsStripe = hasStripe && /\b(stripe|payment|checkout|billing|subscription|price|buy|shop)\b/i.test(promptLower);


  if (wantsSupabase || wantsStripe) {
    instruction += "\n\n--- USER-CONFIGURED INTEGRATIONS ---";
    instruction += "\nThe user has provided the following service credentials and their prompt indicates they want to use them. Use these exact values in the generated code. Do not use placeholders.";
    if (wantsSupabase) {
      instruction += `\n- Supabase URL: ${settings.supabaseUrl}`;
      instruction += `\n- Supabase Anon Key: ${settings.supabaseAnonKey}`;
    }
    if (wantsStripe) {
      instruction += `\n- Stripe Public Key: ${settings.stripePublicKey}`;
    }
    instruction += "\n------------------------------------";
  }
  return instruction;
};


export const generateAppStream = (
  prompt: string,
  settings: Settings,
  onUpdate: (update: any) => void,
  techStack: TechStack,
  existingFiles?: GeneratedFile[],
  appName?: string,
  appIcon?: string, // base64 string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiKey = settings.geminiApiKey || process.env.API_KEY;
      if (!apiKey) {
        reject(new Error("Gemini API key is not configured. Please add it in the Settings page."));
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const isEditing = !!existingFiles && existingFiles.length > 0;
      const systemInstruction = createSystemInstruction(prompt, settings, isEditing, techStack);
      
      let fullPrompt: string;
      if (isEditing) {
          const filesJsonString = JSON.stringify(existingFiles);
          fullPrompt = `${systemInstruction}\n\nHere is the current application's code as a JSON array of file objects:\n${filesJsonString}\n\nNow, please apply this change based on the user's request:\n\n${prompt}`;
      } else {
          fullPrompt = `${systemInstruction}\n\nBased on the instructions above, please fulfill the following user request:\n\n${prompt}`;
      }
      
      if (appName || appIcon) {
        fullPrompt += `\n\n--- REQUIRED APP CUSTOMIZATION ---`;
        if (appName) {
          if (techStack === 'react') {
            fullPrompt += `\nThe user has specified the App Name MUST be: "${appName}". You must use this for the <title> in index.html, and the 'name' and 'short_name' properties in manifest.json.`;
          } else {
            fullPrompt += `\nThe user has specified the App Name MUST be: "${appName}". You must use this for the <title> in the HTML file.`;
          }
        }
         if (appIcon) {
            const iconTag = `<link rel="icon" href="${appIcon}">`;
            if (techStack === 'react') {
                fullPrompt += `\nFor the 'previewFile', you MUST include a favicon link in the <head> using this exact Base64 data URI: ${iconTag}. Do not modify the data URI.`;
            } else {
                fullPrompt += `\nFor the HTML file, you MUST include a favicon link in the <head> using this exact Base64 data URI: ${iconTag}. Do not modify the data URI.`;
            }
        }
        fullPrompt += `\n---------------------------------`;
      }


      const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.2,
        },
      });

      let buffer = '';
      for await (const chunk of responseStream) {
        buffer += chunk.text;
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.substring(0, newlineIndex).trim();
          buffer = buffer.substring(newlineIndex + 1);

          if (line) {
            const cleanedLine = line.replace(/^```json/, '').replace(/```$/, '').trim();
            if (cleanedLine.startsWith('{') && cleanedLine.endsWith('}')) {
                try {
                    const update = JSON.parse(cleanedLine);
                    onUpdate(update);
                } catch (e) {
                    console.warn('Failed to parse streaming JSON line:', cleanedLine, e);
                }
            }
          }
        }
      }

      if (buffer.trim()) {
        const finalLine = buffer.trim();
        const cleanedLine = finalLine.replace(/^```json/, '').replace(/```$/, '').trim();
         if (cleanedLine.startsWith('{') && cleanedLine.endsWith('}')) {
           try {
              const update = JSON.parse(cleanedLine);
              onUpdate(update);
            } catch (e) {
              console.warn('Failed to parse final streaming JSON line:', cleanedLine, e);
            }
        }
      }
      resolve();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      if (error instanceof Error && error.message.includes('API key not valid')) {
          reject(new Error("The configured Gemini API key is invalid. Please check it in the Settings page or your environment configuration."));
      } else {
          const detailedError = error instanceof Error ? error.message : String(error);
          reject(new Error(`Failed to get a valid response from the AI model. Please check your prompt and API key. Details: ${detailedError}`));
      }
    }
  });
};

export const generateIdeaStream = (
  prompt: string,
  settings: Settings,
  onUpdate: (chunk: string) => void,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiKey = settings.geminiApiKey || process.env.API_KEY;
      if (!apiKey) {
        reject(new Error("Gemini API key is not configured."));
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const fullPrompt = `You are a creative and helpful AI assistant for a software developer. Your task is to brainstorm ideas for applications. Provide suggestions, refine concepts, and offer feedback. Do not generate code, file structures, or JSON. Respond in a conversational, helpful tone.

User's request: "${prompt}"`;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.7, // Higher temperature for more creative responses
        },
      });

      for await (const chunk of responseStream) {
        onUpdate(chunk.text);
      }
      
      resolve();
    } catch (error) {
      console.error("Error calling Gemini API for idea generation:", error);
      const detailedError = error instanceof Error ? error.message : String(error);
      reject(new Error(`Failed to get a response from the AI. Details: ${detailedError}`));
    }
  });
};

export const generateSchemaFromPrompt = async (prompt: string, settings: Settings): Promise<AiGeneratedTable> => {
  const apiKey = settings.geminiApiKey || process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add it in the Settings page.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = `You are an expert database architect. The user will describe a database table. Your task is to generate a valid JSON object representing that table's schema. You must adhere to the provided JSON schema for your response.
- The 'dataType' field for each column MUST be one of the following exact string values: 'uuid', 'text', 'varchar', 'int4', 'int8', 'float8', 'boolean', 'timestamp', 'timestamptz'. Do not use any other values.
- For primary keys, it's conventional to use the 'uuid' type and a 'defaultValue' of 'uuid_generate_v4()'.
- For creation timestamps (e.g., 'created_at'), use 'timestamptz' and a 'defaultValue' of 'now()'.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemInstruction}\n\nUser request: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'The name of the table, plural and in snake_case.' },
            columns: {
              type: Type.ARRAY,
              description: 'The columns of the table.',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "The column name in snake_case." },
                  dataType: { type: Type.STRING, description: "One of: 'uuid', 'text', 'varchar', 'int4', 'int8', 'float8', 'boolean', 'timestamp', 'timestamptz'."},
                  defaultValue: { type: Type.STRING, description: 'Optional default value (e.g., now() or a specific value).' },
                  isPrimaryKey: { type: Type.BOOLEAN },
                  isUnique: { type: Type.BOOLEAN },
                  isNullable: { type: Type.BOOLEAN },
                },
                required: ['name', 'dataType', 'isPrimaryKey', 'isUnique', 'isNullable']
              }
            }
          },
          required: ['name', 'columns']
        },
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);
    return parsedJson as AiGeneratedTable;
  } catch (error) {
    console.error("Error calling Gemini API for schema generation:", error);
    const detailedError = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate schema from AI. Details: ${detailedError}`);
  }
};
