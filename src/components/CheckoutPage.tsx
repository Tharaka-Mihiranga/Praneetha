import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  CreditCard, 
  Flame, 
  Plus, 
  Minus, 
  Trash2, 
  Lock, 
  Sparkles,
  MapPin,
  Tag,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { OrderItem, GuestDetails, PaymentDetails, OrderConfirmationData } from '../types';
import hearthHeroImg from '../assets/images/hearth_clay_pots_1791214689063.jpg';

interface CheckoutPageProps {
  items: OrderItem[];
  guest: GuestDetails;
  onUpdateItems: (items: OrderItem[]) => void;
  onUpdateGuest: (guest: GuestDetails) => void;
  onCompleteOrder: (confirmation: OrderConfirmationData) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  guest,
  onUpdateItems,
  onUpdateGuest,
  onCompleteOrder,
}) => {
  // Form states
  const [guestForm, setGuestForm] = useState<GuestDetails>(guest);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'hearthside'>('card');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: 'BINODYA SENANAYAKE',
    expiryDate: '08/28',
    cvv: '849',
    savePaymentInfo: true,
  });

  // Promo code
  const [promoInput, setPromoInput] = useState('HEARTH10');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('HEARTH10');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quantities & Calculations
  const updateQuantity = (id: string, delta: number) => {
    const next = items
      .map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(item => item.quantity > 0);
    onUpdateItems(next);
  };

  const removeItem = (id: string) => {
    onUpdateItems(items.filter(i => i.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.10; // 10% Hearth culinary craftsmanship & cured firewood fee
  const heritageLevy = subtotal * 0.05; // 5% native potters & preservation fund
  const discountRate = appliedPromo === 'HEARTH10' ? 0.10 : appliedPromo === 'PRANEETHA' ? 0.15 : 0;
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal + serviceFee + heritageLevy - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const cleaned = promoInput.trim().toUpperCase();
    if (cleaned === 'HEARTH10' || cleaned === 'PRANEETHA' || cleaned === 'FIRE') {
      setAppliedPromo(cleaned);
    } else {
      setPromoError('Voucher code invalid. Try "HEARTH10" for 10% off.');
    }
  };

  const handleFieldChange = (field: keyof GuestDetails, val: any) => {
    const updated = { ...guestForm, [field]: val };
    setGuestForm(updated);
    onUpdateGuest(updated);
  };

  const handleAddressChange = (field: string, val: string) => {
    const updated = {
      ...guestForm,
      deliveryAddress: {
        street: '',
        city: '',
        postalCode: '',
        instructions: '',
        ...guestForm.deliveryAddress,
        [field]: val,
      }
    };
    setGuestForm(updated);
    onUpdateGuest(updated);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const confirmation: OrderConfirmationData = {
        orderId: `PRN-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'confirmed',
        guest: guestForm,
        items: items,
        payment: {
          method: paymentMethod,
          cardLast4: paymentMethod === 'card' ? '4242' : undefined,
          cardBrand: paymentMethod === 'card' ? 'Mastercard Reserve' : undefined,
        },
        pricing: {
          subtotal,
          serviceFee,
          heritageLevy,
          discount,
          total,
        },
        promoCodeApplied: appliedPromo || undefined,
        hearthNumber: `Hearth Table 04 · Seating for ${guestForm.guestsCount}`,
        seatingTime: guestForm.seatingSlot,
      };

      onCompleteOrder(confirmation);
    }, 900);
  };

  return (
    <div className="relative pb-24">
      {/* Background Hero Scrim & Texture matching reference screenshot */}
      <div className="relative overflow-hidden border-b border-[#251e18] bg-[#0d0b09]">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-luminosity filter blur-[1px]"
          style={{ backgroundImage: `url(${hearthHeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/80 via-[#0d0b09]/95 to-[#0d0b09] pointer-events-none" />

        {/* Hero Title Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d97706] mb-3">
            <Flame className="w-3.5 h-3.5 fill-[#ea580c] text-[#f59e0b]" />
            <span>Hearth Reservation & Tasting Degustation</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbf7f0] leading-[1.15]">
            PRIMITIVE FIRE. <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-[#e28243]">ANCIENT CLAY.</span> <br />
            UNBROKEN TASTE.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#a3998e] max-w-2xl font-light leading-relaxed">
            Reserve your place at the nightly hearth dining ritual or curate your slow-mineralized terracotta claypot feast box delivered fresh from Matale cured embers.
          </p>

          {/* 3 Reference Pillars from the Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-[#15120f]/80 backdrop-blur-md border border-[#2b221a] p-5 rounded-sm hover:border-[#d97706]/40 transition-all">
              <span className="text-[11px] font-mono tracking-wider text-[#d97706] block mb-1">
                01 / PRIMORDIAL FUELS
              </span>
              <h3 className="font-cinzel text-base font-semibold text-[#f5ede3] mb-1.5">
                Wild Cinnamon & Tamarind Timber
              </h3>
              <p className="text-xs text-[#9c9285] leading-relaxed">
                Cured woods gathered from Matale groves deliver resinous smoke notes and steady, incandescent thermal velocity.
              </p>
            </div>

            <div className="bg-[#15120f]/80 backdrop-blur-md border border-[#2b221a] p-5 rounded-sm hover:border-[#d97706]/40 transition-all">
              <span className="text-[11px] font-mono tracking-wider text-[#d97706] block mb-1">
                02 / UNGLAZED EARTH
              </span>
              <h3 className="font-cinzel text-base font-semibold text-[#f5ede3] mb-1.5">
                Kelani River Terracotta Pots
              </h3>
              <p className="text-xs text-[#9c9285] leading-relaxed">
                Porous native river silts mineralize curries over twelve hours, balancing sharp sun-dried chilis with natural earth alkali.
              </p>
            </div>

            <div className="bg-[#15120f]/80 backdrop-blur-md border border-[#2b221a] p-5 rounded-sm hover:border-[#d97706]/40 transition-all">
              <span className="text-[11px] font-mono tracking-wider text-[#d97706] block mb-1">
                03 / NIGHTLY RITUAL
              </span>
              <h3 className="font-cinzel text-base font-semibold text-[#f5ede3] mb-1.5">
                Fourteen Seated Guests Per Hearth
              </h3>
              <p className="text-xs text-[#9c9285] leading-relaxed">
                Two seating cycles strictly synchronized with twilight embers and the late-night southern monsoon breeze.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Checkout Form & Summary Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Guest Information, Experience, Payment (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Experience Type Selector */}
            <div className="bg-[#14110e] border border-[#28211a] rounded-sm p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#261f18] pb-4 mb-6">
                <div>
                  <h2 className="font-cinzel text-lg font-bold text-[#f7efe4] flex items-center gap-2">
                    <span className="text-amber-500 font-mono text-sm">01.</span>
                    Select Experience Ritual
                  </h2>
                  <p className="text-xs text-[#9c9285] mt-0.5">
                    Choose between an in-person hearth seating or curated home delivery.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleFieldChange('experienceType', 'dine_in')}
                  className={`p-4 rounded-sm border text-left transition-all relative ${
                    guestForm.experienceType === 'dine_in'
                      ? 'border-[#ea580c] bg-[#241a13] shadow-[0_0_15px_rgba(234,88,12,0.2)]'
                      : 'border-[#2a221b] bg-[#171310] hover:border-[#42362b]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-sm font-semibold text-[#f5ede3]">
                      Hearth Dining (In-Person)
                    </span>
                    <Flame className={`w-4 h-4 ${guestForm.experienceType === 'dine_in' ? 'text-amber-400' : 'text-[#6b6156]'}`} />
                  </div>
                  <p className="text-xs text-[#9e9488]">
                    Intimate counter seating facing the active woodfire hearth and clay cooking pots.
                  </p>
                  {guestForm.experienceType === 'dine_in' && (
                    <span className="text-[10px] text-amber-500 font-medium mt-2 inline-block">
                      ✓ Reserved seat at counter
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleFieldChange('experienceType', 'heirloom_box')}
                  className={`p-4 rounded-sm border text-left transition-all relative ${
                    guestForm.experienceType === 'heirloom_box'
                      ? 'border-[#ea580c] bg-[#241a13] shadow-[0_0_15px_rgba(234,88,12,0.2)]'
                      : 'border-[#2a221b] bg-[#171310] hover:border-[#42362b]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-sm font-semibold text-[#f5ede3]">
                      Claypot Feast Box (Delivery)
                    </span>
                    <MapPin className={`w-4 h-4 ${guestForm.experienceType === 'heirloom_box' ? 'text-amber-400' : 'text-[#6b6156]'}`} />
                  </div>
                  <p className="text-xs text-[#9e9488]">
                    Delivered warm in sealed native terracotta vessels with charcoal reheating stones.
                  </p>
                  {guestForm.experienceType === 'heirloom_box' && (
                    <span className="text-[10px] text-amber-500 font-medium mt-2 inline-block">
                      ✓ Keepsake clay pots included
                    </span>
                  )}
                </button>
              </div>

              {/* Seating & Timing Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#241c16]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Date
                  </label>
                  <select
                    value={guestForm.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-2.5 rounded-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Tonight, October 5">Tonight, October 5</option>
                    <option value="Tomorrow, October 6">Tomorrow, October 6</option>
                    <option value="Wednesday, October 7">Wednesday, October 7</option>
                    <option value="Thursday, October 8">Thursday, October 8</option>
                    <option value="Friday, October 9">Friday, October 9</option>
                    <option value="Saturday, October 10">Saturday, October 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Seating Cycle
                  </label>
                  <select
                    value={guestForm.seatingSlot}
                    onChange={(e) => handleFieldChange('seatingSlot', e.target.value)}
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-2.5 rounded-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Twilight Embers Seating (19:30 - 22:00)">
                      Twilight Embers (19:30 - 22:00)
                    </option>
                    <option value="Night Breeze Seating (22:15 - 00:30)">
                      Night Breeze (22:15 - 00:30)
                    </option>
                    <option value="Sunset Matale Tasting (17:00 - 19:15)">
                      Sunset Tasting (17:00 - 19:15)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    <Users className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                    Seated Guests
                  </label>
                  <div className="flex items-center border border-[#33281f] bg-[#1c1612] rounded-sm">
                    <button
                      type="button"
                      onClick={() => handleFieldChange('guestsCount', Math.max(1, guestForm.guestsCount - 1))}
                      className="px-3 py-2 text-[#a3988b] hover:text-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="flex-1 text-center text-xs font-semibold text-[#f7efe4] tabular-nums">
                      {guestForm.guestsCount} {guestForm.guestsCount === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('guestsCount', Math.min(14, guestForm.guestsCount + 1))}
                      className="px-3 py-2 text-[#a3988b] hover:text-white transition-colors"
                      title="Maximum 14 guests per hearth cycle"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest & Contact Details */}
            <div className="bg-[#14110e] border border-[#28211a] rounded-sm p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#261f18] pb-4 mb-6">
                <div>
                  <h2 className="font-cinzel text-lg font-bold text-[#f7efe4] flex items-center gap-2">
                    <span className="text-amber-500 font-mono text-sm">02.</span>
                    Guest & Hearth Protocol
                  </h2>
                  <p className="text-xs text-[#9c9285] mt-0.5">
                    Your reservation details and personalized dining preferences.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={guestForm.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="e.g. Binodya Senanayake"
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5246]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={guestForm.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="binodya.s@luxurycuisine.lk"
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5246]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    Mobile Phone <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestForm.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="+94 77 982 4510"
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5246]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                    Dietary Restrictions & Allergies
                  </label>
                  <input
                    type="text"
                    value={guestForm.dietaryRestrictions}
                    onChange={(e) => handleFieldChange('dietaryRestrictions', e.target.value)}
                    placeholder="e.g. Mild spice preference, no shellfish"
                    className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5246]"
                  />
                </div>
              </div>

              {/* Delivery Address fields if Heirloom Box selected */}
              {guestForm.experienceType === 'heirloom_box' && (
                <div className="mt-5 pt-5 border-t border-[#241c16] space-y-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-amber-500">
                    Delivery Address (Colombo Metropolitan)
                  </h3>
                  <div>
                    <label className="block text-xs text-[#b3a89a] mb-1">Street Address</label>
                    <input
                      type="text"
                      value={guestForm.deliveryAddress?.street || ''}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="42 Cinnamon Gardens Boulevard, Suite 5B"
                      className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#b3a89a] mb-1">City / District</label>
                      <input
                        type="text"
                        value={guestForm.deliveryAddress?.city || ''}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="Colombo 07"
                        className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#b3a89a] mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={guestForm.deliveryAddress?.postalCode || ''}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        placeholder="00700"
                        className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Special Requests */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                  Special Hearth Arrangements or Celebration Note
                </label>
                <textarea
                  rows={2}
                  value={guestForm.specialNotes}
                  onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
                  placeholder="e.g. Anniversary celebration, preferred seat facing central clay hearth..."
                  className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5246]"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-[#14110e] border border-[#28211a] rounded-sm p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#261f18] pb-4 mb-6">
                <div>
                  <h2 className="font-cinzel text-lg font-bold text-[#f7efe4] flex items-center gap-2">
                    <span className="text-amber-500 font-mono text-sm">03.</span>
                    Payment & Settlement
                  </h2>
                  <p className="text-xs text-[#9c9285] mt-0.5">
                    Encrypted 256-bit TLS transaction with instant booking confirmation.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure SSL</span>
                </div>
              </div>

              {/* Payment Type Selection Tabs */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#ea580c] bg-[#241a13] text-[#f7efe4]'
                      : 'border-[#2a221b] bg-[#171310] text-[#8e8477] hover:border-[#42362b]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs font-semibold block">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#ea580c] bg-[#241a13] text-[#f7efe4]'
                      : 'border-[#2a221b] bg-[#171310] text-[#8e8477] hover:border-[#42362b]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs font-semibold block">Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('hearthside')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'hearthside'
                      ? 'border-[#ea580c] bg-[#241a13] text-[#f7efe4]'
                      : 'border-[#2a221b] bg-[#171310] text-[#8e8477] hover:border-[#42362b]'
                  }`}
                >
                  <Flame className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs font-semibold block">At Hearth</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Visual Card representation */}
                  <div className="p-5 rounded-md bg-gradient-to-br from-[#241b14] via-[#1c1510] to-[#120e0a] border border-amber-900/40 shadow-inner relative overflow-hidden mb-5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-cinzel text-xs tracking-widest text-amber-400/80 uppercase font-semibold">
                        PRANEETHA HEARTH CARD
                      </span>
                      <div className="w-8 h-5 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-mono text-amber-300">
                        CHIP
                      </div>
                    </div>
                    <div className="font-mono text-sm tracking-widest text-[#f5ede3] mb-4">
                      {paymentDetails.cardNumber}
                    </div>
                    <div className="flex justify-between items-end text-[11px] text-[#a3978a]">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6b6053]">Cardholder</span>
                        <span className="font-medium text-[#e0d6cb] uppercase">{paymentDetails.cardHolder}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6b6053]">Expires</span>
                        <span className="font-mono text-[#e0d6cb]">{paymentDetails.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                        placeholder="MM / YY"
                        className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                        CVV / Security Code
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                        className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#b3a89a] mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardHolder}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                      placeholder="BINODYA SENANAYAKE"
                      className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] p-3 rounded-sm focus:outline-none focus:border-amber-500 uppercase"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-6 bg-[#1a1410] border border-[#33271c] rounded text-center">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#f5ede3]">1-Touch Instant Checkout</p>
                  <p className="text-xs text-[#9c9183] mt-1">
                    Biometric fingerprint or Face ID authentication will initiate when you click Confirm Reservation.
                  </p>
                </div>
              )}

              {paymentMethod === 'hearthside' && (
                <div className="p-6 bg-[#1a1410] border border-[#33271c] rounded text-center">
                  <Flame className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#f5ede3]">Settle at the Primordial Hearth</p>
                  <p className="text-xs text-[#9c9183] mt-1">
                    Pay by Cash, Card, or Hearth Voucher directly to the Chef upon seating. No advance charge today.
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={paymentDetails.savePaymentInfo}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, savePaymentInfo: e.target.checked })}
                  className="rounded bg-[#1c1612] border-[#33281f] text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="saveInfo" className="text-xs text-[#a3988c] cursor-pointer">
                  Save card securely for future hearth reservations & private chef bookings
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Action (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#261f18] pb-4 mb-4">
                <div>
                  <h2 className="font-cinzel text-lg font-bold text-[#f7efe4]">
                    Hearth Order Summary
                  </h2>
                  <span className="text-xs text-[#9c9285]">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} Items Selected
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-500">
                  {guestForm.experienceType === 'dine_in' ? 'TABLE RESERVED' : 'HEARTH DELIVERY'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#231a14] max-h-96 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="py-8 text-center text-[#8e8376] text-xs">
                    Your hearth selection is empty. Please add tasting items.
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 items-start group">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-[#2e241c] bg-[#1a1410]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono tracking-wider text-[#d97706] block">
                          {item.kicker}
                        </span>
                        <h4 className="font-cinzel text-xs font-semibold text-[#f5ede3] truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-[#9c9183] mt-0.5 line-clamp-1">
                          {item.description}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#33281f] bg-[#1c1612] rounded-sm">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-[#a3988b] hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#f7efe4] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-[#a3988b] hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-[#f5ede3] tabular-nums">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[#6b6053] hover:text-rose-400 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <div className="mt-5 pt-4 border-t border-[#261f18]">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#6b6053]" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo voucher (e.g. HEARTH10)"
                      className="w-full bg-[#1c1612] border border-[#33281f] text-xs text-[#f5ede3] pl-9 pr-3 py-2 rounded-sm uppercase tracking-wider font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#2a2017] hover:bg-[#382b20] border border-[#423326] text-xs font-semibold text-[#f5ede3] rounded-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {promoError}
                  </p>
                )}
                {appliedPromo && !promoError && (
                  <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Voucher '{appliedPromo}' applied ({discountRate * 100}% off subtotal)
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-5 pt-4 border-t border-[#261f18] space-y-2 text-xs">
                <div className="flex justify-between text-[#a3988b]">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums font-mono text-[#e5ded4]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#a3988b]">
                  <span className="flex items-center gap-1">
                    Hearth Firewood & Culinary Craft (10%)
                  </span>
                  <span className="tabular-nums font-mono text-[#e5ded4]">${serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#a3988b]">
                  <span>Kelani River Pottery Preservation (5%)</span>
                  <span className="tabular-nums font-mono text-[#e5ded4]">${heritageLevy.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Voucher Discount</span>
                    <span className="tabular-nums font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#261f18] flex justify-between items-baseline">
                  <div>
                    <span className="font-cinzel text-base font-bold text-[#f7efe4] block">
                      Total Amount
                    </span>
                    <span className="text-[10px] text-[#8e8376]">
                      Including all heritage fees & taxes
                    </span>
                  </div>
                  <span className="font-cinzel text-2xl font-bold text-amber-400 tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Primary Order Action Button */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-[#d95b12] to-[#ea701b] hover:from-[#c24c0a] hover:to-[#d85e0e] disabled:opacity-50 text-white font-medium text-xs tracking-[0.16em] uppercase py-3.5 px-6 rounded-sm shadow-[0_0_25px_rgba(234,112,27,0.35)] hover:shadow-[0_0_35px_rgba(234,112,27,0.6)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Flame className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Preparing Your Hearth...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 fill-white text-white" />
                    <span>Confirm Reservation & Place Order</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#7a6f63]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Authentic Woodfire Hearth Experience Guaranteed</span>
              </div>
            </div>

            {/* Chef's Ritual Trust Box */}
            <div className="p-4 bg-[#15120f] border border-[#2b221a] rounded-sm text-xs text-[#9e9386] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-cinzel font-semibold text-xs">
                <Flame className="w-3.5 h-3.5 fill-[#ea580c]" />
                <span>Hearth Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Reservations are held strictly for 15 minutes past dusk kindle. We harvest cured woods specifically for each evening's seated guests.
              </p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};
