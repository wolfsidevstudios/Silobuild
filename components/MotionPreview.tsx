import React, { useState, useEffect, useMemo } from 'react';
import { ChatIcon, CodeIcon, EyeIcon, FileIcon } from './icons';

const PromptTypingEffect: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        onComplete();
      }
    }, 40);
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <p>{displayedText}<span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span></p>;
};

const syntaxHighlight = (code: string) => {
  return code
    .replace(/(\bimport\b|\bfrom\b|\breturn\b|\bexport\b|\bdefault\b|\bconst\b)/g, '<span class="text-pink-400">$1</span>')
    .replace(/(\{|\}|\(|\)|\[|\]|;)/g, '<span class="text-gray-500">$1</span>')
    .replace(/(\buseState\b|\buseEffect\b)/g, '<span class="text-yellow-300">$1</span>')
    .replace(/(\<[a-zA-Z0-9]+|\<\/[a-zA-Z0-9]+>|\/>)/g, (match) => {
        return match.replace(/[a-zA-Z0-9]+/g, '<span class="text-sky-300">$&</span>');
    })
    .replace(/(\bclassName\b|\bstyle\b)/g, '<span class="text-teal-300">$1</span>')
    .replace(/(\".*?\")/g, '<span class="text-green-300">$1</span>');
};

const CodeTypingEffect: React.FC<{ code: string; onComplete: () => void, isVisible: boolean }> = ({ code, onComplete, isVisible }) => {
    const [displayedCode, setDisplayedCode] = useState('');
    const highlightedCode = useMemo(() => syntaxHighlight(code), [code]);

    useEffect(() => {
        if (!isVisible) {
            setDisplayedCode('');
            return;
        }
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < highlightedCode.length) {
                i += Math.floor(Math.random() * 5) + 3; // Type in chunks for speed
                setDisplayedCode(highlightedCode.slice(0, i));
            } else {
                setDisplayedCode(highlightedCode);
                clearInterval(intervalId);
                onComplete();
            }
        }, 10);
        return () => clearInterval(intervalId);
    }, [highlightedCode, onComplete, isVisible]);
    
    return <div dangerouslySetInnerHTML={{ __html: displayedCode + '<span class="inline-block w-0.5 h-4 bg-white animate-pulse ml-1"></span>' }} />;
};

const codeStep1 = `import React, { useState } from 'react';

const App = () => {
  return (
    <div className="pomodoro-container">
      <div className="timer-display">
        25:00
      </div>
      <button className="start-btn">
        START
      </button>
    </div>
  );
};
export default App;`;

const previewStep1 = (
  <div className="w-full h-full bg-red-500 flex flex-col items-center justify-center p-4 text-white font-sans select-none">
    <div className="text-6xl md:text-8xl font-bold tracking-tighter">
      25:00
    </div>
    <button className="mt-6 bg-white/20 px-12 py-3 rounded-md text-xl font-semibold backdrop-blur-sm border border-white/20">
      START
    </button>
  </div>
);

const codeStep2 = `import React, { useState } from 'react';

const App = () => {
  return (
    <div className="pomodoro-container">
      <div className="timer-display">
        25:00
      </div>
      <div className="controls">
        <button className="start-btn">START</button>
        <button className="reset-btn">RESET</button>
      </div>
      <div className="task-list">
        <h3>My Tasks</h3>
        <ul>
          <li>- Design new UI</li>
          <li>- Build prototype</li>
        </ul>
      </div>
    </div>
  );
};
export default App;`;

const previewStep2 = (
  <div className="w-full h-full bg-red-500 flex flex-col items-center justify-center p-4 text-white font-sans select-none">
    <div className="text-6xl md:text-8xl font-bold tracking-tighter">
      25:00
    </div>
    <div className="flex gap-4 mt-6">
      <button className="bg-white/20 px-8 py-2 rounded-md font-semibold backdrop-blur-sm border border-white/20">
        START
      </button>
      <button className="bg-transparent px-8 py-2 rounded-md font-semibold border border-white/20">
        RESET
      </button>
    </div>
    <div className="mt-8 bg-white/10 p-4 rounded-lg w-full max-w-xs text-left backdrop-blur-sm">
        <h3 className="font-bold text-sm mb-2">My Tasks</h3>
        <ul className="text-sm opacity-80 space-y-1">
            <li>- Design new UI</li>
            <li>- Build prototype</li>
        </ul>
    </div>
  </div>
);


const animationSteps = [
  { prompt: "Create a simple pomodoro timer", code: codeStep1, preview: previewStep1 },
  { prompt: "Add reset button and a task list", code: codeStep2, preview: previewStep2 },
];

type Phase = 'prompting' | 'thinking' | 'coding' | 'rendering' | 'paused';


export const MotionPreview: React.FC = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('prompting');

    const currentStep = animationSteps[stepIndex];

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (phase === 'thinking') {
            timer = setTimeout(() => setPhase('coding'), 1000);
        } else if (phase === 'rendering') {
            timer = setTimeout(() => setPhase('paused'), 500);
        } else if (phase === 'paused') {
            timer = setTimeout(() => {
                setStepIndex(prev => (prev + 1) % animationSteps.length);
                setPhase('prompting');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl mx-auto backdrop-blur-sm min-h-[450px]">
            <div className="h-8 bg-gray-800/80 flex items-center px-3">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                {/* Panel 1: Chat */}
                <div className="flex flex-col border-r border-white/10 bg-black/20">
                    <div className="flex items-center gap-2 p-2 border-b border-white/10 text-sm text-gray-300"><ChatIcon className="w-4 h-4" /> Chat</div>
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-end min-h-[150px]">
                        <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs self-end rounded-br-none text-sm min-h-[40px]">
                            {phase === 'prompting' ? <PromptTypingEffect text={currentStep.prompt} onComplete={() => setPhase('thinking')} /> : <p>{currentStep.prompt}</p>}
                        </div>
                        {phase !== 'prompting' && (
                             <div className="bg-gray-700 text-gray-300 rounded-lg p-3 max-w-xs self-start rounded-bl-none text-sm">
                                {phase === 'thinking' ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                ) : (
                                    <p>Sure, here is the code.</p>
                                )}
                             </div>
                        )}
                    </div>
                </div>

                {/* Panel 2: Code */}
                <div className="flex flex-col border-r border-white/10 bg-black/30">
                    <div className="flex items-center gap-2 p-2 border-b border-white/10 text-sm text-gray-300"><CodeIcon className="w-4 h-4" /> Code</div>
                    <div className="p-4 font-mono text-xs text-gray-300 flex-1 min-h-[250px] overflow-auto">
                        <CodeTypingEffect code={currentStep.code} onComplete={() => setPhase('rendering')} isVisible={phase === 'coding'} />
                    </div>
                </div>

                {/* Panel 3: Preview */}
                 <div className="flex flex-col bg-gray-900">
                    <div className="flex items-center gap-2 p-2 border-b border-white/10 text-sm text-gray-300"><EyeIcon className="w-4 h-4" /> Preview</div>
                    <div className="p-2 flex-1 relative">
                        <div className={`w-full h-full rounded-md overflow-hidden transition-opacity duration-500 ${phase === 'coding' || phase === 'thinking' || phase === 'prompting' ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
                            {currentStep.preview}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};