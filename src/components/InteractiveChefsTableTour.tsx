import React, { useState } from 'react';
import {
  Flame,
  Thermometer,
  Clock,
  Sparkles,
  ChefHat,
  Eye,
  Compass,
  ChevronRight,
  Info,
  CheckCircle2,
  Layers,
  ShieldCheck,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';

export interface KitchenStation {
  id: string;
  stationNumber: string;
  name: string;
  flameType: string;
  temperature: string;
  woodSource: string;
  techniqueName: string;
  techniqueSummary: string;
  scientificProcess: string;
  coordinates: { x: number; y: number }; // percentage on interactive kitchen stage
  signatureDishes: string[];
  chefQuote: string;
  processPhases: {
    phase: string;
    action: string;
    duration: string;
  }[];
  imageUrl: string;
}

export const KITCHEN_STATIONS: KitchenStation[] = [
  {
    id: 'charcoal-pit',
    stationNumber: '01',
    name: 'Open Sal-Wood Hearth & Charcoal Pit',
    flameType: 'Direct Radiant & Glowing Embers',
    temperature: '650°C – 800°C',
    woodSource: 'Aged Madhya Pradesh Sal-Wood & White Oak Charcoal',
    techniqueName: 'Angaar Flash-Sear & Cold Ash Smoking',
    techniqueSummary:
      'Direct contact sear over glowing mineral-rich embers. Creates a crisp micro-caramelized crust while sealing internal natural fats without scorching.',
    scientificProcess:
      'High-heat Maillard reactions occur within 90 seconds. Volatile wood lignins vaporize into aromatic guaiacol and syringol, infusing food with campfire sweetness.',
    coordinates: { x: 32, y: 44 },
    signatureDishes: ['Charcoal Paneer Tikka', 'Blistered Spring Alliums', 'Scorched Cardamom Quills'],
    chefQuote:
      '"We don’t cook over flame—we cook over the glowing heart of sal-wood embers. Fire is chaotic; embers are meditative precision."',
    processPhases: [
      { phase: '01. Ember Maturation', action: 'Coals burned down until white ash mantle forms', duration: '45 mins' },
      { phase: '02. Flash Skewer Sear', action: 'Direct suspension 4cm above 700° glowing embers', duration: '90 secs' },
      { phase: '03. Butter Basting & Rest', action: 'Bilona churned A2 butter glaze over gentle ash smoke', duration: '2 mins' }
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UF4RVeDUceqdwu4IqnDdjeNlYptqs-49GtUMVyo5mhSkAKUJj9s19QY9WQyCfB8gbsfNSgYhs08vmWiw0vddbE-4JvTDovpKO49KhFIpqze8X7OXcAr_4rmNcl5tkwmW7mQSd6JqujXau3JceoLBRgg-ci7rR1qk-Edz0trhYJXVsWpR907Ai_JsQWMwo-TOyseVRbs38xqjEWS2BP19xBO_wE5WY4xlTPxnEn-rFi32cHduEerkK6Khc'
  },
  {
    id: 'tandoor-kiln',
    stationNumber: '02',
    name: '600° Terracotta Clay Tandoor Kiln',
    flameType: 'Enclosed Convection & Vertical Clay Radiation',
    temperature: '550°C – 620°C',
    woodSource: 'Hickory Chips & Hardwood Charcoal Blend',
    techniqueName: 'Vertical Terracotta Convection & Leoparding',
    techniqueSummary:
      'Ancient cylindrical earthenware kiln radiating uniform geothermal heat. Dough slapped against vertical terracotta walls develops signature leopards blister spots.',
    scientificProcess:
      'Instant thermal shock vaporizes dough moisture in milliseconds, puffing air pockets into pillowy crumb while radiant clay chars the exterior skin.',
    coordinates: { x: 50, y: 28 },
    signatureDishes: ['Smoked Trout Caviar Flatbread', 'Heirloom Paighambari Sourdough', 'Charred Cultured Butter Quenelles'],
    chefQuote:
      '"The clay walls remember thousands of bakes. The mineral tang of red terracotta enters the crumb in a way no modern oven could ever replicate."',
    processPhases: [
      { phase: '01. Clay Pre-Heat', action: 'Terracotta walls saturated with radiant embers', duration: '3 hours' },
      { phase: '02. Wall Slap Bake', action: '48-hour cold fermented dough slapped to vertical wall', duration: '75 secs' },
      { phase: '03. Caviar Cold Smoking', action: 'Golden trout roe cold-infused with applewood cloche', duration: '3 mins' }
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwdo_pwIssH96tdZI3Jj7iziDt3c8elIoPRL-4GC6b311DLTp1bACViBP8qIvUQsBG0wXyNYimvOmEt2ABQZOagB8iEmHeV1-ZuEPYLSIDurrNfdhelEvUJOIuhbE47ydZ5lrZOG6GtDOSkqwcIWxe4qwZaNJcuKl7KJYRlgdMl6IjdX2BXTXpFiDPn5fw8drWzUK0lksJL8FoRy4n326texzBRQu4foaaePALz7vKEbG6yo4Fu2ktTQ'
  },
  {
    id: 'dum-handi',
    stationNumber: '03',
    name: 'Sealed Copper Handi & Dum Pits',
    flameType: 'Low Indirect Smothered Coals',
    temperature: '110°C – 130°C Hermetic',
    woodSource: 'Slow-Smoldering Acacia & Coconut Husk Shells',
    techniqueName: 'Awadhi Purdah Hermetic Steam Dum',
    techniqueSummary:
      'Heavy hand-hammered antique brass and copper handis hermetically sealed with unleavened wholewheat dough. Pressure forces volatile saffron aromatics deep into rice grains.',
    scientificProcess:
      'Trapped moisture maintains 100% relative humidity. Delicate botanical terpenes from green cardamom and Kashmiri saffron cannot escape, condensing back into the starch matrix.',
    coordinates: { x: 68, y: 46 },
    signatureDishes: ['Slow-Cooked Dum Biryani au Safran', 'Aged Dehradun Basmati', '24K Edible Gold Leaf Foil'],
    chefQuote:
      '"When we cut open the dough seal at the table, the steam that escapes is six hours of captured history. You smell Kashmir and Awadh in a single breath."',
    processPhases: [
      { phase: '01. Copper Pot Layering', action: 'Marinated shank layered with 2-year aged parboiled basmati', duration: '15 mins' },
      { phase: '02. Dough Hermetic Seal', action: 'Wholewheat dough ring crimped between lid and vessel rim', duration: '5 mins' },
      { phase: '03. Low-Dum Maturation', action: 'Buried in low coals above and below for complete infusion', duration: '6 hours' }
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UesbfXaYh1LWio2ZzrI7KQItgqthDehxnVKQmX7WGQltIAt8bZz6CkwrDMxR2b1wHpPd7SjtXR8-qrf8l2i9J2w8mNZOhYWiipX_XVhVSAdss40vHctrQvdB8kYKIUySBhNk7OGH21BpwjiORQO_KyBaDyTb1kqaq5mCttz68IR82BZxdPA4zr3-Qr-_Eq1RaBlqZ3xtKMnj4ElhVG45L6wgD6bz9mCLsHCUdbg8Ihdl6cTj4PY3qutTfi'
  },
  {
    id: 'braise-degs',
    stationNumber: '04',
    name: 'Cast-Iron Degs & 48-Hour Braise Station',
    flameType: 'Continuous Gentle Sub-Boil Simmer',
    temperature: '85°C – 92°C Controlled',
    woodSource: 'Tamarind Wood & Dried Cow-Dung Ash Embers',
    techniqueName: 'Marrow Collagen Liquefaction & Reduction Glaze',
    techniqueSummary:
      'Forty-eight hours of unhurried simmering in cast-iron cauldrons with split marrow bones and eighteen wild mountain aromatics.',
    scientificProcess:
      'Triple-helix collagen polypeptides break down into rich gelatin. Natural marrow fat emulsifies with sun-cured ginger and peepli long peppers into an unctuous mirror glaze.',
    coordinates: { x: 20, y: 65 },
    signatureDishes: ['Smoked Wagyu Short Rib Nihari', 'Roasted Canoe Bone Marrow', 'Spiced Collagen Glaze Jus'],
    chefQuote:
      '"You cannot rush nihari. Forty-eight hours allows the connective tissue to surrender completely, creating a broth that coats the palate like liquid silk."',
    processPhases: [
      { phase: '01. Bone Charring', action: 'Veal canoe bones roasted at 500° to render marrow fat', duration: '40 mins' },
      { phase: '02. 48-Hour Simmer', action: 'Slow extraction with 18 whole botanicals in heavy cast-iron', duration: '48 hours' },
      { phase: '03. Reduction & Glaze', action: 'Final reduction strained through muslin for mirror finish', duration: '2 hours' }
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZCgd4Xe0RiygSkxvtR_dDuzrkNB8bYdfBgrsWrZx4kUh61fPBjntxfKBfKP7b45FYkWeucJOnLXqufwfbM-rJwQINgHvxvyIwWgw8syvlkRhDko92x6qa8pavdKOp4KGjafYhsT1xbSoZtSVmYXJRrUdwlIJQ51GvSP7fI_p1fsoB2hlG2-zKQlTMyPxJdCkAbx-aIaowdIJ38mQJ36uiM43eYq529HxyDbpl0BD8hZDHUDKMlW8OKg'
  },
  {
    id: 'plating-counter',
    stationNumber: '05',
    name: "The Chef's Counter & Plating Pass",
    flameType: 'Live Presentation & Micro-Botanical Garnish',
    temperature: 'Ambient to -196°C Cryo-Freeze',
    woodSource: 'Hand-Carved Black Granite & Brass Heat Lamps',
    techniqueName: 'Precision Auric Gilding & Cryo-Herb Aeration',
    techniqueSummary:
      'Positioned six inches from your dining seat. Watch the kitchen brigade execute plating using surgical tweezers, edible organic violas, and Varanasi 24K gold foil.',
    scientificProcess:
      'Visual symmetry and temperature contrast: piping hot smoked sauces paired with cold cultured quenelles create dynamic sensory contrast upon first bite.',
    coordinates: { x: 50, y: 78 },
    signatureDishes: ['Deconstructed Saffron Kulfi Nest', 'Spun Sugar Wire Dome', 'Smoked Chocolate Volcano'],
    chefQuote:
      '"At the Counter, there is no fourth wall. You hear the searing, smell the hickory curls, and taste the plate seconds after it leaves the brigade’s hands."',
    processPhases: [
      { phase: '01. Slate Warming', action: 'Dark stoneware plates held under brass heaters at 60°C', duration: 'Active' },
      { phase: '02. Sauce & Sear Pass', action: 'Glistening core element rested and sliced table-side', duration: '30 secs' },
      { phase: '03. Auric & Floral Crown', action: '24K gold leaf and fresh micro-viola petals placed', duration: '45 secs' }
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WKBP4IIAWUnvr-ToAR1r0e_d-tLdxa3xl1FfSTYoLoRQCNNbzdwbRxQu4JtXZsM1EoKveae-xdJeg1__MquAFyt7784xgmvn2kyaHVQpIgvaDSD-b818z0qSJfenbjZ75jqYm-XPX8xYrUgzoLitH5r8SYGQhdJfXnirBPt-o8aITPyXy6IavGjq4Oaod8HeVkRpsWY7iMt86iC920A_Mh8lZoy2ui3WnqVQ9clfSpGpRiwR1R8ioL_Hk'
  }
];

interface InteractiveChefsTableTourProps {
  onReserveCounter: () => void;
}

export const InteractiveChefsTableTour: React.FC<InteractiveChefsTableTourProps> = ({
  onReserveCounter
}) => {
  const [activeStationId, setActiveStationId] = useState<string>('charcoal-pit');
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [simulatingSear, setSimulatingSear] = useState<boolean>(false);

  const activeStation =
    KITCHEN_STATIONS.find((s) => s.id === activeStationId) || KITCHEN_STATIONS[0];

  const handleSimulateSear = () => {
    setSimulatingSear(true);
    setTimeout(() => {
      setSimulatingSear(false);
    }, 2800);
  };

  return (
    <div className="w-full bg-[#121210] border border-[#2A2723] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C18A65]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff4500]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2A2723] relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1917] border border-[#39342E] mb-3">
            <Flame className="w-3.5 h-3.5 text-[#C18A65] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65] font-semibold">
              Virtual Kitchen Tour • Live-Fire Techniques
            </span>
          </div>
          <h2 className="font-serif-lux text-3xl sm:text-5xl text-[#F0E8DC] font-light">
            The Interactive <span className="italic font-normal text-[#C18A65]">Chef's Table</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A69D90] font-light mt-2 max-w-xl leading-relaxed">
            Explore the five live-fire culinary stations visible directly from our 6-seat Chef's Counter.
            Click any station on the kitchen blueprint below to reveal ancestral charcoal methods, wood species, and cooking science.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 border border-[#2A2723] text-[10px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>KITCHEN FIRE: 750°C ACTIVE</span>
          </div>

          <button
            onClick={onReserveCounter}
            className="btn-primary-ivory px-5 py-2.5 text-[11px] uppercase tracking-widest font-mono flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <span>Reserve Front-Row Seat (Free)</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Main Tour Grid: Left Interactive Stage Map, Right Station Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 items-start relative z-10">
        
        {/* Left Column: Spatial Kitchen Blueprint Stage (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#A69D90] pb-1">
            <span className="uppercase tracking-widest text-[#C18A65] text-[10px]">
              Spatial Kitchen Blueprint
            </span>
            <span className="text-[10px]">Click Station Hotspot</span>
          </div>

          {/* Interactive Spatial Blueprint Container */}
          <div className="relative aspect-[4/3] w-full rounded-xl border border-[#39342E] bg-gradient-to-b from-[#181715] to-[#0E0D0C] p-4 overflow-hidden shadow-inner group select-none">
            {/* Grid pattern aesthetic */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #C18A65 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Architectural Counter Curved Boundary */}
            <div className="absolute inset-x-8 bottom-3 h-20 border-t-2 border-dashed border-[#C18A65]/40 rounded-t-[120px] pointer-events-none flex items-center justify-center">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C18A65]/60 bg-[#121210] px-3 py-0.5 rounded border border-[#2A2723]">
                6-Seat Guest Counter Pass
              </span>
            </div>

            {/* Central Hearth Hood Outline */}
            <div className="absolute inset-x-14 top-8 bottom-24 border border-[#39342E] rounded-lg pointer-events-none bg-black/20 flex items-center justify-center">
              <span className="text-[8px] font-mono tracking-widest uppercase text-[#5A544A]">
                Copper Hearth Exhaust Hood &amp; Pit
              </span>
            </div>

            {/* Hotspot Pins for each Station */}
            {KITCHEN_STATIONS.map((station) => {
              const isSelected = activeStationId === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => {
                    setActiveStationId(station.id);
                    setActivePhaseIndex(0);
                  }}
                  style={{
                    left: `${station.coordinates.x}%`,
                    top: `${station.coordinates.y}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 z-20 focus:outline-none ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                  title={`${station.stationNumber} • ${station.name}`}
                >
                  {/* Outer pulse beacon ring */}
                  <div
                    className={`absolute -inset-2.5 rounded-full pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-[#C18A65]/40 animate-ping'
                        : 'bg-black/40 group-hover:bg-[#C18A65]/20'
                    }`}
                  />

                  {/* Pin core */}
                  <div
                    className={`relative w-8 h-8 rounded-full border flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-[#C18A65] border-white text-[#111110] shadow-[0_0_20px_rgba(193,138,101,0.8)]'
                        : 'bg-[#1C1A18] border-[#39342E] text-[#C4BDB2] hover:border-[#C18A65]'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">
                      {station.stationNumber}
                    </span>
                  </div>

                  {/* Station label pill under pin */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider whitespace-nowrap border pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-[#191816] border-[#C18A65] text-[#F0E8DC] opacity-100 shadow-md'
                        : 'bg-black/75 border-[#2A2723] text-[#A69D90] opacity-80'
                    }`}
                  >
                    {station.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Station Quick Selector Strip */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {KITCHEN_STATIONS.map((station) => (
              <button
                key={station.id}
                onClick={() => {
                  setActiveStationId(station.id);
                  setActivePhaseIndex(0);
                }}
                className={`py-2 px-1 text-center rounded border transition-all text-xs font-mono cursor-pointer ${
                  activeStationId === station.id
                    ? 'bg-[#1E1C1A] border-[#C18A65] text-[#F0E8DC]'
                    : 'bg-black/30 border-[#2A2723] text-[#8E867B] hover:text-[#C4BDB2]'
                }`}
              >
                <span className="block text-[10px] text-[#C18A65]">#{station.stationNumber}</span>
                <span className="text-[9px] block truncate">{station.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Live Audio & Atmosphere Teaser */}
          <div className="p-4 rounded-xl bg-[#161514] border border-[#2A2723] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C18A65]" />
              <span className="text-[#C4BDB2] text-[11px]">
                Live Counter Seats: <strong className="text-white">6 Chairs Only</strong>
              </span>
            </div>
            <span className="text-[#C18A65] font-mono text-[10px] uppercase tracking-wider">
              100% Free Table Hold
            </span>
          </div>
        </div>

        {/* Right Column: In-Depth Live-Fire Station Technique Dossier (Span 7) */}
        <div className="lg:col-span-7 bg-[#161514] border border-[#39342E] rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Station Title & Thermometer Badge */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#2A2723]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#C18A65] uppercase tracking-widest font-semibold">
                  Station {activeStation.stationNumber} of 05
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-mono text-[#A69D90] uppercase tracking-wider">
                  {activeStation.flameType}
                </span>
              </div>
              <h3 className="font-serif-lux text-2xl sm:text-3xl lg:text-4xl text-[#F0E8DC] font-light">
                {activeStation.name}
              </h3>
            </div>

            {/* Temperature Tag */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/60 border border-[#C18A65]/40 text-[#C18A65] font-mono">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs font-bold">{activeStation.temperature}</span>
            </div>
          </div>

          {/* Technique Highlight Banner */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-[#201C18] to-[#161514] border-l-3 border-[#C18A65] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#C18A65] font-mono block">
                Primary Fire Technique:
              </span>
              <h4 className="font-serif text-lg text-[#F0E8DC] font-medium">
                {activeStation.techniqueName}
              </h4>
            </div>

            <button
              onClick={handleSimulateSear}
              className={`px-3.5 py-1.5 rounded border text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                simulatingSear
                  ? 'bg-red-950/50 border-red-500 text-red-200 animate-pulse'
                  : 'bg-black/50 border-[#39342E] text-[#E5DDD1] hover:border-[#C18A65]'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${simulatingSear ? 'text-red-400' : 'text-[#C18A65]'}`} />
              <span>{simulatingSear ? 'Simulating 750° Sear...' : 'Simulate Live Fire'}</span>
            </button>
          </div>

          {/* Technical Deep Dive Narrative */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-[#A69D90]">
              Gastronomic Method &amp; Flavor Extraction
            </h5>
            <p className="text-sm text-[#C4BDB2] font-light leading-relaxed">
              {activeStation.techniqueSummary}
            </p>
          </div>

          {/* Molecular & Thermodynamic Science */}
          <div className="p-4 rounded-lg bg-[#111110] border border-[#2A2723] space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65] flex items-center gap-1.5 font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Thermodynamics &amp; Wood Chemistry</span>
            </span>
            <p className="text-xs text-[#9E9689] leading-relaxed font-light">
              {activeStation.scientificProcess}
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#C4BDB2]">
              <span className="text-[#A69D90]">Wood Species: </span>
              {activeStation.woodSource}
            </div>
          </div>

          {/* Step-by-Step Cooking Phases */}
          <div>
            <h5 className="text-[10px] font-mono uppercase tracking-widest text-[#A69D90] mb-3">
              Execution Sequence at the Pass
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeStation.processPhases.map((phase, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border transition-all ${
                    activePhaseIndex === i
                      ? 'bg-[#1E1C1A] border-[#C18A65] shadow-md'
                      : 'bg-[#121210] border-[#2A2723]'
                  }`}
                  onClick={() => setActivePhaseIndex(i)}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#C18A65] mb-1">
                    <span>{phase.phase.split(' ')[0]}</span>
                    <span className="text-zinc-500">{phase.duration}</span>
                  </div>
                  <h6 className="text-xs font-serif text-[#F0E8DC] font-medium mb-1">
                    {phase.phase.split('. ')[1] || phase.phase}
                  </h6>
                  <p className="text-[10px] text-[#8E867B] leading-snug">
                    {phase.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Plates Prepared at this Station */}
          <div className="pt-2 border-t border-[#2A2723]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69D90] block mb-2">
              Signature Plates Fired Here:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeStation.signatureDishes.map((dishName, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[#111110] border border-[#39342E] text-xs text-[#E5DDD1] font-serif flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C18A65]" />
                  <span>{dishName}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Chef Vikramaditya's Voice Note */}
          <blockquote className="p-3.5 bg-[#121210] border-l-2 border-[#C18A65] text-xs text-[#A8A196] italic font-light leading-relaxed">
            {activeStation.chefQuote}
            <span className="block not-italic text-[10px] font-mono text-[#C18A65] mt-1 uppercase tracking-wider">
              — Executive Chef Vikramaditya Rao
            </span>
          </blockquote>

          {/* Bottom Call to Action */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#A69D90]">
              <span className="text-[#F0E8DC] font-bold block">Front-Row Stool Seating</span>
              <span>100% Free Table Hold • Zero Deposit</span>
            </div>

            <button
              onClick={onReserveCounter}
              className="btn-copper px-6 py-3 text-xs uppercase tracking-widest font-mono cursor-pointer shadow-lg text-center"
            >
              Reserve Chef's Counter (Free) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
