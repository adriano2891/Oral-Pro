import React, { useState } from 'react';
import { Instagram, ExternalLink, ShieldCheck, ZoomIn, X, Camera, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export interface GalleryPhoto {
  id: string;
  category: 'fundador' | 'eventos' | 'instalacoes' | 'equipa' | 'tratamentos';
  title: string;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  alt: string;
  instagramRef: string;
  aspect: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    category: 'fundador',
    title: 'Mario Provenzano em Apresentação Oficial',
    categoryLabel: 'Fundador & Visão',
    description: 'Apresentação do método OralPro para médicos dentistas e diretores de clínicas em Itália, abordando a previsibilidade na captação de pacientes de alto valor.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    alt: 'Mario Provenzano em apresentação sobre captação e marketing para clínicas dentárias em Itália',
    instagramRef: 'Instagram @oralpro.italia · Publicação Oficial',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'photo-2',
    category: 'eventos',
    title: 'Masterclass & Eventi dal Vivo em Itália',
    categoryLabel: 'Eventos ao Vivo',
    description: 'Encontro presencial de formação e partilha de protocolos comerciais entre diretores de clínicas dentárias e a equipa da OralPro.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    alt: 'Masterclass presencial da OralPro com diretores clínicos e médicos dentistas',
    instagramRef: 'Instagram @oralpro.italia · Destaque Eventi',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'photo-3',
    category: 'instalacoes',
    title: 'Ambiente Clínico & Tecnologia de Excelência',
    categoryLabel: 'Instalações & Clínicas',
    description: 'Espaço odontológico moderno de clínica parceira em Itália, equipado com tecnologias de diagnóstico e conforto para tratamentos complexos.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    alt: 'Consultório odontológico de clínica parceira OralPro com equipamentos de última geração',
    instagramRef: 'Instagram @oralpro.italia · Clínicas Parceiras',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'photo-4',
    category: 'equipa',
    title: 'Consultoria Estratégica com Equipas de Receção',
    categoryLabel: 'Equipa & Triagem',
    description: 'Alinhamento prático de triagem e atendimento humanizado para secretárias clínicas, garantindo a qualificação rigorosa de pacientes.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sessão de consultoria e acompanhamento da equipa de receção de clínica odontológica',
    instagramRef: 'Instagram @oralpro.italia · Bastidores & Formação',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'photo-5',
    category: 'tratamentos',
    title: 'Foco em Implantologia & Cirurgia Avançada',
    categoryLabel: 'Tratamentos de Alto Valor',
    description: 'Ambiente de intervenção cirúrgica com padrões de biossegurança rigorosos, dedicado a procedimentos de implantes dentários e reabilitação completa.',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    alt: 'Ambiente cirúrgico odontológico focado em tratamentos de implantologia e reabilitação oral',
    instagramRef: 'Instagram @oralpro.italia · Protocolo Clínico',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 'photo-6',
    category: 'instalacoes',
    title: 'Planeamento Estético & Ortodontia Digital',
    categoryLabel: 'Tecnologia & Diagnóstico',
    description: 'Tecnologia de diagnóstico digital e visualização 3D utilizada para o planeamento de alinhadores transparentes e facetas dentárias.',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    alt: 'Gabinete com tecnologia de planeamento digital para alinhadores e estética odontológica',
    instagramRef: 'Instagram @oralpro.italia · Tecnologia Clínica',
    aspect: 'aspect-[16/10]',
  },
];

