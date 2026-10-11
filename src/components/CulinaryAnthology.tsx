import React, { useState, useMemo } from 'react';
import { Dish } from '../types';
import { DISHES_DATABASE, PROGRESSION_COURSES } from '../data/culinaryData';
import { Check, Info, Flame, Wine, ShieldCheck, Heart, RotateCw, Video } from 'lucide-react';

interface CulinaryAnthologyProps {
  initialDishId?: string;
  onOpenReservation: () => void;
  onOpenDietaryModal: () => void;
  onToggleWishlist?: (dishId: string) => void;
  wishlist?: string[];
  onOpen3DStudio?: (dishId: string) => void;
}

export const CulinaryAnthology: React.FC<CulinaryAnthologyProps> = ({
  initialDishId = 'biryani-safran',
  onOpenReservation,
  onOpenDietaryModal,
  onToggleWishlist,
  wishlist = [],
  onOpen3DStudio,
}) => {
  const [selectedDishId, setSelectedDishId] = useState<string>(initialDishId);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [inquireSuccessMessage, setInquireSuccessMessage] = useState<string | null>(null);

  // Synchronize when initialDishId changes from parent navigation
  React.useEffect(() => {
    if (initialDishId) {
      setSelectedDishId(initialDishId);
    }
  }, [initialDishId]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES_DATABASE.filter((dish) => {
      // Category filter
      if (categoryFilter === 'appetizers' && dish.category !== 'appetizer') return false;
      if (categoryFilter === 'mains' && dish.category !== 'main') return false;
      if (categoryFilter === 'desserts' && dish.category !== 'dessert') return false;
      if (categoryFilter === 'pairings' && !dish.pairing) return false;

      // Dietary filter
      if (dietaryFilter === 'gluten-free' && !dish.tags.some(t => t.includes('gluten-free'))) return false;
      if (dietaryFilter === 'dairy-free' && !dish.tags.some(t => t.includes('dairy-free'))) return false;
      if (dietaryFilter === 'nut-free' && !dish.tags.includes('nut-free')) return false;
      if (dietaryFilter === 'vegetarian' && !dish.tags.includes('vegetarian')) return false;
      if (dietaryFilter === 'live-hearth' && !dish.tags.includes('live-hearth')) return false;

      return true;
    });
  }, [categoryFilter, dietaryFilter]);

  const activeDish = useMemo(() => {
    return (
      DISHES_DATABASE.find((d) => d.id === selectedDishId) ||
      filteredDishes[0] ||
      DISHES_DATABASE[0]
    );
  }, [selectedDishId, filteredDishes]);

  const handleOrderInquire = () => {
    setInquireSuccessMessage(`Inquiry for ${activeDish.title} sent to table concierge.`);
    setTimeout(() => {
      setInquireSuccessMessage(null);
    }, 4000);
  };

  const isSaved = wishlist.includes(activeDish.id);

  return (
    <div className="w-full pt-28">
      {/* ========================================================
          HERO EDITORIAL INTRO — ANTHOLOGY HEADER
          ======================================================== */}
      <section className="relative pt-12 pb-12 border-b border-[#2A2723] px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1520px] mx-auto">
          {/* Eyebrow & Issue Label */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              <p className="text-[11px] font-medium tracking-[0.28em] text-[#C18A65] uppercase font-mono">
                Degustation &amp; À La Carte • Autumn / Winter Vol. IV
              </p>
            </div>
            <p className="text-[11px] tracking-widest text-[#A69D90] uppercase font-mono">
              Curated Tasting Vol. 04 — 48-Hour Open Flame Maturation
            </p>
          </div>

          {/* Editorial Headline and Summary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif-lux text-5xl md:text-6xl lg:text-7xl font-light text-[#F0E8DC] leading-[1.08] tracking-tight">
                The Culinary <span className="italic font-normal text-[#C18A65]">Anthology.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-[#C4BDB2] max-w-3xl leading-relaxed font-light">
                Every dish is an unhurried composition of ancient fire, rare regional botanicals, and sustainably harvested heirlooms. Select any creation below to reveal its botanical provenance, fire technique, and complete ingredient tapestry.
              </p>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-8 pb-2 border-t lg:border-t-0 border-[#2A2723] pt-6 lg:pt-0">
              <div>
                <span className="block font-serif-lux text-3xl text-[#F0E8DC]">100%</span>
                <span className="text-[10px] tracking-widest uppercase text-[#A69D90] font-mono">
                  Wild Foraged Herbs
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#2A2723]" />
              <div>
                <span className="block font-serif-lux text-3xl text-[#F0E8DC]">Oak &amp; Sal</span>
                <span className="text-[10px] tracking-widest uppercase text-[#A69D90] font-mono">
                  Live Hearth Coals
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#2A2723]" />
              <div>
                <span className="block font-serif-lux text-3xl text-[#F0E8DC]">24-Karat</span>
                <span className="text-[10px] tracking-widest uppercase text-[#A69D90] font-mono">
                  Auric Garnish
                </span>
              </div>
            </div>
          </div>

          {/* Course Category Navigation Tabs */}
          <div className="mt-14 pt-8 border-t border-[#2A2723]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === 'all'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              All Offerings (06)
            </button>
            <button
              onClick={() => setCategoryFilter('appetizers')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === 'appetizers'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Charred &amp; Raw (Appetizers)
            </button>
            <button
              onClick={() => setCategoryFilter('mains')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === 'mains'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Live Fire &amp; Clay (Mains)
            </button>
            <button
              onClick={() => setCategoryFilter('desserts')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === 'desserts'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Sweet Revelations (Desserts)
            </button>
            <button
              onClick={() => setCategoryFilter('pairings')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                categoryFilter === 'pairings'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Sommelier Pairings
            </button>
          </div>

          {/* Interactive Dietary & Macro Filter Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-widest text-[#A69D90] mr-2 font-mono">
              Filter Matrix:
            </span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'all'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              • All Ingredients
            </button>
            <button
              onClick={() => setDietaryFilter('gluten-free')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'gluten-free'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              Gluten-Free Compliant
            </button>
            <button
              onClick={() => setDietaryFilter('dairy-free')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'dairy-free'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              Dairy-Free Modifiable
            </button>
            <button
              onClick={() => setDietaryFilter('nut-free')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'nut-free'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              Nut-Free
            </button>
            <button
              onClick={() => setDietaryFilter('vegetarian')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'vegetarian'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              Vegetarian Selection
            </button>
            <button
              onClick={() => setDietaryFilter('live-hearth')}
              className={`px-3 py-1 text-[10px] tracking-wider uppercase rounded-[2px] transition-all cursor-pointer font-mono ${
                dietaryFilter === 'live-hearth'
                  ? 'bg-[#1C1A17] text-[#C18A65] border border-[#C18A65]'
                  : 'bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC] border border-[#2A2723]'
              }`}
            >
              Live Hearth Only
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          MASTER-DETAIL WORKSPACE
          ======================================================== */}
      <main className="max-w-[1520px] mx-auto px-6 lg:px-12 xl:px-20 py-12" id="menu-anthology">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* ========================================================
              LEFT COLUMN: The Dish Anthology (Selectable List)
              ======================================================== */}
          <section
            aria-label="Dish Selector Collection"
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2723]">
              <h2 className="text-[11px] font-semibold tracking-widest uppercase text-[#C18A65] font-mono">
                Select Plate to Inspect Archive
              </h2>
              <span className="text-[10px] font-mono tracking-widest text-[#A69D90]">
                {filteredDishes.length.toString().padStart(2, '0')} DISHES RECORDED
              </span>
            </div>

            {filteredDishes.map((dish) => {
              const isActive = dish.id === activeDish.id;
              return (
                <article
                  key={dish.id}
                  onClick={() => setSelectedDishId(dish.id)}
                  className={`p-5 rounded-[2px] relative cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-[#191816] border border-[#C18A65] shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                      : 'bg-[#141312] hover:bg-[#191816] border border-[#2A2723] hover:border-[#39342E]'
                  }`}
                >
                  {/* Active Pin Accent */}
                  {isActive && (
                    <div className="absolute -left-[1px] top-4 bottom-4 w-1 bg-[#C18A65]" />
                  )}

                  <div className="flex gap-5 items-start">
                    <div className="w-28 h-28 shrink-0 overflow-hidden rounded-[2px] border border-[#39342E] relative bg-[#111110]">
                      <img
                        src={dish.imageUrl}
                        alt={dish.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? 'scale-105' : 'hover:scale-105'
                        }`}
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#121210]/80 backdrop-blur-sm text-[8px] tracking-widest uppercase text-[#C18A65] font-mono">
                        {dish.courseRoman}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C18A65] truncate">
                          {dish.courseTitle}
                        </span>
                        {dish.badge && (
                          <span className="text-[9px] bg-[#A96947]/20 text-[#F0E8DC] border border-[#A96947]/40 px-2 py-0.5 rounded-[2px] tracking-wider uppercase font-semibold shrink-0">
                            {dish.badge}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-serif-lux text-xl md:text-2xl mt-1 font-normal tracking-wide leading-snug transition-colors ${
                          isActive ? 'text-[#F0E8DC]' : 'text-[#F0E8DC] hover:text-[#C18A65]'
                        }`}
                      >
                        {dish.title}{' '}
                        {dish.italicPart && (
                          <span className="italic text-[#C18A65]">{dish.italicPart}</span>
                        )}
                      </h3>

                      <p className="text-xs text-[#A69D90] line-clamp-2 mt-1 leading-relaxed font-light">
                        {dish.shortDescription}
                      </p>

                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-[#2A2723]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#F0E8DC] tracking-wider font-mono">
                            {dish.priceFormatted}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-[#A69D90]">
                            taxes extra
                          </span>
                        </div>

                        {isActive ? (
                          <span className="text-[9px] uppercase tracking-widest text-[#C18A65] font-medium flex items-center gap-1.5 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65] animate-ping" />
                            Currently Inspecting
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase tracking-widest text-[#A69D90] group-hover:text-[#F0E8DC] transition-colors font-mono">
                            Inspect →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* ========================================================
              RIGHT COLUMN: Dedicated Deep "Ingredient & Provenance Dossier"
              ======================================================== */}
          <section
            aria-label="Detailed Ingredient and Provenance Dossier"
            className="lg:col-span-7 lg:sticky lg:top-28 bg-[#191816] border border-[#39342E] rounded-[2px] p-6 lg:p-9 shadow-2xl transition-all"
          >
            {/* Header Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#2A2723]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C18A65] rotate-45" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C18A65] font-mono">
                  In-Depth Ingredient Provenance &amp; Harvest Report
                </span>
              </div>
              <div className="flex items-center gap-3">
                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(activeDish.id)}
                    className={`p-1.5 rounded-[2px] border transition-colors cursor-pointer ${
                      isSaved
                        ? 'border-[#C18A65] text-[#C18A65] bg-[#C18A65]/10'
                        : 'border-[#2A2723] text-[#A69D90] hover:text-[#F0E8DC]'
                    }`}
                    title={isSaved ? 'Saved to Degustation Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                )}
                <span className="text-[10px] font-mono tracking-widest text-[#A69D90] bg-[#121210] px-3 py-1 border border-[#2A2723] rounded-[2px]">
                  ARCHIVE ID: {activeDish.archiveId}
                </span>
              </div>
            </div>

            {/* Master Title & High-End Dish Metadata */}
            <div className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-serif-lux text-3xl md:text-4xl lg:text-5xl font-normal text-[#F0E8DC] tracking-wide">
                  {activeDish.title}{' '}
                  {activeDish.italicPart && (
                    <span className="italic text-[#C18A65]">{activeDish.italicPart}</span>
                  )}
                </h2>
                <div className="text-right">
                  <span className="font-serif-lux text-2xl text-[#F0E8DC]">
                    {activeDish.priceFormatted}
                  </span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono">
                    {activeDish.courseTitle.split('•')[0].trim()} • Degustation
                  </span>
                </div>
              </div>
              <p className="text-xs uppercase tracking-widest text-[#C18A65] font-mono mt-2">
                Technique: {activeDish.technique}
              </p>
            </div>

            {/* Hero Plating Image with Subtle Overlay Details */}
            <div className="mt-6 relative overflow-hidden rounded-[2px] border border-[#39342E] group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#121210]">
                <img
                  src={activeDish.imageUrl}
                  alt={activeDish.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating 360 3D Button on Image */}
              {onOpen3DStudio && (
                <button
                  onClick={() => onOpen3DStudio(activeDish.id)}
                  className="absolute top-3 right-3 bg-black/75 hover:bg-[#C18A65] text-white hover:text-black border border-[#C18A65] px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
                  title="Rotate camera 360° in 3D Studio"
                >
                  <RotateCw className="w-3 h-3 text-[#C18A65] group-hover:text-black" />
                  <span>360° 3D View</span>
                </button>
              )}

              {/* Bottom Plating Legend Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#121210] via-[#121210]/85 to-transparent p-4 flex items-end justify-between">
                <div className="text-[11px] text-[#F0E8DC] max-w-md font-light">
                  <span className="text-[#C18A65] font-medium uppercase text-[9px] tracking-widest block font-mono">
                    Sensory Profile:
                  </span>
                  {activeDish.sensoryProfile}
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#E9E0D2] bg-[#A96947]/75 backdrop-blur-sm px-2.5 py-1 rounded-[2px] font-mono">
                  {activeDish.heroBadgeText}
                </span>
              </div>
            </div>

            {/* Culinary Concept Narrative */}
            <div className="mt-6 p-4 bg-[#141312] border-l-2 border-[#C18A65] text-xs md:text-sm text-[#C4BDB2] leading-relaxed font-light italic">
              {activeDish.fullQuote}
            </div>

            {/* Inquire notification feedback */}
            {inquireSuccessMessage && (
              <div className="mt-4 p-3 bg-[#C18A65]/15 border border-[#C18A65] text-[#F0E8DC] text-xs rounded-[2px] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C18A65]" />
                <span>{inquireSuccessMessage}</span>
              </div>
            )}

            {/* DETAILED INGREDIENT TAPESTRY (Categorized & Itemized) */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A2723]">
                <h3 className="text-xs uppercase tracking-widest text-[#F0E8DC] font-semibold font-mono">
                  The Botanical &amp; Ingredient Tapestry
                </h3>
                <span className="text-[9px] text-[#A69D90] tracking-widest font-mono">
                  HARVEST ORIGIN VERIFIED
                </span>
              </div>

              {activeDish.ingredientGroups.map((group) => (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65] font-semibold">
                      {group.categoryNumber} • {group.title}
                    </span>
                    <div className="flex-1 h-[1px] bg-[#2A2723]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#141312] border border-[#2A2723] rounded-[2px] hover:border-[#39342E] transition-colors"
                      >
                        <div className="text-xs font-serif-lux text-[#F0E8DC] font-medium">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-[#C18A65] font-mono mt-0.5">
                          {item.origin}
                        </div>
                        <p className="text-[11px] text-[#A69D90] mt-1.5 leading-normal font-light">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sommelier Cellar Note */}
            <div className="mt-8 p-4 bg-[#141312] border border-[#39342E] rounded-[2px] flex items-start gap-3">
              <div className="mt-0.5 text-[#C18A65] font-serif-lux text-lg">•</div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C18A65] font-semibold">
                  {activeDish.pairing.title}
                </div>
                <p className="text-xs text-[#F0E8DC] mt-1 font-serif-lux text-[15px] italic leading-relaxed">
                  "{activeDish.pairing.description}"
                </p>
              </div>
            </div>

            {/* Allergen & Dietary Compliance Badges */}
            <div className="mt-6 pt-5 border-t border-[#2A2723] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {activeDish.allergens.map((alg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#121210] border border-[#2A2723] text-[9px] uppercase tracking-wider text-[#A69D90] rounded-[2px] font-mono"
                  >
                    {alg}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                {onOpen3DStudio && (
                  <button
                    onClick={() => onOpen3DStudio(activeDish.id)}
                    className="flex-1 sm:flex-none px-4 py-3 bg-[#1C1A18] hover:bg-[#2A2723] text-[#C18A65] border border-[#C18A65] text-[11px] font-semibold tracking-widest uppercase rounded-[2px] transition-colors duration-200 cursor-pointer font-mono flex items-center justify-center gap-1.5"
                    title="Rotate camera 360° around this food in 3D"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>360° 3D Camera</span>
                  </button>
                )}
                <button
                  onClick={handleOrderInquire}
                  className="flex-1 sm:flex-none px-5 py-3 bg-[#A96947] hover:bg-[#C18A65] text-[#121210] text-[11px] font-semibold tracking-widest uppercase rounded-[2px] transition-colors duration-200 cursor-pointer font-mono"
                >
                  Order to Table / Inquire
                </button>
                <button
                  onClick={onOpenDietaryModal}
                  className="flex-1 sm:flex-none px-4 py-3 border border-[#39342E] hover:border-[#C18A65] text-[#F0E8DC] text-[11px] tracking-widest uppercase rounded-[2px] transition-colors duration-200 cursor-pointer font-mono"
                >
                  Dietary Matrix
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ========================================================
          THE 9-COURSE PROGRESSION TIMELINE SECTION
          ======================================================== */}
      <section className="border-t border-[#2A2723] bg-[#141312] py-20 px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1520px] mx-auto">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C18A65] font-mono">
              The 9-Course Progression
            </span>
            <h2 className="font-serif-lux text-4xl md:text-5xl text-[#F0E8DC] mt-2 font-normal">
              Designed as a Narrative of <span className="italic text-[#C18A65]">Flavour &amp; Flame.</span>
            </h2>
            <p className="mt-4 text-sm text-[#A69D90] leading-relaxed">
              From cold-smoked botanical flatbreads to high-heat clay searing, climaxing in slow-braised dum clay pots and smoke-kissed cocoa.
            </p>
          </div>

          {/* Progression Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {PROGRESSION_COURSES.map((course) => (
              <div
                key={course.number}
                className={`p-4 rounded-[2px] transition-all ${
                  course.isApex
                    ? 'bg-[#191816] border border-[#C18A65] bg-[#C18A65]/5 shadow-lg'
                    : 'bg-[#191816] border border-[#2A2723] hover:border-[#39342E]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#C18A65] block">
                  {course.number} • {course.stage}
                </span>
                <h4 className="font-serif-lux text-lg text-[#F0E8DC] mt-1">{course.title}</h4>
                <p className="text-[11px] text-[#A69D90] mt-2 leading-relaxed">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          RESERVATION CONCIERGE CALLOUT
          ======================================================== */}
      <section className="py-24 border-t border-[#2A2723] relative bg-[#121210] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="w-2.5 h-2.5 bg-[#C18A65] rotate-45 inline-block mb-6" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C18A65] font-mono">
            TABLES &amp; PRIVATE ENCLAVES
          </p>
          <h2 className="font-serif-lux text-4xl md:text-6xl text-[#F0E8DC] mt-3 font-normal">
            Your table is waiting.
          </h2>
          <p className="mt-4 text-[#A69D90] text-sm md:text-base font-light max-w-xl mx-auto">
            Make an evening of it. We orchestrate unhurried seatings tailored to your dietary provenance and cellar tastes.
          </p>

          <div className="mt-10 p-6 md:p-8 bg-[#191816] border border-[#39342E] rounded-[2px] text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-[#121210] border border-[#2A2723] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono">
                  Party Size
                </label>
                <div className="font-serif-lux text-lg text-[#F0E8DC] mt-1">2 Guests (Intimate)</div>
              </div>
              <div className="p-3 bg-[#121210] border border-[#2A2723] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono">
                  Desired Date &amp; Seating
                </label>
                <div className="font-serif-lux text-lg text-[#F0E8DC] mt-1">Tonight • 8:30 PM Seating</div>
              </div>
              <div className="p-3 bg-[#121210] border border-[#2A2723] rounded-[2px]">
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono">
                  Service Selection
                </label>
                <div className="font-serif-lux text-lg text-[#F0E8DC] mt-1">Main Hearth Room</div>
              </div>
            </div>

            <button
              onClick={onOpenReservation}
              className="w-full py-4 bg-[#A96947] hover:bg-[#C18A65] text-[#121210] font-semibold text-xs tracking-[0.22em] uppercase rounded-[2px] transition-all duration-200 cursor-pointer font-mono"
            >
              Confirm Reservation Request →
            </button>

            <div className="mt-4 pt-4 border-t border-[#2A2723] flex flex-wrap items-center justify-between text-[11px] text-[#A69D90]">
              <span>
                Direct Concierge Desk:{' '}
                <strong className="text-[#F0E8DC] font-mono">+91 (040) 2345 6789</strong>
              </span>
              <span>Reservations open 30 days in advance • Smart elegant attire requested</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
