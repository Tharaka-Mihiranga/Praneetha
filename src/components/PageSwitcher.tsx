import React from 'react';
import { CreditCard, CheckCircle2, RefreshCw } from 'lucide-react';

interface PageSwitcherProps {
  currentPage: 'checkout' | 'confirmation';
  onSelectPage: (page: 'checkout' | 'confirmation') => void;
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                currentPage === 'checkout'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Page 1: Checkout Page</span>
            </button>
            <button
              onClick={() => onSelectPage('confirmation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                currentPage === 'confirmation'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Page 2: Order Confirmation</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#8c8275]">
          <span className="hidden sm:inline-block">
            {currentPage === 'checkout' 
              ? 'Fill details below or click Reserve to confirm order' 
              : 'Reservation confirmed & Hearth ticket issued'}
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
