'use client';

type ContextToggleProps = {
  isActive: boolean;
  onToggle: () => void;
};

export default function ContextToggle({ isActive, onToggle }: ContextToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
        isActive 
          ? 'bg-green-600 text-white' 
          : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
      }`}
    >
      <svg 
        className={`w-5 h-5 transition-transform ${isActive ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {isActive ? 'Modern UI Mode: ON' : 'Modern UI Mode: OFF'}
    </button>
  );
} 