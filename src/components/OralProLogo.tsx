import React, { useState } from 'react';

export const ORALPRO_LOGO_URL = 'https://i.ibb.co/fV5RTsz1/chatgpt-4.png';

export interface EmblemProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'header' | 'lg' | 'xl';
  showBackground?: boolean;
  light?: boolean;
}

export const OralProEmblem: React.FC<EmblemProps> = ({
  className = '',
  size = 'md',
  showBackground = false,
  light = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const iconDimensions = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    header: 'w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div
      className={`${iconDimensions} ${className} shrink-0 select-none flex items-center justify-center`}
    >
      {!imgError ? (
        <img
          src={ORALPRO_LOGO_URL}
          alt="OralPro"
          className="w-full h-full object-contain scale-110 sm:scale-120 pointer-events-none drop-shadow-xs"
          loading="eager"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg
          viewBox="17 7 66 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Official Tooth Silhouette */}
          <path
            d="M 25 35 C 22 20, 36 12, 50 20 C 64 12, 78 20, 75 35 C 72 48, 74 65, 66 82 C 60 92, 53 85, 50 68 C 47 85, 40 92, 34 82 C 26 65, 28 48, 25 35 Z"
            stroke={light ? '#60A5FA' : '#1E40AF'}
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* ECG Pulse / Heartbeat */}
          <path
            d="M 28 48 L 40 48 L 44 38 L 48 62 L 53 30 L 57 55 L 61 48 L 72 48"
            stroke={light ? '#F87171' : '#EF4444'}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
};

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'header' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
  showBackground?: boolean;
}

export const OralProLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = false,
  showBackground = false,
}) => {
  const textStyles = {
    sm: 'text-sm font-black tracking-wider',
    md: 'text-lg font-black tracking-wider',
    header: 'text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none',
    lg: 'text-2xl font-black tracking-wider',
    xl: 'text-3xl font-black tracking-wider',
  }[size];

  const subStyles = {
    sm: 'text-[8.5px]',
    md: 'text-[9px]',
    header: 'text-[8.5px] sm:text-[10px] md:text-xs uppercase tracking-wider font-semibold mt-0.5',
    lg: 'text-[11px]',
    xl: 'text-[12px]',
  }[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 select-none ${className}`}>
      {/* Official OralPro Mark: Tooth + Heartbeat Pulse (no background circle) */}
      <OralProEmblem
        size={size}
        light={light}
        showBackground={showBackground}
        className="transition-transform duration-200 group-hover:scale-105"
      />

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center tracking-tight leading-none">
            <span className={`${textStyles} ${light ? 'text-white' : 'text-slate-950'} font-display`}>
              ORAL
            </span>
            <span className={`${textStyles} text-blue-600 font-display ml-1`}>
              PRO
            </span>
          </div>
          <span className={`${subStyles} uppercase tracking-widest font-semibold mt-0.5 ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            Marketing Dentário
          </span>
        </div>
      )}
    </div>
  );
};
