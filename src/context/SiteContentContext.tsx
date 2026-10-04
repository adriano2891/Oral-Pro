import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContentSlot, CustomSection, MediaLibraryItem } from '../types';

interface SiteContentContextType {
  slots: SiteContentSlot[];
  customSections: CustomSection[];
  mediaLibrary: MediaLibraryItem[];
  lastPublished: string;
  hasUnpublished: boolean;
  isLoading: boolean;
  getSlot: (
    key: string,
    fallbackUrl?: string,
    fallbackAlt?: string
  ) => {
    imageUrl: string;
    altText: string;
    aspectRatio: string;
    fit: 'cover' | 'contain';
    position: 'center' | 'top' | 'bottom';
  };
  getCustomSectionsForPage: (page: string) => CustomSection[];
  updateSlot: (key: string, updates: Partial<SiteContentSlot>) => Promise<boolean>;
  publishChanges: () => Promise<boolean>;
  revertDrafts: () => Promise<boolean>;
  saveCustomSection: (data: Partial<CustomSection> & { id?: string }) => Promise<boolean>;
  deleteCustomSection: (id: string) => Promise<boolean>;
  uploadMedia: (data: {
    name: string;
    url: string;
    category?: string;
    aspectRatio?: string;
    size?: string;
    origin?: string;
  }) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<SiteContentSlot[]>([]);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibraryItem[]>([]);
  const [lastPublished, setLastPublished] = useState<string>('');
  const [hasUnpublished, setHasUnpublished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch('/api/site-content');
      const data = await res.json();
      if (data.success && data.data) {
        setSlots(data.data.slots || []);
        setCustomSections(data.data.customSections || []);
        setMediaLibrary(data.data.mediaLibrary || []);
        setLastPublished(data.data.lastPublished || '');
        setHasUnpublished(Boolean(data.data.hasUnpublished));
      }
    } catch (err) {
      console.error('Failed to load site content:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const getSlot = useCallback(
    (key: string, fallbackUrl = '', fallbackAlt = '') => {
      const slot = slots.find((s) => s.key === key);
      if (!slot) {
        return {
          imageUrl: fallbackUrl,
          altText: fallbackAlt,
          aspectRatio: '16:9',
          fit: 'cover' as const,
          position: 'center' as const,
        };
      }
      return {
        imageUrl: slot.imageUrl || fallbackUrl,
        altText: slot.altText || fallbackAlt,
        aspectRatio: slot.aspectRatio || '16:9',
        fit: slot.fit || 'cover',
        position: slot.position || 'center',
      };
    },
    [slots]
  );

  const getCustomSectionsForPage = useCallback(
    (page: string) => {
      return customSections
        .filter((sec) => sec.page === page && sec.status === 'publicado')
        .sort((a, b) => a.order - b.order);
    },
    [customSections]
  );

  const updateSlot = async (key: string, updates: Partial<SiteContentSlot>): Promise<boolean> => {
    try {
      const res = await fetch('/api/site-content/slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, updates }),
      });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const publishChanges = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/site-content/publish', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const revertDrafts = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/site-content/revert', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveCustomSection = async (
    data: Partial<CustomSection> & { id?: string }
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/site-content/custom-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteCustomSection = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/site-content/custom-section/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const uploadMedia = async (data: {
    name: string;
    url: string;
    category?: string;
    aspectRatio?: string;
    size?: string;
    origin?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/site-content/media-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/site-content/media-library/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        await refreshContent();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        slots,
        customSections,
        mediaLibrary,
        lastPublished,
        hasUnpublished,
        isLoading,
        getSlot,
        getCustomSectionsForPage,
        updateSlot,
        publishChanges,
        revertDrafts,
        saveCustomSection,
        deleteCustomSection,
        uploadMedia,
        deleteMedia,
        refreshContent,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
