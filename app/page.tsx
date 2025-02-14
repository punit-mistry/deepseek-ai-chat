'use client';

import { useState } from 'react';
import AIChat from './components/AIChat';
import PromptTemplates from './components/PromptTemplates';
import ContextToggle from './components/ContextToggle';
import './styles/cube.css';
import RotatingCube from './components/RotatingCube';
import LLMConfig from './components/LLMConfig';

export default function Home() {
  const [currentModel] = useState('deepseek-r1:1.5b');
  const [chatKey, setChatKey] = useState(0);
  const [isModernUIMode, setIsModernUIMode] = useState(false);
  const [llmUrl, setLlmUrl] = useState('http://localhost:11434');

  const handleTemplateSelect = (prompt: string) => {
    const chatElement = document.querySelector('[data-chat-input]') as HTMLTextAreaElement;
    if (chatElement) {
      chatElement.value = prompt;
      chatElement.dispatchEvent(new Event('input', { bubbles: true }));
      setTimeout(() => {
        chatElement.form?.dispatchEvent(new Event('submit', { bubbles: true }));
        // Reset chat when template is used
        setChatKey(prev => prev + 1);
      }, 100);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Ambient background effect */}
      <RotatingCube />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_50%)] rotate-180" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        <header className="pt-8 pb-6 px-4 text-center flex-shrink-0">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 tracking-tight mb-3">
            DeepSeek AI Chat
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the power of advanced AI conversation
          </p>
        </header>

        {/* Main chat section */}
        <main className="flex-1 overflow-hidden px-4 relative pl-24">
          <div className="mb-4 flex max-w-4xl mx-auto items-center gap-4">
            <LLMConfig 
              currentUrl={llmUrl}
              onUrlChange={setLlmUrl}
            />
            <ContextToggle 
              isActive={isModernUIMode} 
              onToggle={() => setIsModernUIMode(!isModernUIMode)} 
            />
          </div>
          
          <PromptTemplates onTemplateSelect={handleTemplateSelect} />

          {/* Chat container */}
          <div className="h-[calc(100vh-348px)] relative max-w-4xl mx-auto">
            <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl h-full border border-white/5">
                <AIChat 
                  key={chatKey} 
                  model={currentModel} 
                  modernUIMode={isModernUIMode}
                  llmUrl={llmUrl}
                />
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-3 text-gray-500 text-sm flex-shrink-0">
          <p>Powered by DeepSeek R1 Language Model</p>
        </footer>
      </div>
    </div>
  );
}
