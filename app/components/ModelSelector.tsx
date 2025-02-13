'use client';

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
}

export default function ModelSelector({ currentModel, onModelChange }: ModelSelectorProps) {
  const models = [
    { id: 'deepseek-r1:1.5b', name: 'DeepSeek 1.5B' },
    { id: 'deepseek-r1:7b', name: 'DeepSeek 7B' },
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-1 flex gap-1">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentModel === model.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                : 'hover:bg-gray-700/50 text-gray-400'
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
} 