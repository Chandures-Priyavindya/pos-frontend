"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { fetchCurrentUser } from "../services/authService";
import { 
  ShoppingCart, 
  Minus, 
  Plus,
  ChevronDown,
  FileText,
  CreditCard,
  Wallet,
  Award,
  Printer,
  Mail,
  MoreHorizontal
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface BillingRecord {
  id: string;
  customerName: string;
  customerNumber: string;
  totalItems: number;
  totalAmount: number;
  avatar: string;
}

const products: Product[] = [
  { id: '1', name: 'Low Fat milk (1L)', price: 600.00, image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
  { id: '2', name: 'Almond milk (1L)', price: 950.00, image: 'https://images.pexels.com/photos/6544376/pexels-photo-6544376.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
  { id: '3', name: 'Soy milk (1L)', price: 1600.00, image: 'https://images.pexels.com/photos/6544387/pexels-photo-6544387.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
  { id: '4', name: 'Oat milk (500ml)', price: 1320.00, image: 'https://images.pexels.com/photos/6544388/pexels-photo-6544388.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
  { id: '5', name: 'Coconut milk (400ml)', price: 380.00, image: 'https://images.pexels.com/photos/11533506/pexels-photo-11533506.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
  { id: '6', name: 'Whole milk (1L)', price: 500.00, image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'dairy' },
];

const billingHistory: BillingRecord[] = [
  { id: '1023', customerName: 'Malini Perera', customerNumber: '#1023', totalItems: 9, totalAmount: 5500.00, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' },
  { id: '1024', customerName: 'John D', customerNumber: '#1024', totalItems: 15, totalAmount: 16850.00, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50' },
  { id: '1025', customerName: 'Sashini', customerNumber: '#1025', totalItems: 5, totalAmount: 4200.00, avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=50' },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Whole milk (1L)', price: 500, quantity: 2, category: 'Dairy', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '2', name: 'Green Apples', price: 180, quantity: 1, category: 'Fruits', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '3', name: 'Sticks rolled wafer', price: 120, quantity: 3, category: 'Snacks', image: 'https://images.pexels.com/photos/5638256/pexels-photo-5638256.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '4', name: 'Eggs', price: 30, quantity: 10, category: 'Dairy', image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '5', name: 'Bananas', price: 30, quantity: 2, category: 'Fruits', image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '6', name: 'Cassava chips', price: 300, quantity: 4, category: 'Snacks', image: 'https://images.pexels.com/photos/7928142/pexels-photo-7928142.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '7', name: 'Wheat bread', price: 190, quantity: 1, category: 'Bakery', image: 'https://images.pexels.com/photos/209196/pexels-photo-209196.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '8', name: 'Organic honey', price: 950, quantity: 1, category: 'Condiments', image: 'https://images.pexels.com/photos/302898/pexels-photo-302898.jpeg?auto=compress&cs=tinysrgb&w=50' },
    { id: '9', name: 'Fruit yogurt', price: 90, quantity: 5, category: 'Dairy', image: 'https://images.pexels.com/photos/4518669/pexels-photo-4518669.jpeg?auto=compress&cs=tinysrgb&w=50' },
  ]);

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

  const categories = [
    { id: 'all', name: 'All products', icon: '🛍️' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'bakery', name: 'Bakery', icon: '🍞' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateCartQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateCartQuantity(product.id, 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.1;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal - discount + tax;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700">
      {/* Sidebar */}
      <Sidebar active="dashboard" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" style={{marginLeft: 256}}>
        {/* Top Navigation Bar */}
        <TopNavBar user={user} onSearch={setSearchTerm} />

        {/* Dashboard Content with Cart */}
        <div className="flex flex-1 overflow-hidden mt-16">
          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6 space-y-6">
              {/* Products Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Products</h2>
                  <div className="flex gap-2">
                    <button className="border border-slate-300 bg-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition">
                      Product Brand <ChevronDown className="h-3 w-3" />
                    </button>
                    <button className="border border-slate-300 bg-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition">
                      Sort By <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                        selectedCategory === category.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Milk & Cream Section */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-slate-700">Milk & Cream</h3>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id} 
                        className="bg-white border border-slate-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => addToCart(product)}
                      >
                        <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-sm font-medium text-slate-800 mb-1 line-clamp-2">{product.name}</h4>
                        <p className="text-sm font-semibold text-blue-600">Rs. {product.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Sections */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-700">Cheese</h3>
                      <ChevronDown className="h-4 w-4 text-slate-400 transform rotate-90" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-700">Butter & Spreads</h3>
                      <ChevronDown className="h-4 w-4 text-slate-400 transform rotate-90" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-700">Eggs</h3>
                      <ChevronDown className="h-4 w-4 text-slate-400 transform rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Billing History
                  </h3>
                  <button className="border border-slate-300 bg-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition">
                    Today <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {billingHistory.map(record => (
                    <div key={record.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={record.avatar} alt={record.customerName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{record.customerName}</p>
                          <p className="text-sm text-slate-500">{record.customerNumber}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Total Items</p>
                        <p className="font-medium">{record.totalItems}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Total amount</p>
                        <p className="font-medium">Rs. {record.totalAmount.toFixed(2)}</p>
                      </div>
                      
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                  <button className="border border-slate-300 bg-white py-3 rounded-lg hover:bg-slate-50 transition font-medium text-sm">VOID</button>
                  <button className="border border-slate-300 bg-white py-3 rounded-lg hover:bg-slate-50 transition font-medium text-sm">HOLD</button>
                  <button className="border border-slate-300 bg-white py-3 rounded-lg hover:bg-slate-50 transition font-medium text-sm">DISCOUNT</button>
                  <button className="border border-slate-300 bg-white py-3 rounded-lg hover:bg-slate-50 transition font-medium text-sm">CUSTOMER LOOKUP</button>
                </div>
              </div>
            </div>
          </main>

          {/* Cart Sidebar - Fixed on right */}
          <aside className="w-80 bg-white border-l shadow-lg flex flex-col" style={{maxHeight: 'calc(100vh - 64px)'}}>
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Cart</h3>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                    <div className="w-12 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p className="text-sm font-semibold text-blue-600">Rs.{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="h-8 w-8 border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50 transition"
                        onClick={() => updateCartQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        className="h-8 w-8 border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50 transition"
                        onClick={() => updateCartQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="p-4 border-t bg-slate-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Bill</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount (10%)</span>
                  <span>Rs. {discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Grand Total</span>
                  <span>Rs. {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition flex items-center justify-center text-xs font-medium">
                  <CreditCard className="h-4 w-4 mr-1" />
                  CASH
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition flex items-center justify-center text-xs font-medium">
                  <CreditCard className="h-4 w-4 mr-1" />
                  CARD
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition flex items-center justify-center text-xs font-medium">
                  <Award className="h-4 w-4 mr-1" />
                  LOYALTY
                </button>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-3 transition flex items-center justify-center font-medium">
                <Wallet className="h-4 w-4 mr-2" />
                DIGITAL WALLET
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button className="h-12 border border-slate-300 bg-white rounded-lg flex items-center justify-center hover:bg-slate-50 transition">
                  <Printer className="h-5 w-5 text-slate-600" />
                </button>
                <button className="h-12 border border-slate-300 bg-white rounded-lg flex items-center justify-center hover:bg-slate-50 transition">
                  <Mail className="h-5 w-5 text-slate-600" />
                </button>
                <button className="h-12 border border-slate-300 bg-white rounded-lg flex items-center justify-center hover:bg-slate-50 transition">
                  <MoreHorizontal className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}