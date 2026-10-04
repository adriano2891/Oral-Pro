import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export const OralProLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textStyles = {
    sm: 'text-sm font-black tracking-wider',
    md: 'text-lg font-black tracking-wider',
    lg: 'text-2xl font-black tracking-wider',
    xl: 'text-3xl font-black tracking-wider',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official OralPro Mark: Tooth + Heartbeat Pulse */}
      <div
        className={`${iconDimensions} relative flex items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100 p-1.5 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Tooth Silhouette */}
          <path
            d="M 25 35 C 22 20, 36 12, 50 20 C 64 12, 78 20, 75 35 C 72 48, 74 65, 66 82 C 60 92, 53 85, 50 68 C 47 85, 40 92, 34 82 C 26 65, 28 48, 25 35 Z"
            stroke="#1E40AF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* ECG Pulse / Heartbeat in Vibrant Coral-Red */}
          <path
            d="M 28 48 L 40 48 L 44 38 L 48 62 L 53 30 L 57 55 L 61 48 L 72 48"
            stroke="#EF4444"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight leading-none">
            <span className={`${textStyles} ${light ? 'text-white' : 'text-slate-950'} font-display`}>
              ORAL
            </span>
            <span className={`${textStyles} text-blue-600 font-display ml-1`}>
              PRO
            </span>
          </div>
          <span className={`text-[9px] uppercase tracking-widest font-semibold mt-0.5 ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            Marketing Dentário
          </span>
        </div>
      )}
    </div>
  );
};
