import React from 'react';
import { User, Flame, ShoppingBag, ArrowRight, LayoutDashboard } from 'lucide-react';
import { NavigationPage } from '../types';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartItemCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0d0b09]/95 backdrop-blur-md border-b border-[#261f18] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Wordmark (Zone 1) */}
          <div 
            onClick={() => onNavigate('checkout')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Custom stylized flame icon matching the screenshot */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md group-hover:bg-amber-500/40 transition-all"></div>
              <Flame className="w-6 h-6 text-[#f59e0b] fill-[#ea580c] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#f7ede2] group-hover:text-amber-400 transition-colors">
              PRANEETHA
            </span>
          </div>

          {/* Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold tracking-[0.16em] uppercase">
            <button 
              onClick={() => onNavigate('checkout')}
              className={`transition-colors py-1 relative ${
                currentPage === 'checkout' 
                  ? 'text-amber-400' 
                  : 'text-[#9c9388] hover:text-[#f7ede2]'
              }`}
            >
              HOME
              {currentPage === 'checkout' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 transition-colors py-1 relative ${
                currentPage === 'admin'
                  ? 'text-amber-400'
                  : 'text-[#9c9388] hover:text-[#f7ede2]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
              <span>ADMIN & ORDERS</span>
              {currentPage === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 rounded-full"></span>
              )}
            </button>
            <span className="text-[#9c9388] hover:text-[#f7ede2] cursor-pointer transition-colors">
              ABOUT
            </span>
            <span className="text-[#9c9388] hover:text-[#f7ede2] cursor-pointer transition-colors">
              CHEFS
            </span>
            <span className="text-[#9c9388] hover:text-[#f7ede2] cursor-pointer transition-colors">
              MENU
            </span>
            <span className="text-[#9c9388] hover:text-[#f7ede2] cursor-pointer transition-colors">
              CONTACT
            </span>
          </nav>

          {/* Actions & Profile (Zone 3) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate(currentPage === 'checkout' ? 'confirmation' : 'checkout')}
              className="bg-gradient-to-r from-[#d95b12] to-[#ea701b] hover:from-[#c24c0a] hover:to-[#d85e0e] text-white font-medium text-xs tracking-[0.14em] uppercase px-5 py-2.5 rounded-sm shadow-[0_0_20px_rgba(234,112,27,0.35)] hover:shadow-[0_0_28px_rgba(234,112,27,0.55)] transition-all flex items-center gap-2 active:scale-95"
            >
              <span>{currentPage === 'checkout' ? 'ORDER FOOD' : 'NEW ORDER'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Cart Indicator */}
            <button 
              onClick={() => onNavigate('checkout')}
              className="relative p-2 text-[#b8aea2] hover:text-[#f7ede2] transition-colors rounded-full hover:bg-[#1f1914]"
              title="View Cart / Checkout"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ea580c] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile Avatar / Admin switch */}
            <div 
              onClick={() => onNavigate('admin')}
              className="w-9 h-9 rounded-full bg-[#fae3d1] text-[#241c15] flex items-center justify-center font-semibold text-xs shadow-inner cursor-pointer hover:ring-2 hover:ring-amber-500/50 transition-all"
              title="Hearth Host / Admin Console"
            >
              <User className="w-4 h-4 text-[#4a3b2c]" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
