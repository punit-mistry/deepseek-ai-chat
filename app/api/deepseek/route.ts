// Please install OpenAI SDK first: `npm install openai`

import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// POST handler for the API endpoint
export async function POST(request: Request) {
    try {
        const { userId } = await auth();

        // Check if user is authenticated
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { messages, modernUIMode } = body as { 
            messages: Message[], 
            modernUIMode: boolean 
        };

        const userMessage = messages.find((msg: Message) => msg.role === "user")?.content;

        if (!userMessage) {
            return NextResponse.json(
                { error: 'User message is required' },
                { status: 400 }
            );
        }

        // Construct the prompt with system message if modernUIMode is active
        let finalPrompt = userMessage;
        if (modernUIMode) {
            finalPrompt = "Make this AI modern and minimalistic like ShadCN UI. Focus on clean, minimal design patterns.\n\n" + userMessage;
        }

        // Call local Ollama endpoint with exact payload structure
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "deepseek-r1:1.5b",  // Use fixed model name
                prompt: finalPrompt,
                stream: false
            })
        });

        const data = await response.json();

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
