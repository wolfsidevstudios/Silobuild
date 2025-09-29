import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Settings, GeneratedFile, TechStack, AiGeneratedTable, AgentConfig } from "../types";

const createSystemInstruction = (prompt: string, settings: Settings, isEditing: boolean, techStack: TechStack): string => {
  const WATERMARK_BADGE_HTML = `<div style="position: fixed; bottom: 16px; right: 16px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 9999px; font-size: 12px; color: #333; border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;">Built with ⚡️ Silo</div>`;

  const VISUAL_APP_WATERMARK_INSTRUCTION = `
--- WATERMARK REQUIREMENT ---
ALL generated visual applications (React, Vue, Svelte, HTML) MUST include a "Built with Silo" watermark badge.
- The badge MUST be a \`div\` tag.
- It must be positioned in the bottom-right corner of the viewport.
- You MUST use this exact HTML for the badge. It is self-contained and works with Tailwind CSS.
- For multi-file apps, add it to the main layout component (e.g., App.tsx, App.vue, App.svelte) so it's visible on all pages.
- For ALL preview files and single-file HTML apps, add it just before the closing </body> tag.

Badge HTML:
${WATERMARK_BADGE_HTML}
`;

  const NODEJS_WATERMARK_INSTRUCTION = `
--- WATERMARK REQUIREMENT (README.md) ---
The generated README.md file MUST end with the following line, separated by a horizontal rule:

---
*Built with Silo Build*
`;

  let instruction;
  
  if (techStack === 'html') {
      instruction = `You are an expert web developer specializing in generating single-file HTML applications.
You must stream your response as a sequence of JSON objects, each on a new line.

First, you MUST output a 'summary' object with a brief, user-friendly description of the app you are about to generate (or the changes you are making), outlining the key features in a bulleted list.
Example: {"type": "summary", "summary": "- A simple landing page\\n- Includes a header, feature section, and footer."}

Second, you MUST output a 'plan' object that lists the single file path: "index.html".
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
      instruction += VISUAL_APP_WATERMARK_INSTRUCTION;
  } else if (techStack === 'vue') {
    instruction = `You are an expert Vue.js engineer specializing in generating and modifying fully functional, production-ready Vue 3 applications with TypeScript and the Composition API.
The code you generate MUST be complete and implement all requested features. Do not use placeholder comments or mock data.

You must stream your response as a sequence of JSON objects, each on a new line.

First, you MUST output a 'summary' object with a brief, user-friendly description of the app you are about to generate (or the changes you are making), outlining the key features in a bulleted list.
Example: {"type": "summary", "summary": "- User authentication with login/logout\\n- A dashboard page to display user data."}

Second, you MUST output a 'plan' object listing all file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["index.html", "src/main.ts", "src/App.vue", "src/components/HelloWorld.vue"]}

Then, for each file, output a 'file' object.
Example: {"type": "file", "file": {"path": "src/App.vue", "content": "<template>...</template>"}}

Finally, output a 'previewFile' object for the single, self-contained 'index.html' file for live browser preview.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

      if (isEditing) {
        instruction += `\nYour task is to update the provided Vue application files based on the user's request. You will receive the current application files as JSON, followed by the modification request. You MUST output the complete, updated set of files.`;
      } else {
        instruction += `\nYour task is to generate a complete, multi-file Vue 3 TypeScript application based on the user's prompt.`;
      }
      
      instruction += `\n
--- PWA & CUSTOMIZATION INSTRUCTIONS ---
All applications you generate for 'multiFileCode' MUST be Progressive Web Apps (PWAs), following a standard Vite project structure.
This requires: 'manifest.json', 'public/sw.js', and PWA registration in 'index.html'.

--- PREVIEW FILE INSTRUCTIONS (Vue) ---
The 'previewFile' is CRITICAL. It MUST be a single, self-contained 'index.html' that can render a Vue application in an iframe.
1. Start with HTML5 boilerplate.
2. In <head>, include Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>.
3. In <head>, include these scripts for Vue 3 and the vue3-sfc-loader:
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   <script src="https://unpkg.com/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
4. The <body> MUST contain a single root element, e.g., <div id="app"></div>.
5. At the end of the <body>, add a <script type="module"> tag.
6. Inside this script, configure the sfc-loader and mount the app. All .vue components must be defined as string literals inside the script.
   const options = {
     moduleCache: { vue: Vue },
     async getFile(url) {
       if (url === '/App.vue') return \`
         <template>
           <h1>Hello from App.vue!</h1>
           <HelloWorld />
         </template>
         <script setup>
           import HelloWorld from './components/HelloWorld.vue';
         </script>
       \`;
       if (url === '/components/HelloWorld.vue') return \`
         <template><h2>Hello, World!</h2></template>
       \`;
       return;
     },
     addStyle(textContent) {
       const style = Object.assign(document.createElement('style'), { textContent });
       document.head.appendChild(style);
     },
   };
   const { loadModule } = window['vue3-sfc-loader'];
   const app = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/App.vue', options)));
   app.mount('#app');
7. Do NOT include PWA features (service worker, manifest) in the previewFile.
`;
    instruction += VISUAL_APP_WATERMARK_INSTRUCTION;

  } else if (techStack === 'svelte') {
    instruction = `You are an expert Svelte engineer specializing in generating and modifying fully functional, production-ready Svelte 5 applications with TypeScript.
The code you generate MUST be complete and implement all requested features. Do not use placeholder comments or mock data.

You must stream your response as a sequence of JSON objects, each on a new line.

First, you MUST output a 'summary' object with a brief, user-friendly description of the app you are about to generate (or the changes you are making), outlining the key features in a bulleted list.
Example: {"type": "summary", "summary": "- Interactive counter component\\n- State management with Svelte 5 runes."}

Second, you MUST output a 'plan' object listing all file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["index.html", "src/main.ts", "src/App.svelte", "src/lib/Counter.svelte"]}

Then, for each file, output a 'file' object.
Example: {"type": "file", "file": {"path": "src/App.svelte", "content": "<script lang='ts'>...</script><main>...</main>"}}

Finally, output a 'previewFile' object for the single, self-contained 'index.html' file for live browser preview.
Example: {"type": "previewFile", "file": {"path": "index.html", "content": "<!DOCTYPE html>..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

    if (isEditing) {
        instruction += `\nYour task is to update the provided Svelte application files based on the user's request. You will receive the current application files as JSON, followed by the modification request. You MUST output the complete, updated set of files.`;
    } else {
        instruction += `\nYour task is to generate a complete, multi-file Svelte 5 TypeScript application based on the user's prompt.`;
    }

    instruction += `\n
--- PWA & CUSTOMIZATION INSTRUCTIONS ---
All applications you generate for 'multiFileCode' MUST be Progressive Web Apps (PWAs), following a standard Vite project structure for Svelte.
This requires: 'manifest.json', 'public/sw.js', and PWA registration in 'index.html'.

--- PREVIEW FILE INSTRUCTIONS (Svelte) ---
The 'previewFile' is CRITICAL. It MUST be a single, self-contained 'index.html'. Because Svelte is a compiled language, you CANNOT use Svelte syntax directly in the preview file.
1. Start with HTML5 boilerplate.
2. In <head>, include Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>.
3. The <body> MUST contain a single root element, e.g., <div id="app"></div>.
4. At the end of the <body>, add a single <script> tag (NOT type="module").
5. Inside this script, you MUST write plain, vanilla JavaScript that manually creates and manipulates DOM elements to render the application. This script should contain all the logic from your Svelte components, but pre-compiled into standard JavaScript. For example, instead of Svelte's \`{#if condition}\`, use a JavaScript \`if\` statement that appends elements to the DOM.
   Example of compiled logic:
   function mountApp(target) {
     const h1 = document.createElement('h1');
     h1.textContent = 'Hello World';
     h1.className = 'text-2xl font-bold';
     target.appendChild(h1);
     
     let count = 0;
     const button = document.createElement('button');
     button.textContent = \`Clicked \${count} times\`;
     button.onclick = () => {
       count++;
       button.textContent = \`Clicked \${count} times\`;
     };
     target.appendChild(button);
   }
   mountApp(document.getElementById('app'));
6. Do NOT include any Svelte-specific syntax like \`$: \`, \`{#if}\`, or component imports in the previewFile's script.
7. Do NOT include PWA features (service worker, manifest) in the previewFile.
`;
    instruction += VISUAL_APP_WATERMARK_INSTRUCTION;

  } else if (techStack === 'nodejs') {
      instruction = `You are an expert backend developer specializing in generating simple and functional Node.js + Express.js applications.
The code you generate MUST be complete and ready to run. Do not use placeholder comments.

You must stream your response as a sequence of JSON objects, each on a new line.

First, you MUST output a 'summary' object with a brief, user-friendly description of the API you are about to generate (or the changes you are making), outlining the key endpoints in a bulleted list.
Example: {"type": "summary", "summary": "- GET /api/items to fetch all items\\n- POST /api/items to create a new item."}

Second, you MUST output a 'plan' object listing all file paths for the 'multiFileCode' part.
Example: {"type": "plan", "files": ["package.json", "index.js"]}

Then, for each file, output a 'file' object.
Example: {"type": "file", "file": {"path": "index.js", "content": "import express from 'express';"}}

Finally, you will output a 'previewFile' object containing a 'README.md' file that explains how to run the project.
Example: {"type": "previewFile", "file": {"path": "README.md", "content": "# My API\\n\\nTo run this project:..."}}

Ensure each JSON object is a single, complete line. Do not wrap your response in markdown backticks.`;

      if (isEditing) {
          instruction += `\nYour task is to update the provided Node.js application files based on the user's request. You will receive the current application files as JSON, followed by the modification request. You MUST output the complete, updated set of files.`;
      } else {
          instruction += `\nYour task is to generate a complete, multi-file Node.js Express application based on the user's prompt.`;
      }

      instruction += `\n
--- FILE CONTENT INSTRUCTIONS (Node.js) ---
1.  **package.json**:
    -   Must include 'express' and 'cors' as dependencies.
    -   Must define a 'main' entry point (e.g., "index.js").
    -   Must include a 'start' script in the 'scripts' section (e.g., "node index.js").
    -   Must set "type" to "module" for ES module syntax (import/export).

2.  **index.js** (or your main file):
    -   Use ES module syntax (e.g., \`import express from 'express';\`).
    -   Import and use the 'cors' middleware: \`app.use(cors())\`.
    -   Use the express.json() middleware for parsing JSON bodies: \`app.use(express.json())\`.
    -   Define at least one simple GET route (e.g., '/api/hello') that returns a JSON response.
    -   The server must listen on a port. Use \`process.env.PORT || 3001\`.

3.  **README.md** (for the previewFile):
    -   This file is CRITICAL and acts as the preview.
    -   Provide clear, simple instructions on how to set up and run the server.
    -   Must include these steps:
        1.  \`npm install\` to install dependencies.
        2.  \`npm start\` to run the server.
    -   Include an example of how to test the API, for example, using \`curl http://localhost:3001/api/hello\`.
`;
      instruction += NODEJS_WATERMARK_INSTRUCTION;
  } else { // 'react'
      instruction = `You are an expert React engineer specializing in generating and modifying fully functional, production-ready React TypeScript applications.
The code you generate MUST be complete and implement all requested features. Do not use placeholder comments or mock data. The final application must be fully interactive and usable.

You must stream your response as a sequence of JSON objects, each on a new line.

First, you MUST output a 'summary' object with a brief, user-friendly description of the app you are about to generate (or the changes you are making), outlining the key features in a bulleted list.
Example: {"type": "summary", "summary": "- Pomodoro Timer with 25-minute work and 5-minute break cycles.\\n- Start, Pause, and Reset controls."}

Second, you MUST output a 'plan' object that lists all the file paths for the 'multiFileCode' part.
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
The 'previewFile' is CRITICAL. It MUST be a single, self-contained 'index.html' compatible with React 19, which is ESM-only.
To achieve this, you MUST follow these steps precisely:
1.  Start with a standard HTML5 boilerplate.
2.  In the <head>, include Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.
3.  In the <head>, you MUST add an import map script tag to handle ESM imports for React 19. Use these exact contents:
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@19.0.0-rc.0",
        "react-dom/client": "https://esm.sh/react-dom@19.0.0-rc.0/client"
      }
    }
    </script>
4.  The <body> MUST contain a single root element, e.g., <div id="root"></div>.
5.  At the end of the <body>, add the Babel Standalone script: <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>.
6.  Immediately after the Babel script, add the main application script tag. It MUST be \`<script type="text/babel" data-type="module">\`. The 'data-type="module"' attribute is ESSENTIAL.
7.  Inside this script tag:
    a.  Start with the necessary imports:
        import React from 'react';
        import ReactDOM from 'react-dom/client';
    b.  Combine the logic from all your generated '.tsx' files into this one script block.
    c.  Define all React components using TSX syntax. Ensure components are defined before they are used.
    d.  You MUST remove any 'export' statements and any 'import' statements between your components, as they are all in the same script scope.
    e.  The script MUST conclude with the standard React 19 rendering code:
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
8.  Do NOT include service worker registration or a link to manifest.json in the previewFile.
`;
    instruction += VISUAL_APP_WATERMARK_INSTRUCTION;
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

export const generateAgentChatResponse = async (
  history: any[],
  agentConfig: AgentConfig,
  settings: Settings
): Promise<GenerateContentResponse> => {
  const apiKey = agentConfig.geminiApiKey || settings.geminiApiKey || process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured in agent settings or global settings.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
      config: {
        systemInstruction: agentConfig.systemInstruction,
        tools: agentConfig.tools.length > 0 ? agentConfig.tools : undefined,
      },
  });

  return response;
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

