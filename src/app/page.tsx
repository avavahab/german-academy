'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans">
      <div>
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
          <div className="text-2xl font-bold text-amber-400 tracking-wide">
            German Academy
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-gray-300 font-medium items-center">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <Link href="/placement-test" className="hover:text-amber-400 transition">Placement Test</Link>
            <Link href="/courses/a1" className="hover:text-amber-400 transition">Courses</Link>
            <span className="hover:text-amber-400 transition cursor-pointer">AI Tutor</span>
          </div>

          {/* Top Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="border border-slate-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-bold py-2 px-4 rounded-lg transition text-sm inline-block">
              Login
            </Link>
            <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-5 rounded-lg transition shadow-lg text-sm inline-block">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-amber-400 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700 px-6 py-4 space-y-4 sticky top-[73px] z-40">
            <Link href="/" className="block text-gray-300 hover:text-amber-400 transition">Home</Link>
            <Link href="/placement-test" className="block text-gray-300 hover:text-amber-400 transition">Placement Test</Link>
            <Link href="/courses/a1" className="block text-gray-300 hover:text-amber-400 transition">Courses</Link>
            <span className="block text-gray-300 hover:text-amber-400 transition cursor-pointer">AI Tutor</span>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="block text-center w-1/2 border border-slate-700 text-gray-300 font-bold py-2 px-4 rounded-lg transition text-sm">
                Login
              </Link>
              <Link href="/register" className="block text-center w-1/2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-lg transition text-sm">
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            AI-Powered Digital Language Academy
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 text-white leading-tight">
            Willkommen zur <span className="text-amber-400">German Academy</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-6">
            Learn German from scratch to mastery (A1 to C2) with smart placement tests, AI personal tutoring, and bilingual support.
          </p>
          
          {/* Main Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/register" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition shadow-md text-sm inline-block"
            >
              Register Now 🚀
            </Link>
            <Link 
              href="/login" 
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-2.5 px-6 rounded-xl transition text-sm inline-block"
            >
              Login 🔑
            </Link>
            <Link 
              href="/placement-test" 
              className="border border-slate-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-bold py-2.5 px-6 rounded-xl transition text-sm inline-block"
            >
              Take Placement Test 📝
            </Link>
          </div>
        </div>

        {/* Courses Section (A1 to C2) - Compact View */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-amber-400">CEFR Level Courses</h2>
            <p className="text-gray-400 text-xs mt-1">Select your level to start learning immediately.</p>
          </div>
          
          {/* 6 ലെവലുകൾ ഒ ഒറ്റ ഫ്രെയിമിൽ കാണാനുള്ള കോഡ് */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* A1 */}
            <Link href="/courses/a1" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Beginner</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">A1</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Basics & Greetings</div>
            </Link>

            {/* A2 */}
            <Link href="/courses/a2" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Elementary</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">A2</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Routine & Shopping</div>
            </Link>

            {/* B1 */}
            <Link href="/courses/b1" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Intermediate</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">B1</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Travel & Stories</div>
            </Link>

            {/* B2 */}
            <Link href="/courses/b2" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Upper-Int.</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">B2</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Complex Texts</div>
            </Link>

            {/* C1 */}
            <Link href="/courses/c1" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Advanced</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">C1</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Academic Fluency</div>
            </Link>

            {/* C2 */}
            <Link href="/courses/c2" className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 hover:border-amber-400 transition block text-center group">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-0.5">Mastery</div>
              <div className="text-lg font-extrabold group-hover:text-amber-300 transition">C2</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-1">Near-Native</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-gray-400 py-6 px-6 text-center mt-8">
        <p className="text-xs">&copy; 2026 German Academy. All rights reserved. Built with Next.js & AI.</p>
      </footer>
    </main>
  );
}