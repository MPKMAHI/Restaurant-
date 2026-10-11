import React, { useState } from 'react';
import { Reservation } from '../types';
import { X, Calendar, Clock, Users, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (reservation: Reservation) => void;
  initialDetails?: {
    guests?: number;
    date?: string;
    service?: string;
  };
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirmReservation,
  initialDetails,
}) => {
  const [partySize, setPartySize] = useState<number>(initialDetails?.guests || 2);
  const [date, setDate] = useState<string>(initialDetails?.date || 'Tonight, 8:30 PM');
  const [time, setTime] = useState<string>('8:30 PM');
  const [serviceEnclave, setServiceEnclave] = useState<string>(
    initialDetails?.service || 'Main Dining Room'
  );
  const [guestName, setGuestName] = useState<string>('H. Renuka');
  const [guestEmail, setGuestEmail] = useState<string>('h.renuka123456@gmail.com');
  const [guestPhone, setGuestPhone] = useState<string>('+91 (040) 2345 6789');
  const [specialRequests, setSpecialRequests] = useState<string>(
    'Autumn Degustation Menu with Sommelier Wine Flight. Anniversary seating requested.'
  );

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `EO-HYD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      confirmationCode: randomCode,
      partySize,
      date,
      time,
      serviceEnclave,
      status: 'Confirmed',
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    };
    onConfirmReservation(newReservation);
    setConfirmedReservation(newReservation);
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#191816] border border-[#39342E] rounded-[2px] shadow-2xl p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-[#A69D90] hover:text-[#F0E8DC] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReservation ? (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full border border-[#C18A65] flex items-center justify-center text-[#C18A65]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65] block mb-1">
                Table Confirmed
              </span>
              <h2 className="font-serif-lux text-3xl sm:text-4xl text-[#F0E8DC]">
                Your Evening is Set.
              </h2>
            </div>

            <div className="p-5 bg-[#141312] border border-[#2A2723] rounded-[2px] text-left text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-[#2A2723] pb-2">
                <span className="text-[#A69D90]">CONFIRMATION CODE:</span>
                <span className="text-[#C18A65] font-bold">
                  {confirmedReservation.confirmationCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A69D90]">GUEST NAME:</span>
                <span className="text-[#F0E8DC]">{confirmedReservation.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A69D90]">PARTY SIZE:</span>
                <span className="text-[#F0E8DC]">{confirmedReservation.partySize} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A69D90]">DATE &amp; SEATING:</span>
                <span className="text-[#F0E8DC]">
                  {confirmedReservation.date} ({confirmedReservation.time})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A69D90]">SERVICE ENCLAVE:</span>
                <span className="text-[#F0E8DC]">{confirmedReservation.serviceEnclave}</span>
              </div>
            </div>

            <p className="text-xs text-[#A69D90] font-light">
              A private concierge confirmation SMS has been dispatched. Smart elegant attire requested. We look forward to welcoming you.
            </p>

            <button
              onClick={handleResetAndClose}
              className="btn-copper w-full py-3.5 text-xs uppercase tracking-widest font-mono"
            >
              Return to Dining Sanctuary →
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#1C1A18] border border-[#39342E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C18A65]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C18A65] font-semibold">
                  100% Free Table Reservation • Zero Booking Fee
                </span>
              </div>
              <h2 className="font-serif-lux text-3xl sm:text-4xl text-[#F0E8DC]">
                Reserve Your Experience
              </h2>
              <p className="text-xs text-[#A69D90] mt-1 font-light">
                No credit card or advance deposit required. Direct concierge line: +91 (040) 2345 6789
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                    Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-sm text-[#F0E8DC] rounded-[2px] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-sm text-[#F0E8DC] rounded-[2px] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-sm text-[#F0E8DC] rounded-[2px] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                    Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-xs text-[#F0E8DC] rounded-[2px] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                    Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-xs text-[#F0E8DC] rounded-[2px] cursor-pointer"
                  >
                    <option value="Tonight, October 11">Tonight, Oct 11</option>
                    <option value="Tomorrow, October 12">Tomorrow, Oct 12</option>
                    <option value="Friday, October 16">Friday, Oct 16</option>
                    <option value="Saturday, October 17">Saturday, Oct 17</option>
                    <option value="Next Week, October 24">Friday, Oct 24</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                    Seating Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-xs text-[#F0E8DC] rounded-[2px] cursor-pointer"
                  >
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="9:30 PM">9:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                  Enclave Selection
                </label>
                <select
                  value={serviceEnclave}
                  onChange={(e) => setServiceEnclave(e.target.value)}
                  className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-xs text-[#F0E8DC] rounded-[2px] cursor-pointer"
                >
                  <option value="Main Dining Room">Main Dining Room (Charred Oak Walls)</option>
                  <option value="Chef Vikramaditya’s Counter (6 Seats)">
                    Chef Vikramaditya’s Counter (6 Seats, Live Fire)
                  </option>
                  <option value="Private Sommelier Wine Vault">
                    Private Sommelier Wine Vault (Granite Cellar)
                  </option>
                  <option value="Sommelier Degustation Table">
                    Sommelier Degustation Table (Wine Flight)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#A69D90] font-mono mb-1">
                  Special Dining Notes / Wine Pairings / Dietary
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Autumn Degustation Menu, Sommelier pairing, anniversary note..."
                  className="w-full bg-[#121210] border border-[#2A2723] focus:border-[#C18A65] p-3 text-xs text-[#F0E8DC] rounded-[2px] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-copper w-full py-4 text-xs uppercase tracking-widest font-mono cursor-pointer shadow-lg"
                >
                  Confirm Free Table Reservation (Zero Fee) →
                </button>
                <p className="text-[10px] text-center text-[#A69D90] font-mono mt-2">
                  Complimentary chef's welcome drink upon arrival • 1-Click free cancellation
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
