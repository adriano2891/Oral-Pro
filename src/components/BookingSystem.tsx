import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, X, ChevronRight, Download, ExternalLink, RefreshCw, User, Building, Mail, Phone } from 'lucide-react';
import { Booking } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface BookingSystemProps {
  isOpenModal?: boolean;
  onClose?: () => void;
  preselectedDate?: string;
  preselectedTime?: string;
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  isOpenModal = false,
  onClose,
  preselectedDate,
  preselectedTime,
  onBookingSuccess,
}) => {
  const { t, language } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [meetingType, setMeetingType] = useState<'diagnostico' | 'estrategia' | 'acompanhamento'>('diagnostico');
  const [selectedDate, setSelectedDate] = useState<string>(preselectedDate || '');
  const [selectedTime, setSelectedTime] = useState<string>(preselectedTime || '');

  // Preserved Form State across language switches
  const [name, setName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [chairsCount, setChairsCount] = useState(t.booking.chairsOptions[1] || '3 a 4 gabinetes');
  const [targetServices, setTargetServices] = useState<string[]>(['Implantologia']);
  const [notes, setNotes] = useState('');

  // Async states
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Array<{ date: string; time: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [calendarLink, setCalendarLink] = useState<string>('');

  const fetchAvailability = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const occupied = data.data
          .filter((b: Booking) => b.status !== 'cancelado')
          .map((b: Booking) => ({ date: b.date, time: b.time }));
        setBookedSlots(occupied);
      }
    } catch (err) {
      console.error('Failed to load slots:', err);
    }
  };

  useEffect(() => {
    fetchAvailability();
    if (!selectedDate) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) d.setDate(d.getDate() + 1);
      if (d.getDay() === 6) d.setDate(d.getDate() + 2);
      setSelectedDate(d.toISOString().split('T')[0]);
    }
  }, []);

  const availableSlots = [
    '09:30', '10:30', '11:30', '14:30', '15:30', '16:30', '17:30',
  ];

  const handleServiceToggle = (service: string) => {
    if (targetServices.includes(service)) {
      setTargetServices(targetServices.filter((s) => s !== service));
    } else {
      setTargetServices([...targetServices, service]);
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedTime) {
      setError(t.common.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          clinicName: clinicName || 'Dental Practice',
          email,
          phone,
          type: meetingType,
          date: selectedDate,
          time: selectedTime,
          chairsCount,
          targetServices,
          notes,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || t.booking.conflictError);
      }

      setConfirmedBooking(data.data);
      setCalendarLink(data.calendarLink || '');
      setStep(4);
      if (onBookingSuccess) onBookingSuccess(data.data);
    } catch (err: any) {
      setError(err.message || t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const downloadIcsFile = () => {
    if (!confirmedBooking) return;
    const cleanDate = confirmedBooking.date.replace(/-/g, '');
    const cleanTime = confirmedBooking.time.replace(/:/g, '') + '00';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//OralPro//Booking//${language.toUpperCase()}
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${confirmedBooking.id}@oralpro.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;TZID=Europe/Lisbon:${cleanDate}T${cleanTime}
DTEND;TZID=Europe/Lisbon:${cleanDate}T${cleanTime}
SUMMARY:OralPro: ${confirmedBooking.typeLabel}
DESCRIPTION:Strategic commercial diagnostic with the OralPro team for ${confirmedBooking.clinicName}. Lisbon Time (Europe/Lisbon).
LOCATION:Google Meet / Online
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `OralPro-${confirmedBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const content = (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Header bar with Europe/Lisbon note */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base sm:text-lg">
              {t.booking.modalTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span>{t.common.lisbonTime}</span>
          </div>
        </div>

        {isOpenModal && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Wizard Step Indicator */}
      <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className={step >= 1 ? 'text-blue-600 font-bold' : ''}>{t.booking.stepLabel1}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={step >= 2 ? 'text-blue-600 font-bold' : ''}>{t.booking.stepLabel2}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={step >= 3 ? 'text-blue-600 font-bold' : ''}>{t.booking.stepLabel3}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={step >= 4 ? 'text-emerald-600 font-bold' : ''}>{t.booking.stepLabel4}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Meeting Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                {t.booking.step1Title}
              </h4>
              <p className="text-xs text-slate-600">
                {t.booking.step1Subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {t.booking.meetingTypes.map((mt) => (
                <div
                  key={mt.id}
                  onClick={() => setMeetingType(mt.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    meetingType === mt.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                      {mt.duration}
                    </span>
                    {meetingType === mt.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 mb-1">
                    {mt.title}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {mt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{t.common.continue}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Slot Selection in Lisbon Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-0.5">
                  {t.booking.step2Title}
                </h4>
                <p className="text-xs text-slate-500">
                  {t.booking.step2Subtitle}
                </p>
              </div>

              <button
                onClick={fetchAvailability}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.booking.refreshSlots}</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  {t.booking.dateLabel}
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-[11px] text-slate-500">
                  {t.booking.daysNotice}
                </p>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  {t.booking.timeSlotsLabel}
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => {
                    const isOccupied = bookedSlots.some(
                      (b) => b.date === selectedDate && b.time === slot
                    );

                    return (
                      <button
                        key={slot}
                        disabled={isOccupied}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                          isOccupied
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : selectedTime === slot
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/30'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {selectedTime && (
                  <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900 mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.booking.slotSelectedNotice(selectedDate, selectedTime)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                ← {t.common.back}
              </button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-blue-600 disabled:bg-slate-300 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{t.common.continue}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Clinic & Contact Details */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-0.5">
                {t.booking.step3Title}
              </h4>
              <p className="text-xs text-slate-500">
                {t.booking.step3Subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={t.booking.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.clinicLabel}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={t.booking.clinicPlaceholder}
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder={t.booking.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder={t.booking.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.chairsLabel}
                </label>
                <select
                  value={chairsCount}
                  onChange={(e) => setChairsCount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  {t.booking.chairsOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.specialtiesLabel}
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[t.hero.specImplants, t.hero.specOrtho, t.hero.specAesthetics].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => handleServiceToggle(s)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                        targetServices.includes(s)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.booking.notesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={t.booking.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                ← {t.common.back}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 disabled:bg-slate-400 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{loading ? t.booking.btnProcessing : t.booking.btnConfirm}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmed State */}
        {step === 4 && confirmedBooking && (
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                {t.booking.bookingSuccessTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.booking.bookingSuccessSubtitle}
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">{t.booking.ticketId}</span>
                <span className="font-mono font-bold text-slate-900">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.booking.ticketType}</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.typeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.booking.ticketDateTime}</span>
                <span className="font-bold text-blue-700">
                  {confirmedBooking.date} {confirmedBooking.time} ({t.common.lisbonTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.booking.ticketClinic}</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.clinicName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.booking.ticketDoctor}</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.name}</span>
              </div>
            </div>

            {/* Calendar & ICS Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {calendarLink && (
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.booking.googleCalendarBtn}</span>
                </a>
              )}

              <button
                onClick={downloadIcsFile}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>{t.booking.downloadIcsBtn}</span>
              </button>
            </div>

            {isOpenModal && onClose && (
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  {t.common.close}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            {t.common.scheduleMeeting}
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            {t.booking.modalTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t.booking.step2Subtitle}
          </p>
        </div>
        {content}
      </div>
    </div>
  );
};
