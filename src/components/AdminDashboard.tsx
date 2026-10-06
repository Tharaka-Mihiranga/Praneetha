import React, { useState } from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  BarChart3, 
  ListOrdered, 
  ChevronRight,
  ShieldCheck,
  Bike,
  Package,
  Layers
} from 'lucide-react';
import { OrderConfirmationData, OrderStatus, AdminSubTab } from '../types';
import { OrderManagement } from './OrderManagement';
import { OrderDetailsModal } from './OrderDetailsModal';

interface AdminDashboardProps {
  orders: OrderConfirmationData[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateTable: (orderId: string, newStation: string) => void;
  onUpdateStaffNotes: (orderId: string, notes: string) => void;
  onNewReservation: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateStatus,
  onUpdateTable,
  onUpdateStaffNotes,
  onNewReservation,
}) => {
  const [activeTab, setActiveTab] = useState<AdminSubTab>('overview');
  const [selectedOrder, setSelectedOrder] = useState<OrderConfirmationData | null>(null);

  // Compute live metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.total, 0);
  const totalDeliveries = orders.filter(o => o.guest.fulfillmentType === 'delivery').length;
  const totalPickups = orders.filter(o => o.guest.fulfillmentType === 'pickup').length;
  const activeSimmeringCount = orders.filter(o => o.status === 'simmering').length;

  // Kitchen preparation stations
  const kitchenStations = [
    {
      id: '01',
      name: 'Station 01 · Slow-Simmering Hearth Kiln',
      status: '8 Clay Pots on Fire',
      activity: 'Wild cinnamon curing at 840°C',
      ordersCount: 4,
    },
    {
      id: '02',
      name: 'Station 02 · Heirloom Botanical Elixir Bay',
      status: 'Infusions Straining',
      activity: 'Smoked tamarind honey reduction',
      ordersCount: 3,
    },
    {
      id: '03',
      name: 'Station 03 · Insulated Jute Carrier Bay',
      status: 'Volcanic Stones Heating',
      activity: 'Thermal packing for delivery',
      ordersCount: 2,
    },
    {
      id: '04',
      name: 'Station 04 · Dispatch & Courier Outpost',
      status: 'Handover Active',
      activity: 'Colombo 07 & 03 couriers',
      ordersCount: 3,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281f17] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d97706] mb-1 font-mono">
            <Flame className="w-3.5 h-3.5 fill-[#ea580c] text-[#f59e0b]" />
            <span>Food Ordering & Kitchen Dispatch Console</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-[#fbf7f0]">
            Praneetha Kitchen & Food Operations
          </h1>
          <p className="text-xs text-[#9c9285] mt-0.5">
            Real-time tracking of claypot food orders, woodfire simmering queues, and doorstep delivery dispatches.
          </p>
        </div>

        {/* View Switcher Tabs inside Admin */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-md p-1 bg-[#19130e] border border-[#302419]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Kitchen Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-[#d95b12] to-[#ea701b] text-white shadow-sm'
                  : 'text-[#9e9488] hover:text-[#f7ede2]'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Food Order Management</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-[#2b1f15] rounded-full text-amber-400">
                {orders.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: OPERATIONS OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Core Food Ordering KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Food Sales */}
            <div className="bg-[#14110e] border border-[#2b2118] p-5 rounded-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#8c8172] mb-2 font-mono">
                <span className="uppercase tracking-wider text-[11px]">Food Sales Revenue</span>
                <span className="text-emerald-400 font-mono text-[11px]">+22.4%</span>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#f7efe4] tabular-nums">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-[11px] text-[#8c8172] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Across {orders.length} orders today</span>
              </div>
            </div>

            {/* KPI 2: Active Simmering Pots */}
            <div className="bg-[#14110e] border border-[#2b2118] p-5 rounded-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#8c8172] mb-2 font-mono">
                <span className="uppercase tracking-wider text-[11px]">Active Woodfire Pots</span>
                <span className="text-orange-400 font-mono text-[11px]">840°C Ember</span>
              </div>
              <div className="font-cinzel text-2xl font-bold text-amber-400 tabular-nums">
                {activeSimmeringCount} <span className="text-sm font-normal text-[#8c8172]">Orders Simmering</span>
              </div>
              <div className="text-[11px] text-[#8c8172] mt-1 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#ea580c]" />
                <span>Unglazed Kelani pots on hearth</span>
              </div>
            </div>

            {/* KPI 3: Doorstep Deliveries */}
            <div className="bg-[#14110e] border border-[#2b2118] p-5 rounded-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#8c8172] mb-2 font-mono">
                <span className="uppercase tracking-wider text-[11px]">Doorstep Deliveries</span>
                <span className="text-amber-400 font-mono text-[11px]">Insulated Packs</span>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#f7efe4] tabular-nums">
                {totalDeliveries} <span className="text-sm font-normal text-[#8c8172]">Deliveries</span>
              </div>
              <div className="text-[11px] text-[#8c8172] mt-1 flex items-center gap-1">
                <Bike className="w-3 h-3 text-amber-500" />
                <span>Courier dispatch fleet</span>
              </div>
            </div>

            {/* KPI 4: Hearth Takeaway Pickups */}
            <div className="bg-[#14110e] border border-[#2b2118] p-5 rounded-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#8c8172] mb-2 font-mono">
                <span className="uppercase tracking-wider text-[11px]">Takeaway Pickups</span>
                <span className="text-emerald-400 font-mono text-[11px]">Hearth Handover</span>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#f7efe4] tabular-nums">
                {totalPickups} <span className="text-sm font-normal text-[#8c8172]">Pickups</span>
              </div>
              <div className="text-[11px] text-[#8c8172] mt-1 flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-emerald-400" />
                <span>Flagship kitchen counter</span>
              </div>
            </div>

          </div>

          {/* Kitchen Stations & Artisanal Supplies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 cols): Kitchen Stations */}
            <div className="lg:col-span-8 bg-[#14110e] border border-[#2b2118] rounded-sm p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#261f18] pb-3">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#f7efe4] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500 fill-[#ea580c]" />
                    <span>Kitchen Fire & Dispatch Stations</span>
                  </h3>
                  <p className="text-xs text-[#8c8172]">
                    Active preparation bays for woodfire simmered curries and heated stone carrier packaging.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/60">
                  All Stations Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {kitchenStations.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setActiveTab('orders')}
                    className="p-4 bg-[#191410] border border-[#2b2118] hover:border-amber-600/60 rounded-sm cursor-pointer transition-all hover:bg-[#201813] group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-cinzel text-xs font-bold text-[#f5ede3] group-hover:text-amber-400 transition-colors">
                        {st.name}
                      </span>
                    </div>

                    <div className="text-xs text-amber-400/90 font-mono my-1">
                      {st.status}
                    </div>

                    <p className="text-[11px] text-[#8c8172] mb-3">
                      {st.activity}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-[#8c8172] border-t border-[#261e16]">
                      <span>{st.ordersCount} Orders in queue</span>
                      <span className="font-mono text-amber-400 text-[10px] group-hover:underline flex items-center gap-1">
                        View Orders <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (4 cols): Fuel & Packaging Supplies */}
            <div className="lg:col-span-4 bg-[#14110e] border border-[#2b2118] rounded-sm p-6 shadow-xl space-y-4">
              <div className="border-b border-[#261f18] pb-3">
                <h3 className="font-cinzel text-base font-bold text-[#f7efe4] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Artisanal Supplies & Packaging</span>
                </h3>
                <p className="text-xs text-[#8c8172]">
                  Authentic fuel, clay vessels & thermal carriers.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#191410] border border-[#2b2118] rounded-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[#f5ede3]">Matale Cinnamon Timber</span>
                    <span className="font-mono text-amber-400 font-bold">64.5 kg</span>
                  </div>
                  <p className="text-[11px] text-[#8c8172]">Resinous fuel for 12-hour woodfire curries.</p>
                </div>

                <div className="p-3 bg-[#191410] border border-[#2b2118] rounded-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[#f5ede3]">Kelani Terracotta Pots</span>
                    <span className="font-mono text-emerald-400 font-bold">24 Seasoned</span>
                  </div>
                  <p className="text-[11px] text-[#8c8172]">Unglazed vessels ready for direct food packing.</p>
                </div>

                <div className="p-3 bg-[#191410] border border-[#2b2118] rounded-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[#f5ede3]">Heated River Stones</span>
                    <span className="font-mono text-amber-400 font-bold">48 Units</span>
                  </div>
                  <p className="text-[11px] text-[#8c8172]">Pre-heated to keep curries 75°C during transit.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full py-2.5 bg-[#241a13] hover:bg-[#302319] border border-[#382b20] text-xs font-semibold text-[#d1c6b8] hover:text-[#f7efe4] rounded-sm transition-colors text-center block"
                >
                  Manage Food Orders Master List &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Quick Stream of Recent Food Orders */}
          <div className="bg-[#14110e] border border-[#2b2118] rounded-sm p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#261f18] pb-3">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#f7efe4]">
                  Recent Food Orders Stream
                </h3>
                <p className="text-xs text-[#8c8172]">
                  Latest customer orders from online checkout.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1"
              >
                <span>Manage All Food Orders ({orders.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#221a14] text-xs">
              {orders.slice(0, 4).map((order) => (
                <div 
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#1a1511] px-2 rounded cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
                      #{order.orderId.slice(-4)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#f5ede3] font-cinzel">
                        {order.guest.fullName}
                      </div>
                      <div className="text-[11px] text-[#8c8172]">
                        {order.guest.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup'} · {order.items.reduce((acc, i) => acc + i.quantity, 0)} Dishes · {order.dispatchStation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:justify-end">
                    <span className="font-mono font-semibold text-amber-400 tabular-nums">
                      ${order.pricing.total.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded border bg-[#1d1712] border-[#382b20] text-[#d5cdc3] uppercase">
                      {order.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="px-2.5 py-1 bg-[#261d16] hover:bg-[#33261c] text-[#d1c6b8] rounded text-xs transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ORDER MANAGEMENT DATA GRID */}
      {activeTab === 'orders' && (
        <OrderManagement
          orders={orders}
          onSelectOrder={(ord) => setSelectedOrder(ord)}
          onUpdateStatus={onUpdateStatus}
          onNewReservation={onNewReservation}
        />
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(id, st) => {
            onUpdateStatus(id, st);
            setSelectedOrder(prev => prev ? { ...prev, status: st } : null);
          }}
          onUpdateTable={(id, station) => {
            onUpdateTable(id, station);
            setSelectedOrder(prev => prev ? { ...prev, dispatchStation: station } : null);
          }}
          onUpdateStaffNotes={(id, nts) => {
            onUpdateStaffNotes(id, nts);
            setSelectedOrder(prev => prev ? { ...prev, staffNotes: nts } : null);
          }}
        />
      )}

    </div>
  );
};
