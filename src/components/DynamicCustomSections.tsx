import React from 'react';
import { CustomSection } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface DynamicCustomSectionsProps {
  sections: CustomSection[];
  onOpenBooking?: () => void;
  onNavigate?: (page: any) => void;
}

export const DynamicCustomSections: React.FC<DynamicCustomSectionsProps> = ({
  sections,
  onOpenBooking,
  onNavigate,
}) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-16 my-12">
      {sections.map((section) => {
        const hasImages = section.images && section.images.length > 0;
        const isMultiImage = section.images && section.images.length > 1;

        return (
          <section
            key={section.id}
            className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-sm"
          >
            <div className={`grid gap-10 items-center ${hasImages ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto text-center'}`}>
              {/* Content Column */}
              <div className={`${hasImages ? 'lg:col-span-6' : 'col-span-12'} space-y-5`}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{section.sectionName}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {section.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {section.text}
                </p>

                {section.buttonText && (
                  <div className="pt-2">
                    {section.buttonLink && section.buttonLink.startsWith('http') ? (
                      <a
                        href={section.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (section.buttonLink === 'agendamento' && onOpenBooking) {
                            onOpenBooking();
                          } else if (onNavigate && section.buttonLink) {
                            onNavigate(section.buttonLink as any);
                          } else if (onOpenBooking) {
                            onOpenBooking();
                          }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Images Column */}
              {hasImages && (
                <div className={`lg:col-span-6 ${isMultiImage ? 'grid grid-cols-2 gap-4' : ''}`}>
                  {section.images.map((img, idx) => {
                    const aspectClass =
                      img.aspectRatio === '1:1'
                        ? 'aspect-square'
                        : img.aspectRatio === '4:3'
                        ? 'aspect-[4/3]'
                        : img.aspectRatio === '16:10'
                        ? 'aspect-[16/10]'
                        : 'aspect-[16/9]';

                    const fitClass = img.fit === 'contain' ? 'object-contain' : 'object-cover';
                    const posClass =
                      img.position === 'top'
                        ? 'object-top'
                        : img.position === 'bottom'
                        ? 'object-bottom'
                        : 'object-center';

                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white ${
                          !isMultiImage ? 'w-full' : ''
                        }`}
                      >
                        <div className={`relative ${aspectClass} bg-slate-100`}>
                          <img
                            src={img.url}
                            alt={img.alt || section.title}
                            className={`w-full h-full ${fitClass} ${posClass}`}
                            loading="lazy"
                          />
                        </div>
                        {img.alt && (
                          <div className="p-3 bg-white border-t border-slate-100 text-slate-500 text-xs text-center font-medium">
                            {img.alt}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};
