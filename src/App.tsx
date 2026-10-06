/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PageSwitcher } from './components/PageSwitcher';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  initialOrderItems, 
  defaultCustomerDetails, 
  sampleOrderConfirmation,
  initialOrdersList
} from './data/menuData';
import { OrderItem, CustomerDetails, OrderConfirmationData, OrderStatus, NavigationPage } from './types';
import { Flame } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('checkout');
  const [items, setItems] = useState<OrderItem[]>(initialOrderItems);
  const [guest, setGuest] = useState<CustomerDetails>(defaultCustomerDetails);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmationData>(sampleOrderConfirmation);
  const [ordersList, setOrdersList] = useState<OrderConfirmationData[]>(initialOrdersList);

  const handleCompleteOrder = (confirmation: OrderConfirmationData) => {
    setOrderConfirmation(confirmation);
    // Prepend newly placed order into admin order management list
    setOrdersList(prev => [confirmation, ...prev]);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList(prev => prev.map(o => {
      if (o.orderId === orderId) {
        const updatedTimeline = [
          ...(o.timeline || []),
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            title: `Status: ${newStatus.toUpperCase()}`,
            description: `Kitchen status updated in admin console`,
            actor: 'Kitchen Dispatch Desk'
          }
        ];
        return { ...o, status: newStatus, timeline: updatedTimeline };
      }
      return o;
    }));

    if (orderConfirmation.orderId === orderId) {
      setOrderConfirmation(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleUpdateOrderStation = (orderId: string, newStation: string) => {
    setOrdersList(prev => prev.map(o => o.orderId === orderId ? { ...o, dispatchStation: newStation } : o));
    if (orderConfirmation.orderId === orderId) {
      setOrderConfirmation(prev => ({ ...prev, dispatchStation: newStation }));
    }
  };

  const handleUpdateStaffNotes = (orderId: string, notes: string) => {
    setOrdersList(prev => prev.map(o => o.orderId === orderId ? { ...o, staffNotes: notes } : o));
    if (orderConfirmation.orderId === orderId) {
      setOrderConfirmation(prev => ({ ...prev, staffNotes: notes }));
    }
  };

  const handleResetDefaults = () => {
    setItems(initialOrderItems);
    setGuest(defaultCustomerDetails);
    setOrderConfirmation(sampleOrderConfirmation);
    setOrdersList(initialOrdersList);
  };

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0b09] text-[#e5ded4] flex flex-col font-sans-clean antialiased selection:bg-[#e26d24]/30 selection:text-[#fbe0c9]">
      
      {/* Visual Page Switcher for user testing & reviewing all 3 views */}
      <PageSwitcher
        currentPage={currentPage}
        onSelectPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResetDefaults={handleResetDefaults}
      />

      {/* Main Top Navigation (Identical to reference screenshot) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartItemCount={totalCartCount}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'checkout' && (
          <CheckoutPage
            items={items}
            guest={guest}
            onUpdateItems={setItems}
            onUpdateGuest={setGuest}
            onCompleteOrder={handleCompleteOrder}
          />
        )}

        {currentPage === 'confirmation' && (
          <OrderConfirmationPage
            orderData={orderConfirmation}
            onBackToCheckout={() => {
              setCurrentPage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            orders={ordersList}
            onUpdateStatus={handleUpdateOrderStatus}
            onUpdateTable={handleUpdateOrderStation}
            onUpdateStaffNotes={handleUpdateStaffNotes}
            onNewReservation={() => {
              setCurrentPage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Luxury Culinary Brand Footer */}
      <footer className="bg-[#090806] border-t border-[#1e1813] py-12 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
            </div>
            <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-[#f7efe4]">
              PRANEETHA
            </span>
            <span className="text-xs text-[#73685b] border-l border-[#2e241c] pl-3 ml-1 font-editorial italic">
              Primitive Fire · Ancient Clay · Unbroken Taste
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8c8172]">
            <button 
              onClick={() => {
                setCurrentPage('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Checkout
            </button>
            <button 
              onClick={() => {
                setCurrentPage('confirmation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Confirmation
            </button>
            <button 
              onClick={() => {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors font-medium text-amber-500/90"
            >
              Admin Dashboard
            </button>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              Heirloom Potters Guild
            </span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              Hearth Concierge
            </span>
          </div>

          <p className="text-[11px] text-[#63594e]">
            © {new Date().getFullYear()} Praneetha Hearth & Clay. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
