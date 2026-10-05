import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Calendar, 
  MapPin, 
  Flame, 
  QrCode, 
  Share2, 
  ArrowLeft, 
  Clock, 
  Users, 
  Copy, 
  Check,
  Compass,
  Phone
} from 'lucide-react';
import { OrderConfirmationData } from '../types';

interface OrderConfirmationPageProps {
  orderData: OrderConfirmationData;
  onBackToCheckout: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderData,
  onBackToCheckout
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    // Generate .ics download or prompt
    const title = encodeURIComponent(`Praneetha Hearth Dining Ritual - ${orderData.orderId}`);
    const details = encodeURIComponent(
      `Hearth reservation for ${orderData.guest.guestsCount} guests. Slot: ${orderData.seatingTime}. Location: Praneetha Hearth & Clay, Matale Valley Reserve.`
    );
    const location = encodeURIComponent('Praneetha Flagship Hearth, Matale Valley / Colombo');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
    setCalendarAdded(true);
  };

  return (
    <div className="relative pb-24 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link / Top breadcrumb */}
        <div className="mb-6 flex items-center justify-between no-print">
          <button
            onClick={onBackToCheckout}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#a89c8f] hover:text-[#f7efe4] transition-colors py-1 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Checkout / Modify</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1c1611] border border-[#33281e] text-xs text-[#d1c6b8] hover:text-[#f7efe4] hover:border-amber-500/50 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{calendarAdded ? 'Calendar Opened' : 'Add to Calendar'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1c1611] border border-[#33281e] text-xs text-[#d1c6b8] hover:text-[#f7efe4] hover:border-amber-500/50 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print Hearth Pass</span>
            </button>
          </div>
        </div>

        {/* Ritual Confirmation Card Header */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#18130f] via-[#14100c] to-[#0e0b08] border border-[#2e241b] rounded-sm p-8 sm:p-10 shadow-2xl mb-8">
          
          {/* Subtle warm glow background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Animated Flame Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9a3412] to-[#ea580c] p-0.5 mx-auto mb-5 shadow-[0_0_30px_rgba(234,88,12,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#14100c] rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8 text-amber-400 fill-[#ea580c] animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d97706] mb-2 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Reservation Confirmed & Hearth Assigned</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
              THE HEARTH IS PREPARED.
            </h1>

            <p className="mt-3 text-sm text-[#aba093] leading-relaxed">
              We have set aside wild cinnamon timber and native river clay vessels for your arrival. 
              Your table is secured at the ancient hearth.
            </p>

            {/* Order / Reservation ID Pill */}
            <div className="mt-6 inline-flex items-center gap-3 bg-[#1e1712] border border-[#382b20] py-2 px-5 rounded-sm shadow-inner">
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-widest text-[#7a6f62]">
                  Reservation Code
                </span>
                <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                  #{orderData.orderId}
                </span>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="p-1.5 text-[#9e9284] hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Details Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#261e17] text-left">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Seating Time
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{orderData.seatingTime}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Party Size
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>{orderData.guest.guestsCount} Guests Seated</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Hearth Location
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{orderData.hearthNumber}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Payment Status
              </span>
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {orderData.payment.method === 'hearthside' ? 'Settlement at Hearth' : 'Paid in Full'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Digital Hearth Pass Ticket & Itemized Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Hearth Ritual Admission Ticket (Visual boarding pass / dining ticket) */}
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm overflow-hidden shadow-xl">
              <div className="bg-[#1b1510] px-6 py-4 border-b border-[#2b221a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
                  <span className="font-cinzel text-xs tracking-widest uppercase font-bold text-[#f7efe4]">
                    OFFICIAL HEARTH ADMISSION PASS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#d97706] tracking-wider">
                  NIGHTLY RITUAL NO. 04
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#231a14]">
                  {/* Stylized QR Code */}
                  <div className="p-3 bg-white rounded-sm shadow-md flex-shrink-0">
                    <div className="w-28 h-28 bg-[#14100c] p-2 flex flex-col items-center justify-center relative">
                      <QrCode className="w-24 h-24 text-white" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-7 h-7 bg-[#ea580c] rounded-full flex items-center justify-center border-2 border-white">
                          <Flame className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pass Guest Info */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7a6f62]">Guest of Honor</span>
                      <h3 className="font-cinzel text-base font-bold text-[#fcf8f2]">
                        {orderData.guest.fullName}
                      </h3>
                    </div>

                    <div className="text-xs text-[#a3988b] space-y-1">
                      <p>
                        <span className="text-[#6b6053]">Email: </span>
                        {orderData.guest.email}
                      </p>
                      <p>
                        <span className="text-[#6b6053]">Phone: </span>
                        {orderData.guest.phone}
                      </p>
                      {orderData.guest.dietaryRestrictions && (
                        <p className="text-amber-400/90 text-[11px]">
                          <span className="text-[#6b6053]">Notes: </span>
                          {orderData.guest.dietaryRestrictions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Perforation line decorative separator */}
                <div className="relative my-4 flex items-center justify-between">
                  <div className="w-3 h-6 -ml-9 bg-[#0d0b09] rounded-r-full border-r border-[#2b221a]" />
                  <div className="flex-1 border-b border-dashed border-[#33281e] mx-2" />
                  <div className="w-3 h-6 -mr-9 bg-[#0d0b09] rounded-l-full border-l border-[#2b221a]" />
                </div>

                {/* Itemized Order Breakdown */}
                <div className="mt-4">
                  <h4 className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#c7beaf] mb-3">
                    Curated Hearth Selections
                  </h4>

                  <div className="divide-y divide-[#201812]">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden border border-[#2b2118] bg-[#1a140f] flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="font-cinzel font-medium text-[#f5ede3]">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-[#8e8376] font-mono">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono text-[#e5ded4] font-semibold tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="mt-4 pt-4 border-t border-[#231a14] space-y-1.5 text-xs text-[#9e9386]">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-mono text-[#e5ded4]">${orderData.pricing.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Hearth Firewood & Culinary Craft (10%)</span>
                      <span className="font-mono text-[#e5ded4]">${orderData.pricing.serviceFee.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Kelani River Pottery Preservation (5%)</span>
                      <span className="font-mono text-[#e5ded4]">${orderData.pricing.heritageLevy.toFixed(2)}</span>
                    </div>

                    {orderData.pricing.discount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Heritage Voucher Discount ({orderData.promoCodeApplied})</span>
                        <span className="font-mono">-${orderData.pricing.discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#231a14] flex justify-between items-baseline text-sm font-bold text-[#fcf9f2]">
                      <span className="font-cinzel">Total Settled</span>
                      <span className="font-cinzel text-xl text-amber-400 font-mono">
                        ${orderData.pricing.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Special Instructions card if delivery */}
            {orderData.guest.experienceType === 'heirloom_box' && orderData.guest.deliveryAddress && (
              <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-5 shadow-lg">
                <h4 className="font-cinzel text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Heirloom Claypot Delivery Destination</span>
                </h4>
                <p className="text-xs text-[#e0d6cb]">
                  {orderData.guest.deliveryAddress.street}, {orderData.guest.deliveryAddress.city} {orderData.guest.deliveryAddress.postalCode}
                </p>
                {orderData.guest.deliveryAddress.instructions && (
                  <p className="text-[11px] text-[#9c9183] mt-1 italic">
                    Note: "{orderData.guest.deliveryAddress.instructions}"
                  </p>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Nightly Ritual Instructions & Location (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* The 3 Nightly Ritual Protocol Steps matching the Screenshot's Essence */}
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#241c16] pb-3">
                <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
                <h3 className="font-cinzel text-sm font-bold text-[#f7efe4] uppercase tracking-wider">
                  The Nightly Hearth Protocol
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#241a13] border border-amber-900/40 text-amber-400 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h5 className="font-cinzel text-xs font-bold text-[#f5ede3]">
                      Arrival at Dusk Kindle
                    </h5>
                    <p className="text-xs text-[#9c9183] mt-0.5 leading-relaxed">
                      Please arrive 15 minutes before your seating cycle. The cured Matale cinnamon fire is kindled precisely at twilight.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#241a13] border border-amber-900/40 text-amber-400 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h5 className="font-cinzel text-xs font-bold text-[#f5ede3]">
                      Unglazed Earth Etiquette
                    </h5>
                    <p className="text-xs text-[#9c9183] mt-0.5 leading-relaxed">
                      Dishes are served directly in unglazed Kelani clay vessels still radiating natural thermal heat. Handle vessels by their woven rush bases.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#241a13] border border-amber-900/40 text-amber-400 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h5 className="font-cinzel text-xs font-bold text-[#f5ede3]">
                      Fourteen Seated Guests
                    </h5>
                    <p className="text-xs text-[#9c9183] mt-0.5 leading-relaxed">
                      All fourteen counter seats eat in synchrony with the chef's fire intervals, paired with fragrant tamarind elixirs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Concierge Card */}
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-xl space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-[#f7efe4] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Hearth Location & Access</span>
              </h3>

              <div className="p-3.5 bg-[#19130e] border border-[#291f16] rounded text-xs space-y-2">
                <p className="font-semibold text-[#f5ede3]">
                  Praneetha Ancient Hearth Sanctuary
                </p>
                <p className="text-[#9e9386] leading-relaxed">
                  Stone Kiln Pavilion, Matale Ridge & Flagship Hearth Sanctuary, 88 Gregory's Road, Cinnamon Gardens, Colombo 07.
                </p>
                <div className="pt-2 border-t border-[#2a2016] flex items-center gap-2 text-amber-400 text-xs">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hearth Concierge: +94 11 268 9400</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5 no-print">
                <button
                  onClick={onBackToCheckout}
                  className="w-full bg-[#261d16] hover:bg-[#33261c] text-[#f5ede3] border border-[#3d2e21] text-xs font-semibold py-3 px-4 rounded-sm transition-colors text-center"
                >
                  Create Another Hearth Reservation
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Reservation link copied to clipboard!');
                  }}
                  className="w-full bg-transparent hover:bg-[#1a1410] text-[#a89b8d] hover:text-[#f7efe4] border border-[#2a2118] text-xs font-medium py-2.5 px-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Hearth Pass with Guests</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
