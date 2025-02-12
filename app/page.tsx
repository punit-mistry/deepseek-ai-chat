import AIChat from './components/AIChat';
import RotatingCube from './components/RotatingCube';
import './styles/cube.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,0.9))]"></div>

      {/* Rotating Cube */}
      <RotatingCube />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header section */}
        <header className="pt-16 pb-8 px-4 text-center">
          <div className="animate-border inline-block rounded-3xl bg-[linear-gradient(110deg,#0ea5e9,45%,#8b5cf6,55%,#ec4899)] bg-[length:200%_100%] p-0.5">
            <div className="rounded-3xl px-8 py-4 bg-gray-900">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                DeepSeek AI Chat
              </h1>
            </div>
          </div>
          <div className="mt-6 max-w-2xl mx-auto">
            <p className="text-gray-300 text-lg">
              Experience the power of advanced AI conversation. Simply type your message and press Enter to interact with DeepSeek R1.
            </p>
          </div>
        </header>

        {/* Main chat section */}
        <main className="max-w-4xl mx-auto px-4 pb-16 relative">
          {/* Add a subtle blur effect behind the chat to improve readability */}
          <div className="absolute inset-0 backdrop-blur-sm rounded-3xl"></div>
          
          {/* Glowing border effect */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="backdrop-blur-xl bg-gray-900/90 rounded-2xl">
              <AIChat />
            </div>
          </div>

          {/* Features section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <div className="text-blue-400 mb-2">🚀</div>
              <h3 className="font-semibold mb-1">Advanced AI</h3>
              <p className="text-gray-400">Powered by state-of-the-art language model</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <div className="text-purple-400 mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Real-time Response</h3>
              <p className="text-gray-400">Get instant answers to your questions</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <div className="text-pink-400 mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Precise Answers</h3>
              <p className="text-gray-400">Accurate and relevant responses</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center pb-8 text-gray-400 text-sm">
          <p>Powered by DeepSeek R1 Language Model</p>
        </footer>
      </div>
    </div>
  );
}
