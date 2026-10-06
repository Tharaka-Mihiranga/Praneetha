import React from 'react';
import { CreditCard, CheckCircle2, LayoutDashboard, RefreshCw } from 'lucide-react';
import { NavigationPage } from '../types';

interface PageSwitcherProps {
  currentPage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
  onResetDefaults: () => void;
}

export const PageSwitcher: React.FC<PageSwitcherProps> = ({
  currentPage,
  onSelectPage,
  onResetDefaults
}) => {
  return (
    <div className="bg-[#14100c] border-b border-[#2a221a] py-2 px-4 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#8e8578] uppercase tracking-wider font-medium text-[11px]">
            Navigation View:
          </span>
          <div className="inline-flex rounded-md p-0.5 bg-[#1e1711] border border-[#332920]">
            <button
              onClick={() => onSelectPage('checkout')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                currentPage === 'checkout'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Page 1: Checkout</span>
            </button>
            <button
              onClick={() => onSelectPage('confirmation')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                currentPage === 'confirmation'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Page 2: Confirmation</span>
            </button>
            <button
              onClick={() => onSelectPage('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                currentPage === 'admin'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Page 3: Admin Dashboard</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#8c8275]">
          <span className="hidden sm:inline-block">
            {currentPage === 'checkout' 
              ? 'Fill details below or click Reserve to confirm order' 
              : currentPage === 'confirmation'
              ? 'Reservation confirmed & Hearth ticket issued'
              : 'Live Hearth operations, orders table & inventory'}
          </span>
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-amber-500/80 hover:text-amber-400 transition-colors text-[11px]"
            title="Reset to default sample order"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Sample Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
