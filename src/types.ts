export interface OrderItem {
  id: string;
  name: string;
  kicker: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  potType?: string;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  experienceType: 'dine_in' | 'heirloom_box';
  date: string;
  seatingSlot: string;
  guestsCount: number;
  specialNotes: string;
  dietaryRestrictions: string;
  deliveryAddress?: {
    street: string;
    city: string;
    postalCode: string;
    instructions: string;
  };
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'hearthside';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  savePaymentInfo: boolean;
}

export interface OrderConfirmationData {
  orderId: string;
  createdAt: string;
  status: 'confirmed' | 'preparing';
  guest: GuestDetails;
  items: OrderItem[];
  payment: {
    method: 'card' | 'apple_pay' | 'hearthside';
    cardLast4?: string;
    cardBrand?: string;
  };
  pricing: {
    subtotal: number;
    serviceFee: number;
    heritageLevy: number;
    discount: number;
    total: number;
  };
  promoCodeApplied?: string;
  hearthNumber: string;
  seatingTime: string;
}
