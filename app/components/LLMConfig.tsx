'use client';

interface LLMConfigProps {
  currentUrl: string;
  onUrlChange: (url: string) => void;
}

export default function LLMConfig({ currentUrl, onUrlChange }: LLMConfigProps) {
  return (
    <div className="flex justify-center gap-2">
      <input
        type="url"
        value={currentUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="Enter LLM URL (e.g., http://localhost:11434)"
        className="px-4 py-2 bg-gray-800/50 border border-white/5 rounded-xl
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/20 text-gray-100 
          placeholder-gray-500 backdrop-blur-sm w-96"
      />
    </div>
  );
} 