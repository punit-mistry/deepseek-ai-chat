'use client';

import { useState } from 'react';

export default function DeepseekChat() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/deepseek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: input }
                    ]
                })
            });

            const data = await res.json();
            setResponse(data.content);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Failed to get response');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="w-full p-2 border rounded-md"
                    rows={4}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>

            {response && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Response:</h2>
                    <div className="mt-2 p-4 bg-gray-100 rounded-md">
                        {response}
                    </div>
                </div>
            )}
        </div>
    );
} 