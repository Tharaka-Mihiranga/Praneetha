import { OrderItem, CustomerDetails, OrderConfirmationData } from '../types';

import hearthDishImg from '../assets/images/terracotta_feast_dish_1791214706393.jpg';
import infusionImg from '../assets/images/woodfire_cinnamon_infusion_1791214721224.jpg';
import clayPotImg from '../assets/images/hearth_clay_pots_1791214689063.jpg';

export const initialOrderItems: OrderItem[] = [
  {
    id: 'item-1',
    name: 'The Primordial Hearth Degustation Box',
    kicker: '01 / Matale Cured Wild Timber',
    description: '12-hour woodfire smoked curry slow-mineralized in Kelani unglazed terracotta pots, accompanied by wild cinnamon heirloom rice, charred rotti, and sun-dried tamarind sambal. Delivered warm with reheating stones.',
    price: 145.00,
    quantity: 2,
    image: hearthDishImg,
    category: 'Heirloom Curry Feast',
    potType: 'Unglazed Kelani Terracotta Vessel'
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
    category: 'Earthenware Crafts'
  }
];

export const defaultCustomerDetails: CustomerDetails = {
  fullName: 'Binodya Senanayake',
  email: 'binodya.s@luxurycuisine.lk',
  phone: '+94 77 982 4510',
  fulfillmentType: 'delivery',
  deliveryTime: 'Priority Delivery (~35-45 mins)',
  dietaryRestrictions: 'Mild Ceylon spice tolerance, no shellfish.',
  specialNotes: 'Ring brass concierge bell upon arrival. Apartment lobby on 5th floor.',
  includeCutlery: true,
  deliveryAddress: {
    street: '42 Cinnamon Gardens Boulevard, Suite 5B',
    city: 'Colombo 07',
    postalCode: '00700',
    instructions: 'Deliver to apartment reception desk.'
  }
};

export const sampleOrderConfirmation: OrderConfirmationData = {
  orderId: 'PRN-8429',
  createdAt: 'Oct 06, 2026 · 18:42 PM',
  status: 'simmering',
  guest: defaultCustomerDetails,
  items: initialOrderItems,
  payment: {
    method: 'card',
    cardLast4: '4242',
    cardBrand: 'Mastercard Black'
  },
  pricing: {
    subtotal: 391.00,
    deliveryFee: 15.00,
    heritageLevy: 19.55,
    discount: 39.10,
    total: 386.45
  },
  promoCodeApplied: 'HEARTH10',
  dispatchStation: 'Dispatch Bay 02 · Heated Jute Pack #04',
  estimatedDeliveryTime: '35 - 45 mins (Arrival ~19:25 PM)',
  staffNotes: 'Clay pots sealed with beeswax cloth. Pack 4 hot river reheating stones in the insulated carrier.',
  timeline: [
    { time: '18:42 PM', title: 'Food Order Received', description: 'Order confirmed and paid via Mastercard Black', actor: 'System' },
    { time: '18:50 PM', title: 'Clay Pots on Hearth Fire', description: 'Unglazed pots simmering over wild cinnamon embers', actor: 'Chef Somapala' },
    { time: '19:10 PM', title: 'Insulated Packing', description: 'Placed in thermal jute carrier with hot river stones', actor: 'Dispatch Station' }
  ]
};

