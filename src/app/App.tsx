import React, { useState } from 'react';
import { 
  HardHat, 
  Ruler, 
  PenTool, 
  ChevronRight, 
  Menu, 
  X,
  Search,
  Library,
  GraduationCap,
  Users,
  ArrowRight,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { LibrarySection } from './components/LibrarySection';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// Images
const HERO_IMAGE = "https://images.unsplash.com/photo-1714661116916-8e44405d0c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicmlkZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwNjQ0MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const STUDENTS_IMAGE = "https://images.unsplash.com/photo-1718327453695-4d32b94c90a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGxpYnJhcnl8ZW58MXx8fHwxNzcwNjE5NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
import LOGO_URL from "figma:asset/a30b4b8898c9347d3cdd6e5fd44f75dd5ac5ed8f.png";

// Components
const Navbar = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  isLoggedIn, 
  userRole,
  onLogin, 
  onLogout,
  currentPage,
  onNavigate
}: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (o: boolean) => void;
  isLoggedIn: boolean;
  userRole: 'student' | 'admin';
  onLogin: (role: 'student' | 'admin') => void;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}) => (
  <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => isLoggedIn ? onNavigate(userRole === 'admin' ? 'admin-dashboard' : 'dashboard') : window.scrollTo(0, 0)}
        >
          <img src={LOGO_URL} alt="DPL CiviNotes" className="h-14 w-auto" />
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          {!isLoggedIn ? (
            <>
           <button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("topics")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="text-slate-600 hover:bg-blue-700 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg"
>
  Topics
</button>

<button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("resources")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="text-slate-600 hover:bg-blue-700 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg"
>
  Resources
</button>

<button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="text-slate-600 hover:bg-blue-700 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg"
>
  About Us
</button>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onLogin('student')}
                  className="text-slate-600 hover:bg-blue-700 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg"
                >
                  Log in
                </button>
                <button 
                  onClick={() => onLogin('student')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </button>
              </div>
            </>
          ) : (
            <>
              {userRole === 'student' ? (
                // Student Navigation
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'dashboard' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </button>
                  <button 
                    onClick={() => onNavigate('library')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'library' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <Library className="h-4 w-4" /> Library
                  </button>
                  <button 
                    onClick={() => onNavigate('groups')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'groups' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <Users className="h-4 w-4" /> Study Groups
                  </button>
                </div>
              ) : (
                // Admin Navigation
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => onNavigate('admin-dashboard')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'admin-dashboard' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" /> Overview
                  </button>
                  <button 
                    onClick={() => onNavigate('admin-content')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'admin-content' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Library className="h-4 w-4" /> Content
                  </button>
                  <button 
                    onClick={() => onNavigate('admin-users')}
                    className={`font-medium flex items-center gap-1 transition-colors ${
                      currentPage === 'admin-users' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Users className="h-4 w-4" /> Users
                  </button>
                </div>
              )}

              {userRole === 'student' && (
                <div className="relative hidden lg:block w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search notes, topics..."
                    className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold border ${
                    userRole === 'admin' 
                      ? 'bg-slate-800 text-white border-slate-700' 
                      : 'bg-blue-100 text-blue-700 border-blue-200'
                  }`}>
                    {userRole === 'admin' ? 'A' : 'A'}
                  </div>
                  <span className="font-medium text-slate-700">
                    {userRole === 'admin' ? 'Admin' : 'Louviepan'}
                  </span>
                </div>
                  <button 
                  onClick={onLogout}
                  className="text-slate-400 hover:text-slate-600"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-b border-slate-200">
        <div className="px-4 pt-2 pb-6 space-y-2">
          {!isLoggedIn ? (
            <>
              <a href="#topics" className="block px-3 py-2 text-slate-600 font-medium">Topics</a>
              <a href="#resources" className="block px-3 py-2 text-slate-600 font-medium">Resources</a>
              <a href="#about" className="block px-3 py-2 text-slate-600 font-medium">About Us</a>
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => { onLogin('student'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 text-slate-600 font-medium border border-slate-200 rounded-lg"
                >
                  Student Login
                </button>
                <button 
                  onClick={() => { onLogin('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2 bg-slate-800 text-white font-medium rounded-lg"
                >
                  Admin Portal
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 pb-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {userRole === 'student' ? (
                <>
                  <button 
                    onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 font-medium ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-slate-600'}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => { onNavigate('library'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 font-medium ${currentPage === 'library' ? 'text-blue-600' : 'text-slate-600'}`}
                  >
                    Library
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 font-medium ${currentPage === 'admin-dashboard' ? 'text-slate-900' : 'text-slate-600'}`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => { onNavigate('admin-content'); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 font-medium ${currentPage === 'admin-content' ? 'text-slate-900' : 'text-slate-600'}`}
                  >
                    Content Management
                  </button>
                </>
              )}
              
              <div className="pt-4 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-3 px-3 mb-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                    userRole === 'admin' ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {userRole === 'admin' ? 'A' : 'L'}
                  </div>
                  <span className="font-medium text-slate-700">{userRole === 'admin' ? 'Administrator' : 'Louviepan'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </nav>
);

const Hero = ({ onGetStarted, onAdminLogin }: { onGetStarted: () => void, onAdminLogin: () => void }) => (
  <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={HERO_IMAGE} 
        alt="Modern Bridge" 
        className="w-full h-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
          <GraduationCap className="h-4 w-4" />
          <span>Made for Civil Engineering Students</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Welcome to <span className="text-blue-600">DPL CiviNotes</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          DPL CiviNotes provides high-quality online reviewers and study notes specially made for Civil Engineering students. To make difficult civil engineering topics understandable, DPL CiviNotes offers brief explanations, worked examples, and insights that are both practical and in line with school standards.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all hover:scale-105"
          >
            Login
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
             onClick={onAdminLogin}
             className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-all"
          >
            <ShieldCheck className="mr-2 h-5 w-5 text-slate-400" />
            Admin Demo
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => (
  <section className="py-16 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose DPL CiviNotes?</h2>
        <p className="text-slate-600 text-lg">
          We bridge the gap between complex theory and practical understanding.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={BookOpen}
          title="School-Aligned Content"
          description="Reviewers and notes are structured to match standard civil engineering curricula, ensuring relevance to your coursework."
        />
        <FeatureCard 
          icon={PenTool}
          title="Practical Insights"
          description="Beyond theory, we provide worked examples and practical applications to help you understand the 'why' and 'how'."
        />
        <FeatureCard 
          icon={Users}
          title="Student-Centric"
          description="Created by fellow students who understand the struggle, transforming difficult topics into digestible content."
        />
      </div>
    </div>
  </section>
);

const TopicCard = ({ title, count, color, icon: Icon }: { title: string, count: string, color: string, icon: any }) => (
  <div className="group cursor-pointer">
    <div className={`h-40 rounded-2xl ${color} p-6 relative overflow-hidden transition-transform group-hover:-translate-y-1`}>
      <Icon className="absolute right-4 bottom-4 h-24 w-24 opacity-10 text-slate-900" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="bg-white/20 w-fit p-2 rounded-lg backdrop-blur-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{count} Resources</p>
        </div>
      </div>
    </div>
  </div>
);

const Topics = () => (
  <section id="topics" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Subjects</h2>
          <p className="text-slate-600 max-w-xl">
            Explore our comprehensive library organized by key civil engineering disciplines.
          </p>
        </div>
        <a href="#resources" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700">
          View All Subjects <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TopicCard 
          title="Structural Engineering" 
          count="42" 
          color="bg-slate-800"
          icon={Ruler}
        />
        <TopicCard 
          title="Geotechnical" 
          count="28" 
          color="bg-amber-700"
          icon={HardHat}
        />
        <TopicCard 
          title="Fluid Mechanics" 
          count="35" 
          color="bg-blue-600"
          icon={PenTool} 
        />
        <TopicCard 
          title="Transportation" 
          count="19" 
          color="bg-emerald-600"
          icon={Library}
        />
      </div>
      
      <div className="mt-8 md:hidden text-center">
        <a href="#resources" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
          View All Subjects <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-full blur-2xl"></div>
          <img 
            src={STUDENTS_IMAGE} 
            alt="Students Studying" 
            className="rounded-2xl shadow-2xl relative z-10 rotate-1 hover:rotate-0 transition-transform duration-500"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Built by Students, For Students</h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
            <p>
              DPL CiviNotes was born from a simple idea: difficult civil engineering topics shouldn't be a barrier to your success.
            </p>
            <p>
              We know the struggle of deciphering complex textbooks. That's why we create reviewers that offer brief explanations, worked examples, and insights that are practical and in line with school standards.
            </p>
            <p>
              Our mission is to help you lay a solid groundwork, enhance your problem-solving abilities, and study more effectively at any time, from any place.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 flex gap-8">
            <div>
              <span className="block text-3xl font-bold text-blue-600">500+</span>
              <span className="text-slate-500 text-sm">Study Notes</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-blue-600">2k+</span>
              <span className="text-slate-500 text-sm">Active Students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={LOGO_URL} alt="DPL CiviNotes" className="h-16 w-auto" />
          </div>
          <p className="text-slate-400 max-w-sm mb-6">
            Empowering civil engineering students with high-quality, accessible reviewers and study materials.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#topics" className="hover:text-blue-400 transition-colors">Browse Topics</a></li>
            <li><a href="#resources" className="hover:text-blue-400 transition-colors">Latest Notes</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Study Guides</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} DPL CiviNotes. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const isLoggedIn =
    path === "/dashboard" ||
    path === "/library" ||
    path === "/groups" ||
    path === "/admin";

  const userRole: 'student' | 'admin' =
    path === "/admin" ? "admin" : "student";

  const currentPage =
    path === "/library"
      ? "library"
      : path === "/groups"
      ? "groups"
      : path === "/admin"
      ? "admin-dashboard"
      : "dashboard";

  const handleLogin = (role: 'student' | 'admin' = 'student') => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }

    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'dashboard':
        navigate('/dashboard');
        break;

      case 'library':
        navigate('/library');
        break;

      case 'groups':
        navigate('/groups');
        break;

      case 'admin-dashboard':
      case 'admin-content':
      case 'admin-users':
        navigate('/admin');
        break;

      default:
        navigate('/');
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Hero
                onGetStarted={() => handleLogin('student')}
                onAdminLogin={() => handleLogin('admin')}
              />

               <Features />
                  <section id="topics">
                    <Topics />
                  </section>
                  
                  <section id="resources">
                    <LibrarySection />
                  </section>
                  
                  <section id="about">
                    <About />
                  </section>
            </>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Library */}
        <Route
          path="/library"
          element={
            <div className="pt-24 min-h-screen">
              <LibrarySection />
            </div>
          }
        />

        {/* Groups */}
        <Route
          path="/groups"
          element={
            <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
              <div className="bg-slate-50 p-6 rounded-full mb-6">
                <Users className="h-16 w-16 text-blue-600" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Study Groups
              </h2>

              <p className="text-slate-600 max-w-md">
                Join a community of students to discuss topics and prepare for exams together. This feature is coming soon!
              </p>

              <button
                onClick={() => handleNavigate('dashboard')}
                className="mt-8 text-blue-600 font-medium hover:underline"
              >
                Return to Dashboard
              </button>
            </div>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

      <Footer />
    </div>
  );
}
