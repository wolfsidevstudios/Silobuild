import { GoogleGenAI } from "@google/genai";
import { Settings, GeneratedFile } from "../types";

const createSystemInstruction = (prompt: string, settings: Settings, isEditing: boolean): string => {
  let instruction;
  const baseInstruction = `You are an expert React engineer specializing in generating and modifying React TypeScript applications.
You must stream your response as a sequence of JSON objects, each on a new line.
First, you MUST output a 'plan' object that lists all the file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["index.html", "public/sw.js", "manifest.json", "src/App.tsx", "src/index.tsx"]}

Then, for each file intended for 'multiFileCode', you will output a 'file' object containing its path and content.
Example: {"type": "file", "file": {"path": "src/App.tsx", "content": "import React from 'react';"}}

Finally, you will output a 'previewFile' object for the single, self-contained 'index.html' file for live browser preview.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

  if (isEditing) {
    instruction = `${baseInstruction}\nYour task is to update the provided application files based on the user's request. You will receive the current application files as a JSON array, followed by the user's modification request. You MUST output the complete, updated set of files.`;
  } else {
    instruction = `${baseInstruction}\nYour task is to generate a complete, multi-file React TypeScript application based on the user's prompt.`;
  }

  instruction += `\n
--- PWA & CUSTOMIZATION INSTRUCTIONS ---
All applications you generate MUST be Progressive Web Apps (PWAs).
This requires the following file structure and content:
1. A 'manifest.json' file in the root directory.
   - It must include 'name', 'short_name', 'icons', 'start_url', 'display', 'background_color', and 'theme_color'.
   - For the 'icons' array, you MUST reference an icon at the path "/icon-192x192.png" (size 192x192) and "/icon-512x512.png" (size 512x512). The user will provide the actual image file.
2. A service worker file, 'public/sw.js'. This should implement a basic cache-first or network-first strategy for assets to enable offline functionality.
3. In 'index.html':
   - Add '<link rel="manifest" href="/manifest.json">' in the <head>.
   - Add a script block to register the 'public/sw.js' service worker.

When generating the 'previewFile' (a single self-contained index.html):
- It must NOT link to an external manifest.json or register a service worker.
- It SHOULD include PWA-like meta tags directly in the <head> for a better experience (e.g., theme-color, mobile-web-app-capable).
`;

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
      const systemInstruction = createSystemInstruction(prompt, settings, isEditing);
      
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
            fullPrompt += `\nThe user has specified the App Name MUST be: "${appName}". You must use this for the <title> in index.html, and the 'name' and 'short_name' properties in manifest.json.`;
        }
         if (appIcon) {
            fullPrompt += `\nFor the 'previewFile', you MUST include a favicon link in the <head> using this exact Base64 data URI: <link rel="icon" href="${appIcon}">. Do not modify the data URI.`;
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
