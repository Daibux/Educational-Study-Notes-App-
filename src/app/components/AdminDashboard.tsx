import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Video, 
  BarChart2, 
  Settings, 
  Search, 
  Plus, 
  MoreVertical, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  Download,
  UploadCloud,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Activity,
  Filter,
  Bell,
  Lock,
  Mail,
  User
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Mock Data
const ADMIN_STATS = [
  { label: "Total Revenue", value: "₱124,500", trend: "+18% this month", icon: DollarSign, color: "bg-emerald-600" },
  { label: "Total Sales", value: "342", trend: "+12 this week", icon: ShoppingBag, color: "bg-blue-600" },
  { label: "Active Customers", value: "1,205", trend: "+45 new", icon: Users, color: "bg-indigo-600" },
  { label: "Resources Listed", value: "85", trend: "3 pending review", icon: FileText, color: "bg-amber-500" },
];

const PRODUCTS = [
  { id: 1, title: "Adv. Reinforced Concrete Design", type: "Bundle", price: "₱49.00", sales: 124, revenue: "₱6,076", status: "Active", author: "Engr. John Doe" },
  { id: 2, title: "Soil Mechanics Lab 4", type: "Bundle", price: "₱49.00", sales: 85, revenue: "₱4,165", status: "Active", author: "Engr. John Doe" },
  { id: 3, title: "Transportation Eng. Midterm Key", type: "Bundle", price: "₱49.00", sales: 210, revenue: "₱10,290", status: "Active", author: "Engr. John Doe" },
  { id: 4, title: "Hydrology Basics Bundle", type: "Bundle", price: "₱49.00", sales: 42, revenue: "₱2,058", status: "Draft", author: "Engr. John Doe" },
  { id: 5, title: "Structural Analysis Reviewer", type: "Bundle", price: "₱49.00", sales: 156, revenue: "₱7,644", status: "Active", author: "Engr. John Doe" },
  { id: 6, title: "Construction Management Intro", type: "Bundle", price: "₱49.00", sales: 123, revenue: "₱6,027", status: "Review", author: "Engr. John Doe" },
  { id: 7, title: "Chemistry for Engineers", type: "Bundle", price: "₱49.00", sales: 223, revenue: "₱10,927", status: "Review", author: "Prof. Maria S." },
  { id: 8, title: "Physics for Engineers", type: "Bundle", price: "₱49.00", sales: 13, revenue: "₱637", status: "Active", author: "Prof. Maria S." },
  { id: 9, title: "Calculus 1", type: "Bundle", price: "₱49.00", sales: 213, revenue: "₱10,437", status: "Active", author: "Dr. Reyes" },
  { id: 10, title: "Calculus 2", type: "Bundle", price: "₱49.00", sales: 214, revenue: "₱10,486", status: "Active", author: "Dr. Reyes" },
  { id: 12, title: "Differential Equations", type: "Bundle", price: "₱49.00", sales: 53, revenue: "₱2,597", status: "Review", author: "Dr. Reyes" },
  { id: 13, title: "Engineering Data Analysis", type: "Bundle", price: "₱49.00", sales: 76, revenue: "₱3,724", status: "Active", author: "Engr. John Doe" },
  { id: 14, title: "Dynamics of Rigid Bodies", type: "Bundle", price: "₱49.00", sales: 83, revenue: "₱4,067", status: "Review", author: "Engr. John Doe" },
  { id: 15, title: "Mechanics of Deformable Bodies", type: "Bundle", price: "₱49.00", sales: 23, revenue: "₱1,127", status: "Active", author: "Engr. John Doe" },
  { id: 16, title: "Numerical Solutions to CE Problems", type: "Bundle", price: "₱49.00", sales: 33, revenue: "₱1,617", status: "Review", author: "Engr. John Doe" },
  { id: 17, title: "Theory of Structures", type: "Bundle", price: "₱49.00", sales: 23, revenue: "₱1,127", status: "Review", author: "Engr. John Doe" },
  { id: 18, title: "Highway and Railroad Engineering", type: "Bundle", price: "₱49.00", sales: 67, revenue: "₱3,283", status: "Review", author: "Engr. John Doe" },
  { id: 19, title: "Engineering Management", type: "Bundle", price: "₱49.00", sales: 56, revenue: "₱2,744", status: "Active", author: "Prof. Maria S." },
  { id: 20, title: "Principles Of Steel Design Technical", type: "Bundle", price: "₱49.00", sales: 82, revenue: "₱4,018", status: "Active", author: "Engr. John Doe" },
  { id: 21, title: "Principles Of Reinforced And Presterssed Concrete", type: "Bundle", price: "₱49.00", sales: 62, revenue: "₱3,038", status: "Review", author: "Engr. John Doe" },
  { id: 22, title: "Hydraulics", type: "Bundle", price: "₱49.00", sales: 61, revenue: "₱2,989", status: "Review", author: "Engr. John Doe" },
  { id: 23, title: "Quantity Surveying", type: "Bundle", price: "₱49.00", sales: 89, revenue: "₱4,361", status: "Review", author: "Engr. John Doe" }
];

