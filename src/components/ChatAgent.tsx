import React, { useState, useEffect, useRef } from 'react';
import { Headset, MessageSquare, X, Send, Bot, ThumbsUp, ThumbsDown, Calendar, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../types';
import { OralProEmblem } from './OralProLogo';

export const AGENT_AVATAR_SRC = 'https://i.ibb.co/fV5RTsz1/chatgpt-4.png';
export const AGENT_AVATAR_FALLBACK = '/images/agent-avatar.png';

export const AgentAvatarImage: React.FC<{ className?: string; alt?: string }> = ({
  className = 'w-7 h-7 object-contain',
  alt = 'OralPro Atendimento',
}) => (
  <img
    src={AGENT_AVATAR_SRC}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      if (target.src !== AGENT_AVATAR_FALLBACK) {
        target.src = AGENT_AVATAR_FALLBACK;
      }
    }}
    alt={alt}
    className={className}
  />
);

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  feedback?: 'bom' | 'ruim';
}

interface ChatAgentProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: () => void;
}

export const ChatAgent: React.FC<ChatAgentProps> = ({ isOpen, onToggle, onOpenBooking }) => {
  const { t, language, setLanguage } = useLanguage();

  const [userName, setUserName] = useState<string>('');
  const [isNameConfirmed, setIsNameConfirmed] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [humanCallbackRequested, setHumanCallbackRequested] = useState<boolean>(false);
  const [callbackPhone, setCallbackPhone] = useState<string>('');
  const [showTitleBadge, setShowTitleBadge] = useState<boolean>(true);

  // Automatically hide the "Fale Connosco" title after 1 minute (reappears upon reloading the page)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitleBadge(false);
    }, 60000); // 1 minute (60 seconds)

    return () => clearTimeout(timer);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize or re-evaluate initial message on language change if only init message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'm-init',
            sender: 'bot',
            text: isNameConfirmed && userName
              ? t.chat.namedGreeting(userName)
              : t.chat.anonymousGreeting,
            timestamp: new Date().toLocaleTimeString(language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : 'en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            options: isNameConfirmed ? t.chat.quickOptions : undefined,
          },
        ];
      }
      return prev;
    });
  }, [language, isNameConfirmed, userName, t]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleNameSubmit = (nameToSet?: string) => {
    const chosenName = nameToSet !== undefined ? nameToSet : nameInput.trim();
    const timeFormatted = new Date().toLocaleTimeString(language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (chosenName) {
      setUserName(chosenName);
      setIsNameConfirmed(true);
      const greetingMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'bot',
        text: t.chat.namedGreeting(chosenName),
        timestamp: timeFormatted,
        options: t.chat.quickOptions,
      };
      setMessages((prev) => [...prev, greetingMsg]);
    } else {
      setIsNameConfirmed(true);
      const greetingMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'bot',
        text: t.chat.noNameGreeting,
        timestamp: timeFormatted,
        options: t.chat.quickOptions,
      };
      setMessages((prev) => [...prev, greetingMsg]);
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || loading) return;

    setInputText('');
    const timeFormatted = new Date().toLocaleTimeString(language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeFormatted,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userName: userName || undefined,
          history: historyPayload,
          language,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || t.common.error;

      // If backend detected user wanting to switch language, update app language!
      if (data.language && data.language !== language && (data.language === 'pt' || data.language === 'en' || data.language === 'it')) {
        setLanguage(data.language as Language);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString(language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : 'en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: t.common.timezoneNotice,
        timestamp: timeFormatted,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (msgId: string, rating: 'bom' | 'ruim') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback: rating } : m))
    );

    const msg = messages.find((m) => m.id === msgId);
    if (msg) {
      try {
        await fetch('/api/agent-metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: 'Avaliação de resposta',
            response: msg.text,
            rating,
            topic: `Chat (${language.toUpperCase()})`,
            status: 'respondido',
          }),
        });
      } catch (e) {
        // silent
      }
    }
  };

  const handleRegisterCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName || 'Inquiry via Chat',
          clinicName: 'Practice (Chat Request)',
          phone: callbackPhone,
          interest: 'Senior Human Consultant Callback',
          source: 'agente_chat',
          notes: `Language: ${language.toUpperCase()}. Visitor requested human assistance.`,
        }),
      });

      setHumanCallbackRequested(false);
      const timeFormatted = new Date().toLocaleTimeString(language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const confirmMsg: ChatMessage = {
        id: `cb-${Date.now()}`,
        sender: 'bot',
        text: t.chat.callbackRegistered(timeFormatted),
        timestamp: timeFormatted,
      };
      setMessages((prev) => [...prev, confirmMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Tooth-Shaped Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          type="button"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2 cursor-pointer focus:outline-none select-none transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
          style={{
            bottom: 'max(1rem, env(safe-area-inset-bottom, 16px))',
            right: 'max(1rem, env(safe-area-inset-right, 16px))',
          }}
          aria-label={t.chat.buttonLabel}
        >
          {/* Discrete "Fale Connosco" Indication Badge - Visible for 1 min, then smoothly hidden (reappears on page reload) */}
          <div
            className={`bg-white/95 backdrop-blur-xs text-slate-700 border border-slate-200/90 shadow-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all duration-700 ease-in-out ${
              showTitleBadge
                ? 'opacity-100 max-w-[160px] translate-x-0'
                : 'opacity-0 max-w-0 -mr-2 px-0 py-0 border-0 overflow-hidden pointer-events-none translate-x-2'
            } group-hover:opacity-100 group-hover:max-w-[160px] group-hover:mr-0 group-hover:px-2.5 group-hover:py-1 group-hover:border group-hover:border-blue-400 group-hover:shadow-md group-hover:pointer-events-auto group-hover:translate-x-0`}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 ring-1 ring-white" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 tracking-tight whitespace-nowrap">
              {t.chat.talkToUs}
            </span>
          </div>

          {/* Tooth Silhouette Shape Card filled professionally with the Provided Image */}
          <div className="relative w-13 h-14 sm:w-14 sm:h-15 flex items-center justify-center shrink-0 animate-gentle-pulse">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={AGENT_AVATAR_SRC}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== AGENT_AVATAR_FALLBACK) {
                    target.src = AGENT_AVATAR_FALLBACK;
                  }
                }}
                alt="OralPro Atendimento"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(30,64,175,0.22)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-108"
              />

              {/* Live Online Indicator Ring on top-right cusp */}
              <span className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 flex h-2.5 w-2.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1.5 ring-white shadow-xs" />
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div
          className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 max-h-[88vh] sm:max-h-[600px] z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{
            bottom: 'max(0.75rem, env(safe-area-inset-bottom, 12px))',
          }}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center ring-2 ring-white/80 shadow-xs">
                  <AgentAvatarImage className="w-full h-full object-contain" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">
                  {t.chat.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{t.chat.onlineStatus}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div
                    className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-white p-0.5 flex items-center justify-center border border-slate-200/90 shadow-xs"
                    title="OralPro Atendimento"
                  >
                    <AgentAvatarImage className="w-full h-full object-contain" />
                  </div>
                )}

                <div className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div
                    className={`rounded-xl px-3.5 py-2.5 leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                  </div>

                {/* Subtext info & rating buttons for bot */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{m.timestamp}</span>
                  {m.sender === 'bot' && m.id !== 'm-init' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFeedback(m.id, 'bom')}
                        className={`hover:text-blue-600 ${m.feedback === 'bom' ? 'text-blue-600 font-bold' : ''}`}
                        title={t.chat.thumbsUpTitle}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(m.id, 'ruim')}
                        className={`hover:text-rose-600 ${m.feedback === 'ruim' ? 'text-rose-600 font-bold' : ''}`}
                        title={t.chat.thumbsDownTitle}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Option Pills if provided */}
                {m.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          if (opt.includes('reunião') || opt.includes('meeting') || opt.includes('incontri') || opt.includes('Lisbon')) {
                            onOpenBooking();
                          } else {
                            sendMessage(opt);
                          }
                        }}
                        className="text-[11px] font-medium bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border border-blue-200/80 rounded-lg px-2.5 py-1 transition-colors text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

            {/* Name Input step for anonymous visitor */}
            {!isNameConfirmed && (
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                <p className="text-[11px] font-semibold text-slate-700">
                  {t.chat.namePrompt}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.chat.namePlaceholder}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                    className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    onClick={() => handleNameSubmit()}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                  >
                    {t.chat.confirmNameBtn}
                  </button>
                </div>
                <button
                  onClick={() => handleNameSubmit('')}
                  className="text-[10px] text-slate-500 hover:text-slate-700 underline block"
                >
                  {t.chat.skipNameBtn}
                </button>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">{t.chat.typingIndicator}</span>
              </div>
            )}

            {/* Human callback drawer */}
            {humanCallbackRequested && (
              <form onSubmit={handleRegisterCallback} className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-900">
                    {t.chat.humanModalTitle}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHumanCallbackRequested(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-600">
                  {t.chat.humanModalDesc}
                </p>
                <input
                  type="tel"
                  required
                  placeholder={t.chat.phonePlaceholder}
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  {t.chat.submitCallbackBtn}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Action Strip (Booking & Human Contact) */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <button
              onClick={onOpenBooking}
              className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>{t.chat.bookBtn}</span>
            </button>

            <button
              onClick={() => setHumanCallbackRequested(true)}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{t.chat.requestHumanBtn}</span>
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder={t.chat.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputText.trim() || loading}
              className="p-2 bg-blue-600 disabled:bg-slate-300 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
              aria-label={t.common.confirm}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
