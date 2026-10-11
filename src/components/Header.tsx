import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Calendar, User, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenReservation: () => void;
  reservationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenReservation,
  reservationCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 lg:px-20 ${
        scrolled
          ? 'py-4 bg-[#141312]/95 backdrop-blur-md shadow-2xl border-b border-[#2A2723]'
          : 'py-6 bg-gradient-to-b from-[#111110]/95 via-[#111110]/50 to-transparent backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3.5 text-left focus:outline-none cursor-pointer"
        >
          <span className="w-8 h-8 rounded-[2px] border border-[#39342E] flex items-center justify-center text-[#C18A65] group-hover:border-[#C18A65] group-hover:text-[#F0E8DC] transition-all duration-300">
            <svg
              className="w-4 h-4 fill-current transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L14.2 8.4L20.6 6.2L18.4 12.6L24 14.8L17.6 17L19.8 23.4L13.4 21.2L11.2 26.8L9 20.4L2.6 22.6L4.8 16.2L0 14L6.4 11.8L4.2 5.4L10.6 7.6L12 2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeMiterlimit="10"
              />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="font-serif-lux text-xl sm:text-2xl tracking-[0.2em] font-normal text-[#F0E8DC] group-hover:text-[#C18A65] transition-colors leading-none">
              EMBER <span className="text-[#C18A65] font-light">&amp;</span> OAK
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#A69D90] mt-1 font-mono">
              Hyderabad · Fine Dining
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation - Sleek & Uncluttered */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.16em] text-[#E5DDD1] font-medium">
          <button
            onClick={() => onNavigate('menu')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer ${
              currentPage === 'menu' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            Menu
            {currentPage === 'menu' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('studio3d')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'studio3d' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            <span>360° 3D Studio</span>
            <span className="px-1.5 py-0.2 bg-[#C18A65]/20 text-[#C18A65] text-[8px] font-mono rounded border border-[#C18A65]/40 uppercase tracking-tighter">
              360°
            </span>
            {currentPage === 'studio3d' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('experiences')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer ${
              currentPage === 'experiences' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            Experiences
            {currentPage === 'experiences' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('arrival')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer ${
              currentPage === 'arrival' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            Map &amp; Arrival
            {currentPage === 'arrival' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('story')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer ${
              currentPage === 'story' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            Story
            {currentPage === 'story' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`py-1 relative transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'dashboard' ? 'text-[#F0E8DC]' : 'hover:text-[#C18A65]'
            }`}
          >
            <span>Guest Pass</span>
            {reservationCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#A96947] text-[#111110] font-mono text-[9px] font-bold flex items-center justify-center">
                {reservationCount}
              </span>
            )}
            {currentPage === 'dashboard' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C18A65]" />
            )}
          </button>
        </nav>

        {/* Right CTA Area - Free Booking Highlight */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="lg:hidden p-2 text-[#C4BDB2] hover:text-[#F0E8DC] border border-[#2A2723] rounded-[2px]"
            title="Guest Portal"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenReservation}
            className="btn-primary-ivory inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] cursor-pointer shadow-md"
          >
            <span>Reserve Free</span>
            <span className="text-xs leading-none font-mono">→</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C4BDB2] hover:text-[#F0E8DC] border border-[#2A2723] rounded-[2px]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-[#2A2723] bg-[#141312] px-4 space-y-4 rounded-[2px] shadow-2xl">
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-widest text-[#C4BDB2]">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 ${
                currentPage === 'home' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              Our Story &amp; Flagship
            </button>
            <button
              onClick={() => {
                onNavigate('menu');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 ${
                currentPage === 'menu' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              Menu &amp; Culinary Anthology
            </button>
            <button
              onClick={() => {
                onNavigate('experiences');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 ${
                currentPage === 'experiences' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              Spatial Enclaves &amp; Cellar
            </button>
            <button
              onClick={() => {
                onNavigate('arrival');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 ${
                currentPage === 'arrival' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              Map &amp; Spatial Arrival (Jubilee Hills)
            </button>
            <button
              onClick={() => {
                onNavigate('studio3d');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 flex items-center justify-between ${
                currentPage === 'studio3d' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              <span>360° 3D Food Studio &amp; Camera</span>
              <span className="px-1.5 py-0.5 rounded bg-[#C18A65]/20 text-[#C18A65] text-[9px] font-mono">
                360°
              </span>
            </button>
            <button
              onClick={() => {
                onNavigate('story');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#2A2723]/60 ${
                currentPage === 'story' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              Fire Craft &amp; Philosophy
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 flex items-center justify-between ${
                currentPage === 'dashboard' ? 'text-[#C18A65] font-semibold' : ''
              }`}
            >
              <span>Guest Portal &amp; Passport</span>
              {reservationCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#A96947] text-[#111110] text-[9px] font-bold flex items-center justify-center">
                  {reservationCount}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full btn-copper py-3 text-[11px] uppercase tracking-widest text-center"
          >
            Reserve Your Experience →
          </button>
        </div>
      )}
    </header>
  );
};
