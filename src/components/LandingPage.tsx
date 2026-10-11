import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, Wine, Flame, Clock, Users, ArrowUpRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: PageView, dishId?: string) => void;
  onOpenReservationWithDetails?: (details: { guests: number; date: string; service: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenReservationWithDetails,
}) => {
  const [selectedGuests, setSelectedGuests] = useState('2 Guests');
  const [selectedDate, setSelectedDate] = useState('Today, 8:30 PM');
  const [selectedService, setSelectedService] = useState('Main Dining Room');

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const guestNum = parseInt(selectedGuests.split(' ')[0], 10) || 2;
    if (onOpenReservationWithDetails) {
      onOpenReservationWithDetails({
        guests: guestNum,
        date: selectedDate,
        service: selectedService,
      });
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================
          HERO VIEWPORT — CINEMATIC EDITORIAL HERO
          ======================================================== */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background Hero Photography */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFzEst9cvYrTb7P12PdXNZkn0LzIAeIA6B157HX3XCA7rBhvzhBrQwRO4zelncb0JVhc3V3Amd_wUIWq-bIITB4xNmS0J2NPP57J64X-o9qzt559Ot0irUNg23h1YNqPmEPR_uP7B0TsTrnqyiPikfK-h2OPQbmRscXd8WzDOZ3UH1e_uAhjAS5N7oeLxu3M2_7Rfw6SMpCnVAtxfL4q3C3GmiR6aIouvxyCxN9AkF6bwPy9bQWAvIOA"
            alt="Ember & Oak Culinary Masterpiece"
            className="w-full h-full object-cover object-center scale-[1.01] brightness-[0.72] transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 hero-side-gradient" />
          <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#111110] via-[#111110]/60 to-transparent" />
        </div>

        {/* Editorial Corner Marker */}
        <div className="relative z-10 hidden lg:flex justify-end pt-8">
          <div className="text-right border-r border-[#39342E] pr-5 py-1">
            <span className="block text-[10px] tracking-[0.25em] uppercase text-[#C18A65] font-semibold">
              Issue Nº 04 · Tasting Vol.
            </span>
            <span className="block text-[11px] text-[#A69D90] tracking-widest font-serif-lux italic mt-0.5">
              Charred Heritage &amp; Wild Flora
            </span>
          </div>
        </div>

        {/* Hero Main Copy */}
        <div className="relative z-10 max-w-4xl my-auto pt-8 md:pt-14 pb-12">
          <div className="inline-flex items-center gap-3.5 mb-6">
            <span className="w-6 h-[1px] bg-[#C18A65]" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold font-mono">
              Contemporary Dining · Est. 2021
            </span>
          </div>

          <h1 className="font-serif-lux text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-light text-[#F0E8DC] leading-[1.04] tracking-tight mb-8">
            A Taste Beyond <br />
            <span className="italic font-normal">the Ordinary.</span>
          </h1>

          <p className="text-base sm:text-[17px] text-[#C4BDB2] font-light max-w-2xl leading-relaxed mb-10 tracking-wide">
            An extraordinary meeting of fire, flavour and imagination. Discover a dining experience crafted to linger in your memory.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-1">
            <button
              onClick={handleQuickReserve}
              className="btn-primary-ivory inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] cursor-pointer"
            >
              <span>Reserve Your Table</span>
              <span className="text-xs leading-none font-mono">→</span>
            </button>

            <button
              onClick={() => onNavigate('menu')}
              className="btn-secondary-line inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] cursor-pointer"
            >
              <span>Explore The Menu</span>
              <span className="text-xs leading-none font-mono">→</span>
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.16em] text-[#A69D90] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
            <span>Hyderabad, India</span>
            <span className="text-[#39342E]">/</span>
            <span>Dinner From 7 PM – Midnight</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 w-full pt-8 flex items-end justify-between border-t border-[#39342E]">
          <div className="hidden sm:flex items-center gap-4 text-[#A69D90] text-[10px] tracking-[0.2em] uppercase">
            <span className="font-serif-lux text-[#F0E8DC] italic text-sm">Prix d’Excellence</span>
            <span className="w-3 h-[1px] bg-[#39342E]" />
            <span>Curated Tasting Menu</span>
          </div>

          <a
            href="#philosophy"
            className="group mx-auto sm:mx-0 flex flex-col items-center gap-2 text-[#A69D90] hover:text-[#F0E8DC] transition-colors focus:outline-none"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-[#A69D90] group-hover:text-[#F0E8DC]">
              Scroll To Discover
            </span>
            <div className="w-[1px] h-6 bg-[#39342E] group-hover:bg-[#C18A65] transition-colors relative overflow-hidden">
              <div className="w-full h-2 bg-[#C18A65] animate-scroll-indicator" />
            </div>
          </a>

          <div className="hidden sm:block text-right">
            <span className="block text-[9px] tracking-[0.2em] uppercase text-[#A69D90]">Plate No. 01</span>
            <span className="font-serif-lux text-xs text-[#F0E8DC] italic tracking-wide">
              Braised Smoked Lamb Cheek · 24k Gold Foil
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION A: OUR PHILOSOPHY (Asymmetrical Editorial Grid)
          ======================================================== */}
      <section
        id="philosophy"
        className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#181716] border-t border-[#39342E]/50"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center gap-3">
                <span className="w-7 h-[1px] bg-[#C18A65]" />
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold">
                  Our Philosophy
                </span>
              </div>

              <h2 className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl font-light text-[#F0E8DC] leading-[1.12]">
                Not simply a meal.<br />
                <span className="italic font-normal">A moment worth remembering.</span>
              </h2>

              <div className="w-12 h-[1px] bg-[#39342E]" />

              <p className="text-[#C4BDB2] text-base md:text-[17px] font-light leading-relaxed">
                At Ember &amp; Oak, primitive heat meets progressive gastronomy. We draw ancient inspiration from charcoal pits, clay tandoors, and heirloom woods, harmonizing them with contemporary culinary discipline.
              </p>

              <p className="text-[#A69D90] text-sm md:text-base font-light leading-relaxed">
                Every plate is an unhurried composition of rare regional botanicals, heritage grains, and sustainably sourced meats—honouring the earth while redefining modern luxury hospitality.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate('story')}
                  className="editorial-link text-[11px] font-semibold uppercase cursor-pointer"
                >
                  <span>Discover Our Story</span>
                  <span className="text-xs font-mono">→</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#39342E] flex items-center gap-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#A69D90]">
                  <span className="text-[#F0E8DC] font-medium block">Vikramaditya Rao</span>
                  <span className="italic font-serif-lux text-[#C18A65] text-xs lowercase first-letter:uppercase">
                    Chef Patron &amp; Founder
                  </span>
                </div>
              </div>
            </div>

            {/* Right Chef Plating Showcase */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-[2px] overflow-hidden border border-[#39342E] bg-[#121210] shadow-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WKBP4IIAWUnvr-ToAR1r0e_d-tLdxa3xl1FfSTYoLoRQCNNbzdwbRxQu4JtXZsM1EoKveae-xdJeg1__MquAFyt7784xgmvn2kyaHVQpIgvaDSD-b818z0qSJfenbjZ75jqYm-XPX8xYrUgzoLitH5r8SYGQhdJfXnirBPt-o8aITPyXy6IavGjq4Oaod8HeVkRpsWY7iMt86iC920A_Mh8lZoy2ui3WnqVQ9clfSpGpRiwR1R8ioL_Hk"
                    alt="Executive Chef Vikramaditya Rao crafting culinary course at Ember & Oak"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191816] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 md:p-8 bg-[#191816] border-t border-[#39342E] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-[#C18A65] block mb-1 font-semibold">
                      Culinary Direction
                    </span>
                    <p className="font-serif-lux text-lg text-[#F0E8DC] italic">
                      "Fire is not merely an element; it is our most sacred ingredient."
                    </p>
                  </div>
                  <div className="text-left sm:text-right sm:border-l sm:border-[#39342E] sm:pl-6 shrink-0">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A69D90] block">
                      Open Fire Hearth
                    </span>
                    <span className="font-serif-lux text-base text-[#F0E8DC] italic">
                      Oak-Charcoal Fired
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B: SIGNATURE CREATIONS (Asymmetrical Editorial Menu)
          ======================================================== */}
      <section
        id="signature"
        className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#111110] border-t border-[#39342E]/50"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#39342E]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-7 h-[1px] bg-[#C18A65]" />
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold">
                  Signature Creations
                </span>
              </div>
              <h2 className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl font-light text-[#F0E8DC] leading-tight">
                Crafted with passion.<br />
                <span className="italic font-normal">Served with purpose.</span>
              </h2>
            </div>

            <div className="mt-6 md:mt-0 text-left md:text-right">
              <p className="text-[#A69D90] text-sm max-w-xs font-light mb-3">
                Seasonal tasting courses curated around live smoke, dry-aged heritage cuts, and ancestral spices.
              </p>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C18A65] font-semibold">
                Autumn / Winter Degustation
              </span>
            </div>
          </div>

          {/* Asymmetrical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Dish 1: Biryani au Safran (Span 7) */}
            <div className="lg:col-span-7 rounded-[2px] border border-[#39342E] bg-[#191816] flex flex-col justify-between transition-all duration-300 hover:border-[#C18A65]/50 group">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#121210]">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UesbfXaYh1LWio2ZzrI7KQItgqthDehxnVKQmX7WGQltIAt8bZz6CkwrDMxR2b1wHpPd7SjtXR8-qrf8l2i9J2w8mNZOhYWiipX_XVhVSAdss40vHctrQvdB8kYKIUySBhNk7OGH21BpwjiORQO_KyBaDyTb1kqaq5mCttz68IR82BZxdPA4zr3-Qr-_Eq1RaBlqZ3xtKMnj4ElhVG45L6wgD6bz9mCLsHCUdbg8Ihdl6cTj4PY3qutTfi"
                  alt="Slow-Cooked Dum Biryani in antique copper handi with 24k gold leaf"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191816] via-transparent to-transparent opacity-75" />
                <div className="absolute top-5 left-5 bg-[#121210]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#39342E]">
                  <span className="text-[9px] tracking-[0.22em] uppercase text-[#C18A65] font-semibold font-mono">
                    Chef’s Masterpiece
                  </span>
                </div>
                <div className="absolute bottom-5 right-5 text-right bg-[#121210]/95 backdrop-blur-sm px-4 py-2 border border-[#39342E]">
                  <span className="font-serif-lux text-2xl text-[#F0E8DC] font-light">₹ 2,450</span>
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-[#A69D90]">
                    Taxes Applicable
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C18A65] font-semibold font-mono">
                      Course VII · Royal Awadh Legacy
                    </span>
                    <span className="text-xs text-[#A69D90] hidden sm:inline">Slow-Dum 6 Hours</span>
                  </div>
                  <h3 className="font-serif-lux text-3xl sm:text-4xl text-[#F0E8DC] font-light mb-4">
                    Slow-Cooked Dum Biryani <span className="italic font-normal">au Safran</span>
                  </h3>
                  <p className="text-[#C4BDB2] text-sm sm:text-base font-light leading-relaxed mb-6">
                    Aged Dehradun basmati layered with tender heritage lamb, sealed in an antique burnished copper handi pot with unleavened wholewheat dough. Infused with Kashmiri Mogra saffron, mace, edible 24-karat gold foil, and aromatic smoke.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#39342E] flex items-center justify-between text-xs tracking-wider uppercase text-[#A69D90]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
                    <span>Pairing: Vintage Amarone della Valpolicella</span>
                  </div>
                  <button
                    onClick={() => onNavigate('menu', 'biryani-safran')}
                    className="text-[#C18A65] hover:text-[#F0E8DC] transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Inquire</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dishes 2 & 3: Stacked (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Dish 2: Charcoal Paneer Tikka */}
              <div className="rounded-[2px] border border-[#39342E] bg-[#191816] flex-1 flex flex-col justify-between transition-all duration-300 hover:border-[#C18A65]/50 group">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121210]">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UF4RVeDUceqdwu4IqnDdjeNlYptqs-49GtUMVyo5mhSkAKUJj9s19QY9WQyCfB8gbsfNSgYhs08vmWiw0vddbE-4JvTDovpKO49KhFIpqze8X7OXcAr_4rmNcl5tkwmW7mQSd6JqujXau3JceoLBRgg-ci7rR1qk-Edz0trhYJXVsWpR907Ai_JsQWMwo-TOyseVRbs38xqjEWS2BP19xBO_wE5WY4xlTPxnEn-rFi32cHduEerkK6Khc"
                    alt="Gourmet Charcoal Paneer Tikka on slate"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191816] via-transparent to-transparent opacity-75" />
                  <div className="absolute top-4 left-4 bg-[#121210]/90 backdrop-blur-sm px-3 py-1 border border-[#39342E]">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#C18A65] font-semibold font-mono">
                      Vegetarian Tasting
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121210]/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#39342E]">
                    <span className="font-serif-lux text-xl text-[#F0E8DC] font-light">₹ 1,650</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#C18A65] mb-1 font-semibold font-mono">
                    Course III · Smoked Starters
                  </div>
                  <h3 className="font-serif-lux text-2xl sm:text-3xl text-[#F0E8DC] font-light mb-3">
                    Charcoal Paneer Tikka
                  </h3>
                  <p className="text-[#C4BDB2] text-xs sm:text-sm font-light leading-relaxed mb-4">
                    Artisanal buffalo milk paneer cured in yellow mustard and smoked hung curd, seared over glowing sal-wood embers. Garnished with edible viola petals and dehydrated mint salt.
                  </p>
                  <div className="pt-4 border-t border-[#39342E] flex items-center justify-between text-[11px] tracking-wider uppercase text-[#A69D90]">
                    <span>Pairing: Sancerre Blanc 2020</span>
                    <button
                      onClick={() => onNavigate('menu', 'paneer-tikka')}
                      className="text-[#C18A65] hover:text-[#F0E8DC] transition-colors cursor-pointer flex items-center gap-1 font-mono"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dish 3: Smoked Chocolate Fondant */}
              <div className="rounded-[2px] border border-[#39342E] bg-[#191816] flex-1 flex flex-col justify-between transition-all duration-300 hover:border-[#C18A65]/50 group">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121210]">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1VFLJYDyoEuvPXXuTK7XfYcSM06hl1g3dhrQ_YgWV-jJ2GHf5FzoOS0NnuTKsLP221yujxZMwe0oeech5MQfR-38X4d0zEF0SIw9KSH4jgNANvezMJh0gsIv5C-Q_tSEdHBJTTV3j3SJwmaNJlUEyuhv6kTiSJW6JGQ5aUvAMkn4OoI5eiMIebiYA9OXEMDCo6SWYf6NIXzD959qX5jLwBZ8WAuAVHYqyvxK0lrUVfkJZvjMaz4GWAL85Q"
                    alt="Smoked Chocolate Fondant dessert with gold dust and quenelle"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191816] via-transparent to-transparent opacity-75" />
                  <div className="absolute top-4 left-4 bg-[#121210]/90 backdrop-blur-sm px-3 py-1 border border-[#39342E]">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#C18A65] font-semibold font-mono">
                      Final Revelation
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121210]/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#39342E]">
                    <span className="font-serif-lux text-xl text-[#F0E8DC] font-light">₹ 1,450</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#C18A65] mb-1 font-semibold font-mono">
                    Course IX · Confections
                  </div>
                  <h3 className="font-serif-lux text-2xl sm:text-3xl text-[#F0E8DC] font-light mb-3">
                    Smoked Chocolate Fondant
                  </h3>
                  <p className="text-[#C4BDB2] text-xs sm:text-sm font-light leading-relaxed mb-4">
                    72% single-origin Venezuelan dark chocolate with molten heart, applewood smoke infusion, Madagascar vanilla bean gelato, and Maldon smoked sea salt flake finish.
                  </p>
                  <div className="pt-4 border-t border-[#39342E] flex items-center justify-between text-[11px] tracking-wider uppercase text-[#A69D90]">
                    <span>Pairing: 20-Year Tawny Port</span>
                    <button
                      onClick={() => onNavigate('menu', 'chocolate-fondant')}
                      className="text-[#C18A65] hover:text-[#F0E8DC] transition-colors cursor-pointer flex items-center gap-1 font-mono"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('menu')}
              className="btn-secondary-line inline-flex items-center gap-3 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] cursor-pointer"
            >
              <span>View The Full Menu</span>
              <span className="text-xs leading-none font-mono">→</span>
            </button>
            <p className="text-[#A69D90] text-xs mt-3 uppercase tracking-[0.16em] font-mono">
              A la Carte &amp; 9-Course Sommelier Degustation Available
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: THE ATMOSPHERE (Edge-to-Edge Dramatic Interior)
          ======================================================== */}
      <section
        id="atmosphere"
        className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UJ-Q6uG0hEssCEzI0naQcEQr1SZRdNw76NapMj3VAs0ro4NTcnhq-siEasfvRr5b78BL59qILK4bNHZROz78CxCZ85bNxyfAP8YFGAKIiyvuAUecbC87bgrrqQB-MT9627GZ5Z0wJkzpa5v-lKEJRkvLxsgDlk0qoyQmEdOA9COg9cUD5rkz7WtvsfI3w1fA8v_FLmvoEtGZR5130I4Z85pZhFMWHqcRC0sCsL3PlCF0h5OCElZFgX4Bcs"
            alt="Ember & Oak intimate atmospheric luxury restaurant interior"
            className="w-full h-full object-cover object-center filter brightness-[0.70]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-[#121210]/60 to-[#121210]" />
          <div className="absolute inset-0 bg-[#121210]/40 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3 justify-center mb-2">
            <span className="w-6 h-[1px] bg-[#C18A65]" />
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold">
              Spatial Design
            </span>
            <span className="w-6 h-[1px] bg-[#C18A65]" />
          </div>

          <h2 className="font-serif-lux text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F0E8DC] leading-tight">
            An atmosphere <br />
            <span className="italic font-normal">all its own.</span>
          </h2>

          <p className="text-[#C4BDB2] text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed pt-2">
            Bathed in warm amber candlelight, charred oak walls, bespoke spun-copper pendants, and quiet privacy. Crafted for conversations that stretch into the night.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] tracking-[0.18em] uppercase text-[#A69D90]">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              <span>Private Wine Vault</span>
            </div>
            <span className="text-[#39342E]">·</span>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              <span>Sommelier Table</span>
            </div>
            <span className="text-[#39342E]">·</span>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              <span>Chef’s Counter (6 Seats)</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('experiences')}
              className="editorial-link text-[11px] uppercase tracking-widest text-[#C18A65] hover:text-[#F0E8DC] cursor-pointer"
            >
              <span>Explore All Dining Enclaves</span>
              <span className="text-xs font-mono">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION D: RESERVATION CALL TO ACTION
          ======================================================== */}
      <section
        id="reservations"
        className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#181716] border-t border-[#39342E]"
      >
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#39342E]" />
            <span className="w-5 h-5 rounded-[2px] border border-[#39342E] flex items-center justify-center text-[#C18A65] text-[10px]">
              ◆
            </span>
            <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#39342E]" />
          </div>

          <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold block mb-4">
            Tables &amp; Private Enclaves
          </span>
          <h2 className="font-serif-lux text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F0E8DC] mb-5 leading-tight">
            Your table is waiting.
          </h2>
          <p className="text-[#C4BDB2] text-base sm:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Make an evening of it. We’ll take care of the details.
          </p>

          {/* Interactive Booking Panel */}
          <div className="max-w-2xl mx-auto bg-[#191816] p-7 sm:p-9 border border-[#39342E] rounded-[2px] shadow-2xl mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-left">
              {/* Guests */}
              <div className="border border-[#39342E] py-3 px-4 bg-[#121210] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-[0.14em] text-[#A69D90] mb-1 font-medium">
                  Guests
                </label>
                <select
                  value={selectedGuests}
                  onChange={(e) => setSelectedGuests(e.target.value)}
                  className="w-full bg-transparent text-[#F0E8DC] font-serif-lux text-base border-0 p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="2 Guests" className="bg-[#191816]">2 Guests</option>
                  <option value="4 Guests" className="bg-[#191816]">4 Guests</option>
                  <option value="6 Guests" className="bg-[#191816]">6 Guests (Chef's Counter)</option>
                  <option value="12 Guests" className="bg-[#191816]">Private Vault (12 Guests)</option>
                </select>
              </div>

              {/* Date */}
              <div className="border border-[#39342E] py-3 px-4 bg-[#121210] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-[0.14em] text-[#A69D90] mb-1 font-medium">
                  Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent text-[#F0E8DC] font-serif-lux text-base border-0 p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="Today, 8:30 PM" className="bg-[#191816]">Today, 8:30 PM</option>
                  <option value="Tomorrow, 7:00 PM" className="bg-[#191816]">Tomorrow, 7:00 PM</option>
                  <option value="Friday, 8:30 PM" className="bg-[#191816]">Friday, 8:30 PM</option>
                  <option value="Saturday, 9:00 PM" className="bg-[#191816]">Saturday, 9:00 PM</option>
                </select>
              </div>

              {/* Service */}
              <div className="border border-[#39342E] py-3 px-4 bg-[#121210] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-[0.14em] text-[#A69D90] mb-1 font-medium">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-transparent text-[#F0E8DC] font-serif-lux text-base border-0 p-0 focus:ring-0 cursor-pointer"
                >
                  <option value="Main Dining Room" className="bg-[#191816]">Main Dining Room</option>
                  <option value="Chef’s Counter (6 Seats)" className="bg-[#191816]">Chef’s Counter (6 Seats)</option>
                  <option value="Sommelier Wine Vault" className="bg-[#191816]">Sommelier Wine Vault</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleQuickReserve}
              className="btn-copper w-full inline-flex items-center justify-center gap-3 py-4 px-8 text-[12px] uppercase tracking-[0.16em] cursor-pointer"
            >
              <span>Reserve Your Experience</span>
              <span className="text-xs leading-none font-mono">→</span>
            </button>
          </div>

          <div className="text-xs text-[#A69D90] space-y-1.5">
            <p>
              Direct Concierge Line:{' '}
              <a href="tel:+914023456789" className="text-[#F0E8DC] hover:underline font-mono">
                +91 (040) 2345 6789
              </a>
            </p>
            <p className="text-[11px] text-[#A69D90]">
              Reservations open 30 days in advance. Smart elegant attire requested.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
