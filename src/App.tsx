import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageView, Reservation } from './types';
import { INITIAL_RESERVATIONS } from './data/culinaryData';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CulinaryAnthology } from './components/CulinaryAnthology';
import { ExperiencesPage } from './components/ExperiencesPage';
import { OurStoryPage } from './components/OurStoryPage';
import { UserDashboard } from './components/UserDashboard';
import { MapAndArrival } from './components/MapAndArrival';
import { ReservationModal } from './components/ReservationModal';
import { DietaryMatrixModal } from './components/DietaryMatrixModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [targetDishId, setTargetDishId] = useState<string>('biryani-safran');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isDietaryModalOpen, setIsDietaryModalOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [reservationModalDetails, setReservationModalDetails] = useState<{
    guests?: number;
    date?: string;
    service?: string;
  }>({});

  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [wishlist, setWishlist] = useState<string[]>(['biryani-safran', 'caviar-flatbread']);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleNavigate = (page: PageView, dishId?: string) => {
    if (dishId) {
      setTargetDishId(dishId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReservationWithDetails = (details: {
    guests: number;
    date: string;
    service: string;
  }) => {
    setReservationModalDetails(details);
    setIsReservationOpen(true);
  };

  const handleOpenReservationWithEnclave = (enclave: string) => {
    setReservationModalDetails({ service: enclave });
    setIsReservationOpen(true);
  };

  const handleConfirmReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleWishlist = (dishId: string) => {
    setWishlist((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  return (
    <div className="min-h-screen bg-[#111110] text-[#C4BDB2] selection:bg-[#C18A65] selection:text-[#111110] flex flex-col justify-between">
      {/* Google Maps Quota Warning Banner (if triggered) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Global Navigation Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenReservation={() => {
          setReservationModalDetails({});
          setIsReservationOpen(true);
        }}
        reservationCount={reservations.length}
      />

      {/* Main View Area with Smooth Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && (
              <>
                <LandingPage
                  onNavigate={handleNavigate}
                  onOpenReservationWithDetails={handleOpenReservationWithDetails}
                />
                <MapAndArrival
                  onOpenReservation={() => {
                    setReservationModalDetails({ service: 'Main Dining Room' });
                    setIsReservationOpen(true);
                  }}
                />
              </>
            )}

            {currentPage === 'arrival' && (
              <div className="pt-24">
                <MapAndArrival
                  onOpenReservation={() => {
                    setReservationModalDetails({ service: 'Main Dining Room' });
                    setIsReservationOpen(true);
                  }}
                />
              </div>
            )}

            {currentPage === 'menu' && (
              <CulinaryAnthology
                initialDishId={targetDishId}
                onOpenReservation={() => {
                  setReservationModalDetails({});
                  setIsReservationOpen(true);
                }}
                onOpenDietaryModal={() => setIsDietaryModalOpen(true)}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            )}

            {currentPage === 'experiences' && (
              <ExperiencesPage
                onOpenReservationWithEnclave={handleOpenReservationWithEnclave}
              />
            )}

            {currentPage === 'story' && (
              <OurStoryPage
                onExploreMenu={() => handleNavigate('menu')}
                onOpenReservation={() => {
                  setReservationModalDetails({});
                  setIsReservationOpen(true);
                }}
              />
            )}

            {currentPage === 'dashboard' && (
              <UserDashboard
                reservations={reservations}
                onCancelReservation={handleCancelReservation}
                onOpenNewReservation={() => {
                  setReservationModalDetails({});
                  setIsReservationOpen(true);
                }}
                onInspectDish={(dishId) => handleNavigate('menu', dishId)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReservation={() => {
          setReservationModalDetails({});
          setIsReservationOpen(true);
        }}
      />

      {/* Reservation Booking Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onConfirmReservation={handleConfirmReservation}
        initialDetails={reservationModalDetails}
      />

      {/* Dietary Matrix Modal */}
      <DietaryMatrixModal
        isOpen={isDietaryModalOpen}
        onClose={() => setIsDietaryModalOpen(false)}
      />
    </div>
  );
}
