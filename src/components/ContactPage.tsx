import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PageView } from '../types';

interface ContactPageProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onNavigate }) => {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    interest: t.contactPage.interestOptions[0] || 'Implantologia',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError(t.common.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'formulario_contactos',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || t.common.error);
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        {onNavigate && (
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
              {t.nav.home}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{t.nav.contact}</span>
          </nav>
        )}

        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.contactPage.tag}
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight text-balance">
            {t.contactPage.title}
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            {t.contactPage.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">
                {t.contactPage.infoCardTitle}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">{t.contactPage.hoursTitle}</strong>
                    <span>{t.contactPage.hoursDesc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">{t.contactPage.emailTitle}</strong>
                    <a href="mailto:contato@oralpro.com" className="text-blue-600 hover:underline">
                      contato@oralpro.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">{t.contactPage.phoneTitle}</strong>
                    <span>{t.contactPage.phoneDesc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">{t.contactPage.socialTitle}</strong>
                    <a
                      href="https://www.instagram.com/oralpro.italia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      @oralpro.italia
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors"
                >
                  {t.contactPage.bookDirectBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Lead Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.contactPage.formTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {t.contactPage.formSubtitle}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">{t.contactPage.successTitle}</h4>
                <p className="text-xs text-emerald-800">
                  {t.contactPage.successDesc}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', clinicName: '', email: '', phone: '', interest: t.contactPage.interestOptions[0], notes: '' });
                  }}
                  className="mt-3 text-xs font-semibold text-emerald-900 underline"
                >
                  {t.contactPage.sendAnotherBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contactPage.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Afonso Meireles"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contactPage.clinicLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="Dental Clinic / Studio"
                      value={form.clinicName}
                      onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contactPage.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@clinica.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contactPage.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      placeholder="+351 912 345 678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contactPage.interestLabel}
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {t.contactPage.interestOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contactPage.notesLabel}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.contactPage.notesPlaceholder}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? t.contactPage.submittingBtn : t.contactPage.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
