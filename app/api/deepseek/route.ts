// Please install OpenAI SDK first: `npm install openai`

import { NextResponse } from "next/server";

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// POST handler for the API endpoint
export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { messages, model } = body as { messages: Message[], model: string };

        // Get the last user message
        const userMessage = messages.find((msg: Message) => msg.role === "user")?.content;

        if (!userMessage) {
            return NextResponse.json(
                { error: 'User message is required' },
                { status: 400 }
            );
        }

        // Call local Ollama endpoint
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-r1:1.5b',
                prompt: userMessage,
                stream: false
            })
        });

        const data = await response.json();

        // Return the response
        return NextResponse.json({
            content: data.response
        });

    } catch (error) {
        console.error('Local API error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
