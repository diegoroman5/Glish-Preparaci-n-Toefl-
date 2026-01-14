
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini, analyzeStudyImage, generateSpeech, playPCM } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hi! I am your Glish TOEFL Coach. How can I help you prepare for the TOEFL Glish 2026 format today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return;

    const userMsg: Message = { role: 'user', content: inputValue };
    if (selectedImage && activeTab === 'image') {
      userMsg.image = selectedImage;
    }

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      let responseText = '';
      if (activeTab === 'image' && selectedImage) {
        responseText = await analyzeStudyImage(selectedImage, inputValue || 'Analyze this TOEFL material and provide study tips.');
        setSelectedImage(null);
      } else {
        responseText = await chatWithGemini(inputValue);
      }
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setActiveTab('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTTS = async (text: string) => {
    try {
      const audioBase64 = await generateSpeech(text);
      await playPCM(audioBase64);
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-[400px] h-[500px] glass-card rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="glish-gradient p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <p className="font-bold text-sm">Glish AI Coach</p>
                <p className="text-[10px] text-blue-200 uppercase tracking-widest">TOEFL Glish 2026</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
            >
              Consultas
            </button>
            <button 
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${activeTab === 'image' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
            >
              Analizar Material
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.image && (
                  <img src={m.image} alt="User Upload" className="max-w-[150px] rounded-lg mb-2 shadow-sm border border-white" />
                )}
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {m.content}
                </div>
                {m.role === 'model' && (
                  <button 
                    onClick={() => handleTTS(m.content)}
                    className="mt-1 text-[10px] text-blue-500 font-bold hover:underline flex items-center gap-1 px-2"
                  >
                    <i className="fas fa-volume-up"></i> Escuchar Pronunciación
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs animate-pulse">
                <i className="fas fa-circle-notch fa-spin"></i> Glish AI está pensando...
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            {selectedImage && activeTab === 'image' && (
              <div className="mb-2 relative inline-block">
                <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-blue-200" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-200 transition"
                title="Subir imagen"
              >
                <i className="fas fa-image"></i>
              </button>
              <input 
                type="file" 
                hidden 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleImageUpload}
              />
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={activeTab === 'chat' ? "Pregunta sobre el TOEFL..." : "Describe la imagen o haz una pregunta..."}
                className="flex-1 bg-slate-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 glish-gradient text-white rounded-full flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition duration-300 relative group"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            AI COACH
          </span>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;