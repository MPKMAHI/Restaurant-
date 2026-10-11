import React from 'react';
import { X, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { DISHES_DATABASE } from '../data/culinaryData';

interface DietaryMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DietaryMatrixModal: React.FC<DietaryMatrixModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#191816] border border-[#39342E] rounded-[2px] shadow-2xl p-6 sm:p-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A69D90] hover:text-[#F0E8DC] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65]" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65]">
              Executive Culinary Safety Standards
            </span>
          </div>
          <h2 className="font-serif-lux text-3xl sm:text-4xl text-[#F0E8DC]">
            The Botanical Dietary Matrix
          </h2>
          <p className="text-xs text-[#A69D90] mt-1 font-light">
            Every creation is prepared in dedicated culinary stations to prevent cross-contact. Review our certified allergen and dietary classifications below.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border border-[#2A2723] rounded-[2px] mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141312] text-[#C18A65] font-mono text-[10px] uppercase tracking-wider border-b border-[#2A2723]">
              <tr>
                <th className="p-3">Course / Dish</th>
                <th className="p-3 text-center">Gluten-Free</th>
                <th className="p-3 text-center">Dairy-Free</th>
                <th className="p-3 text-center">Halal</th>
                <th className="p-3 text-center">Nut-Free</th>
                <th className="p-3 text-center">Vegetarian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2723] text-[#F0E8DC]">
              {DISHES_DATABASE.map((dish) => (
                <tr key={dish.id} className="hover:bg-[#141312]/60">
                  <td className="p-3 font-medium">
                    <span className="font-serif-lux text-sm block">{dish.title}</span>
                    <span className="text-[9px] text-[#A69D90] font-mono">{dish.courseRoman} • {dish.badge || 'Archive'}</span>
                  </td>
                  <td className="p-3 text-center">
                    {dish.tags.some((t) => t.includes('gluten-free')) ? (
                      <span className="text-[#C18A65] font-mono text-xs">✓</span>
                    ) : (
                      <span className="text-[#A69D90] font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {dish.tags.some((t) => t.includes('dairy-free')) ? (
                      <span className="text-[#C18A65] font-mono text-xs">✓</span>
                    ) : (
                      <span className="text-[#A69D90] font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {dish.tags.includes('halal') ? (
                      <span className="text-[#C18A65] font-mono text-xs">✓</span>
                    ) : (
                      <span className="text-[#A69D90] font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {dish.tags.includes('nut-free') ? (
                      <span className="text-[#C18A65] font-mono text-xs">✓</span>
                    ) : (
                      <span className="text-[#A69D90] font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {dish.tags.includes('vegetarian') ? (
                      <span className="text-[#C18A65] font-mono text-xs">✓</span>
                    ) : (
                      <span className="text-[#A69D90] font-mono text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Safety Protocols */}
        <div className="p-4 bg-[#141312] border border-[#2A2723] rounded-[2px] text-xs text-[#A69D90] space-y-2">
          <div className="flex items-center gap-2 text-[#F0E8DC] font-medium font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#C18A65]" />
            <span>Dedicated Hearth &amp; Iron Cleanliness Protocol</span>
          </div>
          <p className="leading-relaxed">
            All celiac and nut-free requests are executed using sterilized cast-iron skillets away from the tandoor wheat stations. Inform your table captain or note in reservation upon booking.
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="btn-copper px-6 py-2.5 text-xs uppercase tracking-widest font-mono cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
