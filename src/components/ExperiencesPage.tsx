import React, { useState } from 'react';
import { Wine, Flame, Users, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface ExperiencesPageProps {
  onOpenReservationWithEnclave: (enclave: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onOpenReservationWithEnclave,
}) => {
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Subtle hearth audio synthesizer via Web Audio API (safe, self-contained, no external mp3 dependency)
  const toggleHearthAudio = () => {
    if (ambientAudioActive) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setAmbientAudioActive(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Brown noise / fire crackle generator
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.12; // gentle warm volume
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Warm lowpass filter for deep burning wood rumble
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.18, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setAudioCtx(ctx);
        setAmbientAudioActive(true);
      } catch (err) {
        console.error('Web Audio hearth failed', err);
      }
    }
  };

  const ENCLAVES = [
    {
      id: 'counter',
      title: "Chef Vikramaditya's Counter",
      subtitle: '6 Seats Only • Front-Row Degustation',
      capacity: 'Up to 6 Guests',
      price: '₹ 8,500 / Guest (Full Flight)',
      description:
        'The sanctum sanctorum of Ember & Oak. Guests sit directly along the polished black granite counter, witnessing the dance of oak embers, hand-pulled copper handis, and plating with botanical tweezers.',
      highlights: [
        'Dedicated presentation by Chef Patron Vikramaditya Rao',
        'Exclusive 11-course experimental tasting courses',
        'Sommelier barrel tasting straight from French oak casks'
      ],
      imageUrl:
        'https://lh3.googleusercontent.com/aida/AEtjO1WKBP4IIAWUnvr-ToAR1r0e_d-tLdxa3xl1FfSTYoLoRQCNNbzdwbRxQu4JtXZsM1EoKveae-xdJeg1__MquAFyt7784xgmvn2kyaHVQpIgvaDSD-b818z0qSJfenbjZ75jqYm-XPX8xYrUgzoLitH5r8SYGQhdJfXnirBPt-o8aITPyXy6IavGjq4Oaod8HeVkRpsWY7iMt86iC920A_Mh8lZoy2ui3WnqVQ9clfSpGpRiwR1R8ioL_Hk',
      badge: 'Most Exclusive'
    },
    {
      id: 'vault',
      title: 'Private Sommelier Wine Vault',
      subtitle: 'Subterranean Granite & Cask Cellar',
      capacity: '8 to 14 Guests',
      price: 'Curated Custom Experience',
      description:
        'Surrounded by 1,200 curated vintage bottles spanning Piedmont, Bordeaux, Champagne, and rare fortified ports. An enclave designed for celebratory gatherings, confidential dinners, and unhurried discussions.',
      highlights: [
        'Dedicated Sommelier for your private party',
        'Grand Cru and Amarone vertical tastings available',
        'Discrete private service entrance and dedicated acoustics'
      ],
      imageUrl:
        'https://lh3.googleusercontent.com/aida/AEtjO1UJ-Q6uG0hEssCEzI0naQcEQr1SZRdNw76NapMj3VAs0ro4NTcnhq-siEasfvRr5b78BL59qILK4bNHZROz78CxCZ85bNxyfAP8YFGAKIiyvuAUecbC87bgrrqQB-MT9627GZ5Z0wJkzpa5v-lKEJRkvLxsgDlk0qoyQmEdOA9COg9cUD5rkz7WtvsfI3w1fA8v_FLmvoEtGZR5130I4Z85pZhFMWHqcRC0sCsL3PlCF0h5OCElZFgX4Bcs',
      badge: 'High Privacy'
    },
    {
      id: 'main',
      title: 'The Main Hearth Dining Room',
      subtitle: 'Charred Oak Walls & Spun Copper Pendants',
      capacity: '2 to 6 Guests Per Table',
      price: 'À La Carte or 9-Course Degustation',
      description:
        'Bathed in warm amber candlelight, charred Shou Sugi Ban timber, and quiet acoustic intimacy. Tables spaced with generous luxury breathing room so every conversation belongs solely to your party.',
      highlights: [
        'Live ambient view of the central copper-hooded hearth',
        'Choice between curated tasting flights and à la carte',
        'Smart elegant dress code and unhurried hospitality'
      ],
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBVtx9ZqdYj3X_lUR0I5IXncsXHvT5qtNm2gwpZILXOkuSO7GS7lf8mZI8diL4kqrBCwnG925wHFNApcU0iv5eClqd8UbRv20HTuQ2JWLpU1AkHFgnuqgpq7OhGPtJ18iHg2QM8A-LWC7MODDrDZxl89iuBDsRsx22jVgzxgibye1pgLg2tWdO7k3kS3Im5869PlxSDjF-86HHAyYsSIe3HxJoBaK7G-rL9tFBxEi01TJzy30Z6qdpKmQ',
      badge: 'Signature Atmosphere'
    }
  ];

  return (
    <div className="w-full pt-28">
      {/* Editorial Header */}
      <section className="relative pt-12 pb-14 border-b border-[#2A2723] px-6 lg:px-12 xl:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
              <span className="text-[11px] font-medium tracking-[0.28em] text-[#C18A65] uppercase font-mono">
                Spatial Design &amp; Dining Enclaves
              </span>
            </div>
            
            {/* Audio Hearth Ambiance Control */}
            <button
              onClick={toggleHearthAudio}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] border text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                ambientAudioActive
                  ? 'border-[#C18A65] bg-[#C18A65]/15 text-[#F0E8DC]'
                  : 'border-[#2A2723] bg-[#141312] text-[#A69D90] hover:text-[#F0E8DC]'
              }`}
            >
              {ambientAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C18A65] animate-pulse" />
                  <span>Live Hearth Audio: Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#A69D90]" />
                  <span>Simulate Hearth Audio</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif-lux text-5xl md:text-6xl lg:text-7xl font-light text-[#F0E8DC] leading-[1.06]">
                Sanctuaries of <span className="italic font-normal text-[#C18A65]">Fire &amp; Shadow.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-[#C4BDB2] max-w-2xl font-light leading-relaxed">
                Whether seated front-row before the glowing sal-wood embers or secluded within our underground granite wine vault, each enclave at Ember &amp; Oak is orchestrated for transcendent evenings.
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-6 text-xs font-mono uppercase tracking-widest text-[#A69D90]">
              <div>
                <span className="block font-serif-lux text-2xl text-[#F0E8DC]">38</span>
                <span>Total Covers</span>
              </div>
              <div className="w-[1px] h-8 bg-[#2A2723]" />
              <div>
                <span className="block font-serif-lux text-2xl text-[#F0E8DC]">1,200+</span>
                <span>Cellar Bottles</span>
              </div>
              <div className="w-[1px] h-8 bg-[#2A2723]" />
              <div>
                <span className="block font-serif-lux text-2xl text-[#F0E8DC]">6</span>
                <span>Counter Stools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enclaves Showcase */}
      <section className="py-20 px-6 lg:px-12 xl:px-20 max-w-[1440px] mx-auto space-y-20">
        {ENCLAVES.map((enclave, idx) => (
          <div
            key={enclave.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column */}
            <div
              className={`lg:col-span-7 relative group ${
                idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] border border-[#39342E] bg-[#121210] shadow-2xl">
                <img
                  src={enclave.imageUrl}
                  alt={enclave.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-[#121210]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#39342E]">
                  <span className="text-[10px] tracking-widest uppercase text-[#C18A65] font-mono font-semibold">
                    {enclave.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#121210]/90 backdrop-blur-md px-4 py-2 border border-[#39342E] text-right">
                  <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                    Capacity
                  </span>
                  <span className="font-serif-lux text-base text-[#F0E8DC]">
                    {enclave.capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div
              className={`lg:col-span-5 space-y-6 ${
                idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C18A65] font-mono">
                <span>Enclave 0{idx + 1}</span>
                <span>/</span>
                <span>{enclave.subtitle}</span>
              </div>

              <h2 className="font-serif-lux text-3xl sm:text-4xl lg:text-5xl font-light text-[#F0E8DC] leading-tight">
                {enclave.title}
              </h2>

              <p className="text-[#C4BDB2] text-sm md:text-base font-light leading-relaxed">
                {enclave.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2 border-t border-[#2A2723]">
                {enclave.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#A69D90]">
                    <span className="text-[#C18A65] font-mono text-sm leading-none">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                    Investment
                  </span>
                  <span className="font-serif-lux text-xl text-[#F0E8DC] font-light">
                    {enclave.price}
                  </span>
                </div>

                <button
                  onClick={() => onOpenReservationWithEnclave(enclave.title)}
                  className="btn-copper px-6 py-3 text-[11px] uppercase tracking-widest cursor-pointer font-mono"
                >
                  Reserve Enclave →
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
