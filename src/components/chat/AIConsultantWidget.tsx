'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export default function AIConsultantWidget() {
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-2xl hover:bg-indigo-700 hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} />
        <span className="absolute -top-2 -right-2 bg-rose-500 w-4 h-4 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] h-[75vh] sm:h-[600px] sm:max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 sm:rounded-3xl shadow-2xl z-50 transition-all duration-500 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-3xl border-b border-indigo-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1">AI Consultant <Sparkles size={12} className="text-amber-300" /></h3>
              <p className="text-xs text-indigo-100">Usually replies instantly</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth">
          {messages.map((ms, i) => (
            <div key={i} className={`flex items-end gap-2 ${ms.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {ms.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-md">
                  <Bot size={16} className="text-white relative -left-0.5" />
                </div>
              )}
              
              <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                ms.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-3xl rounded-br-sm shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700 relative'
              }`}>
                {ms.image && <img src={ms.image} alt="Uploaded attachment" className="w-full rounded-lg mb-2 object-cover object-center max-h-48 shadow-sm" />}
                {ms.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-md">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-3xl rounded-bl-sm border border-slate-100 dark:border-slate-700 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s'}} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s'}} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-b-3xl border-t border-slate-100 dark:border-slate-800">
          {selectedImage && (
            <div className="mb-2 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-lg border-2 border-indigo-200" />
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
            className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-full shadow-inner"
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
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
              title="Upload Image"
            >
              <ImageIcon size={18} />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe your project..."
              className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center text-white transition-colors shrink-0 shadow-md"
            >
              <Send size={18} className="translate-x-0.5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">Powered by Gemini AI Model</p>
        </div>
      </div>
    </>
  );
}
