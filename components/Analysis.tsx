"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { fetchCurrentUser } from "../services/authService";
import { 
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  Phone,
  MoreHorizontal
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const salesTrendsData = [
  { day: 'SUN', value: 18 },
  { day: 'MON', value: 22 },
  { day: 'TUE', value: 15 },
  { day: 'WED', value: 28 },
  { day: 'THU', value: 12 },
  { day: 'FRI', value: 35 },
  { day: 'SAT', value: 25 },
];

const comparisonData = [
  { day: 'SUN', vegetables: 12, meatSeafood: 8 },
  { day: 'MON', vegetables: 15, meatSeafood: 10 },
  { day: 'TUE', vegetables: 8, meatSeafood: 12 },
  { day: 'WED', vegetables: 18, meatSeafood: 14 },
  { day: 'THU', vegetables: 5, meatSeafood: 16 },
  { day: 'FRI', vegetables: 25, meatSeafood: 18 },
  { day: 'SAT', vegetables: 15, meatSeafood: 8 },
];

export default function AnalysisPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('This week');
  const [categoryFilter, setCategoryFilter] = useState('Vegetables');
  const [topProductsFilter, setTopProductsFilter] = useState('This month');
  const [employeeFilter, setEmployeeFilter] = useState('This month');

  useEffect(() => {
    async function getUser() {
      try {
        const userData = await fetchCurrentUser();
        setUser(
          userData && typeof userData === "object" && "user" in userData && userData.user
            ? userData.user
            : userData && typeof userData === "object" && "data" in userData && userData.data
            ? userData.data
            : userData
        );
      } catch {
        setUser(null);
      }
    }
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700">
      {/* Sidebar */}
      <Sidebar active="analysis" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{marginLeft: 256}}>
        {/* Top Navigation Bar */}
        <TopNavBar user={user} onSearch={setSearchTerm} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 mt-16">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 opacity-80" />
                <select 
                  className="w-24 h-6 text-xs bg-white/20 border-white/30 text-white rounded px-2"
                  defaultValue="This month"
                >
                  <option value="This month">This month</option>
                  <option value="Last month">Last month</option>
                </select>
              </div>
              <p className="text-sm opacity-80">Total Revenue</p>
              <p className="text-2xl font-bold">Rs.75,217,886</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+ 10%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <select 
                  className="w-16 h-6 text-xs bg-white/20 border-white/30 text-white rounded px-2"
                  defaultValue="Today"
                >
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                </select>
              </div>
              <p className="text-sm opacity-80">Daily Sales</p>
              <p className="text-2xl font-bold">Rs.24,060,099</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+ 10%</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Package className="h-8 w-8 text-blue-500" />
                <select 
                  className="w-16 h-6 text-xs border-2 border-slate-700 rounded px-2 text-slate-900 font-semibold"
                  defaultValue="Today"
                >
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                </select>
              </div>
              <p className="text-sm font-semibold text-slate-900">Orders Proceeded</p>
              <p className="text-2xl font-bold text-slate-900">1.1K</p>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+ 10%</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
                <div></div>
              </div>
              <p className="text-sm font-semibold text-slate-900">Low Stock</p>
              <p className="text-2xl font-bold text-slate-900">5 Items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="xl:col-span-2 space-y-6">
              {/* Products Sales Trends */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Products Sales Trends</h3>
                  <div className="flex gap-2">
                    <select 
                      value={timeFilter} 
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="border-2 border-slate-700 rounded px-3 py-1 text-sm font-semibold text-slate-900"
                    >
                      <option value="This week">This week</option>
                      <option value="This month">This month</option>
                      <option value="This year">This year</option>
                    </select>
                    <select 
                      value={categoryFilter} 
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="border-2 border-slate-700 rounded px-3 py-1 text-sm font-semibold text-slate-900"
                    >
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Dairy">Dairy</option>
                    </select>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                      domain={[0, 40]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Sales']}
                      labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #cbd5e1', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontWeight: 600
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      maxBarSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Product Comparison */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Product Comparison</h3>
                  <div className="flex gap-2">
                    <select className="border-2 border-slate-700 rounded px-3 py-1 text-sm font-semibold text-slate-900" defaultValue="Vegetables">
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                    </select>
                    <select className="border-2 border-slate-700 rounded px-3 py-1 text-sm font-semibold text-slate-900" defaultValue="Meat & Seafood">
                      <option value="Meat & Seafood">Meat & Seafood</option>
                      <option value="Dairy">Dairy</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-semibold text-slate-900">Selling Rate</span>
                    </div>
                    <div className="text-blue-600 font-bold">16% Vegetables</div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                      domain={[0, 30]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name === 'vegetables' ? 'Vegetables' : 'Meat & Seafood']}
                      labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #cbd5e1', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontWeight: 600
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="vegetables" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="meatSeafood" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-slate-900" />
                    <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={topProductsFilter} 
                      onChange={(e) => setTopProductsFilter(e.target.value)}
                      className="border-2 border-slate-700 rounded px-2 py-1 text-sm font-semibold text-slate-900"
                    >
                      <option value="This month">This month</option>
                      <option value="This week">This week</option>
                    </select>
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-slate-900" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                        🥛
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-blue-900">Fresh Milk (1L)</p>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold border border-green-300">
                            In Stock
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-blue-800">Dairy</p>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-900 font-semibold">Unit sold: <span className="font-bold">260 U</span></span>
                          <span className="text-slate-900 font-semibold">Revenue: <span className="font-bold">Rs. 37,865</span></span>
                        </div>
                      </div>
                      <div className="text-green-600 text-sm font-bold">+ 12%</div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl">
                        🍞
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">Bread</p>
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-semibold border border-orange-300">
                            Low Stock
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Bakery</p>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-900 font-semibold">Unit sold: <span className="font-bold">100 U</span></span>
                          <span className="text-slate-900 font-semibold">Revenue: <span className="font-bold">Rs. 28,500</span></span>
                        </div>
                      </div>
                      <div className="text-green-600 text-sm font-bold">+ 8%</div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">
                        🧽
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">Dishwashing liquid</p>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold border border-red-300">
                            Critical
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Household</p>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-900 font-semibold">Unit sold: <span className="font-bold">130 U</span></span>
                          <span className="text-slate-900 font-semibold">Revenue: <span className="font-bold">Rs. 55,250</span></span>
                        </div>
                      </div>
                      <div className="text-red-600 text-sm font-bold">- 4.2%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employees */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">👥</div>
                    <h3 className="text-lg font-bold text-slate-900">Employees</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={employeeFilter} 
                      onChange={(e) => setEmployeeFilter(e.target.value)}
                      className="border-2 border-slate-700 rounded px-2 py-1 text-sm font-semibold text-slate-900"
                    >
                      <option value="This month">This month</option>
                      <option value="This week">This week</option>
                    </select>
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-slate-900" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-slate-300 rounded-lg bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                          <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100" alt="James" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">James</p>
                          <p className="text-sm font-semibold text-slate-700">Counter 1</p>
                          <p className="text-xs font-semibold text-slate-600">Working hours: 9h 30m</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold border border-green-300">
                          Active
                        </span>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Phone className="h-4 w-4 text-slate-900" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                          <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Ravi" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-blue-900">Ravi</p>
                          <p className="text-sm font-semibold text-blue-800">Inventory</p>
                          <p className="text-xs font-semibold text-blue-700">Working hours: 4h 15m</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-semibold border border-orange-300">
                          Break
                        </span>
                        <button className="p-1 hover:bg-blue-100 rounded">
                          <Phone className="h-4 w-4 text-blue-900" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                          <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Alice" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Alice</p>
                          <p className="text-sm font-semibold text-slate-700">Counter 2</p>
                          <p className="text-xs font-semibold text-slate-600">Working hours: 7h 20m</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold border border-red-300">
                          Off Duty
                        </span>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Phone className="h-4 w-4 text-slate-900" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}