'use client';

import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
          <div className="text-xl font-bold text-amber-400">
            German Academy
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-300 font-medium">
            <a href="#" className="hover:text-amber-400 transition">Home</a>
            <a href="#" className="hover:text-amber-400 transition">Why Us</a>
            <a href="#" className="hover:text-amber-400 transition">Courses</a>
            <a href="#" className="hover:text-amber-400 transition">Contact</a>
          </div>

          <div className="hidden md:block">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg transition text-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
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
            <a href="#" className="block text-gray-300 hover:text-amber-400 transition">Home</a>
            <a href="#" className="block text-gray-300 hover:text-amber-400 transition">Why Us</a>
            <a href="#" className="block text-gray-300 hover:text-amber-400 transition">Courses</a>
            <a href="#" className="block text-gray-300 hover:text-amber-400 transition">Contact</a>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg transition text-sm">
              Get Started
            </button>
          </div>
        )}

        <div className="p-4 md:p-8">
          {/* Header / Hero Section */}
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">
              Willkommen zur German Academy
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Learn German online easily and master the language from beginner to advanced levels.
            </p>
            <div className="space-x-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition">
                Explore Courses
              </button>
              <button className="border border-amber-500 hover:bg-amber-500 hover:text-black text-amber-400 font-bold py-3 px-6 rounded-lg transition mt-3 md:mt-0">
                Contact Us
              </button>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-amber-400">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <h3 className="text-xl font-bold mb-2 text-amber-300">Expert Trainers</h3>
                <p className="text-gray-300">Learn from certified and experienced German language experts with proven teaching methods.</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <h3 className="text-xl font-bold mb-2 text-amber-300">Interactive Classes</h3>
                <p className="text-gray-300">Engaging online sessions focusing on speaking, listening, reading, and writing skills.</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <h3 className="text-xl font-bold mb-2 text-amber-300">Exam Preparation</h3>
                <p className="text-gray-300">Special coaching and mock tests for international Goethe/TELC certification exams.</p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-amber-400">
              All German Courses (A1 to C2)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German A1</h3>
                <p className="text-gray-300 mb-4">Beginner level focusing on basic communication, grammar, and everyday vocabulary.</p>
                <span className="text-amber-400 font-semibold">Duration: 2 Months</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German A2</h3>
                <p className="text-gray-300 mb-4">Elementary level to improve sentence structures and routine conversations.</p>
                <span className="text-amber-400 font-semibold">Duration: 2 Months</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German B1</h3>
                <p className="text-gray-300 mb-4">Intermediate level for independent communication and workplace readiness.</p>
                <span className="text-amber-400 font-semibold">Duration: 3 Months</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German B2</h3>
                <p className="text-gray-300 mb-4">Upper-intermediate level for fluent professional communication and technical discussions.</p>
                <span className="text-amber-400 font-semibold">Duration: 3 Months</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German C1</h3>
                <p className="text-gray-300 mb-4">Advanced level for complex academic and high-level professional environments.</p>
                <span className="text-amber-400 font-semibold">Duration: 4 Months</span>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-2 text-amber-300">German C2</h3>
                <p className="text-gray-300 mb-4">Mastery level achieving near-native fluency, precision, and deep stylistic command.</p>
                <span className="text-amber-400 font-semibold">Duration: 4 Months</span>
              </div>
            </div>
          </div>

          {/* Contact / Inquiry Section */}
          <div className="max-w-4xl mx-auto py-12">
            <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 text-center">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">Get in Touch With Us</h2>
              <p className="text-gray-300 mb-6">Have questions about our German courses or want to enroll? Send us a message!</p>
              <div className="flex flex-col md:flex-row justify-center gap-6 text-left">
                <div className="bg-slate-900 p-6 rounded-xl flex-1 border border-slate-700">
                  <h3 className="text-xl font-bold mb-2 text-amber-300">Contact Info</h3>
                  <p className="text-gray-300 mb-2">📍 Location: Online & Kerala, India</p>
                  <p className="text-gray-300 mb-2">📧 Email: info@germanacademy.com</p>
                  <p className="text-gray-300">📞 Phone: +91 98765 43210</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl flex-1 border border-slate-700 flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-bold mb-2 text-amber-300">Ready to Start Learning?</h3>
                  <p className="text-gray-300 mb-4">Book your first consultation session today.</p>
                  <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-slate-950 border-t border-slate-800 text-gray-400 py-8 px-6 md:px-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-1">German Academy</h3>
            <p className="text-sm text-gray-400">Master the German language with expert guidance.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-amber-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition">Support</a>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2026 German Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}