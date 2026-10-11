import React from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReservation }) => {
  return (
    <footer className="bg-[#111110] border-t border-[#39342E] py-16 px-6 md:px-12 lg:px-20 text-[#A69D90] font-sans text-xs">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#39342E]">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <span className="w-6 h-6 rounded-[2px] border border-[#39342E] flex items-center justify-center text-[#C18A65] text-xs font-serif-lux group-hover:border-[#C18A65]">
              E
            </span>
            <span className="font-serif-lux text-xl tracking-[0.2em] font-normal text-[#F0E8DC] group-hover:text-[#C18A65] transition-colors">
              EMBER <span className="text-[#C18A65]">&amp;</span> OAK
            </span>
          </button>
          <p className="text-[#C4BDB2] font-light leading-relaxed max-w-sm text-xs">
            A temple of fire, smoke, and progressive fine dining. Situated in the serene heights of Jubilee Hills, Hyderabad.
          </p>
          <div className="pt-2 text-[10px] tracking-[0.2em] text-[#C18A65] uppercase font-semibold font-mono">
            Michelin Selected · Connoisseur Guild 2024
          </div>
        </div>

        {/* Experiences Links */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#C18A65] font-semibold block mb-2 font-mono">
            Experiences
          </span>
          <ul className="space-y-2 text-[#C4BDB2]">
            <li>
              <button
                onClick={() => onNavigate('menu')}
                className="hover:text-[#F0E8DC] transition-colors cursor-pointer text-left"
              >
                Autumn Degustation Menu
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('studio3d')}
                className="hover:text-[#F0E8DC] text-[#C18A65] transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>360° 3D Food Studio</span>
                <span className="px-1 py-0.2 bg-[#C18A65]/20 text-[#C18A65] text-[9px] font-mono rounded">
                  360°
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('experiences')}
                className="hover:text-[#F0E8DC] transition-colors cursor-pointer text-left"
              >
                The Chef's Counter Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('experiences')}
                className="hover:text-[#F0E8DC] transition-colors cursor-pointer text-left"
              >
                Private Cask &amp; Cellar Vault
              </button>
            </li>
            <li>
              <button
                onClick={onOpenReservation}
                className="hover:text-[#F0E8DC] transition-colors cursor-pointer text-left"
              >
                Curated Corporate Evenings
              </button>
            </li>
          </ul>
        </div>

        {/* Visit & Contact */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#C18A65] font-semibold block mb-2 font-mono">
            Visit &amp; Contact
          </span>
          <p className="text-[#C4BDB2] leading-relaxed font-light">
            Road No. 36, Jubilee Hills,<br />
            Hyderabad, Telangana 500033, India
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate('arrival')}
              className="text-[#C18A65] hover:text-[#F0E8DC] transition-colors cursor-pointer text-xs font-mono uppercase tracking-widest flex items-center gap-1.5"
            >
              <span>Map &amp; Valet Arrival</span>
              <span>→</span>
            </button>
          </div>
          <div className="pt-2 text-[#A69D90] space-y-1">
            <p>
              <span className="text-[#F0E8DC]">Tuesday – Sunday:</span> 7:00 PM – 12:30 AM
            </p>
            <p>
              <span className="text-[#F0E8DC]">Monday:</span> Closed for Culinary Research
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wider text-[#A69D90] gap-4">
        <div>© 2024 EMBER &amp; OAK HOSPITALITY GROUP. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6 font-mono text-[10px]">
          <span className="hover:text-[#F0E8DC] transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="hover:text-[#F0E8DC] transition-colors cursor-pointer">TERMS OF SERVICE</span>
          <span className="hover:text-[#F0E8DC] transition-colors cursor-pointer">PRESS DOSSIER</span>
        </div>
      </div>
    </footer>
  );
};
