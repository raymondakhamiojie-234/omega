import React from 'react';
import { Info } from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';

export const DemoNoticeBanner: React.FC = () => {
  const { settings } = useDemoData();

  return (
    <div className="bg-[#0D2B40] text-white/90 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:px-6 lg:px-8">
        <Info className="h-3.5 w-3.5 shrink-0 text-[#168C91]" aria-hidden="true" />
        <p className="leading-snug">{settings.demo_notice_text}</p>
      </div>
    </div>
  );
};
