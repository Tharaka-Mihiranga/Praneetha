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

export type FulfillmentType = 'delivery' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  fulfillmentType: FulfillmentType;
  deliveryTime: string;
  dietaryRestrictions: string;
  specialNotes: string;
  includeCutlery: boolean;
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    instructions: string;
  };
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'cash_on_delivery';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  savePaymentInfo: boolean;
}

export type OrderStatus = 'received' | 'simmering' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderTimelineEvent {
  time: string;
  title: string;
  description: string;
  actor: string;
}

export interface OrderConfirmationData {
  orderId: string;
  createdAt: string;
  status: OrderStatus;
  guest: CustomerDetails; // Named guest/customer for backwards compatibility
  items: OrderItem[];
  payment: {
    method: 'card' | 'apple_pay' | 'cash_on_delivery';
    cardLast4?: string;
    cardBrand?: string;
  };
  pricing: {
    subtotal: number;
    deliveryFee: number;
    heritageLevy: number;
    discount: number;
    total: number;
  };
  promoCodeApplied?: string;
  dispatchStation: string;
  estimatedDeliveryTime: string;
  staffNotes?: string;
  timeline?: OrderTimelineEvent[];
}

export type NavigationPage = 'checkout' | 'confirmation' | 'admin';
export type AdminSubTab = 'overview' | 'orders';
