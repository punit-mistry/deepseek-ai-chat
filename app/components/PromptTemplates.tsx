'use client';

import { useState } from 'react';
import AuthButtons from './AuthButtons';

type PromptTemplatesProps = {
  onTemplateSelect: (prompt: string) => void;
};

export default function PromptTemplates({ onTemplateSelect }: PromptTemplatesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      title: "Clerk Auth",
      icon: "🔐",
      prompt: "Please provide a comprehensive guide and code example for implementing Clerk authentication in a web application. Include setup, configuration, and basic usage examples."
    },
    {
      title: "Stripe Integration",
      icon: "💳",
      prompt: "Provide a complete guide for implementing Stripe payment processing in a Next.js application. Include setup, API routes, webhook handling, and client-side integration with example code."
    },
    {
      title: "Prisma Models",
      icon: "🗃️",
      prompt: `Generate Prisma schema models for a User and Subscription system with the following requirements:
      - User model with email, name, and subscription status
      - Subscription model with plan type, status, and payment history
      Include example queries for common operations and relationships between models.`
    },
    {
      title: "ENV Templates",
      icon: "⚙️",
      prompt: `Generate a comprehensive .env template file with configurations for:
      - Supabase
      - Stripe
      - Clerk
      Include comments explaining each variable and example values.`
    }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full transition-all duration-300 z-20 flex ${isOpen ? 'translate-x-0' : 'translate-x-[-327px]'}`}>
      {/* Sidebar Content */}
      <div className="w-80 h-full bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-md border-r border-gray-700/50 shadow-2xl">
        <div className="h-full overflow-y-auto hide-scrollbar p-4">
          <div className="sticky top-0 bg-gradient-to-b from-gray-800/95 to-gray-800/0 pb-4 pt-2 mb-2">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Quick Templates
            </h3>
          </div>

          <div className="space-y-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => onTemplateSelect(template.prompt)}
                className="w-full p-3 group relative overflow-hidden rounded-lg transition-all duration-300"
              >
                {/* Gradient background that shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative flex items-center gap-3 text-left">
                  <span className="text-xl">{template.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      {template.title}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      Click to generate
                    </p>
                  </div>
                </div>
                
                {/* Subtle border */}
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg group-hover:border-gray-600/50 transition-colors"></div>
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <AuthButtons />
        </div>
      </div>

      {/* Icons Only Sidebar (visible when closed) */}
      <div className="w-16 h-full bg-gradient-to-b from-gray-800/95 to-gray-900/95 border-r border-gray-700/50 flex flex-col items-center py-4 gap-2">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => onTemplateSelect(template.prompt)}
            className="p-3 rounded-lg hover:bg-gray-700/50 transition-colors group relative"
            title={template.title}
          >
            <span className="text-xl">{template.icon}</span>
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 bg-gradient-to-b from-gray-800 to-gray-900 p-2 rounded-r-xl border border-l-0 border-gray-700/50"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
} 