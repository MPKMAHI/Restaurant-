import React, { useState } from 'react';
import { ThreeFoodStudio } from './ThreeFoodStudio';
import { DISHES_DATABASE } from '../data/culinaryData';
import { Dish, PageView } from '../types';
import {
  Sparkles,
  Flame,
  Wine,
  RotateCw,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  Video
} from 'lucide-react';

interface ThreeDViewPageProps {
  onNavigate: (page: PageView, dishId?: string) => void;
  onOpenReservation: () => void;
  initialDishId?: string;
}

export const ThreeDViewPage: React.FC<ThreeDViewPageProps> = ({
  onNavigate,
  onOpenReservation,
  initialDishId = 'biryani-safran',
}) => {
  const [activeDishId, setActiveDishId] = useState<string>(initialDishId);
  const activeDish =
    DISHES_DATABASE.find((d) => d.id === activeDishId) || DISHES_DATABASE[0];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1F1E1C] border border-[#39342E] mb-4">
          <Video className="w-3.5 h-3.5 text-[#C18A65]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#C18A65]">
            Cinematic 3D Turntable • 360° Camera Angles
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] font-normal tracking-tight">
          Haute Gastronomy in <span className="italic text-[#C18A65]">360° Orbit</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#958E82] font-light leading-relaxed">
          Culinary artistry is a sculptural experience. Rotate the camera angle 360 degrees around
          each signature creation to inspect the live-fire sear, auric gold leaf, and aromatic
          textures before reserving your seat.
        </p>
      </div>

      {/* Main 3D Studio Canvas Container */}
      <div className="mb-12 shadow-2xl rounded-2xl overflow-hidden border border-[#2A2723]">
        <ThreeFoodStudio
          initialDishId={activeDishId}
          onOpenReservation={onOpenReservation}
          onExploreAnthology={(dishId) => onNavigate('menu', dishId)}
        />
      </div>

      {/* 360° Cinematic Features Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-xl bg-[#161514] border border-[#2A2723] hover:border-[#39342E] transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#C18A65]/10 border border-[#C18A65]/20 flex items-center justify-center mb-4 text-[#C18A65]">
            <RotateCw className="w-5 h-5 animate-spin" />
          </div>
          <h3 className="font-serif text-lg text-[#F4F1EA] mb-2">Continuous 360° Turntable</h3>
          <p className="text-xs sm:text-sm text-[#958E82] leading-relaxed">
            Smooth orbital motion rotates the camera around the dish in real-time WebGL 3D. Control
            rotation speed from 0.5x slow-motion cinema to 2x quick inspection.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#161514] border border-[#2A2723] hover:border-[#39342E] transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#C18A65]/10 border border-[#C18A65]/20 flex items-center justify-center mb-4 text-[#C18A65]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-[#F4F1EA] mb-2">Cinematic Angle Presets</h3>
          <p className="text-xs sm:text-sm text-[#958E82] leading-relaxed">
            Switch effortlessly between 360° Hero Orbit, 15° Macro Low-Angle for charcoal grill
            textures, and 78° Overhead Bird’s Eye for artistic plating symmetry.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#161514] border border-[#2A2723] hover:border-[#39342E] transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#C18A65]/10 border border-[#C18A65]/20 flex items-center justify-center mb-4 text-[#C18A65]">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-[#F4F1EA] mb-2">Volumetric Steam & Ambiance</h3>
          <p className="text-xs sm:text-sm text-[#958E82] leading-relaxed">
            Real-time particle dynamics simulate rising steam and glowing hearth embers, paired with
            customizable obsidian, candlelight, and golden-hour studio lighting.
          </p>
        </div>
      </div>

      {/* Signature Dish Dossier Showcase */}
      <div className="border border-[#2A2723] rounded-2xl bg-[#141312] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#C18A65] uppercase">
              {activeDish.archiveId} • {activeDish.courseTitle}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F4F1EA]">
              {activeDish.title}{' '}
              <span className="italic text-[#C18A65] font-light">{activeDish.italicPart}</span>
            </h2>
            <p className="text-sm text-[#A8A196] leading-relaxed">
              {activeDish.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded bg-black/40 border border-[#39342E] text-[#C4BDB2] flex items-center gap-1.5 font-mono">
                <Flame className="w-3.5 h-3.5 text-[#C18A65]" />
                <span>{activeDish.technique}</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-black/40 border border-[#39342E] text-[#C4BDB2] flex items-center gap-1.5 font-mono">
                <Wine className="w-3.5 h-3.5 text-[#C18A65]" />
                <span>Cellar Pairing Selected</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 bg-[#C18A65] hover:bg-[#d99f79] text-[#111110] font-medium tracking-wide text-xs uppercase font-mono rounded transition-all shadow-lg"
              >
                Reserve Free Table (Zero Deposit)
              </button>
              <button
                onClick={() => onNavigate('menu', activeDish.id)}
                className="px-5 py-3 border border-[#39342E] hover:border-[#C18A65] text-[#E5E0D8] text-xs font-mono uppercase tracking-wide rounded transition-all flex items-center gap-1.5"
              >
                <span>Full Botanical Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DISHES_DATABASE.map((dish) => (
              <button
                key={dish.id}
                onClick={() => setActiveDishId(dish.id)}
                className={`group text-left p-3 rounded-xl border transition-all ${
                  activeDishId === dish.id
                    ? 'bg-[#1C1A18] border-[#C18A65] shadow-lg'
                    : 'bg-black/40 border-[#2A2723] hover:border-[#39342E]'
                }`}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-black">
                  <img
                    src={dish.imageUrl}
                    alt={dish.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {activeDishId === dish.id && (
                    <div className="absolute inset-0 bg-[#C18A65]/20 border-2 border-[#C18A65] rounded-lg pointer-events-none" />
                  )}
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-[#E5E0D8]">
                    {dish.courseRoman}
                  </span>
                </div>
                <div className="text-xs font-serif text-[#F4F1EA] truncate">{dish.title}</div>
                <div className="text-[10px] text-[#C18A65] font-mono">{dish.priceFormatted}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
