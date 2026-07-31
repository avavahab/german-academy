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
            <Link href="/register" className="text-amber-400 font-semibold hover:underline">Register</Link>
            <span className="hover:text-amber-400 transition cursor-pointer">Courses</span>
            <span className="hover:text-amber-400 transition cursor-pointer">AI Tutor</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-5 rounded-lg transition shadow-lg text-sm inline-block">
              Register Now
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
            <Link href="/register" className="block text-amber-400 font-semibold transition">Register</Link>
            <span className="block text-gray-300 hover:text-amber-400 transition cursor-pointer">Courses</span>
            <span className="block text-gray-300 hover:text-amber-400 transition cursor-pointer">AI Tutor</span>
            <Link href="/register" className="block text-center w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-lg transition text-sm">
              Register Now
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            AI-Powered Digital Language Academy
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-6 text-white leading-tight">
            Willkommen zur <span className="text-amber-400">German Academy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Learn German from scratch to mastery (A1 to C2) with smart placement tests, AI personal tutoring, and bilingual support.
          </p>
          
          {/* Action Buttons including Register */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-8 rounded-xl transition shadow-lg text-lg text-center inline-block"
            >
              Register & Join 🚀
            </Link>
            <Link 
              href="/placement-test" 
              className="border border-slate-700 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-bold py-3 px-8 rounded-xl transition text-lg text-center inline-block"
            >
              Take Placement Test
            </Link>
          </div>
        </div>

        {/* Courses Section (A1 to C2) */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-400">CEFR Level Courses</h2>
          <p className="text-gray-400 text-center mb-12">Select your level or let our placement test guide you.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/courses/a1" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Beginner Level</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German A1</h3>
              <p className="text-gray-400 text-sm mb-4">Alphabet, basic greetings, self-introduction, and simple everyday phrases.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Start Learning →</span>
            </Link>

            <Link href="/courses/a2" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Elementary Level</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German A2</h3>
              <p className="text-gray-400 text-sm mb-4">Routine sentences, shopping, local geography, and personal background.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Explore Level →</span>
            </Link>

            <Link href="/courses/b1" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Intermediate Level</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German B1</h3>
              <p className="text-gray-400 text-sm mb-4">Travel situations, describing experiences, dreams, and brief justifications.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Explore Level →</span>
            </Link>

            <Link href="/courses/b2" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Upper-Intermediate</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German B2</h3>
              <p className="text-gray-400 text-sm mb-4">Complex texts, technical discussions, and fluent native interactions.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Explore Level →</span>
            </Link>

            <Link href="/courses/c1" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Advanced Level</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German C1</h3>
              <p className="text-gray-400 text-sm mb-4">Implicit meanings, academic fluency, and professional flexibility.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Explore Level →</span>
            </Link>

            <Link href="/courses/c2" className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400 transition block group shadow-md">
              <div className="text-amber-400 font-bold text-sm mb-1">Mastery Level</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition">German C2</h3>
              <p className="text-gray-400 text-sm mb-4">Near-native command, precision, and nuanced expression in all domains.</p>
              <span className="text-amber-400 text-sm font-semibold inline-flex items-center gap-1">Explore Level →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-gray-400 py-8 px-6 text-center mt-12">
        <p className="text-sm">&copy; 2026 German Academy. All rights reserved. Built with Next.js & AI.</p>
      </footer>
    </main>
  );
}