export const InstagramGallerySection: React.FC = () => {
  const { language } = useLanguage();
  const { getSlot } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  // Dynamically map slots from CMS
  const dynamicPhotos = GALLERY_PHOTOS.map((photo, index) => {
    const slotKey = `gallery_${index + 1}`;
    const slot = getSlot(slotKey, photo.imageUrl, photo.alt);
    return {
      ...photo,
      imageUrl: slot.imageUrl || photo.imageUrl,
      alt: slot.altText || photo.alt,
    };
  });

  const filteredPhotos =
    selectedCategory === 'todos'
      ? dynamicPhotos
      : dynamicPhotos.filter((p) => p.category === selectedCategory);

  const categories = [
    { key: 'todos', label: language === 'it' ? 'Tutte le foto' : language === 'en' ? 'All photos' : 'Todas as fotos' },
    { key: 'fundador', label: language === 'it' ? 'Mario Provenzano' : language === 'en' ? 'Founder' : 'Fundador' },
    { key: 'eventos', label: language === 'it' ? 'Eventi dal vivo' : language === 'en' ? 'Live Events' : 'Eventos ao Vivo' },
    { key: 'instalacoes', label: language === 'it' ? 'Studi Partner' : language === 'en' ? 'Partner Clinics' : 'Instalações & Clínicas' },
    { key: 'equipa', label: language === 'it' ? 'Team & Segreteria' : language === 'en' ? 'Team & Triage' : 'Equipa & Triagem' },
    { key: 'tratamentos', label: language === 'it' ? 'Trattamenti' : language === 'en' ? 'Treatments' : 'Tratamentos' },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Instagram className="w-3.5 h-3.5 text-rose-400" />
              <span>@oralpro.italia · Galeria Oficial</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              {language === 'it'
                ? 'Dietro le Quinte, Eventi & Studi Partner'
                : language === 'en'
                ? 'Behind the Scenes, Live Events & Partner Clinics'
                : 'Bastidores, Eventos & Clínicas Parceiras'}
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
              {language === 'it'
                ? 'Fotografie reali tratte dal nostro percorso in Italia: masterclass formative con dentisti, consulenza nei reparti di segreteria e ambienti clinici di alto profilo.'
                : language === 'en'
                ? 'Real photographic records from our Italian operations: masterclasses with dentists, frontline triage consulting, and partner dental facilities.'
                : 'Registos fotográficos do percurso da OralPro em Itália: formações presenciais com médicos dentistas, acompanhamento de equipas e instalações de clínicas parceiras.'}
            </p>
          </div>

          {/* External Instagram Profile Button */}
          <div className="shrink-0">
            <a
              href="https://www.instagram.com/oralpro.italia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-semibold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-pink-600/20 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>{language === 'it' ? 'Segui @oralpro.italia' : language === 'en' ? 'Follow @oralpro.italia' : 'Seguir @oralpro.italia'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-blue-500/50 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden bg-slate-950 aspect-[16/10]">
                <img
                  src={photo.imageUrl}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-blue-300 border border-slate-800">
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Hover zoom icon */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-blue-600/90 text-white backdrop-blur-sm shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Caption & Origin */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                    <Instagram className="w-3 h-3" />
                    <span>{photo.instagramRef}</span>
                  </span>
                  <span className="text-blue-400 font-semibold group-hover:underline">
                    Ver detalhe →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Deontology & Ethics Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                {language === 'it'
                  ? 'Autenticità & Deontologia Odontoiatrica'
                  : language === 'en'
                  ? 'Authenticity & Dental Ethics Compliance'
                  : 'Autenticidade & Conformidade Deontológica'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'it'
                  ? 'Tutte le immagini riflettono attività reali, studi associati e formazioni. Non pubblichiamo comparazioni cliniche prive di previo consenso informato.'
                  : language === 'en'
                  ? 'All images reflect real activities, partner clinics, and live masterclasses. Clinical case records require explicit informed consent.'
                  : 'Todas as imagens refletem atividades reais, clínicas parceiras e masterclasses. Casos clínicos com pacientes exigem consentimento prévio documentado.'}
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/oralpro.italia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 whitespace-nowrap"
          >
            Abrir perfil @oralpro.italia
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase">
                  {activePhoto.categoryLabel}
                </span>
                <span className="text-xs text-rose-400 font-semibold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{activePhoto.instagramRef}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {activePhoto.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {activePhoto.alt}
                </span>
                <a
                  href="https://www.instagram.com/oralpro.italia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Ver no Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
