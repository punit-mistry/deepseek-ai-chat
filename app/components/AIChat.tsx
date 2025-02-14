'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import { useUser } from "@clerk/nextjs";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface Props {
    model: string;
    modernUIMode: boolean;
    llmUrl: string;
}

export default function AIChat({ model, modernUIMode, llmUrl }: Props) {
    const { isSignedIn } = useUser();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        Prism.highlightAll();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!isSignedIn) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '❌ Please sign in to use the chat.' 
            }]);
            return;
        }
        
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);
        
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const res = await fetch('/api/deepseek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{ role: "user", content: userMessage }],
                    model,
                    modernUIMode,
                    llmUrl
                })
            });

            const data = await res.json();
            if (data.error) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: `❌ ${data.error}` 
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: data.content 
                }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '❌ Failed to process your request. Please try again.' 
            }]);
        } finally {
            setLoading(false);
        }
    };

    const MessageContent = ({ content, role }: { content: string, role: 'user' | 'assistant' }) => {
        if (role === 'user') {
            return <p className="whitespace-pre-wrap">{content}</p>;
        }
        
        return (
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                    components={{
                        code({  className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return  match ? (
                                <div className="relative group">
                                    <pre className={`${className} rounded-md !bg-gray-800/50`}>
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(children?.toString() ?? '')}
                                        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Copy
                                    </button>
                                </div>
                            ) : (
                                <code className="bg-gray-800/50 rounded-md px-1 py-0.5" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] ${
                            message.role === 'user' 
                                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100' 
                                : 'bg-gray-800/50 border border-white/5 text-gray-100'
                            } rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm ${
                                message.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                            }`}
                        >
                            <MessageContent content={message.content} role={message.role} />
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800/50 border border-white/5 rounded-2xl rounded-tl-sm px-5 py-3 backdrop-blur-sm">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-violet-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/5 p-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <textarea
                        data-chat-input
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder={isSignedIn ? "Type a message... (Press Enter to send, Shift+Enter for new line)" : "Please sign in to chat..."}
                        disabled={!isSignedIn}
                        className="flex-1 resize-none p-3 bg-gray-800/50 border border-white/5 rounded-xl
                            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/20 text-gray-100 
                            placeholder-gray-500 min-h-[44px] max-h-[200px] overflow-y-auto backdrop-blur-sm
                            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        style={{
                            height: 'auto',
                            minHeight: '44px',
                            maxHeight: '200px'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim() || !isSignedIn}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl 
                            hover:bg-blue-500/20 disabled:bg-gray-800/50 disabled:border-white/5 disabled:text-gray-600 
                            disabled:cursor-not-allowed transition-all duration-200 self-end backdrop-blur-sm"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
} 