'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, Send, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export default function AIConsultantWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi 👋\n\nI\'m your AI Business Consultant.\n\nTell me about your project and I\'ll help you estimate the cost, timeline and recommend the best technology.' }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Do not render on /tools
  if (pathname?.startsWith('/tools')) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() || 'Here is an image.', image: selectedImage || undefined };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const savedApiKey = typeof window !== 'undefined' ? localStorage.getItem('dx_settings_api_key') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (savedApiKey) headers['X-Gemini-API-Key'] = savedApiKey;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: newMessages,
          leadId
        })
      });

      const data = await response.json();
      
      if (data.leadId) setLeadId(data.leadId);
      
      if (data.text) {
        setMessages([...newMessages, { role: 'assistant', content: data.text }]);
      } else if (data.error) {
        setMessages([...newMessages, { role: 'assistant', content: `Error: ${data.error}` }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered a communication error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button - Positioned directly above WhatsApp Button */}
      <div className={`fixed bottom-[88px] right-6 z-50 flex items-center group transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        {/* Tooltip on hover */}
        <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono bg-zinc-900/90 text-white border border-zinc-700 shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Chat with AI Consultant
        </span>

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Chat with AI Consultant"
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-[0_4px_25px_rgba(59,130,246,0.45)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer border border-blue-400/30"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25 pointer-events-none" />

          {/* Bot Icon */}
          <Bot className="w-6 h-6 text-white relative z-10" />

          {/* Online status dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#050505] z-20 shadow-sm" />
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[390px] h-[75vh] sm:h-[600px] sm:max-h-[85vh] flex flex-col bg-[#0d0d0e] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl z-50 transition-all duration-500 transform origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-t-2xl sm:rounded-t-3xl border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5 font-mono">
                DevCodeX AI <Sparkles size={13} className="text-amber-300 animate-pulse" />
              </h3>
              <p className="text-[11px] text-blue-100/90 font-mono">Online • Instant Project Estimate</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close Chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#09090b] scroll-smooth">
          {messages.map((ms, i) => (
            <div key={i} className={`flex items-end gap-2 ${ms.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {ms.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md border border-blue-400/30">
                  <Bot size={15} className="text-white" />
                </div>
              )}
              
              <div className={`max-w-[78%] px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                ms.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-2xl rounded-br-xs shadow-md' 
                  : 'bg-zinc-900 text-zinc-200 rounded-2xl rounded-bl-xs shadow-sm border border-zinc-800 relative'
              }`}>
                {ms.image && <img src={ms.image} alt="Uploaded attachment" className="w-full rounded-lg mb-2 object-cover object-center max-h-48 shadow-sm" />}
                {ms.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md border border-blue-400/30">
                <Bot size={15} className="text-white" />
              </div>
              <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-bl-xs border border-zinc-800 flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s'}} />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s'}} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-[#0d0d0e] rounded-b-2xl sm:rounded-b-3xl border-t border-zinc-800/80">
          {selectedImage && (
            <div className="mb-2 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-blue-500/50" />
              <button 
                type="button"
                onClick={() => setSelectedImage(null)} 
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-0.5 hover:scale-110 transition-transform"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 p-1.5 rounded-full shadow-inner focus-within:border-blue-500 transition-colors"
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-zinc-400 hover:text-blue-400 transition-colors shrink-0 cursor-pointer"
              title="Upload Image"
            >
              <ImageIcon size={18} />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about pricing, tech stack, timeline..."
              className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center text-white transition-all shrink-0 shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              <Send size={16} className="translate-x-0.5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-zinc-500 mt-2.5 font-mono">DevCodeX AI Consultant • Powered by Gemini</p>
        </div>
      </div>
    </>
  );
}
