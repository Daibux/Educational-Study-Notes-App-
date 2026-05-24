import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  TrendingUp, 
  MoreVertical, 
  PlayCircle,
  Award,
  Calendar,
  ChevronRight,
  Search,
  CheckCircle2,
  Plus,
  Edit3,
  X,
  Folder,
  FileText,
  Video,
  GraduationCap as GradCap,
  Calculator,
  ArrowLeft,
  Download,
  ExternalLink,
  ShoppingCart,
  Trash2,
  Trophy,
  Medal,
  Target,
  Zap
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Reusing images
const HERO_IMAGE = "https://images.unsplash.com/photo-1714661116916-8e44405d0c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicmlkZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwNjQ0MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const BLUEPRINTS_IMAGE = "https://images.unsplash.com/photo-1758574697284-8e84046a45ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50c3xlbnwxfHx8fDE3NzA2NDQxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const ENGINEER_IMAGE = "https://images.unsplash.com/photo-1694522362256-6c907336af43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZW5naW5lZXIlMjBoZWxtZXR8ZW58MXx8fHwxNzcwNjQ0MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const MOCK_FOLDERS = [
  { id: 'videos', title: "Video Lectures", count: 45, icon: Video, color: "bg-rose-50 text-rose-600" },
  { id: 'reviewers', title: "Purchased Notes", count: 8, icon: FileText, color: "bg-amber-50 text-amber-600" },
  { id: 'exams', title: "Problem Sets", count: 15, icon: GradCap, color: "bg-emerald-50 text-emerald-600" },
  { id: 'formulas', title: "Formulas", count: 3, icon: Calculator, color: "bg-purple-50 text-purple-600" },
  { id: 'cart', title: "My Cart", count: 2, icon: ShoppingCart, color: "bg-indigo-50 text-indigo-600" },
];

const FOLDER_CONTENTS: Record<string, any[]> = {
  videos: [
    { id: 1, title: "Intro to Structural Analysis", duration: "45:20", author: "Dr. Smith", views: 1200 },
    { id: 2, title: "Fluid Dynamics Basics", duration: "32:15", author: "Prof. Chen", views: 850 },
    { id: 3, title: "Soil Mechanics Lab 101", duration: "1:15:00", author: "Engr. Sarah", views: 2100 },
    { id: 4, title: "Concrete Mix Design Calculation", duration: "28:45", author: "Engr. James", views: 500 },
  ],
  reviewers: [
    { id: 2, title: "Hydraulics Master Guide", type: "PDF", size: "8 MB" },
    { id: 3, title: "Structural Design Codes (NSCP 2015)", type: "PDF", size: "25 MB" },
    { id: 4, title: "Surveying Formulas Cheat Sheet", type: "PDF", size: "2 MB" },
  ],
  exams: [
    { id: 1, title: "Structural Analysis Midterms 2023", score: "85/100", date: "Oct 15, 2023" },
    { id: 2, title: "Geotech Finals 2022", score: "92/100", date: "Dec 10, 2022" },
    { id: 3, title: "Fluid Mechanics Quiz 1", score: "18/20", date: "Sep 05, 2023" },
    { id: 4, title: "CE Board Exam Reviewer 2023", type: "PDF", size: "15 MB" },
  ],
  formulas: [
    { id: 1, title: "Essential Structural Formulas", tags: ["Beams", "Columns", "Trusses"] },
    { id: 2, title: "Geotech Parameters", tags: ["Soil", "Foundations"] },
    { id: 3, title: "Fluid Properties", tags: ["Viscosity", "Pressure"] },
  ],
  cart: [
    { id: 1, title: "Advanced Hydraulics", price: "₱49", type: "Notes", author: "Dr. Roberts" },
    { id: 2, title: "Structural Analysis II Series", price: "₱49", type: "Video Course", author: "Engr. James" },
  ]
};

const MOCK_RECENT_ACTIVITY = [
  {
    id: 1,
    title: "Understanding Shear Force & Bending Moment Diagrams",
    category: "Structural",
    progress: 75,
    lastAccessed: "2 hours ago",
    image: BLUEPRINTS_IMAGE,
    type: "Purchased"
  },
  {
    id: 2,
    title: "Soil Classification Systems",
    category: "Geotechnical",
    progress: 30,
    lastAccessed: "Yesterday",
    image: ENGINEER_IMAGE,
    type: "Purchased"
  },
  {
    id: 3,
    title: "Highway Geometric Design Basics",
    category: "Transportation",
    progress: 10,
    lastAccessed: "3 days ago",
    image: HERO_IMAGE,
    type: "Purchased"
  }
];

