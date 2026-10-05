import { OrderItem, GuestDetails, OrderConfirmationData } from '../types';

import hearthDishImg from '../assets/images/terracotta_feast_dish_1791214706393.jpg';
import infusionImg from '../assets/images/woodfire_cinnamon_infusion_1791214721224.jpg';
import clayPotImg from '../assets/images/hearth_clay_pots_1791214689063.jpg';

export const initialOrderItems: OrderItem[] = [
  {
    id: 'item-1',
    name: 'The Primordial Hearth Degustation',
    kicker: '01 / Matale Cured Wild Timber',
    description: '12-hour woodfire smoked curry slow-mineralized in Kelani unglazed terracotta pots, accompanied by wild cinnamon heirloom rice, charred rotti, and sun-dried tamarind sambal.',
    price: 145.00,
    quantity: 2,
    image: hearthDishImg,
    category: 'Tasting Experience',
    potType: 'Unglazed Kelani Terracotta'
  },
  {
    id: 'item-2',
    name: 'Wild Cinnamon & Smoked Tamarind Infusion',
    kicker: '02 / Hearth-Brewed Elixir',
    description: 'Slow cold-smoked artisanal elixir infused with scorched cinnamon bark, wild honey reduction, and native Matale citrus peel.',
    price: 28.00,
    quantity: 2,
    image: infusionImg,
    category: 'Botanical Pairings'
  },
  {
    id: 'item-3',
    name: 'Artisan Kelani Terracotta Hearth Pot',
    kicker: '03 / Handcrafted Keepsake',
    description: 'Porous river-silt clay vessel, hand-spun by master potters and woodfire-seasoned with pure virgin coconut nectar oil.',
    price: 45.00,
    quantity: 1,
    image: clayPotImg,
    category: 'Heirloom Crafts'
  }
];

export const defaultGuestDetails: GuestDetails = {
  fullName: 'Binodya Senanayake',
  email: 'binodya.s@luxurycuisine.lk',
  phone: '+94 77 982 4510',
  experienceType: 'dine_in',
  date: 'Tonight, October 5',
  seatingSlot: 'Twilight Embers Seating (19:30 - 22:00)',
  guestsCount: 2,
  specialNotes: 'Anniversary celebration. Please reserve counter seats directly observing the central woodfire terracotta hearth.',
  dietaryRestrictions: 'Mild Ceylon spice tolerance for one guest, no shellfish.',
  deliveryAddress: {
    street: '42 Cinnamon Gardens Boulevard, Suite 5B',
    city: 'Colombo 07',
    postalCode: '00700',
    instructions: 'Ring brass concierge bell upon arrival.'
  }
};

export const sampleOrderConfirmation: OrderConfirmationData = {
  orderId: 'PRN-8429',
  createdAt: 'Oct 05, 2026 · 20:42 PM',
  status: 'confirmed',
  guest: defaultGuestDetails,
  items: initialOrderItems,
  payment: {
    method: 'card',
    cardLast4: '4242',
    cardBrand: 'Mastercard Black'
  },
  pricing: {
    subtotal: 391.00,
    serviceFee: 39.10,
    heritageLevy: 19.55,
    discount: 39.10,
    total: 410.55
  },
  promoCodeApplied: 'HEARTH10',
  hearthNumber: 'Hearth Table 04 · Kelani Riverview',
  seatingTime: 'Tonight, 19:30 - 22:00'
};
