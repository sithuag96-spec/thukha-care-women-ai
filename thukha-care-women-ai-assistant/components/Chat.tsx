"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Heart, 
  Calendar, 
  Stethoscope, 
  Baby, 
  Lock, 
  AlertCircle,
  Phone,
  Droplets,
  Shield,
  X,
  MessageCircle
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CATEGORIES = [
  { id: "period", label: "ရာသီမမှန်ခြင်း", sub: "Period Irregularity", icon: Calendar, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "pcos", label: "PCOS", sub: "Hormone Balance", icon: Heart, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "pregnancy", label: "ကိုယ်ဝန်ဆောင်မေးခွန်း", sub: "Pregnancy Support", icon: Baby, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "fertility", label: "Fertility", sub: "Conception Guide", icon: Stethoscope, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "birth_control", label: "သားဆက်ခြားခြင်း", sub: "Birth Control Info", icon: Shield, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "discharge", label: "အဖြူဆင်းခြင်း", sub: "Vaginal Health", icon: Droplets, color: "bg-[#F5F1EE] text-[#5A534E]" },
  { id: "consultation", label: "Private Consultation", sub: "Connect with Clinic", icon: Phone, color: "bg-[#8BAA91] text-white" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    const timer = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content: "မင်္ဂလာပါ 👋\nThukha Care Women AI မှ ကြိုဆိုပါတယ်။\n\nဘာအတွက် ကူညီပေးရမလဲ?"
        },
      ]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (content?: string) => {
    const messageContent = content || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "တောင်းပန်ပါတယ်၊ အခက်အခဲတစ်ခုရှိနေလို့ နောက်မှပြန်စမ်းကြည့်ပေးပါ။" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#F9F6F2] font-sans text-[#2D2A27] overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden p-0 sm:p-6 md:p-8 gap-8 max-w-7xl mx-auto w-full">
        
        {/* Left Sidebar - Hidden on small mobile */}
        <div className="hidden lg:flex w-1/3 flex-col justify-between py-4">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#8BAA91] rounded-2xl flex items-center justify-center text-white shadow-sm">
                <Heart size={24} fill="white" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#2D2A27]">Thukha Care</h1>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-serif italic text-[#5A534E] leading-tight">
                Safe Space for <br/>Women’s Health.
              </h2>
              <p className="text-[#7A7067] leading-relaxed">
                နွေးထွေးပျူငှာစွာဖြင့် သင့်ကျန်းမာရေးကို <br/> အမြဲတမ်းဂရုစိုက်ပေးနေမှာပါ။
              </p>
            </div>
          </div>
          
          <div className="bg-white/60 border border-[#E8E2DC] rounded-[24px] p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#C27E7E] font-bold text-xs tracking-wider">
              <div className="w-2 h-2 bg-[#C27E7E] rounded-full"></div>
              RED FLAG SAFETY
            </div>
            <p className="text-xs leading-relaxed text-[#7A7067]">
              ပြင်းထန်စွာဗိုက်အောင့်ခြင်း၊ သွေးလွန်ကဲခြင်းများရှိပါက နီးစပ်ရာဆေးရုံသို့ ချက်ချင်းသွားရောက်ပါ။
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white sm:rounded-[40px] shadow-[0_10px_40px_rgba(74,67,63,0.05)] sm:border border-[#E8E2DC] flex flex-col overflow-hidden relative">
          
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-[#F5F1EE] flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#E8E2DC] rounded-full overflow-hidden flex items-center justify-center text-white">
                    <div className="w-full h-full bg-[#D6CEC7] flex items-center justify-center">
                        <Heart size={20} fill="white" />
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#8BAA91] border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-sm text-[#2D2A27]">Women AI Assistant</p>
                <p className="text-[10px] text-[#8BAA91] font-bold uppercase tracking-widest">Active Now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] px-3 py-1 bg-[#F9F6F2] text-[#7A7067] rounded-full border border-[#E8E2DC]">
                စစ်ဆေးပြီးမှသာ သေချာပြောနိုင်ပါတယ်
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth bg-white">
            <AnimatePresence mode="popLayout">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} gap-2`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-4 rounded-[20px] shadow-sm text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#8BAA91] text-white rounded-br-none"
                        : "bg-[#F5F1EE] text-[#2D2A27] rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                  {m.role === "assistant" && i === 0 && (
                    <p className="text-[10px] text-[#A3978D] mt-1 italic ml-2">
                      စိတ်ချလက်ချ private အနေနဲ့ မေးနိုင်ပါတယ် 🤍
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#F5F1EE] p-4 rounded-[20px] rounded-bl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#7A7067] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#7A7067] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#7A7067] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </motion.div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSend(cat.label)}
                    className={`p-4 text-left border border-[#E8E2DC] rounded-[20px] transition-all hover:shadow-md hover:border-[#8BAA91] group relative overflow-hidden ${cat.id === "consultation" ? "bg-[#8BAA91] text-white" : "bg-white hover:bg-[#F9FAF9]"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                        <span className={`block font-semibold text-sm ${cat.id === "consultation" ? "text-white" : "text-[#5A534E]"}`}>
                            {cat.label}
                        </span>
                        <cat.icon size={16} className={cat.id === "consultation" ? "text-white/80" : "text-[#8BAA91]"} />
                    </div>
                    <span className={`text-[11px] ${cat.id === "consultation" ? "text-white/70" : "text-[#A3978D]"}`}>
                        {cat.sub}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-4 md:p-6 border-t border-[#F5F1EE] bg-white">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="စတင်မေးမြန်းရန် ဒီမှာ ရိုက်ထည့်ပါ..."
                  className="w-full bg-[#F9F6F2] border border-[#E8E2DC] rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#8BAA91]/10 focus:border-[#8BAA91] transition-all text-sm placeholder:text-[#A3978D]"
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-[#F9F6F2] border border-[#E8E2DC] rounded-full flex items-center justify-center text-[#7A7067] hover:text-[#8BAA91] hover:border-[#8BAA91] transition-all active:scale-95 disabled:opacity-40"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center text-[#A3978D] mt-4 flex items-center justify-center gap-1">
              <AlertCircle size={10} /> Educational Purpose Only • အရေးပေါ်ဖြစ်ပါက ဆေးရုံသို့ တိုက်ရိုက်သွားပါ
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Mobile only */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-14 h-14 bg-[#8BAA91] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      </div>

      {/* Deskstop Footer */}
      <footer className="hidden lg:flex px-8 py-3 bg-white/40 border-t border-[#E8E2DC] justify-between items-center text-[10px] text-[#A3978D] uppercase tracking-widest gap-2">
        <span>&copy; Thukha Medical Centre - Women Care Division</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Lock size={8} /> Private & Confidential</span>
          <span className="text-[#8BAA91] font-bold">Thukha Care AI Assistant</span>
        </div>
      </footer>
    </div>
  );
}