export const generateHelpBotResponseStream = (
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
      
      const systemInstruction = `You are a helpful and friendly AI assistant for "Silo Build", an application that lets users generate web apps from text prompts.
Your role is to answer user questions about how to use the app, its features, and troubleshoot common issues.

Key Features of Silo Build:
- Users can generate multi-file applications (React, Vue, Svelte, Node.js) or single-file HTML apps.
- It has a chat interface for prompting, a code editor, and a live preview.
- Users can save projects, which are stored in their browser's local storage.
- Users can connect their own API keys (Gemini, Vercel, GitHub, Supabase, Stripe) in the Settings page. Keys are also stored locally.
- It can integrate services like Supabase or Stripe if the user's prompt mentions it and keys are provided.
- Projects can be downloaded as a ZIP, deployed to Vercel (simulation), or pushed to a new GitHub repo.
- There is a "Studio" mode for manual coding with a component library.
- There is an "Agent Builder" for creating custom conversational AI agents.

Your tone should be encouraging and clear. Do not generate code unless the user explicitly asks for a small example snippet. Do not make up features that don't exist.
Keep your answers concise and easy to understand.`;

      const fullPrompt = `${systemInstruction}\n\nHere is the user's question: "${prompt}"`;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.5,
        },
      });

      for await (const chunk of responseStream) {
        onUpdate(chunk.text);
      }
      
      resolve();
    } catch (error) {
      console.error("Error calling Gemini API for help bot:", error);
      const detailedError = error instanceof Error ? error.message : String(error);
      reject(new Error(`Failed to get a response from the AI. Details: ${detailedError}`));
    }
  });
};