export const initialOrdersList: OrderConfirmationData[] = [
  sampleOrderConfirmation,
  {
    orderId: 'PRN-7914',
    createdAt: 'Oct 06, 2026 · 18:15 PM',
    status: 'simmering',
    guest: {
      fullName: 'Rohan Wickremasinghe',
      email: 'rohan.w@ceylontea.com',
      phone: '+94 71 445 8820',
      fulfillmentType: 'delivery',
      deliveryTime: 'Dinner Window (19:30 - 20:00)',
      specialNotes: 'Vegetarian claypot variations needed for 2 portions.',
      dietaryRestrictions: 'Strict vegetarian for 2 portions; authentic Ceylon spice level.',
      includeCutlery: true,
      deliveryAddress: {
        street: '88 Ward Place, Penthouse A',
        city: 'Colombo 07',
        postalCode: '00700',
        instructions: 'Call upon arrival at main gate.'
      }
    },
    items: [
      {
        id: 'item-1',
        name: 'The Primordial Hearth Degustation Box',
        kicker: '01 / Matale Cured Wild Timber',
        description: '12-hour woodfire smoked curry slow-mineralized in Kelani unglazed terracotta pots.',
        price: 145.00,
        quantity: 4,
        image: hearthDishImg,
        category: 'Heirloom Curry Feast'
      },
      {
        id: 'item-2',
        name: 'Wild Cinnamon & Smoked Tamarind Infusion',
        kicker: '02 / Hearth-Brewed Elixir',
        description: 'Slow cold-smoked artisanal elixir.',
        price: 28.00,
        quantity: 4,
        image: infusionImg,
        category: 'Botanical Pairings'
      }
    ],
    payment: {
      method: 'card',
      cardLast4: '8831',
      cardBrand: 'Visa Signature'
    },
    pricing: {
      subtotal: 692.00,
      deliveryFee: 15.00,
      heritageLevy: 34.60,
      discount: 0,
      total: 741.60
    },
    dispatchStation: 'Dispatch Bay 01 · Carrier Pack #07',
    estimatedDeliveryTime: '45 - 55 mins (Arrival ~19:40 PM)',
    staffNotes: 'Vegetarian clay pots packed in separate green jute carrier.',
    timeline: [
      { time: '18:15 PM', title: 'Food Order Received', description: 'Order paid via Visa Signature', actor: 'System' },
      { time: '18:25 PM', title: 'Vegetarian Pots Prepared', description: 'Dedicated vegetarian claypots simmering', actor: 'Chef Kanchana' }
    ]
  },
  {
    orderId: 'PRN-6582',
    createdAt: 'Oct 06, 2026 · 17:50 PM',
    status: 'dispatched',
    guest: {
      fullName: 'Dr. Ananya Silva',
      email: 'a.silva@postgrad.cmb.ac.lk',
      phone: '+94 76 320 1199',
      fulfillmentType: 'delivery',
      deliveryTime: 'Standard Delivery (~40 mins)',
      specialNotes: 'Leave on verandah table if no answer.',
      dietaryRestrictions: 'Gluten-free charred flatbreads.',
      includeCutlery: false,
      deliveryAddress: {
        street: '14/2 Alfred House Gardens',
        city: 'Colombo 03',
        postalCode: '00300',
        instructions: 'House with brass lamp post.'
      }
    },
    items: [
      {
        id: 'item-1',
        name: 'The Primordial Hearth Degustation Box',
        kicker: '01 / Matale Cured Wild Timber',
        description: '12-hour woodfire smoked curry slow-mineralized in Kelani pots.',
        price: 145.00,
        quantity: 2,
        image: hearthDishImg,
        category: 'Heirloom Curry Feast'
      }
    ],
    payment: {
      method: 'cash_on_delivery'
    },
    pricing: {
      subtotal: 290.00,
      deliveryFee: 15.00,
      heritageLevy: 14.50,
      discount: 0,
      total: 319.50
    },
    dispatchStation: 'Out with Courier Mahesh (Motorbike)',
    estimatedDeliveryTime: 'On the Way (Arrival in ~15 mins)',
    staffNotes: 'Cash on delivery: Collect $319.50 exact change.',
    timeline: [
      { time: '17:50 PM', title: 'Order Received', description: 'Cash on delivery requested', actor: 'System' },
      { time: '18:10 PM', title: 'Pots Packed', description: 'Packed in insulated thermal box', actor: 'Hearth Master' },
      { time: '18:35 PM', title: 'Dispatched for Delivery', description: 'Handed to courier Mahesh', actor: 'Dispatch Station' }
    ]
  },
  {
    orderId: 'PRN-5120',
    createdAt: 'Oct 06, 2026 · 16:30 PM',
    status: 'delivered',
    guest: {
      fullName: 'Marcus Vance & Delegation',
      email: 'm.vance@vanceholding.sg',
      phone: '+65 9123 4819',
      fulfillmentType: 'pickup',
      deliveryTime: 'Hearthside Takeaway Pickup',
      specialNotes: 'Corporate order pickup by executive driver.',
      dietaryRestrictions: 'None.',
      includeCutlery: true,
      deliveryAddress: {
        street: 'Takeaway Pickup at Flagship Hearth',
        city: 'Colombo 07',
        postalCode: '00700',
        instructions: 'Driver parked in front courtyard.'
      }
    },
    items: [
      {
        id: 'item-1',
        name: 'The Primordial Hearth Degustation Box',
        kicker: '01 / Matale Cured Wild Timber',
        description: '12-hour woodfire smoked curry slow-mineralized in Kelani unglazed terracotta pots.',
        price: 145.00,
        quantity: 6,
        image: hearthDishImg,
        category: 'Heirloom Curry Feast'
      },
      {
        id: 'item-2',
        name: 'Wild Cinnamon & Smoked Tamarind Infusion',
        kicker: '02 / Hearth-Brewed Elixir',
        description: 'Slow cold-smoked artisanal elixir.',
        price: 28.00,
        quantity: 6,
        image: infusionImg,
        category: 'Botanical Pairings'
      },
      {
        id: 'item-3',
        name: 'Artisan Kelani Terracotta Hearth Pot',
        kicker: '03 / Handcrafted Keepsake',
        description: 'Porous river-silt clay vessel.',
        price: 45.00,
        quantity: 6,
        image: clayPotImg,
        category: 'Earthenware Crafts'
      }
    ],
    payment: {
      method: 'card',
      cardLast4: '1109',
      cardBrand: 'Amex Centurion'
    },
    pricing: {
      subtotal: 1308.00,
      deliveryFee: 0,
      heritageLevy: 65.40,
      discount: 130.80,
      total: 1242.60
    },
    promoCodeApplied: 'PRANEETHA',
    dispatchStation: 'Hearthside Counter Handover Bay',
    estimatedDeliveryTime: 'Picked up at 17:15 PM',
    staffNotes: 'Corporate takeaway delivered to chauffeur. Keepsake boxes securely packaged.',
    timeline: [
      { time: '16:30 PM', title: 'Takeaway Placed', description: 'Paid via Amex Centurion', actor: 'System' },
      { time: '17:00 PM', title: 'Food Ready', description: '6 clay pots sealed and boxed', actor: 'Chef Somapala' },
      { time: '17:15 PM', title: 'Collected by Driver', description: 'Handover complete', actor: 'Hostess Nayana' }
    ]
  },
  {
    orderId: 'PRN-4308',
    createdAt: 'Oct 06, 2026 · 17:10 PM',
    status: 'delivered',
    guest: {
      fullName: 'Nadeesha Perera',
      email: 'nadeesha.p@archstudio.lk',
      phone: '+94 77 129 0044',
      fulfillmentType: 'delivery',
      deliveryTime: 'Delivered',
      specialNotes: 'Leave with security outpost.',
      dietaryRestrictions: 'Sun-dried chili packed separately.',
      includeCutlery: true,
      deliveryAddress: {
        street: '15 Rosmead Place, Apt 4C',
        city: 'Colombo 07',
        postalCode: '00700',
        instructions: 'Deliver to apartment reception.'
      }
    },
    items: [
      {
        id: 'item-1',
        name: 'The Primordial Hearth Degustation Box',
        kicker: '01 / Matale Cured Wild Timber',
        description: '12-hour woodfire smoked curry slow-mineralized in Kelani pots.',
        price: 145.00,
        quantity: 2,
        image: hearthDishImg,
        category: 'Heirloom Curry Feast'
      },
      {
        id: 'item-3',
        name: 'Artisan Kelani Terracotta Hearth Pot',
        kicker: '03 / Handcrafted Keepsake',
        description: 'Handcrafted keepsake vessel.',
        price: 45.00,
        quantity: 2,
        image: clayPotImg,
        category: 'Earthenware Crafts'
      }
    ],
    payment: {
      method: 'apple_pay'
    },
    pricing: {
      subtotal: 380.00,
      deliveryFee: 15.00,
      heritageLevy: 19.00,
      discount: 38.00,
      total: 376.00
    },
    promoCodeApplied: 'HEARTH10',
    dispatchStation: 'Delivered by Dispatch Courier #03',
    estimatedDeliveryTime: 'Delivered at 18:05 PM',
    staffNotes: 'Delivered to reception safely.',
    timeline: [
      { time: '17:10 PM', title: 'Food Order Placed', description: 'Confirmed via Apple Pay', actor: 'System' },
      { time: '17:35 PM', title: 'Dispatched', description: 'Out with courier', actor: 'Dispatch Station' },
      { time: '18:05 PM', title: 'Delivered', description: 'Package handed to reception', actor: 'Courier' }
    ]
  }
];
