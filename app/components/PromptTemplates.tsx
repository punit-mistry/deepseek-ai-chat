'use client';

type PromptTemplatesProps = {
  onTemplateSelect: (prompt: string) => void;
};

export default function PromptTemplates({ onTemplateSelect }: PromptTemplatesProps) {
  const templates = [
    {
      title: "Generate Clerk Auth",
      prompt: "Please provide a comprehensive guide and code example for implementing Clerk authentication in a web application. Include setup, configuration, and basic usage examples."
    },
    // Add more templates here as needed
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {templates.map((template, index) => (
        <button
          key={index}
          onClick={() => onTemplateSelect(template.prompt)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg transition-all"
        >
          {template.title}
        </button>
      ))}
    </div>
  );
} 