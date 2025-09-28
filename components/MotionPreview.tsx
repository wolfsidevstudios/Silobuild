import React, { useState, useEffect } from 'react';
import { SendIcon, CodeIcon, EyeIcon } from './icons';

// A simple component to simulate typing effect
const TypingEffect: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait a bit after typing finishes
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span className="text-white">{displayedText}</span>;
};

const codeStep1 = `import React from 'react';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="timer">25:00</h1>
    </div>
  );
};

export default App;`;

const codeStep2 = `import React from 'react';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="timer">25:00</h1>
      <div className="buttons">
        <button>Start</button>
        <button>Reset</button>
      </div>
      <ul className="tasks">
        <li>- Design landing page</li>
        <li>- Write documentation</li>
      </ul>
    </div>
  );
};

export default App;`;

const animationSteps = [
  {
    prompt: "Create a simple pomodoro timer app",
    code: codeStep1,
    preview: (
      <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center p-4 text-white text-center">
        <div className="text-4xl font-bold font-mono">25:00</div>
      </div>
    ),
  },
  {
    prompt: "Add start/reset buttons and a task list",
    code: codeStep2,
    preview: (
        <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center p-2 text-white text-center text-xs">
            <div className="text-2xl font-bold font-mono mb-2">25:00</div>
            <div className="flex gap-2 mb-3">
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Start</div>
                <div className="bg-gray-600 text-white px-3 py-1 rounded text-xs">Reset</div>
            </div>
            <ul className="text-left bg-black/20 p-2 rounded w-full text-gray-300 list-none">
                <li>- Design landing page</li>
                <li>- Write documentation</li>
            </ul>
        </div>
    ),
  },
];


export const MotionPreview: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [phase, setPhase] = useState<'typing' | 'thinking' | 'showing'>('typing');
    const [showContent, setShowContent] = useState(false);

    const currentStep = animationSteps[currentStepIndex];

    const handleTypingComplete = () => {
        setPhase('thinking');
        setShowContent(false);
        setTimeout(() => {
            setPhase('showing');
            setShowContent(true);
        }, 1500); // "Thinking" time
    };
    
    useEffect(() => {
        if (phase === 'showing') {
            const timer = setTimeout(() => {
                // Go to next step
                setCurrentStepIndex(prev => (prev + 1) % animationSteps.length);
                setPhase('typing');
                setShowContent(false);
            }, 4000); // Time to show the result
            return () => clearTimeout(timer);
        }
    }, [phase]);


  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto backdrop-blur-sm">
      {/* Window bar */}
      <div className="h-8 bg-gray-800/80 flex items-center px-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
        {/* Left side: Chat */}
        <div className="flex flex-col border-r border-white/10">
          <div className="p-2 border-b border-white/10">
            <h3 className="text-sm font-semibold text-gray-300">Chat</h3>
          </div>
          <div className="flex-1 p-4 bg-black/20 flex flex-col justify-end">
            <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs self-end rounded-br-none text-sm">
              {phase === 'typing' ? (
                <TypingEffect text={currentStep.prompt} onComplete={handleTypingComplete} />
              ) : (
                <p>{currentStep.prompt}</p>
              )}
            </div>
             {phase === 'thinking' && (
                <div className="bg-gray-700 text-gray-300 rounded-lg p-3 max-w-xs self-start rounded-bl-none text-sm mt-2">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                </div>
             )}
          </div>
          <div className="p-2 border-t border-white/10">
            <div className="bg-gray-800 rounded-full flex items-center p-1">
              <input type="text" readOnly value="Describe your change..." className="bg-transparent text-sm w-full px-2 text-gray-500 focus:outline-none" />
              <button className="bg-gray-600 text-white p-1.5 rounded-full"><SendIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Right side: Code & Preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-2 border-b border-white/10">
            <h3 className="text-sm font-semibold text-gray-300">Workspace</h3>
          </div>
          <div className="flex-1 grid grid-rows-2 overflow-hidden relative">
            {/* Thinking overlay */}
             {phase === 'thinking' && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <CodeIcon className="w-8 h-8 text-blue-400 animate-pulse" />
                        <p className="text-blue-300">Generating code...</p>
                    </div>
                </div>
             )}
            {/* Code */}
            <div className={`row-span-1 border-b border-white/10 p-2 bg-black/20 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <pre className="text-xs text-gray-300 font-mono overflow-hidden h-full">
                    <code>{currentStep.code}</code>
                </pre>
            </div>
            {/* Preview */}
            <div className="row-span-1 p-2 bg-gray-900 relative">
                <div className={`w-full h-full transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                    {currentStep.preview}
                </div>
                 <div className="absolute top-0 right-0 p-1 text-xs text-gray-400 bg-gray-800 rounded-bl-md flex items-center gap-1">
                    <EyeIcon className="w-3 h-3" /> Preview
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};