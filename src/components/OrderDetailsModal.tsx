import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  User, 
  UtensilsCrossed, 
  Bike,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { OrderConfirmationData, OrderStatus } from '../types';

interface OrderDetailsModalProps {
  order: OrderConfirmationData | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateTable: (orderId: string, newStation: string) => void;
  onUpdateStaffNotes: (orderId: string, notes: string) => void;
}

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'received', label: 'Order Received', color: 'bg-amber-950/60 text-amber-400 border-amber-800/80' },
  { value: 'simmering', label: 'Claypot Simmering', color: 'bg-orange-950/60 text-orange-400 border-orange-800/80' },
  { value: 'dispatched', label: 'Dispatched for Delivery', color: 'bg-blue-950/60 text-blue-400 border-blue-800/80' },
  { value: 'delivered', label: 'Delivered / Handed Over', color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-rose-950/60 text-rose-400 border-rose-800/80' },
];

const stationOptions = [
  'Dispatch Bay 01 · Carrier Pack #07',
  'Dispatch Bay 02 · Heated Courier Carrier',
  'Dispatch Bay 03 · Express Moto Dispatch',
  'Hearthside Counter Handover Bay',
];

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
  onUpdateTable,
  onUpdateStaffNotes,
}) => {
  if (!order) return null;

  const [notes, setNotes] = useState(order.staffNotes || '');
  const [isSavedNotes, setIsSavedNotes] = useState(false);

  const handleSaveNotes = () => {
    onUpdateStaffNotes(order.orderId, notes);
    setIsSavedNotes(true);
    setTimeout(() => setIsSavedNotes(false), 2000);
  };

  const currentStatusObj = statusOptions.find(s => s.value === order.status) || statusOptions[0];
  const isDelivery = order.guest.fulfillmentType === 'delivery';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#14110e] border border-[#2e241b] rounded-sm shadow-2xl overflow-hidden my-8 text-[#e5ded4]">
        
        {/* Modal Top Header */}
        <div className="bg-[#1c1611] px-6 py-4 border-b border-[#2a2119] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
              <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg font-bold text-[#f7efe4] tracking-wide">
                  Food Order · #{order.orderId}
                </h2>
                <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded border ${currentStatusObj.color}`}>
                  {currentStatusObj.label}
                </span>
              </div>
              <span className="text-xs text-[#8c8172]">
                Placed {order.createdAt}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#241a13] hover:bg-[#302319] border border-[#382b20] text-xs text-[#d1c6b8] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print Kitchen Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#8c8172] hover:text-white hover:bg-[#251d16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column (7 cols): Customer & Dishes */}
          <div className="md:col-span-7 space-y-6">

            {/* Customer Details */}
            <div className="bg-[#191410] border border-[#2b2118] p-4 rounded-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#261e17] pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Customer Information
                </span>
                <span className="text-xs font-mono text-[#a89d90] flex items-center gap-1">
                  {isDelivery ? <Bike className="w-3.5 h-3.5 text-amber-500" /> : <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />}
                  {isDelivery ? 'Doorstep Delivery' : 'Takeaway Pickup'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#6b6053] block">Full Name</span>
                  <span className="font-semibold text-[#f5ede3]">{order.guest.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#6b6053] block">Mobile Phone</span>
                  <span className="font-mono text-[#e5ded4]">{order.guest.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-[#6b6053] block">Email</span>
                  <span className="text-[#a3988b]">{order.guest.email}</span>
                </div>
              </div>

              {/* Delivery Address */}
              {isDelivery ? (
                <div className="pt-2 border-t border-[#261e17] text-xs">
                  <span className="text-[10px] uppercase text-amber-500 font-semibold block mb-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Delivery Destination:
                  </span>
                  <p className="text-[#e0d6cb] font-medium">
                    {order.guest.deliveryAddress.street}, {order.guest.deliveryAddress.city} {order.guest.deliveryAddress.postalCode}
                  </p>
                  {order.guest.deliveryAddress.instructions && (
                    <p className="text-[11px] text-[#8c8172] italic mt-0.5">
                      Drop-off: "{order.guest.deliveryAddress.instructions}"
                    </p>
                  )}
                </div>
              ) : (
                <div className="pt-2 border-t border-[#261e17] text-xs">
                  <span className="text-[10px] uppercase text-amber-500 font-semibold block mb-0.5">
                    Pickup Location:
                  </span>
                  <p className="text-[#e0d6cb]">Flagship Hearth Kitchen, Colombo 07</p>
                </div>
              )}

              {/* Dietary notes */}
              {order.guest.dietaryRestrictions && (
                <div className="p-2 bg-amber-950/20 border border-amber-900/40 rounded text-amber-300 text-[11px]">
                  <span className="font-semibold uppercase tracking-wider text-[10px] block text-amber-400">Dietary & Spice Alert:</span>
                  {order.guest.dietaryRestrictions}
                </div>
              )}
            </div>

            {/* Dishes Breakdown */}
            <div className="bg-[#191410] border border-[#2b2118] p-4 rounded-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#261e17] pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Curated Food Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)} Dishes)
                </span>
              </div>

              <div className="divide-y divide-[#241c15] text-xs">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden border border-[#2d2218] bg-[#14100c] flex-shrink-0">
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
                        <div className="text-[10px] font-mono text-[#8c8172]">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                          {item.potType && <span className="ml-2 text-amber-500/80">· {item.potType}</span>}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[#e5ded4] font-semibold tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-3 border-t border-[#261e17] space-y-1 text-xs text-[#9e9386]">
                <div className="flex justify-between">
                  <span>Dishes Subtotal</span>
                  <span className="font-mono text-[#e5ded4]">${order.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insulated Thermal Delivery</span>
                  <span className="font-mono text-[#e5ded4]">
                    {order.pricing.deliveryFee > 0 ? `$${order.pricing.deliveryFee.toFixed(2)}` : 'FREE (Pickup)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pottery Fund (5%)</span>
                  <span className="font-mono text-[#e5ded4]">${order.pricing.heritageLevy.toFixed(2)}</span>
                </div>
                {order.pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount ({order.promoCodeApplied})</span>
                    <span className="font-mono">-${order.pricing.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#261e17] flex justify-between font-bold text-sm text-[#fcf9f2]">
                  <span className="font-cinzel">Total Settled</span>
                  <span className="font-cinzel text-amber-400 tabular-nums">
                    ${order.pricing.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Operational Controls */}
          <div className="md:col-span-5 space-y-6">

            {/* Status Control */}
            <div className="bg-[#191410] border border-[#2b2118] p-4 rounded-sm space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold block">
                Update Food Order Status
              </span>

              <div className="space-y-1.5">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateStatus(order.orderId, opt.value)}
                    className={`px-3 py-2 text-xs rounded border text-left flex items-center justify-between transition-colors w-full ${
                      order.status === opt.value
                        ? `${opt.color} font-bold ring-1 ring-amber-500/50`
                        : 'bg-[#14100c] border-[#291f17] text-[#8c8172] hover:text-[#e5ded4]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {order.status === opt.value && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>

              {/* Station Selection */}
              <div className="mt-4 pt-3 border-t border-[#261e17] space-y-1.5">
                <label className="block text-xs text-[#a89d90]">Dispatch Station / Courier Bay:</label>
                <select
                  value={order.dispatchStation}
                  onChange={(e) => onUpdateTable(order.orderId, e.target.value)}
                  className="w-full bg-[#14100c] border border-[#33281f] text-xs text-[#f5ede3] p-2.5 rounded-sm focus:outline-none focus:border-amber-500"
                >
                  {stationOptions.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-[#191410] border border-[#2b2118] p-4 rounded-sm space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold block">
                Payment Verification
              </span>
              <div className="flex items-center justify-between">
                <span className="text-[#8c8172]">Method:</span>
                <span className="font-semibold text-[#f5ede3] uppercase">
                  {order.payment.method === 'card' ? `Card (•••• ${order.payment.cardLast4 || '4242'})` : order.payment.method === 'apple_pay' ? 'Apple Pay' : 'Cash on Delivery'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8c8172]">Settlement:</span>
                <span className={`font-semibold ${order.payment.method === 'cash_on_delivery' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {order.payment.method === 'cash_on_delivery' ? 'Collect at Doorstep' : 'Captured Online'}
                </span>
              </div>
            </div>

            {/* Kitchen & Courier Notes */}
            <div className="bg-[#191410] border border-[#2b2118] p-4 rounded-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold">
                  Kitchen & Courier Dispatch Notes
                </span>
                {isSavedNotes && (
                  <span className="text-[10px] text-emerald-400 font-mono">Saved ✓</span>
                )}
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instructions for food packing, courier route, or spice blend..."
                className="w-full bg-[#14100c] border border-[#33281f] text-xs text-[#f5ede3] p-2.5 rounded-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="w-full py-2 bg-[#261d16] hover:bg-[#33261c] border border-[#3d2e21] text-xs font-semibold text-[#f5ede3] rounded-sm transition-colors"
              >
                Save Dispatch Note
              </button>
            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#1c1611] px-6 py-3.5 border-t border-[#2a2119] flex items-center justify-between text-xs">
          <div className="text-[#8c8172]">
            <span>Order Reference: </span>
            <span className="font-mono text-amber-400 font-semibold">#{order.orderId}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#251d16] hover:bg-[#30261e] border border-[#382b20] text-xs text-[#d1c6b8] rounded-sm transition-colors"
            >
              Close
            </button>
            {order.status !== 'delivered' && (
              <button
                onClick={() => {
                  const nextStatus: OrderStatus = 
                    order.status === 'received' ? 'simmering' : 
                    order.status === 'simmering' ? 'dispatched' : 'delivered';
                  onUpdateStatus(order.orderId, nextStatus);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#d95b12] to-[#ea701b] hover:from-[#c24c0a] hover:to-[#d85e0e] text-white font-medium text-xs rounded-sm shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Advance to {order.status === 'received' ? 'Simmering' : order.status === 'simmering' ? 'Dispatched' : 'Delivered'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
