export type PageView = 'home' | 'menu' | 'experiences' | 'story' | 'dashboard' | 'arrival' | 'studio3d';

export interface IngredientItem {
  name: string;
  origin: string;
  description: string;
}

export interface IngredientGroup {
  id: string;
  categoryNumber: string;
  title: string;
  items: IngredientItem[];
}

export interface Dish {
  id: string;
  archiveId: string;
  courseRoman: string;
  courseTitle: string;
  badge?: string;
  title: string;
  italicPart?: string;
  price: number;
  priceFormatted: string;
  shortDescription: string;
  fullQuote: string;
  imageUrl: string;
  technique: string;
  sensoryProfile: string;
  heroBadgeText: string;
  category: 'appetizer' | 'main' | 'dessert' | 'pairing';
  tags: string[];
  pairing: {
    title: string;
    description: string;
  };
  ingredientGroups: IngredientGroup[];
  allergens: string[];
}

export interface ProgressionCourse {
  number: string;
  stage: string;
  title: string;
  description: string;
  isApex?: boolean;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  partySize: number;
  date: string;
  time: string;
  serviceEnclave: string;
  status: 'Confirmed' | 'Pending Concierge' | 'Completed';
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface TastingPassportEntry {
  dishId: string;
  dishName: string;
  course: string;
  dateExperienced: string;
  rating: number;
  sommelierPairing: string;
  tastingNotes: string;
}
