'use client';

type ModelSwitchProps = {
  currentModel: string;
  onModelChange: (model: string) => void;
};

export default function ModelSwitch({ currentModel, onModelChange }: ModelSwitchProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <button
        onClick={() => onModelChange('deepseek-chat')}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentModel === 'deepseek-chat'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
        }`}
      >
        Chat Model
      </button>
      <button
        onClick={() => onModelChange('deepseek-reasoner')}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentModel === 'deepseek-reasoner'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
        }`}
      >
        Reasoner Model
      </button>
    </div>
  );
} 