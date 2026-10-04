import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  Lock,
  LogOut,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Layers,
} from 'lucide-react';
import { Booking, Lead, KnowledgeItem, MediaAsset, AgentMetric } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { OralProLogo } from './OralProLogo';
import { SiteContentManager } from './SiteContentManager';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { t } = useLanguage();

  // Simple auth gate with PIN: admin2026
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('oralpro_admin_auth') === 'admin2026';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'agendamentos' | 'leads' | 'conversas' | 'conhecimento' | 'conteudos' | 'media' | 'melhoria'
  >('conteudos');

  // Real-time Data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [metrics, setMetrics] = useState<AgentMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<string>(t.admin.syncStatus);

  // Filters
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calendarView, setCalendarView] = useState<'tabela' | 'diario' | 'semanal' | 'mensal'>('tabela');

  // Edit / Notes modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editNotes, setEditNotes] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleTime, setRescheduleTime] = useState<string>('');

  // Knowledge form
  const [showAddKbModal, setShowAddKbModal] = useState<boolean>(false);
  const [kbTitle, setKbTitle] = useState('');
  const [kbContent, setKbContent] = useState('');
  const [kbCategory, setKbCategory] = useState<'servicos' | 'metodo' | 'precos_condicoes' | 'faq' | 'identidade'>('faq');
  const [kbVerified, setKbVerified] = useState(true);

  // Media form
  const [showAddMediaModal, setShowAddMediaModal] = useState<boolean>(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaSection, setMediaSection] = useState<'hero' | 'sobre' | 'metodo' | 'eventos' | 'casos'>('hero');
  const [mediaAspect, setMediaAspect] = useState<'16:9' | '4:3' | '1:1'>('16:9');
  const [mediaOrigin, setMediaOrigin] = useState('Instagram @oralpro.italia');
  const [mediaAuthorized, setMediaAuthorized] = useState(true);

  // Suggestions for AI improvement pending human validation
  const [pendingSuggestions, setPendingSuggestions] = useState<Array<{ id: string; question: string; suggestedAnswer: string; status: 'pendente' | 'aprovado' }>>([
    {
      id: 'sug-1',
      question: 'Qual o investimento mínimo mensal recomendado para captação de implantes?',
      suggestedAnswer: 'O investimento em campanhas recomendado para implantes começa normalmente a partir de 500€ a 1000€/mês conforme a dimensão do mercado local.',
      status: 'pendente',
    },
    {
      id: 'sug-2',
      question: 'A OralPro disponibiliza apoio na contratação de rececionistas?',
      suggestedAnswer: 'A OralPro apoia no perfil de competências e formação comercial, mas a contratação formal permanece a cargo da administração da clínica.',
      status: 'pendente',
    },
  ]);

  const loadAllData = async () => {
    try {
      setSyncStatus(t.common.loading);
      const [resB, resL, resK, resM, resA] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/leads'),
        fetch('/api/knowledge-base'),
        fetch('/api/media'),
        fetch('/api/agent-metrics'),
      ]);

      const [dataB, dataL, dataK, dataM, dataA] = await Promise.all([
        resB.json(),
        resL.json(),
        resK.json(),
        resM.json(),
        resA.json(),
      ]);

      if (dataB.success) setBookings(dataB.data);
      if (dataL.success) setLeads(dataL.data);
      if (dataK.success) setKnowledge(dataK.data);
      if (dataM.success) setMedia(dataM.data);
      if (dataA.success) setMetrics(dataA.data);

      setSyncStatus(t.admin.syncStatus);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setSyncStatus('Reconnecting...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      const interval = setInterval(loadAllData, 6000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = passwordInput.trim();
    if (cleanPin === 'admin2026') {
      setIsAuthenticated(true);
      setAuthError(null);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('oralpro_admin_auth', 'admin2026');
      }
    } else {
      setAuthError('PIN incorreto. Introduza o PIN autorizado.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('oralpro_admin_auth');
    }
  };

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    try {
      const payload: any = {
        status: newStatus || selectedBooking.status,
        notes: editNotes,
      };

      if (rescheduleDate && rescheduleTime) {
        payload.date = rescheduleDate;
        payload.time = rescheduleTime;
      }

      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || t.common.error);
        return;
      }

      setSelectedBooking(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || t.common.error);
    }
  };

  const handleAddKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: kbCategory,
          title: kbTitle,
          content: kbContent,
          verified: kbVerified,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddKbModal(false);
        setKbTitle('');
        setKbContent('');
        loadAllData();
      }
    } catch (err) {
      alert(t.common.error);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: mediaTitle,
          url: mediaUrl,
          section: mediaSection,
          aspectRatio: mediaAspect,
          origin: mediaOrigin,
          authorized: mediaAuthorized,
          status: 'confirmado',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddMediaModal(false);
        setMediaTitle('');
        setMediaUrl('');
        loadAllData();
      }
    } catch (err) {
      alert(t.common.error);
    }
  };

  const handleApproveSuggestion = async (sugId: string) => {
    const sug = pendingSuggestions.find((s) => s.id === sugId);
    if (!sug) return;

    try {
      await fetch('/api/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'faq',
          title: sug.question,
          content: sug.suggestedAnswer,
          verified: true,
          notes: 'Aprovado via módulo de melhoria contínua do agente.',
        }),
      });

      setPendingSuggestions((prev) =>
        prev.map((s) => (s.id === sugId ? { ...s, status: 'aprovado' } : s))
      );
      loadAllData();
    } catch (err) {
      alert(t.common.error);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      bookingFilterStatus === 'todos' || b.status === bookingFilterStatus;
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Subtle radial glow background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Brand Emblem & Logo */}
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <OralProLogo size="md" light />
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider mt-1">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Painel de Gestão</span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Acesso com PIN de Segurança
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Introduza o PIN de acesso autorizado para visualizar agendamentos, leads e configurações.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                PIN de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Introduza o PIN"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  className="w-full pl-4 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-center text-base tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  title={showPassword ? 'Ocultar PIN' : 'Mostrar PIN'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Desbloquear Acesso</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onBackToSite}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                ← Voltar ao site OralPro
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-base tracking-tight font-display">
              {t.admin.headerTitle}
            </span>
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{syncStatus}</span>
              <span className="text-slate-500">·</span>
              <span>Europe/Lisbon</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector inside Admin */}
            <LanguageSelector />

            <button
              onClick={loadAllData}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              {t.admin.viewSiteBtn}
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title={t.admin.logoutBtn}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'agendamentos'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>{t.admin.tabBookings} ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.admin.tabLeads} ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conversas')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'conversas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.admin.tabConversations} ({metrics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conhecimento')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'conhecimento'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.admin.tabKnowledge} ({knowledge.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conteudos')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'conteudos'
                ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 font-bold'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Conteúdos e imagens do site</span>
          </button>

          <button
            onClick={() => setActiveTab('melhoria')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'melhoria'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.admin.tabAiImprovement} ({pendingSuggestions.filter((s) => s.status === 'pendente').length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'agendamentos' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={t.admin.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 w-64"
                  />
                </div>

                <select
                  value={bookingFilterStatus}
                  onChange={(e) => setBookingFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none"
                >
                  <option value="todos">{t.admin.allStatuses}</option>
                  <option value="confirmado">{t.admin.statusConfirmed}</option>
                  <option value="concluido">{t.admin.statusCompleted}</option>
                  <option value="cancelado">{t.admin.statusCancelled}</option>
                  <option value="nao_compareceu">{t.admin.statusNoShow}</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setCalendarView('tabela')}
                  className={`px-3 py-1 rounded transition-colors ${
                    calendarView === 'tabela' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {t.admin.viewTable}
                </button>
                <button
                  onClick={() => setCalendarView('diario')}
                  className={`px-3 py-1 rounded transition-colors ${
                    calendarView === 'diario' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {t.admin.viewToday}
                </button>
                <button
                  onClick={() => setCalendarView('semanal')}
                  className={`px-3 py-1 rounded transition-colors ${
                    calendarView === 'semanal' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {t.admin.viewWeek}
                </button>
                <button
                  onClick={() => setCalendarView('mensal')}
                  className={`px-3 py-1 rounded transition-colors ${
                    calendarView === 'mensal' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {t.admin.viewMonth}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">{t.admin.colDateTime}</th>
                      <th className="py-3 px-4">{t.admin.colDoctorClinic}</th>
                      <th className="py-3 px-4">{t.admin.colMeetingType}</th>
                      <th className="py-3 px-4">{t.admin.colStructureFocus}</th>
                      <th className="py-3 px-4">{t.admin.colStatus}</th>
                      <th className="py-3 px-4 text-right">{t.admin.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          {t.admin.noBookingsFound}
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-slate-900">
                            <div className="flex items-center gap-1.5 font-bold text-blue-700">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{b.time}</span>
                            </div>
                            <span className="text-[11px] text-slate-500">{b.date}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <strong className="block text-slate-900">{b.name}</strong>
                            <span className="text-slate-600 flex items-center gap-1">
                              <Building className="w-3 h-3 text-slate-400" />
                              {b.clinicName}
                            </span>
                            <span className="text-slate-400 text-[10px] block mt-0.5">
                              {b.email} · {b.phone}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800">{b.typeLabel}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div>{b.chairsCount || '—'}</div>
                            {b.targetServices && b.targetServices.length > 0 && (
                              <div className="text-[10px] text-blue-600 mt-0.5">
                                {b.targetServices.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                b.status === 'confirmado'
                                  ? 'bg-blue-100 text-blue-800'
                                  : b.status === 'concluido'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : b.status === 'cancelado'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedBooking(b);
                                setNewStatus(b.status);
                                setEditNotes(b.notes || '');
                                setRescheduleDate(b.date);
                                setRescheduleTime(b.time);
                              }}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                            >
                              {t.admin.manageBtn}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {t.admin.leadsTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.admin.leadsSubtitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  Total: {leads.length}
                </span>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">{t.admin.colDoctorClinic}</th>
                    <th className="py-3 px-4">{t.admin.colContact}</th>
                    <th className="py-3 px-4">{t.admin.colInterest}</th>
                    <th className="py-3 px-4">{t.admin.colSource}</th>
                    <th className="py-3 px-4">{t.admin.colStatus}</th>
                    <th className="py-3 px-4">{t.admin.colNotes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block">{l.name}</strong>
                        <span className="text-slate-500">{l.clinicName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-slate-700">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{l.email || '—'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-700 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{l.phone || '—'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {l.interest}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {l.source}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold text-blue-700 uppercase">
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {l.notes || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONVERSATIONS */}
        {activeTab === 'conversas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {t.admin.conversationsTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.admin.conversationsSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {metrics.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-blue-700">{m.topic}</span>
                      <span>{new Date(m.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="font-semibold text-slate-900">
                      "{m.query}"
                    </div>
                    <div className="text-slate-700 bg-white p-2 rounded border border-slate-200">
                      {m.response}
                    </div>
                    {m.rating && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t.admin.ratedByVisitor} {m.rating}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE BASE */}
        {activeTab === 'conhecimento' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {t.admin.kbTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.admin.kbSubtitle}
                </p>
              </div>

              <button
                onClick={() => setShowAddKbModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.admin.addArticleBtn}</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {knowledge.map((k) => (
                <div key={k.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {k.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          k.verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {k.verified ? t.common.verified : t.common.pendingValidation}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mb-2">
                      {k.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {k.content}
                    </p>
                  </div>

                  {k.notes && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
                      {k.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTEÚDOS E IMAGENS DO SITE */}
        {activeTab === 'conteudos' && (
          <SiteContentManager />
        )}

        {/* TAB 6: CONTINUOUS AI IMPROVEMENT */}
        {activeTab === 'melhoria' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {t.admin.aiTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t.admin.aiSubtitle}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {pendingSuggestions.map((sug) => (
                  <div
                    key={sug.id}
                    className={`p-4 rounded-xl border transition-all ${
                      sug.status === 'aprovado'
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">
                        {t.admin.aiRecurrentQuestion}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          sug.status === 'aprovado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sug.status === 'aprovado' ? t.admin.aiPublishedBadge : t.admin.aiPendingBadge}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-blue-900 mb-2">
                      "{sug.question}"
                    </p>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 mb-3">
                      <strong>{t.admin.aiSuggestedAnswer}</strong>
                      <p className="mt-1">{sug.suggestedAnswer}</p>
                    </div>

                    {sug.status === 'pendente' && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleApproveSuggestion(sug.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.admin.aiApproveBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Booking & Notes Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {t.admin.manageModalTitle(selectedBooking.id)}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.admin.colStatus}
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="confirmado">{t.admin.statusConfirmed}</option>
                  <option value="concluido">{t.admin.statusCompleted}</option>
                  <option value="cancelado">{t.admin.statusCancelled}</option>
                  <option value="nao_compareceu">{t.admin.statusNoShow}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.rescheduleDateLabel}
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admin.rescheduleTimeLabel}
                  </label>
                  <input
                    type="text"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    placeholder="11:00"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.admin.internalNotesLabel}
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  {t.admin.saveChangesBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Knowledge Modal */}
      {showAddKbModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {t.admin.addArticleBtn}
              </h3>
              <button
                onClick={() => setShowAddKbModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddKnowledge} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Categoria
                </label>
                <select
                  value={kbCategory}
                  onChange={(e) => setKbCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="servicos">Serviços / Services</option>
                  <option value="metodo">Método / Method</option>
                  <option value="precos_condicoes">Preços / Pricing</option>
                  <option value="faq">FAQ</option>
                  <option value="identidade">Identidade / Identity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título / Pergunta
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Como é feito o acompanhamento?"
                  value={kbTitle}
                  onChange={(e) => setKbTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Conteúdo / Resposta Oficial
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Conteúdo oficial..."
                  value={kbContent}
                  onChange={(e) => setKbContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddKbModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  {t.common.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {showAddMediaModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {t.admin.addMediaBtn}
              </h3>
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  required
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secção
                  </label>
                  <select
                    value={mediaSection}
                    onChange={(e) => setMediaSection(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="hero">Hero</option>
                    <option value="eventos">Eventos</option>
                    <option value="metodo">Método</option>
                    <option value="sobre">Sobre</option>
                    <option value="casos">Casos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={mediaAspect}
                    onChange={(e) => setMediaAspect(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Origem
                </label>
                <input
                  type="text"
                  value={mediaOrigin}
                  onChange={(e) => setMediaOrigin(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddMediaModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  {t.common.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
