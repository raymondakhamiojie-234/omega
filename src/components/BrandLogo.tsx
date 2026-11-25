import React from 'react';
import { useDemoData } from '../context/DemoDataContext';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', compact = false }) => {
  const { settings } = useDemoData();

  if (settings.logo_url) {
    return (
      <img
        src={settings.logo_url}
        alt={settings.extended_name}
        className="h-10 w-auto object-contain"
      />
    );
  }

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
          isLight
            ? 'border-white/20 bg-white/10 text-white'
            : 'border-[#123B56]/10 bg-[#123B56] text-white'
        } shadow-sm`}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M16 5C10.477 5 6 9.477 6 15C6 18.71 8.02 21.95 11.02 23.68V25H7.5V27.5H13.5V22.45C10.93 21.31 9.11 18.74 9.11 15.75C9.11 11.6 12.2 8.22 16 8.22C19.8 8.22 22.89 11.6 22.89 15.75C22.89 18.74 21.07 21.31 18.5 22.45V27.5H24.5V25H20.98V23.68C23.98 21.95 26 18.71 26 15C26 9.477 21.523 5 16 5Z"
            fill="currentColor"
          />
          <circle cx="16" cy="15.5" r="2.6" fill="#168C91" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-heading text-sm font-extrabold tracking-wide sm:text-base ${
            isLight ? 'text-white' : 'text-[#123B56]'
          }`}
        >
          {settings.brand_name}
        </span>
        {!compact && (
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
              isLight ? 'text-teal-200' : 'text-[#168C91]'
            }`}
          >
            &amp; Scan Center • Abuja
          </span>
        )}
      </div>
    </div>
  );
};
