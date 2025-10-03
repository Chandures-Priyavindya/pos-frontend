"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { fetchCurrentUser } from "../services/authService";
import { 
  Users,
  Mail,
  Phone,
  ShoppingBag,
  Calendar,
  Award,
  Plus
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  customerId: string;
  phone: string;
  email: string;
  totalPurchase: number;
  lastPurchase: string;
  loyaltyStatus: 'Gold member' | 'Silver member' | 'Regular member' | 'Platinum member';
  avatar: string;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    customerId: '#CUSTID001',
    phone: '+94 77 923 5763',
    email: 'john@gmail.com',
    totalPurchase: 50000,
    lastPurchase: '2 days ago',
    loyaltyStatus: 'Gold member',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Sarah',
    customerId: '#CUSTID002',
    phone: '+94 77 753 5831',
    email: 'sarah9@gmail.com',
    totalPurchase: 34000,
    lastPurchase: '5 days ago',
    loyaltyStatus: 'Silver member',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Sashini',
    customerId: '#CUSTID003',
    phone: '+94 77 522 3456',
    email: 'sashini@gmail.com',
    totalPurchase: 16000,
    lastPurchase: '10 days ago',
    loyaltyStatus: 'Regular member',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Kamal',
    customerId: '#CUSTID004',
    phone: '+94 77 157 3663',
    email: 'kamal@gmail.com',
    totalPurchase: 150000,
    lastPurchase: '3 days ago',
    loyaltyStatus: 'Platinum member',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'Mufassir',
    customerId: '#CUSTID005',
    phone: '+94 77 341 8883',
    email: 'mufa24@gmail.com',
    totalPurchase: 60800,
    lastPurchase: '1 week ago',
    loyaltyStatus: 'Gold member',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '6',
    name: 'Emma',
    customerId: '#CUSTID006',
    phone: '+94 77 864 5635',
    email: 'emma@gmail.com',
    totalPurchase: 10000,
    lastPurchase: '2 days ago',
    loyaltyStatus: 'Regular member',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '7',
    name: 'David',
    customerId: '#CUSTID007',
    phone: '+94 77 268 7531',
    email: 'david@gmail.com',
    totalPurchase: 33000,
    lastPurchase: '6 days ago',
    loyaltyStatus: 'Regular member',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '8',
    name: 'Alice',
    customerId: '#CUSTID008',
    phone: '+94 77 490 7760',
    email: 'alice@gmail.com',
    totalPurchase: 85000,
    lastPurchase: '1 day ago',
    loyaltyStatus: 'Platinum member',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '9',
    name: 'Ramla',
    customerId: '#CUSTID009',
    phone: '+94 77 238 3598',
    email: 'ramla@gmail.com',
    totalPurchase: 40000,
    lastPurchase: '2 weeks ago',
    loyaltyStatus: 'Silver member',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const getLoyaltyBadgeColor = (status: string) => {
  switch (status) {
    case 'Platinum member':
      return 'bg-purple-100 text-purple-800 border border-purple-200';
    case 'Gold member':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'Silver member':
      return 'bg-gray-100 text-gray-800 border border-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 border border-blue-200';
  }
};

export default function CustomersPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700">
      {/* Sidebar */}
      <Sidebar active="customers" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{marginLeft: 256}}>
        {/* Top Navigation Bar */}
        <TopNavBar user={user} onSearch={setSearchTerm} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 mt-16">
          {/* Page Header */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Customer Lists & Details</h1>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Plus className="h-4 w-4" />
                Add Customer
              </button>
            </div>
          </div>

          {/* Customers List */}
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img 
                          src={customer.avatar} 
                          alt={customer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-800">{customer.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLoyaltyBadgeColor(customer.loyaltyStatus)}`}>
                            {customer.loyaltyStatus}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{customer.customerId}</p>
                      </div>
                    </div>

                    {/* Desktop Details Grid */}
                    <div className="hidden md:grid md:grid-cols-5 gap-8 flex-1 max-w-4xl ml-8">
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Phone number</p>
                        <div className="flex items-center gap-1 justify-center">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{customer.phone}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Email ID</p>
                        <div className="flex items-center gap-1 justify-center">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-blue-600">{customer.email}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Total purchase</p>
                        <div className="flex items-center gap-1 justify-center">
                          <ShoppingBag className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">Rs. {customer.totalPurchase.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Last purchase</p>
                        <div className="flex items-center gap-1 justify-center">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{customer.lastPurchase}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Loyalty status</p>
                        <div className="flex items-center gap-1 justify-center">
                          <Award className="h-3 w-3 text-slate-400" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLoyaltyBadgeColor(customer.loyaltyStatus)}`}>
                            {customer.loyaltyStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="ml-4 text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                      Send offers
                    </button>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Phone</p>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{customer.phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Email</p>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-blue-600 truncate">{customer.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Total Purchase</p>
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">Rs. {customer.totalPurchase.toLocaleString()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Last Purchase</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{customer.lastPurchase}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-slate-400" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLoyaltyBadgeColor(customer.loyaltyStatus)}`}>
                          {customer.loyaltyStatus}
                        </span>
                      </div>
                      <button className="text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-lg transition text-sm">
                        Send offers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center shadow-lg">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No customers found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search terms or add a new customer.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition">
                <Plus className="h-4 w-4" />
                Add Customer
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}