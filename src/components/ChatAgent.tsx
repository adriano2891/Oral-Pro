import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, ThumbsUp, ThumbsDown, Calendar, PhoneCall } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../types';

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
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer"
          aria-label={t.chat.buttonLabel}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </div>
          <span className="hidden sm:inline font-semibold text-xs whitespace-nowrap">
            {t.chat.buttonLabel}
          </span>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 max-h-[85vh] sm:max-h-[600px] z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
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
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
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
