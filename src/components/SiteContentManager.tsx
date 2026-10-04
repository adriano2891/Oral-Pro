import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Upload,
  Search,
  CheckCircle2,
  AlertTriangle,
  Monitor,
  Smartphone,
  Save,
  Send,
  RotateCcw,
  Sparkles,
  Link,
  Layers,
  FolderOpen,
  X,
  ExternalLink,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SiteContentSlot, CustomSection, MediaLibraryItem } from '../types';

export const SiteContentManager: React.FC = () => {
  const {
    slots,
    customSections,
    mediaLibrary,
    lastPublished,
    hasUnpublished,
    updateSlot,
    publishChanges,
    revertDrafts,
    saveCustomSection,
    deleteCustomSection,
    uploadMedia,
    deleteMedia,
    refreshContent,
  } = useSiteContent();

  // Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'campos' | 'seccoes' | 'biblioteca'>('campos');

  // Filter states
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedSlotForImage, setSelectedSlotForImage] = useState<SiteContentSlot | null>(null);
  const [showSectionModal, setShowSectionModal] = useState<boolean>(false);
  const [editingSection, setEditingSection] = useState<Partial<CustomSection> | null>(null);
  const [deleteConfirmSection, setDeleteConfirmSection] = useState<CustomSection | null>(null);
  const [previewModalSlot, setPreviewModalSlot] = useState<SiteContentSlot | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Status feedback
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setStatusNotice({ type, message });
    setTimeout(() => {
      setStatusNotice(null);
    }, 4500);
  };

  // 1. Existing Slots Handlers
  const handleSlotFieldChange = async (
    key: string,
    field: 'draftAspectRatio' | 'draftFit' | 'draftPosition' | 'draftAltText' | 'draftImageUrl',
    value: any
  ) => {
    const success = await updateSlot(key, { [field]: value });
    if (success) {
      showNotification('info', 'Rascunho atualizado. Clique em "Publicar alterações" para aplicar ao site público.');
    }
  };

  const handleRemoveImageFromSlot = async (slot: SiteContentSlot) => {
    if (confirm(`Pretende remover a imagem do campo "${slot.pageLabel} > ${slot.sectionLabel}"?`)) {
      await updateSlot(slot.key, { draftImageUrl: '' });
      showNotification('info', 'Imagem removida no rascunho.');
    }
  };

  // 2. Publish / Revert
  const handlePublishAll = async () => {
    setIsSubmitting(true);
    const success = await publishChanges();
    setIsSubmitting(false);
    if (success) {
      showNotification('success', 'Todas as alterações foram publicadas no site com sucesso!');
    } else {
      showNotification('error', 'Erro ao publicar alterações.');
    }
  };

  const handleRevertAll = async () => {
    if (confirm('Pretende descartar todos os rascunhos não publicados e restaurar as versões originais?')) {
      setIsSubmitting(true);
      const success = await revertDrafts();
      setIsSubmitting(false);
      if (success) {
        showNotification('info', 'Rascunhos descartados. O conteúdo publicado foi restaurado.');
      }
    }
  };

  // 3. Image Upload (Local file conversion to compressed Base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetSlot?: SiteContentSlot) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecione um ficheiro de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);

      // Add to media library
      await uploadMedia({
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: base64,
        category: targetSlot ? targetSlot.pageLabel : 'Upload Local',
        size: `${sizeKb} KB`,
        aspectRatio: '16:9',
        origin: 'Carregamento do Computador',
      });

      // If targeted to a slot, assign it as draft
      if (targetSlot) {
        await updateSlot(targetSlot.key, { draftImageUrl: base64 });
      }

      showNotification('success', `Imagem "${file.name}" carregada com sucesso!`);
      setSelectedSlotForImage(null);
    };
    reader.readAsDataURL(file);
  };

  // 4. Custom Sections Handlers
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection || !editingSection.title) return;

    setIsSubmitting(true);
    const success = await saveCustomSection(editingSection);
    setIsSubmitting(false);
    if (success) {
      showNotification('success', 'Secção personalizada guardada com sucesso!');
      setShowSectionModal(false);
      setEditingSection(null);
    } else {
      showNotification('error', 'Erro ao guardar secção.');
    }
  };

  const handleDuplicateSection = async (sec: CustomSection) => {
    const duplicate: Partial<CustomSection> = {
      page: sec.page,
      sectionName: `${sec.sectionName} (Cópia)`,
      title: sec.title,
      text: sec.text,
      images: [...sec.images],
      buttonText: sec.buttonText,
      buttonLink: sec.buttonLink,
      order: sec.order + 1,
      status: 'oculto', // starts hidden for safety
    };
    await saveCustomSection(duplicate);
    showNotification('success', `Secção duplicada como rascunho oculto.`);
  };

  const handleToggleHideSection = async (sec: CustomSection) => {
    const newStatus = sec.status === 'publicado' ? 'oculto' : 'publicado';
    await saveCustomSection({ id: sec.id, status: newStatus });
    showNotification('info', `Secção "${sec.sectionName}" agora está ${newStatus}.`);
  };

  const handleMoveSection = async (sec: CustomSection, direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? Math.max(1, sec.order - 1) : sec.order + 1;
    await saveCustomSection({ id: sec.id, order: newOrder });
    showNotification('info', 'Ordem atualizada.');
  };

  const handleConfirmDeleteSection = async () => {
    if (!deleteConfirmSection) return;
    setIsSubmitting(true);
    const success = await deleteCustomSection(deleteConfirmSection.id);
    setIsSubmitting(false);
    if (success) {
      showNotification('success', `Secção "${deleteConfirmSection.sectionName}" eliminada.`);
      setDeleteConfirmSection(null);
    } else {
      showNotification('error', 'Erro ao eliminar secção.');
    }
  };

  // Filtered slots
  const filteredSlots = slots.filter((slot) => {
    const matchesPage = selectedPageFilter === 'todos' || slot.page === selectedPageFilter;
    const matchesSearch =
      !searchQuery ||
      slot.sectionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.pageLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.altText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPage && matchesSearch;
  });

  // Filtered Library
  const filteredLibrary = mediaLibrary.filter((item) => {
    if (!searchQuery) return true;
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.usedIn.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, selectedSlotForImage || undefined)}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
      />

      {/* Header & Global Actions Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Gestor de Conteúdos & Imagens</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Conteúdos e Imagens do Site
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Faça a gestão e substituição de todas as fotografias, enquadramentos e novos blocos das páginas da OralPro sem alterar código.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {hasUnpublished && (
            <button
              onClick={handleRevertAll}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer border border-slate-700"
              title="Descartar rascunhos"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Descartar Rascunhos</span>
            </button>
          )}

          <button
            onClick={handlePublishAll}
            disabled={isSubmitting || !hasUnpublished}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md cursor-pointer ${
              hasUnpublished
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 ring-2 ring-blue-400'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publicar Alterações {hasUnpublished && '(Pendentes)'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusNotice && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium border animate-fadeIn ${
            statusNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : statusNotice.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusNotice.message}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('campos')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'campos'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Imagens em Campos Existentes</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {slots.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('seccoes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'seccoes'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novos Campos & Secções</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              {customSections.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('biblioteca')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'biblioteca'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Biblioteca de Imagens</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              {mediaLibrary.length}
            </span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Procurar campo ou imagem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUBTAB 1: IMAGENS EM CAMPOS EXISTENTES */}
      {/* ============================================================== */}
      {activeSubTab === 'campos' && (
        <div className="space-y-6">
          {/* Page Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {[
              { key: 'todos', label: 'Todas as Páginas' },
              { key: 'home', label: 'Página Inicial' },
              { key: 'sobre', label: 'Sobre a OralPro' },
              { key: 'servicos', label: 'Serviços' },
              { key: 'galeria', label: 'Galeria Oficial' },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedPageFilter(p.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedPageFilter === p.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Slots List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlots.map((slot) => {
              const currentImg = slot.draftImageUrl !== undefined ? slot.draftImageUrl : slot.imageUrl;
              const currentAlt = slot.draftAltText !== undefined ? slot.draftAltText : slot.altText;
              const currentAspect = slot.draftAspectRatio || slot.aspectRatio || '16:9';
              const currentFit = slot.draftFit || slot.fit || 'cover';
              const currentPos = slot.draftPosition || slot.position || 'center';

              const aspectClass =
                currentAspect === '1:1'
                  ? 'aspect-square'
                  : currentAspect === '4:3'
                  ? 'aspect-[4/3]'
                  : currentAspect === '16:10'
                  ? 'aspect-[16/10]'
                  : 'aspect-[16/9]';

              const fitClass = currentFit === 'contain' ? 'object-contain' : 'object-cover';
              const posClass =
                currentPos === 'top'
                  ? 'object-top'
                  : currentPos === 'bottom'
                  ? 'object-bottom'
                  : 'object-center';

              return (
                <div
                  key={slot.key}
                  className={`bg-white rounded-3xl border shadow-sm p-5 flex flex-col justify-between transition-all ${
                    slot.hasChanges ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200/90'
                  }`}
                >
                  <div>
                    {/* Header identifier */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                          {slot.pageLabel}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {slot.sectionLabel}
                        </h3>
                      </div>

                      {slot.hasChanges ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold shrink-0">
                          Rascunho
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold shrink-0">
                          Publicado
                        </span>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 group mb-4">
                      {currentImg ? (
                        <div className={`relative ${aspectClass} w-full bg-slate-100`}>
                          <img
                            src={currentImg}
                            alt={currentAlt}
                            className={`w-full h-full ${fitClass} ${posClass}`}
                          />
                          {/* Live preview hover icon */}
                          <button
                            onClick={() => setPreviewModalSlot(slot)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900"
                            title="Pré-visualizar em computador e telemóvel"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-[16/9] w-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                          <ImageIcon className="w-8 h-8 mb-2 stroke-1" />
                          <span className="text-xs font-semibold text-slate-600">
                            Sem Imagem Definida
                          </span>
                          <span className="text-[11px]">
                            Clique abaixo para adicionar fotografia
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Formatting Controls */}
                    <div className="space-y-3 pt-1">
                      {/* Image Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedSlotForImage(slot)}
                          className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{currentImg ? 'Substituir' : 'Adicionar'}</span>
                        </button>

                        {currentImg && (
                          <button
                            onClick={() => handleRemoveImageFromSlot(slot)}
                            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remover</span>
                          </button>
                        )}
                      </div>

                      {/* Enquadramento, Proporção e Posição */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                            Proporção
                          </label>
                          <select
                            value={currentAspect}
                            onChange={(e) =>
                              handleSlotFieldChange(slot.key, 'draftAspectRatio', e.target.value)
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                          >
                            <option value="16:9">16:9</option>
                            <option value="16:10">16:10</option>
                            <option value="4:3">4:3</option>
                            <option value="1:1">1:1</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                            Enquadr.
                          </label>
                          <select
                            value={currentFit}
                            onChange={(e) =>
                              handleSlotFieldChange(slot.key, 'draftFit', e.target.value)
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                          >
                            <option value="cover">Preencher (Cover)</option>
                            <option value="contain">Conter (Contain)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                            Posição
                          </label>
                          <select
                            value={currentPos}
                            onChange={(e) =>
                              handleSlotFieldChange(slot.key, 'draftPosition', e.target.value)
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white"
                          >
                            <option value="center">Centro</option>
                            <option value="top">Topo</option>
                            <option value="bottom">Fundo</option>
                          </select>
                        </div>
                      </div>

                      {/* Texto Alternativo (Alt Text) */}
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                          Texto Alternativo (Alt Text Acessível)
                        </label>
                        <input
                          type="text"
                          value={currentAlt}
                          onChange={(e) =>
                            handleSlotFieldChange(slot.key, 'draftAltText', e.target.value)
                          }
                          placeholder="Descreva o conteúdo da imagem..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card bottom actions */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <button
                      onClick={() => setPreviewModalSlot(slot)}
                      className="hover:text-blue-600 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pré-visualizar</span>
                    </button>
                    <span className="text-[11px] font-mono">{slot.key}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 2: CRIAR NOVOS CAMPOS E SECÇÕES */}
      {/* ============================================================== */}
      {activeSubTab === 'seccoes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Secções e Blocos Criados Dinamicamente
              </h2>
              <p className="text-xs text-slate-500">
                Adicione novos blocos com texto, imagens e botões de chamada para ação nas páginas pretendidas.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingSection({
                  page: 'home',
                  sectionName: 'Nova Secção',
                  title: '',
                  text: '',
                  images: [],
                  buttonText: 'Saber Mais',
                  buttonLink: 'agendamento',
                  order: customSections.length + 1,
                  status: 'publicado',
                });
                setShowSectionModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Nova Secção</span>
            </button>
          </div>

          {customSections.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Nenhuma secção personalizada criada
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Pode criar blocos institucionais, galeria de casos adicionais, ou anúncios de novos serviços para qualquer página do site.
              </p>
              <button
                onClick={() => {
                  setEditingSection({
                    page: 'home',
                    sectionName: 'Destaque Especial',
                    title: 'Excelência Odontológica em Itália',
                    text: 'Apresentamos uma nova abordagem para consultórios dentários com protocolos validados.',
                    images: [
                      {
                        url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
                        alt: 'Gabinete dentário moderno',
                        aspectRatio: '16:9',
                        fit: 'cover',
                        position: 'center',
                      },
                    ],
                    buttonText: 'Agendar Reunião',
                    buttonLink: 'agendamento',
                    order: 1,
                    status: 'publicado',
                  });
                  setShowSectionModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs"
              >
                Criar Secção de Exemplo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {customSections
                .sort((a, b) => a.order - b.order)
                .map((sec) => (
                  <div
                    key={sec.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-blue-600 uppercase">
                          Página: {sec.page}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-700">
                          {sec.sectionName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sec.status === 'publicado'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {sec.status === 'publicado' ? 'Publicado' : 'Oculto'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl">{sec.text}</p>
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                        <span>{sec.images.length} imagem(ns)</span>
                        <span>·</span>
                        <span>Ordem: {sec.order}</span>
                        {sec.buttonText && (
                          <>
                            <span>·</span>
                            <span>Botão: "{sec.buttonText}"</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Move Up / Down */}
                      <button
                        onClick={() => handleMoveSection(sec, 'up')}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        title="Subir Ordem"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveSection(sec, 'down')}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        title="Descer Ordem"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicateSection(sec)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        title="Duplicar Secção"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* Hide / Unhide */}
                      <button
                        onClick={() => handleToggleHideSection(sec)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        title={sec.status === 'publicado' ? 'Ocultar secção' : 'Publicar secção'}
                      >
                        {sec.status === 'publicado' ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setEditingSection(sec);
                          setShowSectionModal(true);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="Editar Secção"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete with Confirmation */}
                      <button
                        onClick={() => setDeleteConfirmSection(sec)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors"
                        title="Eliminar Secção"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 3: BIBLIOTECA DE IMAGENS */}
      {/* ============================================================== */}
      {activeSubTab === 'biblioteca' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Biblioteca Oficial de Mídia
              </h2>
              <p className="text-xs text-slate-500">
                Todas as fotografias reais carregadas, com visualização do local de utilização no site.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedSlotForImage(null);
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>Carregar Imagem do Computador</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLibrary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-semibold">
                        {item.size || 'HD'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Origem: {item.origin || 'Instagram @oralpro.italia'}
                    </p>

                    {/* Usages badge */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                        Utilizada em:
                      </span>
                      {item.usedIn && item.usedIn.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {item.usedIn.map((place, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100"
                            >
                              {place}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Ainda não associada a nenhum campo
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Pretende remover "${item.name}" da biblioteca?`)) {
                        deleteMedia(item.id);
                        showNotification('info', 'Imagem removida da biblioteca.');
                      }
                    }}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Eliminar da biblioteca"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: ESCOLHER IMAGEM PARA UM CAMPO (DA BIBLIOTECA OU UPLOAD) */}
      {/* ============================================================== */}
      {selectedSlotForImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">
                  {selectedSlotForImage.pageLabel}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Definir Imagem para: {selectedSlotForImage.sectionLabel}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSlotForImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Upload Option */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-blue-900">
                  Carregar Ficheiro do Seu Dispositivo
                </h4>
                <p className="text-[11px] text-blue-700">
                  Selecione um ficheiro JPG, PNG ou WebP diretamente do seu computador ou telemóvel.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0 cursor-pointer shadow-sm"
              >
                Escolher Ficheiro
              </button>
            </div>

            {/* Paste External Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Ou introduza o URL permanente de uma fotografia:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://..."
                  id="direct-url-input"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const el = document.getElementById('direct-url-input') as HTMLInputElement;
                    if (el && el.value.trim()) {
                      await updateSlot(selectedSlotForImage.key, { draftImageUrl: el.value.trim() });
                      showNotification('success', 'Imagem associada como rascunho!');
                      setSelectedSlotForImage(null);
                    }
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                >
                  Aplicar
                </button>
              </div>
            </div>

            {/* Pick from Library */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Ou selecione a partir da Biblioteca ({mediaLibrary.length} disponíveis):
              </h4>
              <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1">
                {mediaLibrary.map((item) => (
                  <div
                    key={item.id}
                    onClick={async () => {
                      await updateSlot(selectedSlotForImage.key, { draftImageUrl: item.url });
                      showNotification('success', `Imagem "${item.name}" selecionada!`);
                      setSelectedSlotForImage(null);
                    }}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-600 cursor-pointer group"
                  >
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-2 text-[10px] font-semibold text-slate-700 line-clamp-1">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: PRÉ-VISUALIZAÇÃO RESPONSIVA (COMPUTADOR / TELEMÓVEL) */}
      {/* ============================================================== */}
      {previewModalSlot && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden text-white">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">
                  {previewModalSlot.pageLabel}
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Pré-visualização: {previewModalSlot.sectionLabel}
                </h3>
              </div>

              {/* Device Selector */}
              <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Computador</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Telemóvel</span>
                </button>
              </div>

              <button
                onClick={() => setPreviewModalSlot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport Frame */}
            <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div
                className={`transition-all duration-300 bg-white rounded-2xl overflow-hidden shadow-2xl text-slate-900 border border-slate-200 ${
                  previewDevice === 'mobile' ? 'w-[375px]' : 'w-full max-w-2xl'
                }`}
              >
                {/* Simulated section frame */}
                <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>OralPro · {previewModalSlot.sectionLabel}</span>
                  <span>{previewDevice === 'mobile' ? '375px (Mobile)' : '100% (Desktop)'}</span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-blue-600 uppercase">
                      OralPro Italia
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">
                      {previewModalSlot.sectionLabel}
                    </h4>
                  </div>

                  {/* The image rendered with the current settings */}
                  <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={
                        previewModalSlot.draftImageUrl !== undefined
                          ? previewModalSlot.draftImageUrl
                          : previewModalSlot.imageUrl
                      }
                      alt={
                        previewModalSlot.draftAltText !== undefined
                          ? previewModalSlot.draftAltText
                          : previewModalSlot.altText
                      }
                      className={`w-full ${
                        (previewModalSlot.draftAspectRatio || previewModalSlot.aspectRatio) === '1:1'
                          ? 'aspect-square'
                          : (previewModalSlot.draftAspectRatio || previewModalSlot.aspectRatio) ===
                            '4:3'
                          ? 'aspect-[4/3]'
                          : (previewModalSlot.draftAspectRatio || previewModalSlot.aspectRatio) ===
                            '16:10'
                          ? 'aspect-[16/10]'
                          : 'aspect-[16/9]'
                      } ${
                        (previewModalSlot.draftFit || previewModalSlot.fit) === 'contain'
                          ? 'object-contain'
                          : 'object-cover'
                      } ${
                        (previewModalSlot.draftPosition || previewModalSlot.position) === 'top'
                          ? 'object-top'
                          : (previewModalSlot.draftPosition || previewModalSlot.position) ===
                            'bottom'
                          ? 'object-bottom'
                          : 'object-center'
                      }`}
                    />
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Texto alternativo: "
                    {previewModalSlot.draftAltText !== undefined
                      ? previewModalSlot.draftAltText
                      : previewModalSlot.altText}
                    "
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom note */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Para aplicar as alterações a todos os visitantes, clique em "Publicar Alterações".
              </span>
              <button
                onClick={() => setPreviewModalSlot(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: CRIAR / EDITAR SECÇÃO PERSONALIZADA */}
      {/* ============================================================== */}
      {showSectionModal && editingSection && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveSection}
            className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingSection.id ? 'Editar Secção Personalizada' : 'Criar Nova Secção'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowSectionModal(false);
                  setEditingSection(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Página Destino
                </label>
                <select
                  value={editingSection.page || 'home'}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, page: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                >
                  <option value="home">Página Inicial</option>
                  <option value="sobre">Sobre a OralPro</option>
                  <option value="servicos">Serviços</option>
                  <option value="metodo">Método OralPro</option>
                  <option value="areas">Áreas Clínicas</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nome Identificador da Secção
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Destaque Tecnologia"
                  value={editingSection.sectionName || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, sectionName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Título Principal
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Tecnologia de Diagnóstico 3D"
                value={editingSection.title || ''}
                onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Texto / Descrição
              </label>
              <textarea
                rows={3}
                required
                placeholder="Insira o texto descritivo da secção..."
                value={editingSection.text || ''}
                onChange={(e) => setEditingSection({ ...editingSection, text: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            {/* Image URL input */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                URL da Imagem da Secção
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={editingSection.images?.[0]?.url || ''}
                onChange={(e) => {
                  const url = e.target.value;
                  const currentImgs = editingSection.images || [];
                  if (currentImgs.length > 0) {
                    currentImgs[0].url = url;
                    setEditingSection({ ...editingSection, images: [...currentImgs] });
                  } else {
                    setEditingSection({
                      ...editingSection,
                      images: [
                        {
                          url,
                          alt: editingSection.title || '',
                          aspectRatio: '16:9',
                          fit: 'cover',
                          position: 'center',
                        },
                      ],
                    });
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Texto do Botão (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Agendar Reunião"
                  value={editingSection.buttonText || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, buttonText: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Ligação do Botão
                </label>
                <input
                  type="text"
                  placeholder="Ex: agendamento ou https://..."
                  value={editingSection.buttonLink || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, buttonLink: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Ordem de Exibição
                </label>
                <input
                  type="number"
                  value={editingSection.order || 1}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, order: parseInt(e.target.value, 10) })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Estado</label>
                <select
                  value={editingSection.status || 'publicado'}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, status: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                >
                  <option value="publicado">Publicado</option>
                  <option value="oculto">Oculto</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowSectionModal(false);
                  setEditingSection(null);
                }}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Guardar Secção
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: CONFIRMAÇÃO DETALHADA ANTES DE ELIMINAR SECÇÃO */}
      {/* ============================================================== */}
      {deleteConfirmSection && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Confirmar Eliminação da Secção
              </h3>
              <p className="text-xs text-slate-500">
                Tem a certeza de que pretende eliminar permanentemente a secção "
                {deleteConfirmSection.sectionName}"?
              </p>
            </div>

            {/* Information about associated content */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-900">Conteúdos Associados:</div>
              <div>• Título: "{deleteConfirmSection.title}"</div>
              <div>• Página: {deleteConfirmSection.page}</div>
              <div>
                • Imagens associadas:{' '}
                {deleteConfirmSection.images.length > 0 ? (
                  <span className="text-rose-600 font-semibold">
                    {deleteConfirmSection.images.length} imagem(ns)
                  </span>
                ) : (
                  <span>Nenhuma</span>
                )}
              </div>
              <div>
                • Estado atual:{' '}
                <span className="font-semibold">{deleteConfirmSection.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmSection(null)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteSection}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
