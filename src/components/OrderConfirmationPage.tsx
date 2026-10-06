import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  MapPin, 
  Flame, 
  QrCode, 
  Share2, 
  ArrowLeft, 
  Clock, 
  Copy, 
  Check,
  Bike,
  ShoppingBag,
  Phone,
  PackageCheck
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

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isDelivery = orderData.guest.fulfillmentType === 'delivery';

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
            <span>Return to Menu / Order More</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1c1611] border border-[#33281e] text-xs text-[#d1c6b8] hover:text-[#f7efe4] hover:border-amber-500/50 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print Food Receipt</span>
            </button>
          </div>
        </div>

        {/* Food Order Confirmation Card Header */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#18130f] via-[#14100c] to-[#0e0b08] border border-[#2e241b] rounded-sm p-8 sm:p-10 shadow-2xl mb-8">
          
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
              <span>Food Order Confirmed & Clay Pots Simmering</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
              YOUR FEAST IS KINDLED.
            </h1>

            <p className="mt-3 text-sm text-[#aba093] leading-relaxed">
              Our hearth masters have begun slow-mineralizing your curries in native unglazed terracotta pots over Matale wild timber.
            </p>

            {/* Order Reference Pill */}
            <div className="mt-6 inline-flex items-center gap-3 bg-[#1e1712] border border-[#382b20] py-2 px-5 rounded-sm shadow-inner">
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-widest text-[#7a6f62]">
                  Order Number
                </span>
                <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                  #{orderData.orderId}
                </span>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="p-1.5 text-[#9e9284] hover:text-white transition-colors"
                title="Copy order code"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#261e17] text-left">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Estimated Timing
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{orderData.estimatedDeliveryTime}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Fulfillment
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                {isDelivery ? <Bike className="w-3.5 h-3.5 text-amber-500" /> : <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />}
                <span>{isDelivery ? 'Doorstep Delivery' : 'Takeaway Pickup'}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Kitchen Station
              </span>
              <div className="text-xs font-semibold text-[#f5ede3] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{orderData.dispatchStation}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#7a6f62] mb-1">
                Payment Status
              </span>
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {orderData.payment.method === 'cash_on_delivery' ? 'Cash on Delivery' : 'Paid Online'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Kitchen Preparation Stepper */}
        <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-xl mb-8">
          <div className="flex items-center gap-2 mb-4 border-b border-[#241c16] pb-3">
            <PackageCheck className="w-4 h-4 text-amber-500" />
            <h3 className="font-cinzel text-xs font-bold text-[#f7efe4] uppercase tracking-wider">
              Live Woodfire Kitchen Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#1f1711] border border-[#382b20] rounded-sm text-amber-400">
              <span className="block text-[10px] font-mono text-[#8c8172]">STAGE 01</span>
              <strong className="block font-medium mt-0.5">Order Received ✓</strong>
              <span className="text-[11px] text-[#a3988b]">Spices ground on stone slab</span>
            </div>
            <div className="p-3 bg-[#241a13] border border-amber-600/60 rounded-sm text-amber-300">
              <span className="block text-[10px] font-mono text-amber-500">STAGE 02 · CURRENT</span>
              <strong className="block font-medium mt-0.5">Clay Pots Simmering</strong>
              <span className="text-[11px] text-[#a3988b]">Wild cinnamon woodfire stoking</span>
            </div>
            <div className="p-3 bg-[#16120f] border border-[#261e17] rounded-sm text-[#73675a]">
              <span className="block text-[10px] font-mono">STAGE 03</span>
              <strong className="block font-medium mt-0.5">Insulated Packaging</strong>
              <span className="text-[11px] text-[#63574a]">Packed with heated river stones</span>
            </div>
            <div className="p-3 bg-[#16120f] border border-[#261e17] rounded-sm text-[#73675a]">
              <span className="block text-[10px] font-mono">STAGE 04</span>
              <strong className="block font-medium mt-0.5">{isDelivery ? 'Out for Delivery' : 'Ready for Pickup'}</strong>
              <span className="text-[11px] text-[#63574a]">{isDelivery ? 'Dispatched with courier' : 'Waiting at counter'}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Food Receipt & Dishes (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm overflow-hidden shadow-xl">
              <div className="bg-[#1b1510] px-6 py-4 border-b border-[#2b221a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
                  <span className="font-cinzel text-xs tracking-widest uppercase font-bold text-[#f7efe4]">
                    OFFICIAL HEARTH FOOD RECEIPT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#d97706] tracking-wider">
                  DISPATCH PACK NO. 04
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#231a14]">
                  {/* Stylized QR Code */}
                  <div className="p-3 bg-white rounded-sm shadow-md flex-shrink-0">
                    <div className="w-24 h-24 bg-[#14100c] p-1.5 flex flex-col items-center justify-center relative">
                      <QrCode className="w-20 h-20 text-white" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-6 h-6 bg-[#ea580c] rounded-full flex items-center justify-center border-2 border-white">
                          <Flame className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7a6f62]">Customer</span>
                      <h3 className="font-cinzel text-base font-bold text-[#fcf8f2]">
                        {orderData.guest.fullName}
                      </h3>
                    </div>

                    <div className="text-xs text-[#a3988b] space-y-1">
                      <p>
                        <span className="text-[#6b6053]">Contact: </span>
                        {orderData.guest.phone}
                      </p>
                      <p>
                        <span className="text-[#6b6053]">Email: </span>
                        {orderData.guest.email}
                      </p>
                      {orderData.guest.dietaryRestrictions && (
                        <p className="text-amber-400/90 text-[11px]">
                          <span className="text-[#6b6053]">Spice & Dietary: </span>
                          {orderData.guest.dietaryRestrictions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Perforation line */}
                <div className="relative my-4 flex items-center justify-between">
                  <div className="w-3 h-6 -ml-9 bg-[#0d0b09] rounded-r-full border-r border-[#2b221a]" />
                  <div className="flex-1 border-b border-dashed border-[#33281e] mx-2" />
                  <div className="w-3 h-6 -mr-9 bg-[#0d0b09] rounded-l-full border-l border-[#2b221a]" />
                </div>

                {/* Itemized Dishes Breakdown */}
                <div className="mt-4">
                  <h4 className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#c7beaf] mb-3">
                    Curated Hearth Dishes
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

                  {/* Pricing Breakdown */}
                  <div className="mt-4 pt-4 border-t border-[#231a14] space-y-1.5 text-xs text-[#9e9386]">
                    <div className="flex justify-between">
                      <span>Dishes Subtotal</span>
                      <span className="font-mono text-[#e5ded4]">${orderData.pricing.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Insulated Thermal Delivery</span>
                      <span className="font-mono text-[#e5ded4]">
                        {orderData.pricing.deliveryFee > 0 ? `$${orderData.pricing.deliveryFee.toFixed(2)}` : 'FREE (Pickup)'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Kelani Pottery Fund (5%)</span>
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

          </div>

          {/* Right Column: Delivery Destination & Reheating Instructions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Destination Card */}
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-xl space-y-3">
              <h3 className="font-cinzel text-sm font-bold text-[#f7efe4] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{isDelivery ? 'Delivery Destination' : 'Pickup Location'}</span>
              </h3>

              {isDelivery ? (
                <div className="p-3.5 bg-[#19130e] border border-[#291f16] rounded text-xs space-y-1.5">
                  <p className="font-semibold text-[#f5ede3]">
                    {orderData.guest.deliveryAddress.street}
                  </p>
                  <p className="text-[#9e9386]">
                    {orderData.guest.deliveryAddress.city} {orderData.guest.deliveryAddress.postalCode}
                  </p>
                  {orderData.guest.deliveryAddress.instructions && (
                    <p className="text-[11px] text-amber-400/90 italic pt-1 border-t border-[#2a2016]">
                      "{orderData.guest.deliveryAddress.instructions}"
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-3.5 bg-[#19130e] border border-[#291f16] rounded text-xs space-y-1.5">
                  <p className="font-semibold text-[#f5ede3]">Praneetha Flagship Hearth Kitchen</p>
                  <p className="text-[#9e9386]">88 Gregory's Road, Cinnamon Gardens, Colombo 07</p>
                  <p className="text-[11px] text-amber-400">Present code #{orderData.orderId} at the pickup counter.</p>
                </div>
              )}

              <div className="pt-2 border-t border-[#241c16] flex items-center gap-2 text-amber-400 text-xs">
                <Phone className="w-3.5 h-3.5" />
                <span>Kitchen Dispatch Desk: +94 11 268 9400</span>
              </div>
            </div>

            {/* Reheating & Earthenware Protocol */}
            <div className="bg-[#14110e] border border-[#2b221a] rounded-sm p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2 border-b border-[#241c16] pb-3">
                <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
                <h3 className="font-cinzel text-xs font-bold text-[#f7efe4] uppercase tracking-wider">
                  Clay Pot Enjoyment Guide
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#9c9183] leading-relaxed">
                <p>
                  <strong className="text-[#e5ded4] block">1. Thermal Stones:</strong>
                  Your carrier contains heated char-river stones. Leave pots nestled in the bag until ready to serve.
                </p>
                <p>
                  <strong className="text-[#e5ded4] block">2. Unglazed Earthenware:</strong>
                  Do not place unglazed pots in microwave ovens. If needed, reheat gently over low stovetop flame.
                </p>
              </div>

              <div className="pt-3 no-print">
                <button
                  onClick={onBackToCheckout}
                  className="w-full bg-[#261d16] hover:bg-[#33261c] text-[#f5ede3] border border-[#3d2e21] text-xs font-semibold py-3 px-4 rounded-sm transition-colors text-center block"
                >
                  Place Another Food Order
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
