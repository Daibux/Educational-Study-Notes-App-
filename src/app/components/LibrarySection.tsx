import React, { useState } from 'react';
import { Search, Filter, Clock, BookOpen, ChevronRight, ShoppingCart, Lock } from 'lucide-react';
import { toast } from 'sonner';

// Images
const HERO_IMAGE = "https://images.unsplash.com/photo-1714661116916-8e44405d0c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicmlkZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwNjQ0MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const BLUEPRINTS_IMAGE = "https://images.unsplash.com/photo-1758574697284-8e84046a45ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50c3xlbnwxfHx8fDE3NzA2NDQxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const STUDENTS_IMAGE = "https://images.unsplash.com/photo-1718327453695-4d32b94c90a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGxpYnJhcnl8ZW58MXx8fHwxNzcwNjE5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const ENGINEER_IMAGE = "https://images.unsplash.com/photo-1694522362256-6c907336af43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZW5naW5lZXIlMjBoZWxtZXR8ZW58MXx8fHwxNzcwNjQ0MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CONCRETE_IMAGE = "https://images.unsplash.com/photo-1518385731751-2292a83236e7?auto=format&fit=crop&q=80&w=1080";
const FLUIDS_IMAGE = "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1080";

// Categories for tabs
const CATEGORIES = ["All", "Structural", "Geotechnical", "Fluid Mechanics", "Transportation", "Construction"];

// Mock Data
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Understanding Shear Force & Bending Moment Diagrams",
    category: "Structural",
    author: "Engr. Sarah",
    date: "Oct 12, 2023",
    readTime: "15 min read",
    image: BLUEPRINTS_IMAGE,
    description: "A comprehensive guide to calculating and plotting SFD and BMD for determinate beams.",
    price: 450,
    purchased: false
  },
  {
    id: 2,
    title: "Soil Classification Systems: A Comprehensive Guide",
    category: "Geotechnical",
    author: "Mark D.",
    date: "Sep 28, 2023",
    readTime: "20 min read",
    image: ENGINEER_IMAGE,
    description: "Deep dive into USCS and AASHTO soil classification methods with practical examples.",
    price: 350,
    purchased: true
  },
  {
    id: 3,
    title: "Bernoulli's Principle in Real World Applications",
    category: "Fluid Mechanics",
    author: "Dr. Chen",
    date: "Nov 05, 2023",
    readTime: "12 min read",
    image: FLUIDS_IMAGE,
    description: "Exploring fluid dynamics and how Bernoulli's equation applies to pipe flow and open channels.",
    price: 280,
    purchased: false
  },
  {
    id: 4,
    title: "Design of Reinforced Concrete Beams",
    category: "Structural",
    author: "Engr. Sarah",
    date: "Nov 15, 2023",
    readTime: "25 min read",
    image: CONCRETE_IMAGE,
    description: "Step-by-step procedure for designing singly and doubly reinforced concrete beams.",
    price: 550,
    purchased: false
  },
  {
    id: 5,
    title: "Highway Geometric Design Basics",
    category: "Transportation",
    author: "Alex P.",
    date: "Oct 30, 2023",
    readTime: "18 min read",
    image: HERO_IMAGE,
    description: "Introduction to horizontal and vertical alignment, superelevation, and sight distance.",
    price: 400,
    purchased: true
  },
  {
    id: 6,
    title: "Construction Project Scheduling with CPM",
    category: "Construction",
    author: "Engr. James",
    date: "Dec 01, 2023",
    readTime: "22 min read",
    image: STUDENTS_IMAGE,
    description: "Mastering the Critical Path Method (CPM) for effective project management and timeline estimation.",
    price: 320,
    purchased: false
  },
  {
    id: 7,
    title: "Analysis of Trusses: Method of Joints vs Sections",
    category: "Structural",
    author: "Engr. Sarah",
    date: "Jan 10, 2024",
    readTime: "16 min read",
    image: BLUEPRINTS_IMAGE,
    description: "Comparative analysis of truss solving techniques to help you choose the most efficient method.",
    price: 250,
    purchased: false
  },
  {
    id: 8,
    title: "Permeability of Soils and Seepage",
    category: "Geotechnical",
    author: "Mark D.",
    date: "Jan 05, 2024",
    readTime: "14 min read",
    image: ENGINEER_IMAGE,
    description: "Understanding Darcy's Law and flow nets for analyzing seepage through earth dams.",
    price: 300,
    purchased: true
  }
];

export const LibrarySection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesCategory = activeTab === "All" || resource.category === activeTab;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePurchase = (e: React.MouseEvent, title: string, price: number) => {
    e.stopPropagation();
    toast.success(`Added "${title}" to cart`, {
      description: `Price: ₱${price}`
    });
  };

  const handleAccess = (title: string) => {
    toast.success(`Opening "${title}"`);
  };

  return (
    <section id="resources" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Study Marketplace</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse high-quality reviewers, notes, and worked examples from top contributors.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search topics..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group flex flex-col h-full cursor-pointer"
                onClick={() => resource.purchased ? handleAccess(resource.title) : null}
              >
                <div className="h-48 overflow-hidden relative shrink-0">
                  <img src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide border border-slate-100 shadow-sm">
                    {resource.category}
                  </div>
                  {!resource.purchased && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                       <div className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                         <Lock className="h-4 w-4" /> Unlock Content
                       </div>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {resource.readTime}</span>
                      <span>•</span>
                      <span>{resource.date}</span>
                    </div>
                    {resource.purchased ? (
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded font-bold uppercase">Owned</span>
                    ) : (
                      <span className="text-blue-600 font-bold text-lg">₱{resource.price}</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {resource.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                        {resource.author.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{resource.author}</span>
                    </div>
                    
                    {resource.purchased ? (
                      <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
                        Read <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => handlePurchase(e, resource.title, resource.price)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold shadow-sm"
                      >
                        <ShoppingCart className="h-4 w-4" /> Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20 text-slate-500">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No resources found</h3>
              <p>Try adjusting your search or category filter.</p>
              <button 
                onClick={() => {setActiveTab("All"); setSearchQuery("");}}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
