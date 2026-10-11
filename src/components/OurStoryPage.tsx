import React from 'react';
import { Flame, Compass, Award, Shield, Sparkles } from 'lucide-react';

interface OurStoryPageProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  onExploreMenu,
  onOpenReservation,
}) => {
  const SOURCING_ATLAS = [
    {
      region: 'Pampore, Kashmir Valley',
      ingredient: 'Grade A++ Mongra Saffron',
      elevation: '1,600m ASL',
      note: 'Hand-plucked stigmata during the crisp autumn dawn, steeped for 12 hours in fresh whole buffalo milk.'
    },
    {
      region: 'Himachal Pradesh Foothills',
      ingredient: 'Wild-Foraged Black Cumin & Morels',
      elevation: '2,200m ASL',
      note: 'Sun-dried Himalayan gucchi morels with rich earthy umami, hunted beneath pine canopies.'
    },
    {
      region: 'Coorg Estate, Karnataka',
      ingredient: 'Whole Green Cardamom & Mace Flowers',
      elevation: '1,100m ASL',
      note: 'Shade-grown under coffee and pepper canopies, dried gently over hickory smoke beds.'
    },
    {
      region: 'Saurashtra, Gujarat',
      ingredient: 'A2 Gir Cow Bilona Ghee',
      elevation: 'Pastoral Lands',
      note: 'Slowly churned from cultured whole curd in wooden bilonas, boiled over clay chulhas with cinnamon quills.'
    },
    {
      region: 'Dehradun Valley, Uttarakhand',
      ingredient: 'Taraori Heirloom Basmati',
      elevation: 'Tarai Belt',
      note: 'Aged for 24 months in aerated burlap sacks to allow moisture stabilization and elongation.'
    },
    {
      region: 'Kullu Glacial Streams',
      ingredient: 'Golden Himalayan Trout Caviar',
      elevation: 'Glacial Runoff',
      note: 'Sustainably stripped roe cured in mountain spring sea brine and cold applewood smoke.'
    }
  ];

  return (
    <div className="w-full pt-28">
      {/* Manifesto Header */}
      <section className="relative pt-12 pb-16 border-b border-[#2A2723] px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
            <span className="text-[11px] font-medium tracking-[0.28em] text-[#C18A65] uppercase font-mono">
              The Philosophy &amp; Lineage
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif-lux text-5xl md:text-6xl lg:text-7xl font-light text-[#F0E8DC] leading-[1.06]">
                Primitive Fire. <br />
                <span className="italic font-normal text-[#C18A65]">Progressive Gastronomy.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-[#C4BDB2] max-w-2xl font-light leading-relaxed">
                Ember &amp; Oak was conceived as a sanctuary where ancestral fire traditions from charcoal pits, clay tandoors, and royal dum pots meet contemporary discipline and wild botanical foraging.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 bg-[#191816] border border-[#2A2723] rounded-[2px]">
              <span className="text-[10px] uppercase tracking-widest text-[#C18A65] font-mono block mb-1">
                Connoisseur Guild Citation · 2024
              </span>
              <p className="font-serif-lux text-sm text-[#F0E8DC] italic">
                "A rare masterclass in restraint. Fire here is not an aggressive show of spectacle, but a quiet, tender brushstroke that pulls centuries of botanical wisdom into the present."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Split: Chef Vikramaditya Rao */}
      <section className="py-20 px-6 lg:px-12 xl:px-20 max-w-[1440px] mx-auto border-b border-[#2A2723]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-[2px] overflow-hidden border border-[#39342E] shadow-2xl bg-[#121210]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WKBP4IIAWUnvr-ToAR1r0e_d-tLdxa3xl1FfSTYoLoRQCNNbzdwbRxQu4JtXZsM1EoKveae-xdJeg1__MquAFyt7784xgmvn2kyaHVQpIgvaDSD-b818z0qSJfenbjZ75jqYm-XPX8xYrUgzoLitH5r8SYGQhdJfXnirBPt-o8aITPyXy6IavGjq4Oaod8HeVkRpsWY7iMt86iC920A_Mh8lZoy2ui3WnqVQ9clfSpGpRiwR1R8ioL_Hk"
                alt="Chef Patron Vikramaditya Rao"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 bg-[#191816] border border-[#C18A65] shadow-2xl max-w-xs">
              <span className="text-[9px] uppercase tracking-widest text-[#C18A65] font-mono block mb-1">
                Chef Patron &amp; Founder
              </span>
              <p className="font-serif-lux text-base text-[#F0E8DC]">
                Vikramaditya Rao
              </p>
              <span className="text-[10px] text-[#A69D90] font-mono">
                18 Years Culinary Research
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#C18A65] font-mono">
              The Craftsman's Journey
            </span>
            <h2 className="font-serif-lux text-3xl sm:text-4xl lg:text-5xl font-light text-[#F0E8DC] leading-snug">
              "We do not tame the flame. We listen to what it asks of the ingredient."
            </h2>
            <div className="w-12 h-[1px] bg-[#39342E]" />
            <p className="text-[#C4BDB2] text-sm sm:text-base font-light leading-relaxed">
              After a decade in three-star Michelin establishments across Lyon and San Sebastián, Chef Vikramaditya returned to India with an obsession: to deconstruct the sacred culinary heritage of live fire.
            </p>
            <p className="text-[#A69D90] text-sm sm:text-base font-light leading-relaxed">
              In Awadhi royal courts, dum cooking was not merely slow; it was an airtight ritual sealed with unleavened wheat dough that forced aromatics into recursive absorption. At Ember &amp; Oak, we preserve this patience. Our lamb cheek is never hurried; our broths simmer over dying embers for 48 uninterrupted hours.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="btn-primary-ivory px-6 py-3 text-[11px] uppercase tracking-widest cursor-pointer font-mono"
              >
                Explore The Anthology →
              </button>
              <button
                onClick={onOpenReservation}
                className="btn-secondary-line px-6 py-3 text-[11px] uppercase tracking-widest cursor-pointer font-mono"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Atlas Section */}
      <section className="py-20 px-6 lg:px-12 xl:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-[10px] uppercase tracking-widest text-[#C18A65] font-mono">
            Ethical Terroir &amp; Direct Provenance
          </span>
          <h2 className="font-serif-lux text-3xl sm:text-4xl lg:text-5xl font-light text-[#F0E8DC] mt-2">
            The Botanical Sourcing Atlas.
          </h2>
          <p className="mt-3 text-sm text-[#A69D90] leading-relaxed">
            We partner with generational foragers, family-owned spice orchards, and heritage pastoral herders across the subcontinent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOURCING_ATLAS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#191816] border border-[#2A2723] hover:border-[#C18A65]/50 transition-all rounded-[2px]"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#C18A65] mb-2">
                <span>0{idx + 1} • {item.elevation}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              </div>
              <h3 className="font-serif-lux text-xl text-[#F0E8DC] font-normal">
                {item.ingredient}
              </h3>
              <p className="text-xs text-[#C18A65] font-mono mt-0.5">
                {item.region}
              </p>
              <p className="text-xs text-[#A69D90] font-light mt-3 leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
