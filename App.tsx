
import React, { useState, useCallback, useEffect } from 'react';
import { generateImageFromText } from './services/geminiService';
import { RocketIcon, SearchIcon, HeartIcon, SolidHeartIcon, InfinityIcon, DownloadIcon, MorphingPolygonIcon } from './components/icons';
import { About } from './components/About';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

// --- Components ---

const PillButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap flex-shrink-0 ${
      active
        ? 'bg-sky-500/20 border-sky-400 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'
    }`}
  >
    {label}
  </button>
);

const CircularGenerateButton: React.FC<{ onClick: () => void; isLoading: boolean; disabled: boolean }> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`group relative w-24 h-24 md:w-32 md:h-32 xl:w-40 xl:h-40 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'
            }`}
        >
            {/* Outer Ring Container */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
               {isLoading && (
                 <>
                  {/* Outer Spinner CW */}
                  <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-sky-400 border-r-sky-500/50 animate-spin"></div>
                  {/* Inner Spinner CCW */}
                  <div className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-purple-400 border-l-purple-500/50 animate-spin-reverse"></div>
                 </>
               )}
               {!isLoading && (
                 <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 group-hover:border-sky-500/40 transition-colors"></div>
               )}
            </div>
            
            {/* Static Decorative Ring */}
            <div className="absolute inset-0 rounded-full">
                 <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="rgba(14, 165, 233, 0.1)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                 </svg>
            </div>

            {/* Inner Core */}
            <div className={`absolute inset-4 rounded-full bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(14,165,233,0.15)] group-hover:bg-sky-900/30 transition-all duration-500 ${isLoading ? 'shadow-[inset_0_0_60px_rgba(14,165,233,0.3)]' : ''}`}>
                <span className={`text-sm md:text-lg xl:text-xl font-orbitron font-bold tracking-widest transition-all duration-300 ${isLoading ? 'text-sky-300 animate-pulse scale-95' : 'text-white group-hover:text-sky-300'}`}>
                    {isLoading ? 'CREATING' : 'GENERATE'}
                </span>
                {isLoading && <span className="text-[9px] text-sky-400/80 font-mono mt-1 tracking-wider">PROCESSING</span>}
            </div>
        </button>
    )
}

// --- Main Layout Panels ---

const LeftPanel: React.FC<{ 
    activeSuggestions: string[];
    onToggleSuggestion: (text: string) => void;
    onResetSuggestions: () => void;
    favorites: GeneratedImage[];
    onSelectFavorite: (image: GeneratedImage) => void;
}> = ({ activeSuggestions, onToggleSuggestion, onResetSuggestions, favorites, onSelectFavorite }) => {
    const suggestions = [
        "Realistic",
        "Anime",
        "Cinematic Lighting", 
        "Pastel Colors", 
        "Studio Ghibli Inspired",
        "Cyberpunk City",
        "Neon Noir",
        "Golden Hour",
        "Detailed Portrait",
        "Isometric 3D",
        "Surreal Landscape",
        "Retro Wave",
        "Watercolor",
        "Line Art",
        "Low Poly",
        "Steampunk",
        "Minimalist",
        "Pop Art",
        "Fantasy World",
        "Sci-Fi Interior"
    ];

    return (
        <div className="w-full lg:w-[280px] flex flex-col gap-4 flex-shrink-0 z-10 order-2 lg:order-none">
            <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
                {/* Suggestions Section */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-[10px] text-sky-400 font-orbitron tracking-widest uppercase">Style Suggestions</h3>
                        <button 
                            onClick={onResetSuggestions}
                            className="text-[9px] text-slate-500 hover:text-red-400 transition-colors"
                        >
                            RESET
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pr-1 max-h-[450px] overflow-y-auto">
                        {suggestions.map((s) => {
                            const isActive = activeSuggestions.includes(s);
                            return (
                                <button
                                    key={s}
                                    onClick={() => onToggleSuggestion(s)}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left group flex-shrink-0 ${
                                        isActive 
                                            ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.15)]' 
                                            : 'bg-slate-800/40 border-slate-700/50 hover:border-sky-500/50 hover:bg-slate-800/60'
                                    }`}
                                >
                                    <span className={`text-xs transition-colors ${isActive ? 'text-sky-200' : 'text-sky-400 group-hover:scale-110'}`}>
                                        {isActive ? '✓' : '+'}
                                    </span>
                                    <span className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                        {s}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative Code Block */}
                <div className="py-3 border-b border-slate-800/50 flex items-center justify-between opacity-60">
                    <span className="font-mono text-[9px] text-slate-600 tracking-widest">R-02FY528B</span>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    </div>
                </div>

                {/* Dashboard Section */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-[10px] text-slate-500 font-orbitron tracking-widest uppercase">Dashboard</h3>
                    <div className="flex items-center gap-2 text-slate-300 mb-1">
                        <RocketIcon />
                        <span className="text-xs font-semibold">Flash Model</span>
                    </div>
                    
                    {/* Favorites Horizontal Scroll */}
                    <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x h-16">
                        {favorites.length > 0 ? favorites.map(f => (
                            <button 
                                key={f.id}
                                onClick={() => onSelectFavorite(f)}
                                className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border border-slate-700 hover:border-sky-400 transition-colors snap-start relative"
                            >
                                <img src={f.url} className="w-full h-full object-cover" alt="fav" />
                            </button>
                        )) : (
                            <div className="w-full h-14 rounded-md border border-dashed border-slate-800 flex items-center justify-center text-[9px] text-slate-600 flex-shrink-0">
                                No favorites
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-800/50">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">Credits</span>
                        <div className="flex items-center gap-1 text-sky-400 glow-text scale-90 origin-right">
                            <InfinityIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CenterPanel: React.FC<{
    prompt: string;
    setPrompt: (s: string) => void;
    selectedStyles: string[];
    toggleStyle: (s: string) => void;
    selectedMoods: string[];
    toggleMood: (s: string) => void;
    selectedCompositions: string[];
    toggleComposition: (s: string) => void;
    history: GeneratedImage[];
    onSelectHistory: (img: GeneratedImage) => void;
}> = ({ 
    prompt, setPrompt, 
    selectedStyles, toggleStyle, 
    selectedMoods, toggleMood, 
    selectedCompositions, toggleComposition,
    history, onSelectHistory 
}) => {
    
    const styles = ['Realism', 'Photorealistic', 'Hyperrealistic', 'Abstract', 'Cartoon', 'Cyberpunk', 'Digital Art', '8k Resolution', 'Oil Painting'];
    const moods = ['Cinematic', 'Vibrant', 'Melancholy', 'Dark', 'Ethereal', 'Neon', 'Dramatic', 'Whimsical'];
    const compositions = ['Wide Shot', 'Close-up', 'Macro', 'Drone', 'Low Angle', 'Bokeh', 'Symmetrical'];

    return (
        <div className="flex-grow flex flex-col gap-4 z-10 min-w-0 order-1 lg:order-none">
             {/* Header */}
             <div className="text-center lg:text-left flex items-center justify-center lg:justify-start gap-3">
                <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-400 tracking-widest glow-text">
                    AI iGen
                </h1>
                <span className="px-2 py-0.5 rounded border border-sky-500/30 bg-sky-900/30 text-[9px] text-sky-300 font-mono tracking-wider">FLASH</span>
            </div>

            {/* Main Controls Card */}
            <div className="glass-panel rounded-2xl p-1 relative flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
                
                <div className="p-5 md:p-6 flex flex-col gap-6">
                    {/* Prompt Input */}
                    <div className="relative group">
                        <label className="text-[10px] text-sky-400 uppercase tracking-wider font-bold mb-2 block">Prompt</label>
                        <div className="relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your image..."
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-4 pr-10 text-sm text-slate-200 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:outline-none h-32 md:h-40 resize-none transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]"
                            />
                            <div className="absolute bottom-3 right-3 text-slate-500 group-focus-within:text-sky-400 transition-colors">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>

                    {/* Parameters */}
                    <div className="space-y-5 pb-2">
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Style</span>
                            <div className="flex flex-wrap gap-2">
                                {styles.map(s => (
                                    <PillButton key={s} label={s} active={selectedStyles.includes(s)} onClick={() => toggleStyle(s)} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Mood</span>
                            <div className="flex flex-wrap gap-2">
                                {moods.map(m => (
                                    <PillButton key={m} label={m} active={selectedMoods.includes(m)} onClick={() => toggleMood(m)} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Composition</span>
                            <div className="flex flex-wrap gap-2">
                                {compositions.map(c => (
                                    <PillButton key={c} label={c} active={selectedCompositions.includes(c)} onClick={() => toggleComposition(c)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Generations */}
            <div className="glass-panel rounded-xl p-4">
                <h3 className="text-[10px] text-slate-500 font-orbitron tracking-widest uppercase mb-3">Recent Generations</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {history.length > 0 ? history.map((img) => (
                        <button 
                            key={img.id}
                            onClick={() => onSelectHistory(img)}
                            className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-slate-700 hover:border-sky-400 transition-all relative group"
                        >
                            <img src={img.url} alt="history" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1">
                                <span className="text-[9px] text-white truncate w-full">{img.prompt}</span>
                            </div>
                        </button>
                    )) : (
                        <div className="text-[10px] text-slate-600 w-full text-center py-2">No recent images</div>
                    )}
                </div>
            </div>
        </div>
    )
}

const RightPanel: React.FC<{
    currentImage: GeneratedImage | null;
    isLoading: boolean;
    onGenerate: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    promptValid: boolean;
}> = ({ currentImage, isLoading, onGenerate, isFavorite, onToggleFavorite, promptValid }) => {
    
    const handleDownload = () => {
        if (currentImage) {
            const link = document.createElement('a');
            link.href = currentImage.url;
            link.download = `ai-igen-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="w-full lg:w-[380px] flex flex-col gap-4 flex-shrink-0 z-10 order-3 lg:order-none">
            {/* Preview Window */}
            <div className="glass-panel p-1 rounded-2xl relative flex flex-col overflow-hidden h-[380px] lg:h-[450px]">
                <div className="p-3 flex justify-between items-center border-b border-slate-800/50 bg-slate-900/30 rounded-t-xl">
                    <span className="text-[10px] font-orbitron text-sky-300 tracking-wider">VISUAL PREVIEW</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                        <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                    </div>
                </div>
                
                <div className="flex-grow bg-slate-950/50 relative overflow-hidden group flex items-center justify-center">
                    {currentImage ? (
                        <>
                            <img src={currentImage.url} alt="Generated" className="w-full h-full object-contain" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                <p className="text-[10px] text-slate-300 line-clamp-2 font-mono">{currentImage.prompt}</p>
                            </div>
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button 
                                    onClick={handleDownload}
                                    className="p-2 rounded-full bg-black/40 hover:bg-sky-500 hover:text-white backdrop-blur-md transition-all text-slate-300"
                                    title="Download"
                                >
                                    <DownloadIcon />
                                </button>
                                <button 
                                    onClick={onToggleFavorite}
                                    className="p-2 rounded-full bg-black/40 hover:bg-pink-500/20 backdrop-blur-md transition-all text-white"
                                    title="Favorite"
                                >
                                    {isFavorite ? <SolidHeartIcon /> : <HeartIcon />}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                            <div className="flex items-center justify-center mb-3 text-sky-400 opacity-60 w-24 h-24 md:w-32 md:h-32">
                                <MorphingPolygonIcon />
                            </div>
                            <span className="text-[10px] font-mono tracking-wider animate-pulse">AWAITING INPUT</span>
                        </div>
                    )}
                    
                    {/* Overlay Grid Lines */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>
                </div>

                <div className="p-2 border-t border-slate-800/50 bg-slate-900/30 rounded-b-xl flex justify-between items-center">
                     <span className="text-[9px] font-mono text-slate-500">160-bit seed 0023</span>
                     <span className="text-[9px] font-mono text-emerald-500/80">READY</span>
                </div>
            </div>

            {/* Generate Button Area */}
            <div className="flex-shrink-0 flex items-center justify-center py-2 md:py-4">
                <CircularGenerateButton 
                    onClick={onGenerate} 
                    isLoading={isLoading} 
                    disabled={!promptValid && !currentImage && history.length === 0} 
                />
            </div>
        </div>
    )
}

export default function App() {
  const [prompt, setPrompt] = useState<string>('');
  
  // Multi-select state
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Realism']);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedCompositions, setSelectedCompositions] = useState<string[]>([]);
  
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);

  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [favorites, setFavorites] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (list.includes(item)) {
          setList(prev => prev.filter(i => i !== item));
      } else {
          setList(prev => [...prev, item]);
      }
  };

  // Suggestion Toggle Logic
  const handleToggleSuggestion = (text: string) => {
      if (activeSuggestions.includes(text)) {
          // Remove
          setActiveSuggestions(prev => prev.filter(t => t !== text));
          setPrompt(prev => {
              // Simple removal strategy: try removing ", text" or "text, " or just "text"
              let newPrompt = prev;
              newPrompt = newPrompt.replace(`, ${text}`, '');
              newPrompt = newPrompt.replace(`${text}, `, '');
              if (newPrompt.includes(text)) newPrompt = newPrompt.replace(text, '');
              return newPrompt.trim();
          });
      } else {
          // Add
          setActiveSuggestions(prev => [...prev, text]);
          setPrompt(prev => {
              const trimmed = prev.trim();
              if (!trimmed) return text;
              return `${trimmed}, ${text}`;
          });
      }
  };

  const handleResetSuggestions = () => {
      // Remove all active suggestions from prompt
      let newPrompt = prompt;
      activeSuggestions.forEach(s => {
          newPrompt = newPrompt.replace(`, ${s}`, '')
                               .replace(`${s}, `, '')
                               .replace(s, '');
      });
      setPrompt(newPrompt.trim());
      setActiveSuggestions([]);
  };

  const handleGenerate = useCallback(async () => {
    const modifiers = [
        ...selectedStyles,
        ...selectedMoods,
        ...selectedCompositions
    ].join(', ');

    const fullPrompt = prompt.trim() ? `${prompt}, ${modifiers}` : modifiers;

    if (!fullPrompt) {
        setError("Please enter a prompt or select some parameters.");
        return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const resultBase64 = await generateImageFromText(fullPrompt);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: `data:image/png;base64,${resultBase64}`,
        prompt: prompt || "Generated Image",
        timestamp: Date.now()
      };
      
      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev]);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedStyles, selectedMoods, selectedCompositions]);

  const handleSelectImage = (img: GeneratedImage) => {
      setCurrentImage(img);
      setPrompt(img.prompt);
  };

  const handleToggleFavorite = () => {
    if (!currentImage) return;
    
    const isFav = favorites.some(f => f.id === currentImage.id);
    if (isFav) {
        setFavorites(prev => prev.filter(f => f.id !== currentImage.id));
    } else {
        setFavorites(prev => [currentImage, ...prev]);
    }
  };

  const isCurrentFavorite = currentImage ? favorites.some(f => f.id === currentImage.id) : false;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#020617] text-slate-200">
      
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      
      {error && (
        <div 
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500 text-red-200 px-6 py-3 rounded-lg z-50 cursor-pointer backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.3)] font-mono text-sm"
          onClick={() => setError(null)}
        >
          <span className="font-bold mr-2">ERROR:</span> {error}
        </div>
      )}
      
      <button 
        onClick={() => setShowAbout(true)}
        className="fixed top-6 right-6 z-40 px-4 py-2 rounded-lg bg-slate-800/60 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 transition-all text-xs font-orbitron tracking-wider backdrop-blur-md"
      >
        ABOUT
      </button>
      
      <main className="w-full max-w-[1800px] flex flex-col lg:flex-row gap-6 p-4 lg:p-8 relative">
        <LeftPanel 
            activeSuggestions={activeSuggestions}
            onToggleSuggestion={handleToggleSuggestion}
            onResetSuggestions={handleResetSuggestions}
            favorites={favorites}
            onSelectFavorite={handleSelectImage}
        />
        <CenterPanel 
            prompt={prompt} 
            setPrompt={setPrompt}
            selectedStyles={selectedStyles}
            toggleStyle={(s) => toggleSelection(s, selectedStyles, setSelectedStyles)}
            selectedMoods={selectedMoods}
            toggleMood={(m) => toggleSelection(m, selectedMoods, setSelectedMoods)}
            selectedCompositions={selectedCompositions}
            toggleComposition={(c) => toggleSelection(c, selectedCompositions, setSelectedCompositions)}
            history={history}
            onSelectHistory={handleSelectImage}
        />
        <RightPanel 
            currentImage={currentImage}
            isLoading={isLoading}
            onGenerate={handleGenerate}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
            promptValid={prompt.trim().length > 0 || (selectedStyles.length + selectedMoods.length + selectedCompositions.length) > 0}
        />
      </main>
    </div>
  );
}
