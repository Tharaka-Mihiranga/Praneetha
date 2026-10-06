import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  Printer, 
  Plus, 
  AlertCircle, 
  Bike, 
  ShoppingBag, 
  Clock 
} from 'lucide-react';
import { OrderConfirmationData, OrderStatus } from '../types';

interface OrderManagementProps {
  orders: OrderConfirmationData[];
  onSelectOrder: (order: OrderConfirmationData) => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onNewReservation: () => void;
}

const statusConfig: Record<OrderStatus, { label: string; badgeClass: string }> = {
  received: { label: 'Received', badgeClass: 'bg-amber-950/70 text-amber-300 border-amber-800/80' },
  simmering: { label: 'Simmering', badgeClass: 'bg-orange-950/70 text-orange-300 border-orange-800/80' },
  dispatched: { label: 'Dispatched', badgeClass: 'bg-blue-950/70 text-blue-300 border-blue-800/80' },
  delivered: { label: 'Delivered', badgeClass: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80' },
  cancelled: { label: 'Cancelled', badgeClass: 'bg-rose-950/70 text-rose-300 border-rose-800/80' },
};

export const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  onSelectOrder,
  onUpdateStatus,
  onNewReservation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<'all' | 'delivery' | 'pickup'>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.guest.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.guest.phone.includes(searchQuery) ||
        order.guest.deliveryAddress.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.dispatchStation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesFulfillment = fulfillmentFilter === 'all' || order.guest.fulfillmentType === fulfillmentFilter;

      return matchesSearch && matchesStatus && matchesFulfillment;
    });
  }, [orders, searchQuery, statusFilter, fulfillmentFilter]);

  const totalFilteredRevenue = filteredOrders.reduce((sum, o) => sum + o.pricing.total, 0);

  const exportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Fulfillment', 'Address', 'Dishes Count', 'Status', 'Total'];
    const rows = filteredOrders.map(o => [
      o.orderId,
      o.createdAt,
      `"${o.guest.fullName}"`,
      o.guest.phone,
      o.guest.fulfillmentType,
      `"${o.guest.deliveryAddress.street}, ${o.guest.deliveryAddress.city}"`,
      o.items.reduce((acc, i) => acc + i.quantity, 0),
      o.status,
      o.pricing.total.toFixed(2)
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `praneetha_food_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#73675a]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, Customer, Phone, Street..."
            className="w-full bg-[#16120e] border border-[#2e2319] text-xs text-[#f5ede3] pl-9 pr-4 py-2.5 rounded-sm focus:outline-none focus:border-amber-500 placeholder:text-[#5c5042]"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-[#1c1611] hover:bg-[#261f18] border border-[#33281e] text-xs font-medium text-[#d1c6b8] rounded-sm transition-colors flex items-center gap-1.5"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onNewReservation}
            className="px-4 py-2 bg-gradient-to-r from-[#d95b12] to-[#ea701b] hover:from-[#c24c0a] hover:to-[#d85e0e] text-white font-medium text-xs tracking-wider uppercase rounded-sm shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Food Order</span>
          </button>
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#14110e] border border-[#2b2118] p-3 rounded-sm">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] uppercase tracking-wider text-[#73675a] mr-2 font-mono">
            Status:
          </span>
          {(['all', 'received', 'simmering', 'dispatched', 'delivered', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                statusFilter === st
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'text-[#9c9183] hover:text-[#f7efe4] hover:bg-[#201913]'
              }`}
            >
              {st === 'all' ? 'All Orders' : statusConfig[st].label}
              <span className="ml-1 text-[10px] opacity-75 tabular-nums">
                ({st === 'all' ? orders.length : orders.filter(o => o.status === st).length})
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#73675a] uppercase font-mono text-[11px]">Fulfillment:</span>
          <select
            value={fulfillmentFilter}
            onChange={(e) => setFulfillmentFilter(e.target.value as any)}
            className="bg-[#1c1611] border border-[#33281e] text-xs text-[#f5ede3] py-1 px-2.5 rounded-sm focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Methods</option>
            <option value="delivery">Doorstep Delivery</option>
            <option value="pickup">Takeaway Pickup</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="flex items-center justify-between text-xs text-[#8c8172] px-1">
        <div>
          Showing <span className="text-[#f5ede3] font-semibold font-mono tabular-nums">{filteredOrders.length}</span> of <span className="font-mono tabular-nums">{orders.length}</span> food orders
        </div>
        <div>
          Filtered Sales: <strong className="text-amber-400 font-mono tabular-nums">${totalFilteredRevenue.toFixed(2)}</strong>
        </div>
      </div>

      {/* Food Orders Data Grid */}
      <div className="bg-[#14110e] border border-[#2b2118] rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1a1410] text-[#8c8172] uppercase font-mono text-[10px] tracking-wider border-b border-[#281f17]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4">Destination / Station</th>
                <th className="py-3 px-4 text-center">Dishes</th>
                <th className="py-3 px-4">Kitchen Status</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#221a14] text-[#d5cdc3]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#73675a]">
                    <div className="max-w-xs mx-auto space-y-2">
                      <AlertCircle className="w-8 h-8 mx-auto text-amber-500/60" />
                      <p className="text-sm font-semibold text-[#e5ded4]">No matching food orders found</p>
                      <button
                        onClick={() => { setSearchQuery(''); setStatusFilter('all'); setFulfillmentFilter('all'); }}
                        className="mt-2 px-3 py-1.5 bg-[#201913] hover:bg-[#2b221a] text-amber-400 text-xs rounded border border-[#382b20]"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo = statusConfig[order.status];
                  const isDelivery = order.guest.fulfillmentType === 'delivery';
                  const dishCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

                  return (
                    <tr 
                      key={order.orderId}
                      className="hover:bg-[#1a1511] transition-colors group cursor-pointer"
                      onClick={() => onSelectOrder(order)}
                    >
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-amber-400 group-hover:underline">
                          #{order.orderId}
                        </span>
                        <span className="block text-[10px] text-[#73675a] font-normal">
                          {order.createdAt}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#f7efe4] font-cinzel">
                          {order.guest.fullName}
                        </div>
                        <div className="text-[11px] text-[#8c8172]">
                          {order.guest.phone}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#e5ded4]">
                          {isDelivery ? <Bike className="w-3.5 h-3.5 text-amber-500" /> : <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />}
                          {isDelivery ? 'Delivery' : 'Pickup'}
                        </span>
                        <span className="text-[10px] text-[#8c8172] block">
                          {order.estimatedDeliveryTime}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-xs text-[#cfc5b8] block truncate max-w-[200px]">
                          {isDelivery ? `${order.guest.deliveryAddress.street}, ${order.guest.deliveryAddress.city}` : 'Flagship Counter Pickup'}
                        </span>
                        <span className="text-[10px] text-amber-500/80 font-mono">
                          {order.dispatchStation}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-amber-400">
                        {dishCount}
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.orderId, e.target.value as OrderStatus)}
                          className={`text-[11px] font-mono px-2 py-1 rounded border focus:outline-none ${statusInfo.badgeClass}`}
                        >
                          <option value="received">Received</option>
                          <option value="simmering">Simmering</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#f5ede3] tabular-nums">
                        ${order.pricing.total.toFixed(2)}
                        <span className="block text-[10px] font-normal text-[#73675a] uppercase">
                          {order.payment.method === 'cash_on_delivery' ? 'COD' : 'Paid'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectOrder(order)}
                            className="p-1.5 text-[#8c8172] hover:text-amber-400 hover:bg-[#261e17] rounded transition-colors"
                            title="View Full Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              onSelectOrder(order);
                              setTimeout(() => window.print(), 200);
                            }}
                            className="p-1.5 text-[#8c8172] hover:text-amber-400 hover:bg-[#261e17] rounded transition-colors"
                            title="Print Kitchen Slip"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
