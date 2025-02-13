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
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { messages, modernUIMode, llmUrl } = body as { 
            messages: Message[], 
            modernUIMode: boolean,
            llmUrl: string 
        };

        const userMessage = messages.find((msg: Message) => msg.role === "user")?.content;

        if (!userMessage) {
            return NextResponse.json(
                { error: 'User message is required' },
                { status: 400 }
            );
        }

        let finalPrompt = userMessage;
        if (modernUIMode) {
            finalPrompt = "Make this AI modern and minimalistic like ShadCN UI. Focus on clean, minimal design patterns.\n\n" + userMessage;
        }

        try {
            const response = await fetch(`${llmUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "deepseek-r1:1.5b",
                    prompt: finalPrompt,
                    stream: false
                })
            });

            const data = await response.json();
            
            // Clean up response by removing <think> tags
            const cleanedResponse = data.response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

            return NextResponse.json({
                content: cleanedResponse
            });
        } catch (error: any) {
            console.error('LLM API error:', error);
            let errorMessage = 'Failed to connect to LLM API';
            
            if (error.cause?.code === 'ECONNREFUSED') {
                errorMessage = `Cannot connect to LLM at ${llmUrl}. Please make sure the server is running and the URL is correct.`;
            }

            return NextResponse.json(
                { error: errorMessage },
                { status: 502 }
            );
        }

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