const RECENT_TRANSACTIONS = [
  { id: 1, customer: "Alex Student", item: "Adv. Reinforced Concrete Design", amount: "₱49.00", time: "2 mins ago" },
  { id: 2, customer: "Maria Garcia", item: "Transportation Eng. Key", amount: "₱49.00", time: "15 mins ago" },
  { id: 3, customer: "John Doe", item: "Soil Mechanics Lab", amount: "₱49.00", time: "1 hour ago" },
];

const CUSTOMER_LIST = [
  { id: 1, name: "Alex Student", email: "alex@university.edu", purchases: 5, total_spent: "₱245.00", status: "Active", joined: "Oct 2023" },
  { id: 2, name: "Maria Garcia", email: "m.garcia@university.edu", purchases: 3, total_spent: "₱147.00", status: "Active", joined: "Sep 2023" },
  { id: 3, name: "James Wilson", email: "j.wilson@university.edu", purchases: 12, total_spent: "₱588.00", status: "Premium", joined: "Nov 2023" },
  { id: 4, name: "Sarah Lee", email: "s.lee@university.edu", purchases: 0, total_spent: "₱0", status: "Inactive", joined: "Aug 2023" },
];

const PAYOUT_HISTORY = [
  { id: 1, date: "Oct 31, 2023", amount: "₱12,450.00", status: "Paid", method: "Bank Transfer •••• 4242" },
  { id: 2, date: "Sep 30, 2023", amount: "₱8,320.00", status: "Paid", method: "Bank Transfer •••• 4242" },
  { id: 3, date: "Aug 31, 2023", amount: "₱5,100.00", status: "Paid", method: "Bank Transfer •••• 4242" },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`h-12 w-12 flex items-center justify-center rounded-2xl ${color} shadow-sm`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend.includes('+') || trend.includes('new') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-slate-500 text-sm">{label}</p>
    </div>
  );

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Seller Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-600">Track your sales, revenue, and product performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm flex items-center gap-2">
              <Download className="h-4 w-4" /> Sales Report
            </button>
            <button 
              onClick={() => toast.success("Opening product creation modal...")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Sell New Note
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 mb-8 overflow-x-auto">
          <div className="flex space-x-8">
            {['overview', 'products', 'customers', 'financials', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ADMIN_STATS.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Product Performance Table */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Top Performing Products</h3>
                  <button onClick={() => setActiveTab('products')} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Sales</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PRODUCTS.slice(0, 4).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                              item.type === 'Video' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {item.type === 'Video' ? <Video className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">{item.price}</td>
                          <td className="px-6 py-4 text-slate-600">{item.sales} sold</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-blue-600 mx-1"><Edit className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Panels */}
              <div className="space-y-6">
                
                {/* Recent Transactions */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Recent Sales</h3>
                  <div className="space-y-4">
                    {RECENT_TRANSACTIONS.map((tx) => (
                      <div key={tx.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-bold text-slate-900">{tx.amount}</p>
                            <span className="text-xs text-slate-400">{tx.time}</span>
                          </div>
                          <p className="text-xs text-slate-500">Purchased by <span className="font-medium text-slate-700">{tx.customer}</span></p>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{tx.item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-sm text-slate-600 font-medium bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    View All Transactions
                  </button>
                </div>

                {/* Earnings Summary */}
                <div className="bg-slate-900 rounded-xl shadow-sm p-6 text-white">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" /> Revenue Targets
                  </h3>
                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">₱124.5k</span>
                      <span className="text-sm text-slate-400 mb-1">/ ₱150k Goal</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[83%]"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                     <div>
                       <span className="block text-xs text-slate-400">Projected</span>
                       <span className="font-bold text-lg">₱142k</span>
                     </div>
                     <div>
                       <span className="block text-xs text-slate-400">Growth</span>
                       <span className="font-bold text-lg text-emerald-400">+18%</span>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Your Educational Products</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm">
                  <Plus className="h-4 w-4" /> Add Product
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <div className="relative max-w-md">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input 
                    type="text" 
                    placeholder="Search by title, category, or status..." 
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                    <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Sales</th>
                    <th className="px-6 py-4">Total Revenue</th>
                    <th className="px-6 py-4">Author</th> 
                    <th className="px-6 py-4">Status</th> 
                    <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PRODUCTS.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                item.type === 'Video' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {item.type === 'Video' ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                                <span className="text-xs text-slate-500">{item.type}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.price}</td>
                        <td className="px-6 py-4">{item.sales} sold</td>
                        <td className="px-6 py-4 font-bold text-emerald-600">{item.revenue}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.author}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                             item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                             item.status === 'Review' ? 'bg-amber-100 text-amber-700' :
                             'bg-slate-100 text-slate-700'
                           }`}>
                             {item.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                               <Edit className="h-4 w-4" />
                             </button>
                             <button className="p-1 text-slate-400 hover:text-emerald-600 transition-colors" title="View">
                               <Eye className="h-4 w-4" />
                             </button>
                             <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                               <Trash2 className="h-4 w-4" />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100">
                  <Filter className="h-4 w-4" /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total Spent</th>
                    <th className="px-6 py-4">Purchases</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CUSTOMER_LIST.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{user.total_spent}</td>
                      <td className="px-6 py-4">{user.purchases} items</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                          user.status === 'Premium' ? 'bg-purple-100 text-purple-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-900"><MoreVertical className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
           <div className="space-y-6 animate-in fade-in duration-500">
             <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                     <DollarSign className="h-5 w-5" />
                   </div>
                   <span className="text-sm font-medium text-slate-600">Available Payout</span>
                 </div>
                 <div className="text-3xl font-bold text-slate-900 mb-4">₱12,450.00</div>
                 <button onClick={() => toast.success("Payout request initiated")} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                   Request Payout
                 </button>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                     <CreditCard className="h-5 w-5" />
                   </div>
                   <span className="text-sm font-medium text-slate-600">Total Lifetime Earnings</span>
                 </div>
                 <div className="text-3xl font-bold text-slate-900 mb-1">₱348,200.00</div>
                 <div className="text-sm text-slate-500">Since joining Oct 2022</div>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                     <Activity className="h-5 w-5" />
                   </div>
                   <span className="text-sm font-medium text-slate-600">Average Order Value</span>
                 </div>
                 <div className="text-3xl font-bold text-slate-900 mb-1">₱385.00</div>
                 <div className="text-sm text-slate-500">Based on last 30 days</div>
               </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <h3 className="font-bold text-slate-900">Payout History</h3>
               </div>
               <table className="w-full text-left text-sm text-slate-600">
                 <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Method</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Invoice</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {PAYOUT_HISTORY.map((payout) => (
                     <tr key={payout.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-medium text-slate-900">{payout.date}</td>
                       <td className="px-6 py-4 font-bold text-slate-900">{payout.amount}</td>
                       <td className="px-6 py-4">{payout.method}</td>
                       <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                           <CheckCircle2 className="h-3 w-3" /> {payout.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="text-blue-600 hover:underline text-xs font-medium">Download</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}

        {activeTab === 'settings' && (
           <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
             
             {/* Profile Section */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                   <User className="h-5 w-5 text-slate-400" /> Seller Profile
                 </h3>
               </div>
               <div className="p-6 space-y-4">
                 <div className="flex items-center gap-6">
                   <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-2xl font-bold">
                     JD
                   </div>
                   <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                     Change Photo
                   </button>
                 </div>
                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                     <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                     <input type="email" defaultValue="john.doe@university.edu" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Seller Bio</label>
                     <textarea className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" defaultValue="Civil Engineer | Specializing in Structural Analysis and Concrete Design. Sharing notes from 5+ years of teaching experience." />
                   </div>
                 </div>
                 <div className="flex justify-end pt-2">
                   <button onClick={() => toast.success("Profile updated")} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">Save Changes</button>
                 </div>
               </div>
             </div>

             {/* Notifications */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                   <Bell className="h-5 w-5 text-slate-400" /> Notifications
                 </h3>
               </div>
               <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                   <div>
                     <h4 className="font-medium text-slate-900">New Sale Alerts</h4>
                     <p className="text-sm text-slate-500">Get notified when someone purchases your notes.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" defaultChecked className="sr-only peer" />
                     <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                 </div>
                 <div className="flex items-center justify-between">
                   <div>
                     <h4 className="font-medium text-slate-900">Payout Updates</h4>
                     <p className="text-sm text-slate-500">Receive emails when your payout is processed.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" defaultChecked className="sr-only peer" />
                     <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                 </div>
               </div>
             </div>
             
             {/* Security */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                   <Lock className="h-5 w-5 text-slate-400" /> Security
                 </h3>
               </div>
               <div className="p-6">
                 <button className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">Change Password</button>
               </div>
             </div>

           </div>
        )}

      </div>
    </div>
  );
};
