import React from 'react';

interface AboutProps {
  onClose: () => void;
}

export const About: React.FC<AboutProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel rounded-2xl max-w-4xl w-full my-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 tracking-widest glow-text">
              About AI iGen
            </h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6 text-slate-300 max-h-[70vh] overflow-y-auto pr-2">
            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">🚀 What is AI iGen?</h3>
              <p className="text-sm leading-relaxed">
                AI iGen is a cutting-edge AI-powered image generation application built with Google's Gemini 2.5 Flash Image model. 
                It transforms your text descriptions into stunning visual artwork in seconds, offering a futuristic interface 
                with advanced customization options.
              </p>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">✨ Key Features</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-white font-semibold mb-1">📝 Smart Prompt System</h4>
                  <p className="text-slate-400">Enter any text description and watch AI bring your imagination to life. The prompt system supports detailed descriptions and creative concepts.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">🎨 Style Customization</h4>
                  <p className="text-slate-400">Choose from multiple artistic styles including Realism, Photorealistic, Hyperrealistic, Abstract, Cartoon, Cyberpunk, Digital Art, 8k Resolution, and Oil Painting.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">🌈 Mood Selection</h4>
                  <p className="text-slate-400">Set the emotional tone with options like Cinematic, Vibrant, Melancholy, Dark, Ethereal, Neon, Dramatic, and Whimsical.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">📷 Composition Controls</h4>
                  <p className="text-slate-400">Define your shot type with Wide Shot, Close-up, Macro, Drone, Low Angle, Bokeh, and Symmetrical compositions.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">💡 Style Suggestions</h4>
                  <p className="text-slate-400">Quick-add 20+ pre-defined style suggestions including Anime, Studio Ghibli Inspired, Cyberpunk City, Neon Noir, Golden Hour, Isometric 3D, Surreal Landscape, Retro Wave, Watercolor, Steampunk, and more.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">❤️ Favorites System</h4>
                  <p className="text-slate-400">Save your best generations to favorites for quick access. Click the heart icon on any generated image to add it to your collection.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">📜 Generation History</h4>
                  <p className="text-slate-400">Browse through your recent generations with thumbnail previews. Click any image to reload its prompt and view it again.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">💾 Download Images</h4>
                  <p className="text-slate-400">Download any generated image in high quality PNG format with a single click.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1">⚡ Real-time Generation</h4>
                  <p className="text-slate-400">Powered by Gemini 2.5 Flash Image model for lightning-fast image generation with stunning quality.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">🎯 How to Use</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
                <li>Enter your image description in the prompt textarea</li>
                <li>Select desired styles, moods, and compositions using the pill buttons</li>
                <li>Add quick style suggestions from the left panel (optional)</li>
                <li>Click the circular GENERATE button to create your image</li>
                <li>View your generated image in the preview panel</li>
                <li>Download or favorite your creation</li>
                <li>Browse history to revisit previous generations</li>
              </ol>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">🛠️ Technology Stack</h3>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• <span className="text-white">React 19</span> - Modern UI framework</li>
                <li>• <span className="text-white">TypeScript</span> - Type-safe development</li>
                <li>• <span className="text-white">Vite</span> - Lightning-fast build tool</li>
                <li>• <span className="text-white">Tailwind CSS</span> - Utility-first styling</li>
                <li>• <span className="text-white">Google Gemini 2.5 Flash Image</span> - AI image generation</li>
              </ul>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">🎨 UI/UX Features</h3>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• Fully responsive design for mobile, tablet, and desktop</li>
                <li>• Futuristic cyberpunk-inspired interface</li>
                <li>• Glass morphism effects and smooth animations</li>
                <li>• Custom scrollbars and loading indicators</li>
                <li>• Animated morphing polygon logo</li>
                <li>• 3D perspective grid background</li>
              </ul>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">⚙️ Setup & Configuration</h3>
              <div className="text-sm text-slate-400 space-y-2">
                <p><span className="text-white font-semibold">Prerequisites:</span> Node.js installed on your system</p>
                <p><span className="text-white font-semibold">Installation:</span></p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Clone the repository</li>
                  <li>Run <code className="bg-slate-800 px-2 py-0.5 rounded text-sky-300">npm install</code></li>
                  <li>Set your <code className="bg-slate-800 px-2 py-0.5 rounded text-sky-300">GEMINI_API_KEY</code> in .env.local</li>
                  <li>Run <code className="bg-slate-800 px-2 py-0.5 rounded text-sky-300">npm run dev</code></li>
                  <li>Open <code className="bg-slate-800 px-2 py-0.5 rounded text-sky-300">http://localhost:3000</code></li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="text-sky-400 font-orbitron text-lg mb-2 tracking-wide">📝 Tips for Best Results</h3>
              <ul className="space-y-1 text-sm text-slate-400">
                <li>• Be specific and descriptive in your prompts</li>
                <li>• Combine multiple styles and moods for unique results</li>
                <li>• Use composition controls to frame your subject</li>
                <li>• Experiment with style suggestions for creative variations</li>
                <li>• Save your favorites to build a personal collection</li>
              </ul>
            </section>

            <section className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-500 text-center">
                Built with ❤️ using Google Gemini AI • Version 1.0.0
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
