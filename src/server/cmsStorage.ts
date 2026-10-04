import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SiteContentSlot, CustomSection, MediaLibraryItem } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'site_content.json');

const INITIAL_SLOTS: SiteContentSlot[] = [
  {
    key: 'home_hero',
    page: 'home',
    pageLabel: 'Página Inicial',
    sectionLabel: 'Apresentação (Hero)',
    description: 'Imagem principal de destaque da página inicial',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    altText: 'Instalações clínicas e tecnologia avançada OralPro',
    aspectRatio: '16:9',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'home_about',
    page: 'home',
    pageLabel: 'Página Inicial',
    sectionLabel: 'Sobre a OralPro (Secção Resumo)',
    description: 'Fotografia representativa da presença executiva e equipa da OralPro',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    altText: 'Mario Provenzano em apresentação institucional OralPro',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'about_founder',
    page: 'sobre',
    pageLabel: 'Sobre a OralPro',
    sectionLabel: 'Apresentação Fundador (Mario Provenzano)',
    description: 'Foto oficial do fundador em conferência odontológica em Itália',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    altText: 'Mario Provenzano em conferência para diretores de clínicas em Itália',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'about_masterclass',
    page: 'sobre',
    pageLabel: 'Sobre a OralPro',
    sectionLabel: 'Masterclasses & Eventos em Itália',
    description: 'Fotografia das sessões presenciais com médicos dentistas',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    altText: 'Masterclass presencial da OralPro com diretores clínicos em Itália',
    aspectRatio: '16:9',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'services_implantologia',
    page: 'servicos',
    pageLabel: 'Serviços',
    sectionLabel: 'Implantologia e Reabilitação Oral',
    description: 'Ambiente de reabilitação e bloco cirúrgico de implantologia',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    altText: 'Gabinete cirúrgico odontológico para implantes e reabilitação',
    aspectRatio: '4:3',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'services_estetica',
    page: 'servicos',
    pageLabel: 'Serviços',
    sectionLabel: 'Estética Dentária e Facetas',
    description: 'Tecnologia de planeamento estético do sorriso',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    altText: 'Planeamento estético e facetas cerâmicas em clínica parceira',
    aspectRatio: '4:3',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'services_ortodontia',
    page: 'servicos',
    pageLabel: 'Serviços',
    sectionLabel: 'Ortodontia Invisível e Alinhadores',
    description: 'Visualização 3D e diagnóstico ortodôntico digital',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    altText: 'Acompanhamento digital e alinhadores transparentes',
    aspectRatio: '4:3',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_1',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Apresentação Mario Provenzano',
    description: 'Foto 1 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    altText: 'Mario Provenzano em apresentação institucional OralPro',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_2',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Masterclass & Eventi dal Vivo',
    description: 'Foto 2 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    altText: 'Masterclass presencial da OralPro com dentistas parceiros',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_3',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Instalações & Gabinetes Clínicos',
    description: 'Foto 3 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    altText: 'Ambiente clínico e equipamento de última geração em clínica parceira',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_4',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Consultoria com Secretárias Clínicas',
    description: 'Foto 4 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    altText: 'Consultoria e alinhamento de triagem com equipas de apoio clínico',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_5',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Cirurgia & Biossegurança',
    description: 'Foto 5 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    altText: 'Biossegurança e ambiente de implantologia cirúrgica',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
  {
    key: 'gallery_6',
    page: 'galeria',
    pageLabel: 'Galeria Oficial (@oralpro.italia)',
    sectionLabel: 'Tecnologia & Ortodontia Digital',
    description: 'Foto 6 da galeria de bastidores e eventos',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    altText: 'Planeamento estético e tecnologias de alinhadores transparentes',
    aspectRatio: '16:10',
    fit: 'cover',
    position: 'center',
    hasChanges: false,
  },
];

const INITIAL_MEDIA_LIBRARY: MediaLibraryItem[] = [
  {
    id: 'lib-1',
    name: 'Mario Provenzano Apresentação',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
    category: 'Fundador & Eventos',
    aspectRatio: '16:10',
    size: '420 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T10:00:00Z',
    usedIn: ['Página Inicial > Sobre', 'Sobre > Fundador', 'Galeria > Foto 1'],
  },
  {
    id: 'lib-2',
    name: 'Masterclass Presencial Dentistas',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    category: 'Eventos ao Vivo',
    aspectRatio: '16:9',
    size: '512 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T10:30:00Z',
    usedIn: ['Sobre > Masterclasses', 'Galeria > Foto 2'],
  },
  {
    id: 'lib-3',
    name: 'Instalações & Consultório Parceiro',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    category: 'Instalações',
    aspectRatio: '16:9',
    size: '620 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T11:00:00Z',
    usedIn: ['Página Inicial > Hero', 'Galeria > Foto 3'],
  },
  {
    id: 'lib-4',
    name: 'Consultoria de Triagem com Secretárias',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    category: 'Equipa & Triagem',
    aspectRatio: '4:3',
    size: '390 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T11:30:00Z',
    usedIn: ['Serviços > Ortodontia', 'Galeria > Foto 4'],
  },
  {
    id: 'lib-5',
    name: 'Cirurgia Odontológica & Implantes',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    category: 'Tratamentos',
    aspectRatio: '4:3',
    size: '480 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T12:00:00Z',
    usedIn: ['Serviços > Implantologia', 'Galeria > Foto 5'],
  },
  {
    id: 'lib-6',
    name: 'Planeamento 3D & Ortodontia Digital',
    url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
    category: 'Tecnologia',
    aspectRatio: '4:3',
    size: '440 KB',
    origin: 'Instagram @oralpro.italia',
    createdAt: '2026-10-01T12:30:00Z',
    usedIn: ['Serviços > Estética', 'Galeria > Foto 6'],
  },
];

interface CMSData {
  slots: SiteContentSlot[];
  customSections: CustomSection[];
  mediaLibrary: MediaLibraryItem[];
  lastPublished: string;
}

let memoryState: CMSData = {
  slots: INITIAL_SLOTS,
  customSections: [],
  mediaLibrary: INITIAL_MEDIA_LIBRARY,
  lastPublished: new Date().toISOString(),
};

// Ensure data persistence to file
function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.slots)) {
        // Merge with initial slots in case new slots were added
        const loadedKeys = new Set(parsed.slots.map((s: SiteContentSlot) => s.key));
        const mergedSlots = [
          ...parsed.slots,
          ...INITIAL_SLOTS.filter((s) => !loadedKeys.has(s.key)),
        ];
        memoryState = {
          slots: mergedSlots,
          customSections: parsed.customSections || [],
          mediaLibrary: parsed.mediaLibrary || INITIAL_MEDIA_LIBRARY,
          lastPublished: parsed.lastPublished || new Date().toISOString(),
        };
      }
    } else {
      saveToFile();
    }
  } catch (err) {
    console.warn('CMS data load notice:', err);
  }
}

function saveToFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save CMS data to disk:', err);
  }
}

ensureDataFile();

// Update usage tags for library items
function recalculateUsages() {
  const urlToUsed: Record<string, string[]> = {};

  // Check slots
  memoryState.slots.forEach((s) => {
    const url = s.draftImageUrl || s.imageUrl;
    if (url) {
      if (!urlToUsed[url]) urlToUsed[url] = [];
      const label = `${s.pageLabel} > ${s.sectionLabel}`;
      if (!urlToUsed[url].includes(label)) urlToUsed[url].push(label);
    }
  });

  // Check custom sections
  memoryState.customSections.forEach((sec) => {
    sec.images.forEach((img) => {
      if (img.url) {
        if (!urlToUsed[img.url]) urlToUsed[img.url] = [];
        const label = `${sec.page} > ${sec.sectionName}`;
        if (!urlToUsed[img.url].includes(label)) urlToUsed[img.url].push(label);
      }
    });
  });

  memoryState.mediaLibrary.forEach((item) => {
    item.usedIn = urlToUsed[item.url] || [];
  });
}

export const cmsStorage = {
  getState() {
    recalculateUsages();
    const hasUnpublished =
      memoryState.slots.some((s) => s.hasChanges) ||
      memoryState.customSections.some((c: any) => c.hasChanges);

    return {
      slots: memoryState.slots,
      customSections: memoryState.customSections,
      mediaLibrary: memoryState.mediaLibrary,
      lastPublished: memoryState.lastPublished,
      hasUnpublished,
    };
  },

  updateSlotDraft(key: string, updates: Partial<SiteContentSlot>) {
    const slot = memoryState.slots.find((s) => s.key === key);
    if (!slot) return null;

    if (updates.draftImageUrl !== undefined) slot.draftImageUrl = updates.draftImageUrl;
    if (updates.draftAltText !== undefined) slot.draftAltText = updates.draftAltText;
    if (updates.draftAspectRatio !== undefined) slot.draftAspectRatio = updates.draftAspectRatio;
    if (updates.draftFit !== undefined) slot.draftFit = updates.draftFit;
    if (updates.draftPosition !== undefined) slot.draftPosition = updates.draftPosition;

    // Check if differs from published
    slot.hasChanges =
      (slot.draftImageUrl !== undefined && slot.draftImageUrl !== slot.imageUrl) ||
      (slot.draftAltText !== undefined && slot.draftAltText !== slot.altText) ||
      (slot.draftAspectRatio !== undefined && slot.draftAspectRatio !== slot.aspectRatio) ||
      (slot.draftFit !== undefined && slot.draftFit !== slot.fit) ||
      (slot.draftPosition !== undefined && slot.draftPosition !== slot.position);

    saveToFile();
    return slot;
  },

  publishChanges() {
    memoryState.slots.forEach((slot) => {
      if (slot.hasChanges) {
        if (slot.draftImageUrl !== undefined) slot.imageUrl = slot.draftImageUrl;
        if (slot.draftAltText !== undefined) slot.altText = slot.draftAltText;
        if (slot.draftAspectRatio !== undefined) slot.aspectRatio = slot.draftAspectRatio;
        if (slot.draftFit !== undefined) slot.fit = slot.draftFit;
        if (slot.draftPosition !== undefined) slot.position = slot.draftPosition;
        slot.hasChanges = false;
        slot.draftImageUrl = undefined;
        slot.draftAltText = undefined;
        slot.draftAspectRatio = undefined;
        slot.draftFit = undefined;
        slot.draftPosition = undefined;
      }
    });

    memoryState.lastPublished = new Date().toISOString();
    recalculateUsages();
    saveToFile();
    return this.getState();
  },

  revertDrafts() {
    memoryState.slots.forEach((slot) => {
      slot.hasChanges = false;
      slot.draftImageUrl = undefined;
      slot.draftAltText = undefined;
      slot.draftAspectRatio = undefined;
      slot.draftFit = undefined;
      slot.draftPosition = undefined;
    });
    saveToFile();
    return this.getState();
  },

  saveCustomSection(data: Partial<CustomSection> & { id?: string }) {
    if (data.id) {
      const idx = memoryState.customSections.findIndex((s) => s.id === data.id);
      if (idx >= 0) {
        memoryState.customSections[idx] = {
          ...memoryState.customSections[idx],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        saveToFile();
        return memoryState.customSections[idx];
      }
    }

    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      page: (data.page as any) || 'home',
      sectionName: data.sectionName || 'Nova Secção',
      title: data.title || '',
      text: data.text || '',
      images: data.images || [],
      buttonText: data.buttonText || '',
      buttonLink: data.buttonLink || '',
      order: data.order ?? memoryState.customSections.length + 1,
      status: data.status || 'publicado',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryState.customSections.push(newSec);
    recalculateUsages();
    saveToFile();
    return newSec;
  },

  deleteCustomSection(id: string) {
    const idx = memoryState.customSections.findIndex((s) => s.id === id);
    if (idx >= 0) {
      const deleted = memoryState.customSections.splice(idx, 1)[0];
      recalculateUsages();
      saveToFile();
      return deleted;
    }
    return null;
  },

  addMediaLibraryItem(item: Omit<MediaLibraryItem, 'id' | 'createdAt' | 'usedIn'>) {
    const newItem: MediaLibraryItem = {
      id: `lib-${Date.now()}`,
      name: item.name || 'Nova Imagem',
      url: item.url,
      category: item.category || 'Geral',
      aspectRatio: item.aspectRatio || '16:9',
      size: item.size || 'Otimizado',
      origin: item.origin || 'Painel Administrativo',
      createdAt: new Date().toISOString(),
      usedIn: [],
    };
    memoryState.mediaLibrary.unshift(newItem);
    recalculateUsages();
    saveToFile();
    return newItem;
  },

  deleteMediaLibraryItem(id: string) {
    const idx = memoryState.mediaLibrary.findIndex((m) => m.id === id);
    if (idx >= 0) {
      const item = memoryState.mediaLibrary[idx];
      memoryState.mediaLibrary.splice(idx, 1);
      saveToFile();
      return item;
    }
    return null;
  },
};
