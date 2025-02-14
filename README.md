# DeepSeek AI Chat Interface

A modern Next.js application that provides a sleek interface for interacting with DeepSeek AI models. Features include authentication, quick templates, and customizable UI modes.

## Features

- 🚀 Real-time AI chat with DeepSeek models
- 🔐 Secure authentication via Clerk
- 📝 Quick templates for common development tasks
- 🎨 Modern UI mode for enhanced code styling
- 🔄 Configurable LLM endpoint
- ✨ Responsive design with animations
- 💻 Code syntax highlighting
- 📋 One-click code copying

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Clerk account for authentication
- A running DeepSeek server (local or remote)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd deepseek-chat
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Running the Project

1. Start your local DeepSeek server (default port: 11434)

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Authentication
- Sign in using the button in the sidebar
- Authentication is required to use the chat functionality

### LLM Configuration
- Enter your DeepSeek server URL in the top input field
- Default URL: http://localhost:11434
- Ensure your DeepSeek server is running and accessible

### Quick Templates
The sidebar provides quick templates for common tasks:
1. Click a template once to fill the chat input
2. Template button will pulse to indicate it's ready
3. Click again to send the prompt
4. Available templates include:
   - Clerk Authentication setup
   - Stripe Integration guide
   - Prisma Models configuration
   - Environment Variables setup

### Modern UI Mode
- Toggle the Modern UI button to enhance code output
- When active, AI responses will focus on modern, minimalistic UI patterns
- Perfect for getting UI/UX improvement suggestions

### Chat Interface
- Expandable input box (up to 200px height)
- Press Enter to send, Shift+Enter for new line
- Code blocks feature syntax highlighting
- Copy button for code snippets
- Markdown support for formatted responses

## Project Structure
```
deepseek-chat/
├── app/
│   ├── api/
│   │   └── deepseek/
│   │       └── route.ts      # API endpoint for DeepSeek
│   │   ├── components/
│   │   │   ├── AIChat.tsx       # Main chat component
│   │   │   ├── AuthButtons.tsx  # Authentication UI
│   │   │   ├── LLMConfig.tsx    # LLM URL configuration
│   │   │   └── PromptTemplates.tsx # Template sidebar
│   │   ├── styles/
│   │   │   └── cube.css         # Animation styles
│   │   └── page.tsx             # Main page
│   └── middleware.ts            # Clerk authentication middleware
```

## Development

### API Integration
The project uses a Next.js API route to communicate with DeepSeek:
- Endpoint: `/api/deepseek`
- Supports authentication via Clerk
- Handles error cases and connection issues
- Cleans up AI responses for better presentation

### UI Components
Built with:
- Tailwind CSS for styling
- React Markdown for message formatting
- Prism.js for code highlighting
- Clerk for authentication

## Troubleshooting

Common issues and solutions:
1. **Connection Error**: Ensure DeepSeek server is running and URL is correct
2. **Authentication Error**: Verify Clerk credentials in .env.local
3. **UI Issues**: Clear browser cache and reload

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Next.js 14](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Authentication by [Clerk](https://clerk.dev/)
- Code highlighting by [Prism.js](https://prismjs.com/)
