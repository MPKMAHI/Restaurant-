import React, { useState } from 'react';
import { Reservation, TastingPassportEntry, Dish } from '../types';
import { DISHES_DATABASE } from '../data/culinaryData';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Edit3,
  Bookmark,
  ShieldCheck,
  Star,
  Plus,
  PhoneCall,
  Download,
  AlertCircle,
  RotateCw
} from 'lucide-react';

interface UserDashboardProps {
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onOpenNewReservation: () => void;
  onInspectDish: (dishId: string) => void;
  wishlist: string[];
  onToggleWishlist: (dishId: string) => void;
  onOpen3DStudio?: (dishId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  reservations,
  onCancelReservation,
  onOpenNewReservation,
  onInspectDish,
  wishlist,
  onToggleWishlist,
  onOpen3DStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'passport' | 'dietary' | 'wishlist'>('reservations');

  // Interactive Tasting Passport state
  const [passportEntries, setPassportEntries] = useState<TastingPassportEntry[]>([
    {
      dishId: 'biryani-safran',
      dishName: 'Slow-Cooked Dum Biryani au Safran',
      course: 'Course VII • Apex',
      dateExperienced: 'Oct 02, 2026',
      rating: 5,
      sommelierPairing: 'Vintage Amarone della Valpolicella 2017',
      tastingNotes: 'Incredible saffron perfume upon breaking the dough seal. Tender shank fell apart without knife.'
    },
    {
      dishId: 'paneer-tikka',
      dishName: 'Charcoal Paneer Tikka',
      course: 'Course III • Smoked Starters',
      dateExperienced: 'Oct 02, 2026',
      rating: 5,
      sommelierPairing: 'Sancerre Blanc 2020',
      tastingNotes: 'Yellow mustard tang balanced by cold hung curd and charred violas.'
    }
  ]);

  // Dietary Preferences state
  const [dietaryPrefs, setDietaryPrefs] = useState<{ [key: string]: boolean }>({
    'gluten-free': false,
    'halal': true,
    'nut-free': true,
    'dairy-free': false,
    'jain-compliant': false,
    'low-sodium': false
  });

  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const toggleDietaryPref = (key: string) => {
    setDietaryPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadConfirmation = (code: string) => {
    setDownloadNotice(`Digital Reservation Pass for ${code} downloaded.`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const savedDishes = DISHES_DATABASE.filter((d) => wishlist.includes(d.id));

  return (
    <div className="w-full pt-28">
      {/* Dashboard Header */}
      <section className="relative pt-12 pb-14 border-b border-[#2A2723] px-6 lg:px-12 xl:px-20 bg-[#141312]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 bg-[#C18A65] rotate-45" />
              <span className="text-[11px] font-medium tracking-[0.28em] text-[#C18A65] uppercase font-mono">
                Guest Sanctuary &amp; Private Dashboard
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#A69D90] bg-[#191816] px-3.5 py-1.5 border border-[#2A2723] rounded-[2px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Complimentary Patron Access • 100% Free Privileges</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl font-light text-[#F0E8DC]">
                Welcome, <span className="italic font-normal text-[#C18A65]">H. Renuka</span>
              </h1>
              <p className="mt-3 text-sm text-[#A69D90] max-w-xl font-light">
                Manage upcoming complimentary dining reservations, view your cellar degustation notes, and configure personal dietary protocols with our executive culinary team.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenNewReservation}
                className="btn-copper px-6 py-3 text-[11px] uppercase tracking-widest font-mono flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Reserve Free Table</span>
              </button>
            </div>
          </div>

          {/* Download notice feedback */}
          {downloadNotice && (
            <div className="mt-4 p-3 bg-[#C18A65]/20 border border-[#C18A65] text-[#F0E8DC] text-xs rounded-[2px] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C18A65]" />
              <span>{downloadNotice}</span>
            </div>
          )}

          {/* Dashboard Subnav Tabs */}
          <div className="mt-12 pt-6 border-t border-[#2A2723]/60 flex items-center gap-2 overflow-x-auto no-scrollbar font-mono">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'reservations'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Active Reservations ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'passport'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Tasting Passport ({passportEntries.length})
            </button>
            <button
              onClick={() => setActiveTab('dietary')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'dietary'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Dietary Profile Matrix
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'wishlist'
                  ? 'text-[#F0E8DC] border-b-2 border-[#C18A65]'
                  : 'text-[#A69D90] hover:text-[#F0E8DC] border-b-2 border-transparent'
              }`}
            >
              Saved Plates ({wishlist.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-20 py-14">
        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2723]">
              <h2 className="text-xs uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                Upcoming Curated Seatings
              </h2>
              <span className="text-xs text-[#A69D90] font-mono">
                Direct Desk: +91 (040) 2345 6789
              </span>
            </div>

            {reservations.length === 0 ? (
              <div className="p-12 text-center bg-[#191816] border border-[#2A2723] rounded-[2px]">
                <p className="font-serif-lux text-2xl text-[#F0E8DC]">No active reservations.</p>
                <p className="text-xs text-[#A69D90] mt-2 mb-6">
                  Experience our Autumn Degustation menu or book the Chef's Counter.
                </p>
                <button
                  onClick={onOpenNewReservation}
                  className="btn-copper px-6 py-3 text-[11px] uppercase tracking-widest font-mono"
                >
                  Reserve a Table Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-6 md:p-8 bg-[#191816] border border-[#39342E] rounded-[2px] shadow-xl relative group hover:border-[#C18A65]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65] block">
                          Confirmation: {res.confirmationCode}
                        </span>
                        <h3 className="font-serif-lux text-2xl md:text-3xl text-[#F0E8DC] mt-1">
                          {res.serviceEnclave}
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-[#C18A65]/15 border border-[#C18A65] text-[#C18A65] text-[10px] uppercase font-mono tracking-wider rounded-[2px] flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
                        {res.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-6 p-4 bg-[#141312] border border-[#2A2723] rounded-[2px] text-xs">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                          Date
                        </span>
                        <span className="text-[#F0E8DC] font-serif-lux text-base mt-0.5 block">
                          {res.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                          Time
                        </span>
                        <span className="text-[#F0E8DC] font-serif-lux text-base mt-0.5 block">
                          {res.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                          Party Size
                        </span>
                        <span className="text-[#F0E8DC] font-serif-lux text-base mt-0.5 block">
                          {res.partySize} Guests
                        </span>
                      </div>
                    </div>

                    {res.specialRequests && (
                      <div className="p-3 bg-[#121210] border-l-2 border-[#C18A65] text-xs text-[#C4BDB2] leading-relaxed mb-6">
                        <span className="text-[#A69D90] uppercase text-[9px] tracking-widest font-mono block mb-1">
                          Sommelier &amp; Dining Notes:
                        </span>
                        {res.specialRequests}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#2A2723] flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() => handleDownloadConfirmation(res.confirmationCode)}
                        className="text-[#A69D90] hover:text-[#F0E8DC] flex items-center gap-1.5 cursor-pointer uppercase text-[10px] tracking-wider"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C18A65]" />
                        <span>Digital Pass</span>
                      </button>

                      <button
                        onClick={() => onCancelReservation(res.id)}
                        className="text-[#A69D90] hover:text-red-400 transition-colors cursor-pointer uppercase text-[10px] tracking-wider"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TASTING PASSPORT */}
        {activeTab === 'passport' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2723]">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                  Personal Degustation Logbook
                </h2>
                <p className="text-xs text-[#A69D90] mt-1 font-light">
                  A certified ledger of courses, sommelier flights, and aromatic impressions experienced at our tables.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {passportEntries.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#191816] border border-[#2A2723] rounded-[2px] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65]">
                      {entry.course} • {entry.dateExperienced}
                    </span>
                    <div className="flex items-center text-[#C18A65]">
                      {[...Array(entry.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif-lux text-2xl text-[#F0E8DC]">
                    {entry.dishName}
                  </h3>

                  <div className="p-3 bg-[#141312] border border-[#2A2723] rounded-[2px] text-xs text-[#A69D90] space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#C18A65] font-mono block">
                      Cellar Pairing:
                    </span>
                    <span className="italic font-serif-lux text-sm text-[#F0E8DC]">
                      {entry.sommelierPairing}
                    </span>
                  </div>

                  <p className="text-xs text-[#C4BDB2] font-light leading-relaxed">
                    "{entry.tastingNotes}"
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onInspectDish(entry.dishId)}
                      className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65] hover:text-[#F0E8DC] cursor-pointer"
                    >
                      Botanical Archive →
                    </button>
                    {onOpen3DStudio && (
                      <button
                        onClick={() => onOpen3DStudio(entry.dishId)}
                        className="text-[10px] uppercase font-mono tracking-wider text-[#A69D90] hover:text-[#C18A65] flex items-center gap-1 cursor-pointer"
                        title="Rotate in 360° 3D"
                      >
                        <RotateCw className="w-3 h-3 text-[#C18A65]" />
                        <span>360° 3D</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIETARY MATRIX */}
        {activeTab === 'dietary' && (
          <div className="max-w-3xl space-y-8">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                Personal Dietary &amp; Allergen Protocol
              </h2>
              <p className="text-xs text-[#A69D90] mt-1 font-light">
                Settings configured here are automatically synchronized with Executive Chef Vikramaditya’s kitchen pass for every table reservation under your profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'halal', label: '100% Halal Sourced Meats', desc: 'All lamb and poultry cuts certified halal with direct verification.' },
                { id: 'gluten-free', label: 'Celiac / Gluten-Free Preparation', desc: 'Separate cookware and unfermented chickpea/millet flour substitutions.' },
                { id: 'nut-free', label: 'Strict Nut-Free Protocol', desc: 'Zero almonds, cashews, or pistachios in sauces or hearth garnishes.' },
                { id: 'dairy-free', label: 'Dairy-Free / Vegan Adaptations', desc: 'Cold-pressed virgin mustard oil in place of A2 Vedic cow ghee.' },
                { id: 'jain-compliant', label: 'Jain Friendly (No Root Botanicals)', desc: 'No garlic, onion, or ginger; flavored with asafoetida and dry mango.' },
                { id: 'low-sodium', label: 'Low Sodium Mineral Flake', desc: 'Reduced volcanic black salt dusting and sea brines.' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleDietaryPref(item.id)}
                  className={`p-5 rounded-[2px] border cursor-pointer transition-all ${
                    dietaryPrefs[item.id]
                      ? 'bg-[#191816] border-[#C18A65]'
                      : 'bg-[#141312] border-[#2A2723] hover:border-[#39342E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif-lux text-lg text-[#F0E8DC]">
                      {item.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!dietaryPrefs[item.id]}
                      onChange={() => {}}
                      className="rounded-[2px] bg-[#121210] border-[#39342E] text-[#C18A65] focus:ring-0"
                    />
                  </div>
                  <p className="text-[11px] text-[#A69D90] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#191816] border border-[#2A2723] rounded-[2px] flex items-center justify-between">
              <span className="text-xs text-[#A69D90] font-mono">
                Changes saved automatically to guest account.
              </span>
              <span className="text-[10px] font-mono text-[#C18A65] uppercase tracking-widest">
                Kitchen Protocol Synchronized
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2723]">
              <h2 className="text-xs uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                Saved Dishes from the Archive ({savedDishes.length})
              </h2>
            </div>

            {savedDishes.length === 0 ? (
              <div className="p-12 text-center bg-[#191816] border border-[#2A2723] rounded-[2px]">
                <p className="font-serif-lux text-2xl text-[#F0E8DC]">No dishes bookmarked yet.</p>
                <p className="text-xs text-[#A69D90] mt-2 mb-6">
                  Browse the Culinary Anthology and click the heart icon on any dish to save it here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-5 bg-[#191816] border border-[#2A2723] rounded-[2px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-[2px] mb-4 relative bg-[#121210]">
                        <img
                          src={dish.imageUrl}
                          alt={dish.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onToggleWishlist(dish.id)}
                          className="absolute top-2 right-2 p-1.5 bg-[#121210]/80 rounded-[2px] text-[#C18A65]"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#C18A65]">
                        {dish.courseTitle}
                      </span>
                      <h3 className="font-serif-lux text-xl text-[#F0E8DC] mt-1">
                        {dish.title} {dish.italicPart && <span className="italic">{dish.italicPart}</span>}
                      </h3>
                      <p className="text-xs text-[#A69D90] mt-1 line-clamp-2">
                        {dish.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#2A2723] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F0E8DC] font-mono">
                        {dish.priceFormatted}
                      </span>
                      <div className="flex items-center gap-2">
                        {onOpen3DStudio && (
                          <button
                            onClick={() => onOpen3DStudio(dish.id)}
                            className="text-[10px] uppercase font-mono tracking-wider text-[#A69D90] hover:text-[#C18A65] flex items-center gap-1 cursor-pointer"
                            title="Rotate in 360° 3D"
                          >
                            <RotateCw className="w-3 h-3 text-[#C18A65]" />
                            <span>360°</span>
                          </button>
                        )}
                        <button
                          onClick={() => onInspectDish(dish.id)}
                          className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65] hover:text-[#F0E8DC] cursor-pointer"
                        >
                          Dossier →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
