import { GoogleGenAI } from "@google/genai";
import { Settings } from "../types";

const createSystemInstruction = (settings: Settings): string => {
  let instruction = `You are an expert React engineer specializing in generating complete, multi-file React TypeScript applications.
Your task is to generate two things based on the user's prompt:
1.  A set of files for a standard React TypeScript project ('multiFileCode').
2.  A single, self-contained 'index.html' file for live browser preview ('previewFile').

You will stream your response as a sequence of JSON objects, each on a new line.
First, you MUST output a 'plan' object that lists all the file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["index.html", "src/App.tsx", "src/index.tsx"]}

Then, for each file intended for 'multiFileCode', you will output a 'file' object containing its path and content.
Example: {"type": "file", "file": {"path": "src/App.tsx", "content": "import React from 'react';"}}

Finally, you will output a 'previewFile' object for the single-file preview.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

  const hasSupabase = settings.supabaseUrl && settings.supabaseAnonKey;
  const hasStripe = settings.stripePublicKey && settings.stripeSecretKey;

  if (hasSupabase || hasStripe) {
    instruction += "\n\n--- USER-CONFIGURED INTEGRATIONS ---";
    instruction += "\nThe user has provided the following service credentials. If their prompt involves databases, authentication, or payments, use these exact values in the generated code. Do not use placeholders.";
    if (hasSupabase) {
      instruction += `\n- Supabase URL: ${settings.supabaseUrl}`;
      instruction += `\n- Supabase Anon Key: ${settings.supabaseAnonKey}`;
    }
    if (hasStripe) {
      instruction += `\n- Stripe Public Key: ${settings.stripePublicKey}`;
    }
    instruction += "\n------------------------------------";
  }
  return instruction;
};


export const generateAppStream = (
  prompt: string,
  settings: Settings,
  onUpdate: (update: any) => void
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = createSystemInstruction(settings);
      
      // By combining the system instruction with the user prompt, we ensure that the model
      // receives all context in a single block, which can resolve potential issues with
      // streaming responses while still adhering to API key usage guidelines.
      const fullPrompt = `${systemInstruction}\n\nBased on the instructions above, please fulfill the following user request:\n\n${prompt}`;

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
          reject(new Error("The configured Gemini API key is invalid. Please check your environment configuration."));
      } else {
          const detailedError = error instanceof Error ? error.message : String(error);
          reject(new Error(`Failed to get a valid response from the AI model. Please check your prompt and API key. Details: ${detailedError}`));
      }
    }
  });
};