<div align="center">
  <h1>🚀 AI iGen - AI-Powered Image Generator</h1>
  <p><strong>Transform your imagination into stunning visuals with Google Gemini AI</strong></p>
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google" alt="Gemini" />
</div>

---

## 📖 About

**AI iGen** is a cutting-edge AI-powered image generation application that transforms text descriptions into stunning visual artwork. Built with Google's Gemini 2.5 Flash Image model, it offers a futuristic cyberpunk-inspired interface with advanced customization options for creating unique images.

### ✨ Key Features

- **🎨 Smart Prompt System** - Enter any text description and watch AI bring your imagination to life
- **🖌️ Style Customization** - Choose from 9 artistic styles (Realism, Photorealistic, Hyperrealistic, Abstract, Cartoon, Cyberpunk, Digital Art, 8k Resolution, Oil Painting)
- **🌈 Mood Selection** - Set emotional tones (Cinematic, Vibrant, Melancholy, Dark, Ethereal, Neon, Dramatic, Whimsical)
- **📷 Composition Controls** - Define shot types (Wide Shot, Close-up, Macro, Drone, Low Angle, Bokeh, Symmetrical)
- **💡 Style Suggestions** - 20+ pre-defined quick-add suggestions (Anime, Studio Ghibli, Cyberpunk City, Neon Noir, Golden Hour, etc.)
- **❤️ Favorites System** - Save and organize your best generations
- **📜 Generation History** - Browse and reload previous creations
- **💾 Download Images** - Export high-quality PNG images
- **⚡ Real-time Generation** - Lightning-fast image creation with Gemini 2.5 Flash
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI framework with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling framework |
| **Google Gemini 2.5 Flash Image** | AI image generation model |
| **@google/genai** | Official Gemini API client |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-igen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Open `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 How to Use

1. **Enter Prompt** - Describe your desired image in the textarea
2. **Select Parameters** - Choose styles, moods, and compositions
3. **Add Suggestions** - Click style suggestions from the left panel (optional)
4. **Generate** - Click the circular GENERATE button
5. **View & Save** - Preview your image, download it, or add to favorites
6. **Browse History** - Click any thumbnail to reload previous generations

---

## 🎨 UI/UX Features

- **Futuristic Cyberpunk Design** - Neon accents, glass morphism effects
- **Animated Elements** - Morphing polygon logo, spinning loaders
- **3D Perspective Grid** - Dynamic background with depth
- **Custom Scrollbars** - Styled for the cyberpunk aesthetic
- **Smooth Transitions** - Polished animations throughout
- **Responsive Layout** - Adapts seamlessly to all screen sizes

---

## 📂 Project Structure

```
ai-igen/
├── components/
│   ├── About.tsx          # About page modal
│   ├── icons.tsx          # SVG icon components
│   └── ToggleSwitch.tsx   # Toggle switch component
├── services/
│   └── geminiService.ts   # Gemini API integration
├── App.tsx                # Main application component
├── index.tsx              # React entry point
├── index.html             # HTML template
├── types.ts               # TypeScript type definitions
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env.local             # Environment variables
└── README.md              # Documentation
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

### Vite Configuration

The app uses Vite with:
- React plugin for Fast Refresh
- Environment variable injection
- Path aliases (`@` points to root)
- Dev server on port 3000

---

## 📝 Tips for Best Results

- ✅ Be specific and descriptive in prompts
- ✅ Combine multiple styles and moods for unique results
- ✅ Use composition controls to frame your subject
- ✅ Experiment with style suggestions
- ✅ Save favorites to build a personal collection
- ✅ Review history to iterate on previous generations

---

## 🐛 Troubleshooting

### API Key Issues
- Ensure `GEMINI_API_KEY` is set correctly in `.env.local`
- Verify your API key is active at [Google AI Studio](https://aistudio.google.com/)

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

### Generation Failures
- Check your internet connection
- Verify API quota limits
- Review console for detailed error messages

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Google Gemini Team** - For the amazing AI model
- **React Team** - For the powerful UI framework
- **Tailwind CSS** - For the utility-first styling approach
- **Vite Team** - For the blazing-fast build tool

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the About page in the app for detailed feature explanations

---
