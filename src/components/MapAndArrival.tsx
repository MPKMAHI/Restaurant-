// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import {
  Navigation,
  MapPin,
  Car,
  Compass,
  Clock,
  Phone,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  LocateFixed,
} from 'lucide-react';

// Ember & Oak Coordinates (Road No. 36, Jubilee Hills, Hyderabad)
const RESTAURANT_LOCATION = {
  lat: 17.4325,
  lng: 78.4071,
};

interface MapTypeStyle {
  elementType?: string;
  featureType?: string;
  stylers: Array<Record<string, string | number | boolean>>;
}

// Luxury Custom Dark Theme for Google Maps
const LUXURY_DARK_MAP_STYLES: MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#161514' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#121210' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#A69D90' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#C18A65' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8C8377' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#1C1B18' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#272421' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1A1816' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#968E83' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3A342E' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#26221E' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#C18A65' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#22201D' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0F1214' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4B5563' }],
  },
];

interface MapAndArrivalProps {
  onOpenReservation?: () => void;
}

export const MapAndArrival: React.FC<MapAndArrivalProps> = ({ onOpenReservation }) => {
  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    'AIzaSyBGHg44uwPqUf8NLGDJAwBQ2eOnJfb7V0U';

  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [estimatedDriveMins, setEstimatedDriveMins] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedHub, setSelectedHub] = useState<string>('rgi');

  // Compute Haversine distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Location-Aware Browser Detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Pinpointing your coordinates in Hyderabad...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        const dist = calculateDistance(
          latitude,
          longitude,
          RESTAURANT_LOCATION.lat,
          RESTAURANT_LOCATION.lng
        );
        const roundedDist = Math.round(dist * 10) / 10;
        setDistanceKm(roundedDist);
        // Average city transit calculation ~22 km/h
        const driveMins = Math.max(8, Math.round((roundedDist / 22) * 60));
        setEstimatedDriveMins(driveMins);
        setIsLocating(false);
        setLocationStatus(`Located: ~${roundedDist} km away (approx. ${driveMins} mins drive).`);
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation prompt error', error);
        setLocationStatus('Location access was declined. Select a transit hub below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const HYDERABAD_HUBS = [
    {
      id: 'rgi',
      name: 'RGIA Airport (Shamshabad)',
      distance: '32.4 km',
      time: '~42 mins',
      route: 'Via Outer Ring Road (ORR) & Road No. 36',
    },
    {
      id: 'hitec',
      name: 'Hitec City / Madhapur',
      distance: '6.2 km',
      time: '~16 mins',
      route: 'Via Inorbit Mall Rd & Durgam Cheruvu Cable Bridge',
    },
    {
      id: 'banjara',
      name: 'Banjara Hills (Road No. 12)',
      distance: '4.1 km',
      time: '~12 mins',
      route: 'Via KBR Park Junction & Road No. 36',
    },
    {
      id: 'gachibowli',
      name: 'Gachibowli Financial District',
      distance: '8.8 km',
      time: '~22 mins',
      route: 'Via Mindspace Junction & Jubilee Hills Checkpost',
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      'Ember & Oak, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033, India'
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  return (
    <section
      id="map-and-arrival"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#121210] border-t border-[#39342E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#2A2723]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-7 h-[1px] bg-[#C18A65]" />
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#C18A65] font-semibold font-mono">
                Map &amp; Spatial Arrival
              </span>
            </div>
            <h2 className="font-serif-lux text-4xl sm:text-5xl lg:text-6xl font-light text-[#F0E8DC] leading-tight">
              A Serene Height in <br />
              <span className="italic font-normal text-[#C18A65]">Jubilee Hills.</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 text-left md:text-right">
            <p className="text-[#A69D90] text-sm max-w-xs font-light mb-3">
              Perched on Road No. 36 with direct private porte-cochère valet and discrete rear security enclaves.
            </p>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C18A65] font-semibold font-mono">
              Valet Porte-Cochère · Hyderabad 500033
            </span>
          </div>
        </div>

        {/* Map & Arrival Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Map Column (Span 7) */}
          <div className="lg:col-span-7 rounded-[2px] border border-[#39342E] bg-[#191816] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Map Canvas Container */}
            <div className="relative w-full h-[460px] md:h-[520px] bg-[#111110]">
              <APIProvider apiKey={apiKey}>
                <Map
                  id="ember-oak-map"
                  mapId="DEMO_MAP_ID"
                  defaultCenter={RESTAURANT_LOCATION}
                  defaultZoom={15}
                  gestureHandling="cooperative"
                  disableDefaultUI={false}
                  styles={LUXURY_DARK_MAP_STYLES}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  className="w-full h-full"
                >
                  {/* Restaurant Custom Advanced Marker */}
                  <AdvancedMarker
                    position={RESTAURANT_LOCATION}
                    title="Ember & Oak Fine Dining"
                    onClick={() => setInfoWindowOpen(!infoWindowOpen)}
                  >
                    <div className="relative cursor-pointer group">
                      {/* Pulse beacon ring */}
                      <div className="absolute -inset-2 rounded-full bg-[#C18A65]/30 animate-ping pointer-events-none" />
                      {/* Custom Marker Emblem */}
                      <div className="relative w-10 h-10 rounded-[2px] bg-[#141312] border-2 border-[#C18A65] shadow-[0_0_25px_rgba(193,138,101,0.6)] flex items-center justify-center transform hover:scale-110 transition-transform">
                        <span className="font-serif-lux text-[#F0E8DC] text-xs font-bold tracking-wider">
                          E&amp;O
                        </span>
                      </div>
                      {/* Bottom marker pointer pin */}
                      <div className="w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-[#C18A65] mx-auto" />
                    </div>
                  </AdvancedMarker>

                  {/* Optional Detected User Marker */}
                  {userCoords && (
                    <AdvancedMarker
                      position={userCoords}
                      title="Your Current Location"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#E9E0D2] border-2 border-[#121210] shadow-[0_0_15px_rgba(233,224,210,0.8)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#C18A65]" />
                      </div>
                    </AdvancedMarker>
                  )}

                  {/* Info Window */}
                  {infoWindowOpen && (
                    <InfoWindow
                      position={RESTAURANT_LOCATION}
                      onCloseClick={() => setInfoWindowOpen(false)}
                      headerDisabled={true}
                    >
                      <div className="p-3 bg-[#191816] text-[#F0E8DC] rounded-[2px] max-w-xs space-y-2 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#C18A65] rotate-45" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C18A65] font-semibold">
                            Ember &amp; Oak · Hyderabad
                          </span>
                        </div>
                        <h4 className="font-serif-lux text-base text-[#F0E8DC]">
                          Road No. 36, Jubilee Hills
                        </h4>
                        <p className="text-[11px] text-[#A69D90] leading-snug font-light">
                          Haute Gastronomy &amp; Live Fire. Dedicated valet porte-cochère at the main gates.
                        </p>
                        <div className="pt-2 border-t border-[#2A2723] flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#C18A65]">Dinner: 7 PM – Midnight</span>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Road+36+Jubilee+Hills+Hyderabad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-[#F0E8DC] hover:text-[#C18A65] flex items-center gap-1"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>

              {/* Floating Quick Locate Button */}
              <button
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="absolute bottom-4 left-4 z-10 px-3.5 py-2 bg-[#141312]/95 backdrop-blur-md border border-[#39342E] hover:border-[#C18A65] text-[#F0E8DC] text-[11px] font-mono uppercase tracking-wider rounded-[2px] flex items-center gap-2 shadow-xl cursor-pointer transition-colors"
                title="Detect Distance from Current Location"
              >
                <LocateFixed className={`w-3.5 h-3.5 text-[#C18A65] ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'Detect Distance From Me'}</span>
              </button>
            </div>

            {/* Map Bottom Metadata Bar */}
            <div className="p-5 md:p-6 bg-[#141312] border-t border-[#2A2723] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C18A65]" />
                <span className="text-[#F0E8DC]">Road No. 36, Jubilee Hills, Hyderabad</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyAddress}
                  className="text-[#A69D90] hover:text-[#F0E8DC] flex items-center gap-1.5 cursor-pointer uppercase text-[10px] tracking-wider"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C18A65]" />
                      <span className="text-[#C18A65]">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A69D90]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Road+36+Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C18A65] hover:text-[#F0E8DC] flex items-center gap-1 cursor-pointer uppercase text-[10px] tracking-wider"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Location-Aware Arrival Dossier Column (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Live Location Distance Card */}
            <div className="p-6 md:p-7 bg-[#191816] border border-[#39342E] rounded-[2px] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2723] pb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#C18A65]" />
                  <h3 className="text-[11px] uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                    Location-Aware Transit Intelligence
                  </h3>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C18A65] animate-pulse" />
              </div>

              {locationStatus ? (
                <div className="p-3.5 bg-[#121210] border border-[#2A2723] rounded-[2px] text-xs">
                  <p className="text-[#F0E8DC] font-mono">{locationStatus}</p>
                  {distanceKm && (
                    <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-[#2A2723]">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                          Geodesic Distance
                        </span>
                        <span className="font-serif-lux text-xl text-[#C18A65]">
                          {distanceKm} km
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                          Est. Car Transit
                        </span>
                        <span className="font-serif-lux text-xl text-[#F0E8DC]">
                          ~{estimatedDriveMins} mins
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3.5 bg-[#121210] border border-[#2A2723] rounded-[2px] text-xs text-[#A69D90]">
                  <p className="font-light leading-relaxed">
                    Click "Detect Distance From Me" on the map or review common Hyderabad luxury approach corridors below.
                  </p>
                </div>
              )}

              {/* Transit Hubs Selector */}
              <div className="space-y-2 pt-1">
                <span className="text-[9px] uppercase tracking-widest text-[#A69D90] font-mono block">
                  Select Hyderabad Departure Point:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HYDERABAD_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub.id)}
                      className={`p-3 text-left rounded-[2px] border transition-all cursor-pointer font-mono ${
                        selectedHub === hub.id
                          ? 'bg-[#141312] border-[#C18A65] text-[#F0E8DC]'
                          : 'bg-[#121210] border-[#2A2723] text-[#A69D90] hover:border-[#39342E]'
                      }`}
                    >
                      <span className="text-xs font-semibold block text-[#F0E8DC] truncate">
                        {hub.name}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-[#C18A65] mt-1">
                        <span>{hub.distance}</span>
                        <span>{hub.time}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Hub Detail */}
                {selectedHub && (
                  <div className="p-3 bg-[#141312] border-l-2 border-[#C18A65] text-[11px] text-[#C4BDB2] mt-2 leading-relaxed">
                    <span className="text-[#C18A65] font-mono uppercase text-[9px] block mb-0.5">
                      Recommended Route Corridor:
                    </span>
                    {HYDERABAD_HUBS.find((h) => h.id === selectedHub)?.route}
                  </div>
                )}
              </div>
            </div>

            {/* White-Glove Arrival Protocols */}
            <div className="p-6 md:p-7 bg-[#191816] border border-[#39342E] rounded-[2px] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2723] pb-3">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#C18A65]" />
                  <h3 className="text-[11px] uppercase tracking-widest text-[#C18A65] font-mono font-semibold">
                    White-Glove Arrival Protocols
                  </h3>
                </div>
                <ShieldCheck className="w-4 h-4 text-[#A69D90]" />
              </div>

              <div className="space-y-3 text-xs text-[#A69D90] font-light leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-[#C18A65] font-mono mt-0.5">•</span>
                  <div>
                    <strong className="text-[#F0E8DC] font-medium block">
                      Complimentary Private Porte-Cochère Valet:
                    </strong>
                    Drive directly into our sheltered driveway on Road 36. Our uniformed attendants manage vehicle parking and retrieval.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C18A65] font-mono mt-0.5">•</span>
                  <div>
                    <strong className="text-[#F0E8DC] font-medium block">
                      Dedicated Chauffeur Hospitality Suite:
                    </strong>
                    Personal drivers may rest in our air-conditioned lounge with complimentary refreshments while your dinner progresses.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C18A65] font-mono mt-0.5">•</span>
                  <div>
                    <strong className="text-[#F0E8DC] font-medium block">
                      Table Grace Period &amp; Concierge Direct:
                    </strong>
                    Tables are reserved exclusively for 20 minutes past your seating time. Contact our concierge desk at{' '}
                    <a href="tel:+914023456789" className="text-[#C18A65] hover:underline font-mono">
                      +91 (040) 2345 6789
                    </a>{' '}
                    for seamless traffic updates.
                  </div>
                </div>
              </div>

              {onOpenReservation && (
                <div className="pt-2">
                  <button
                    onClick={onOpenReservation}
                    className="btn-copper w-full py-3.5 text-xs uppercase tracking-widest font-mono cursor-pointer shadow-md"
                  >
                    Reserve Free Table (Complimentary Valet Included) →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