const MOCK_FAVORITES = [
  { id: 1, title: "Bernoulli's Principle", type: "Note" },
  { id: 2, title: "Design of Reinforced Concrete", type: "Reviewer" },
  { id: 3, title: "Construction Project Scheduling", type: "Case Study" },
  { id: 4, title: "Analysis of Trusses", type: "Note" },
  { id: 5, title: "Fluid Dynamics Basics", type: "Video" },
  { id: 6, title: "Geotech Lab Manual", type: "PDF" }
];

const MOCK_SCHEDULE = [
  { id: 1, title: "Geotech Finals Prep", time: "Tomorrow, 4:00 PM", type: "Group" },
  { id: 2, title: "Structural Analysis Quiz", time: "Friday, 10:00 AM", type: "Exam" },
  { id: 3, title: "Submit Fluid Mech Project", time: "Mon, 11:59 PM", type: "Deadline" }
];

const MOCK_BADGES = [
  { id: 1, title: "Fast Learner", description: "Completed 5 topics in one day", icon: Zap, color: "bg-amber-400" },
  { id: 2, title: "Structural Master", description: "Scored 100% on Structural Analysis quiz", icon: Trophy, color: "bg-yellow-500" },
  { id: 3, title: "Consistent", description: "Studied for 7 days in a row", icon: Calendar, color: "bg-blue-500" },
  { id: 4, title: "Top 10%", description: "Ranked in the top 10% of students", icon: Medal, color: "bg-emerald-500" },
];

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-2">
      <div className={`h-10 w-10 flex items-center justify-center rounded-xl ${color} shadow-sm`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      {trend && (
        <div className="flex items-center text-emerald-600 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">
          <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
          {trend}
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-0.5">{value}</div>
    <div className="text-slate-500 text-xs">{label}</div>
  </div>
);

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [goal, setGoal] = useState(5);
  const [progress, setProgress] = useState(4);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(5);
  const [showAllSaved, setShowAllSaved] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleResume = () => {
    toast.success("Resuming 'Shear Force & Bending Moment Diagrams'", {
      description: "Picking up where you left off..."
    });
  };

  const handleSaveGoal = () => {
    setGoal(tempGoal);
    setIsEditingGoal(false);
    toast.success("Weekly goal updated!");
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setSelectedFolder(null);
  };

  const displayedFavorites = showAllSaved ? MOCK_FAVORITES : MOCK_FAVORITES.slice(0, 4);

  // Render Folder Content Helper
  const renderFolderContent = () => {
    if (!selectedFolder) return null;
    
    const folderInfo = MOCK_FOLDERS.find(f => f.id === selectedFolder);
    const contents = FOLDER_CONTENTS[selectedFolder] || [];
    const Icon = folderInfo?.icon || Folder;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={handleBackToDashboard}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${folderInfo?.color || 'bg-slate-100'}`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{folderInfo?.title}</h2>
                <p className="text-slate-500">{contents.length} Items</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {contents.length > 0 ? (
              contents.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="p-4 sm:p-6 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center justify-between"
                  onClick={() => toast.success(selectedFolder === 'cart' ? `Removed ${item.title}` : `Opened ${item.title}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {selectedFolder === 'videos' ? <PlayCircle className="h-5 w-5" /> : 
                       selectedFolder === 'reviewers' ? <FileText className="h-5 w-5" /> :
                       selectedFolder === 'cart' ? <ShoppingCart className="h-5 w-5" /> :
                       <Folder className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        {item.updated && <span>Updated {item.updated}</span>}
                        {item.duration && <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {item.duration}</span>}
                        {item.author && <span>by {item.author}</span>}
                        {item.type && <span className="uppercase bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide">{item.type}</span>}
                        {item.size && <span>{item.size}</span>}
                        {item.score && <span className="text-emerald-600 font-bold">{item.score}</span>}
                        {item.date && <span>{item.date}</span>}
                        {item.price && <span className="text-blue-600 font-bold">{item.price}</span>}
                        {item.status && (
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {selectedFolder === 'reviewers' && (
                      <button className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-full text-slate-400" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                    {selectedFolder === 'cart' ? (
                       <button className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full text-slate-400" title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500">
                <Folder className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>This folder is empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {selectedFolder ? "Study Materials" : "Welcome back, Louviepan! 👋"}
            </h1>
            <p className="text-slate-600 mt-1">
              {selectedFolder ? "Browse your collected resources." : "Here's what's happening with your learning today."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 hidden sm:inline">Last login: Today, 9:41 AM</span>
            <button 
              onClick={handleResume}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm hover:shadow active:scale-95 transform"
            >
              Resume Studying
            </button>
          </div>
        </div>

        {/* Dashboard Tabs - Hide when in folder view */}
        {!selectedFolder && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {['overview', 'my-learning', 'schedule', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        )}

        {selectedFolder ? (
          renderFolderContent()
        ) : (
          <>
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    icon={BookOpen} 
                    label="Notes Read" 
                    value="24" 
                    trend="+3 this week"
                    color="bg-blue-600"
                  />
                  <StatCard 
                    icon={Clock} 
                    label="Hours Studied" 
                    value="18.5" 
                    trend="+2.4 hrs"
                    color="bg-amber-500"
                  />
                  <StatCard 
                    icon={Star} 
                    label="Favorites" 
                    value="12" 
                    color="bg-purple-600"
                  />
                  <StatCard 
                    icon={Award} 
                    label="Topics Mastered" 
                    value="7" 
                    trend="+1 this week"
                    color="bg-emerald-600"
                  />
                </div>

                {/* Quick Access Folders */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-lg font-bold text-slate-900">My Library</h2>
                    <button className="text-blue-600 text-sm font-medium hover:underline">Manage</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MOCK_FOLDERS.map((folder) => (
                      <div 
                        key={folder.id} 
                        className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
                        onClick={() => handleFolderClick(folder.id)}
                      >
                        <div className={`p-4 rounded-full ${folder.color} mb-4 group-hover:scale-110 transition-transform`}>
                          <folder.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{folder.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{folder.count} items</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  
                  {/* Main Content Area */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Continue Learning */}
                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recent Purchases</h2>
                        <button className="text-blue-600 text-sm font-semibold hover:underline">View History</button>
                      </div>
                      
                      <div className="space-y-4">
                        {MOCK_RECENT_ACTIVITY.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer group"
                            onClick={() => toast.success(`Opening ${item.title}`)}
                          >
                            <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden shrink-0 relative">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              <div className="absolute top-1 left-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                Owned
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">{item.category}</span>
                                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">{item.title}</h3>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full">
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex-grow bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-medium text-slate-600 whitespace-nowrap">{item.progress}% read</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Recommended */}
                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recommended For You</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div 
                          className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => toast.success("Added 'Advanced Hydraulics' to cart")}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">₱49</span>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-1">Advanced Hydraulics</h3>
                          <p className="text-sm text-slate-500 mb-3">Master open channel flow concepts.</p>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="h-3 w-3 mr-1" /> 25 min read
                          </div>
                        </div>
                        
                        <div 
                          className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => toast.success("Added 'Structural Analysis II' to cart")}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                              <PlayCircle className="h-5 w-5 text-amber-500" />
                            </div>
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">₱49</span>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-1">Structural Analysis II</h3>
                          <p className="text-sm text-slate-500 mb-3">Video series on indeterminate structures.</p>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="h-3 w-3 mr-1" /> 45 min watch
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    
                    {/* Weekly Goal */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                      
                      <h3 className="font-bold text-lg mb-2 relative z-10">Weekly Goal</h3>
                      <p className="text-blue-100 text-sm mb-4 relative z-10">
                        {progress >= goal ? "Goal reached! 🎉" : "You're making great progress!"}
                      </p>
                      
                      {!isEditingGoal ? (
                        <>
                          <div className="flex justify-between items-end mb-2 relative z-10">
                            <span className="text-3xl font-bold">{progress}/{goal}</span>
                            <span className="text-blue-200 text-sm mb-1">topics</span>
                          </div>
                          <div className="bg-blue-800/50 h-2 rounded-full overflow-hidden mb-4 relative z-10">
                            <div 
                              className="bg-white h-full rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${Math.min((progress / goal) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <button 
                            onClick={() => { setTempGoal(goal); setIsEditingGoal(true); }}
                            className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors relative z-10"
                          >
                            Edit Goal
                          </button>
                        </>
                      ) : (
                        <div className="bg-white/10 p-3 rounded-xl relative z-10">
                          <label className="text-xs text-blue-100 block mb-2">Set new target (topics):</label>
                          <div className="flex items-center gap-2 mb-3">
                            <button 
                              onClick={() => setTempGoal(Math.max(1, tempGoal - 1))}
                              className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                            >
                              -
                            </button>
                            <span className="text-xl font-bold w-8 text-center">{tempGoal}</span>
                            <button 
                              onClick={() => setTempGoal(tempGoal + 1)}
                              className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setIsEditingGoal(false)}
                              className="flex-1 py-1.5 bg-transparent border border-white/30 rounded-lg text-xs hover:bg-white/10"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={handleSaveGoal}
                              className="flex-1 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-50"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Saved Items */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Saved Items</h2>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-bold">{MOCK_FAVORITES.length}</span>
                      </div>
                      
                      <div className="space-y-1">
                        {displayedFavorites.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="text-amber-400">
                                <Star className="h-4 w-4 fill-current" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                <span className="text-xs text-slate-500">{item.type}</span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                          </div>
                        ))}
                 </div>
                      {MOCK_FAVORITES.length > 4 && (
                        <button 
                          onClick={() => setShowAllSaved(!showAllSaved)}
                          className="w-full mt-4 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {showAllSaved ? "Show Less" : "View All Saved"}
                        </button>
                      )}
                    </div>
                  <div>
                      <button
                        style={{
                          backgroundColor: "#2563eb",
                          color: "white",
                          padding: "12px 24px",
                          border: "none",
                          borderRadius: "10px",
                          fontSize: "16px",
                          fontWeight: 600,
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Apply as Contributor
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'my-learning' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">My Learning Progress</h2>
                  <div className="space-y-6">
                    {MOCK_RECENT_ACTIVITY.map((item) => (
                      <div key={item.id} className="block group">
                        <div className="flex gap-4 sm:gap-6">
                          <div className="w-24 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">{item.category}</span>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                              </div>
                              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{item.type}</span>
                            </div>
                            
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                              <div 
                                className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-500">
                              <span>{item.progress}% Complete</span>
                              <span>Last accessed {item.lastAccessed}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add some more mock items for "completed" state */}
                     <div className="block group opacity-75 hover:opacity-100 transition-opacity">
                        <div className="flex gap-4 sm:gap-6">
                          <div className="w-24 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden shrink-0 relative">
                             <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center text-white font-bold">
                               <CheckCircle2 className="h-8 w-8" />
                             </div>
                            <img src={HERO_IMAGE} alt="Completed Course" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1 block">Surveying</span>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Fundamentals of Surveying</h3>
                              </div>
                              <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Completed</span>
                            </div>
                            
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-500">
                              <span>100% Complete</span>
                              <span className="text-emerald-600 font-medium">Certificate Earned</span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
                    <div className="space-y-4">
                      {MOCK_SCHEDULE.map((event) => (
                        <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                          <div className={`h-12 w-12 rounded-xl flex flex-col items-center justify-center border shrink-0 ${
                            event.type === 'Exam' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                            event.type === 'Deadline' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                            'bg-blue-50 border-blue-200 text-blue-600'
                          }`}>
                            <span className="text-xs font-bold uppercase">{event.time.split(',')[0].slice(0, 3)}</span>
                            <span className="text-lg font-bold leading-none">12</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                               event.type === 'Exam' ? 'bg-rose-100 text-rose-700' :
                               event.type === 'Deadline' ? 'bg-amber-100 text-amber-700' :
                               'bg-blue-100 text-blue-700'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      ))}
                      <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-medium text-slate-600 transition-colors border border-slate-200 border-dashed">
                        + Add New Event
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                     <h2 className="text-xl font-bold text-slate-900 mb-6">Study Calendar</h2>
                     <div className="text-center py-10">
                        <Calendar className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">Calendar View</h3>
                        <p className="text-slate-500 mb-4">Sync your exam schedules and deadlines.</p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                           Connect Calendar
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-8">
                     <div>
                       <h2 className="text-xl font-bold text-slate-900">Your Achievements</h2>
                       <p className="text-slate-600">You've earned 4 out of 20 badges</p>
                     </div>
                     <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center border-4 border-yellow-50">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                     </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_BADGES.map((badge) => (
                      <div key={badge.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all">
                        <div className={`h-16 w-16 rounded-full ${badge.color} flex items-center justify-center mb-3 shadow-sm`}>
                          <badge.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{badge.title}</h3>
                        <p className="text-xs text-slate-500">{badge.description}</p>
                      </div>
                    ))}
                    
                    {/* Locked Badges */}
                    {[1, 2, 3, 4].map((i) => (
                       <div key={`locked-${i}`} className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-dashed flex flex-col items-center text-center opacity-60 grayscale">
                        <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center mb-3">
                          <Target className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">Locked Badge</h3>
                        <p className="text-xs text-slate-500">Keep studying to unlock!</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
