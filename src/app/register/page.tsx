'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    goal: "Job in Germany",
    preferredTime: "Evening"
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form');
  const [otp, setOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. ഫോം സബ്മിറ്റ് ചെയ്യുമ്പോൾ ഇമെയിലേക്ക് OTP അയക്കാൻ API കോൾ ചെയ്യുന്നു
  const handleInitialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      alert("ദയവായി ആവശ്യമായ ഫീൽഡുകളെല്ലാം പൂരിപ്പിക്കുക!");
      return;
    }

    setLoading(true);

    try {
      // സെർവർ റൂട്ടിലേക്ക് ഇമെയിൽ അയക്കുന്നു
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: formData.fullName })
      });

      const data = await res.json();

      if (res.ok) {
        setServerOtp(data.otp); // ഡെവലപ്പർ ടെസ്റ്റിംഗിനായി (പ്രൊഡക്ഷനിൽ ഇത് ഒഴിവാക്കാം)
        setStep('verify');
        alert(`വെരിഫിക്കേഷൻ കോഡ് ${formData.email} എന്ന ഇമെയിലേക്ക് അയച്ചിരിക്കുന്നു!`);
      } else {
        alert(data.error || "ഇമെയിൽ അയക്കുന്നതിൽ പരാജയപ്പെട്ടു.");
      }
    } catch (error) {
      console.error(error);
      alert("എന്തോ കുഴപ്പം സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.");
    } finally {
      setLoading(false);
    }
  };

  // 2. ഒടിപി വെരിഫൈ ചെയ്ത് അക്കൗണ്ട് സേവ് ചെയ്യുന്നു
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== serverOtp) {
      alert("നൽകിയ ഒടിപി തെറ്റാണ്!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const existingStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
      const newStudent = { 
        ...formData, 
        id: Date.now(), 
        registeredAt: new Date().toLocaleDateString(),
        isVerified: true
      };
      
      localStorage.setItem("registeredStudents", JSON.stringify([...existingStudents, newStudent]));
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-amber-400">ജർമ്മൻ അക്കാദമി രജിസ്ട്രേഷൻ</h2>
          <p className="text-gray-400 text-sm mt-1">പ്രൊഡക്ഷൻ ലെവൽ ഇമെയിൽ വെരിഫിക്കേഷൻ</p>
        </div>

        {step === 'form' && (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-semibold block mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="നിങ്ങളുടെ മുഴുവൻ പേര്"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="പാസ്‌വേർഡ്"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold block mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition text-sm mt-3"
            >
              {loading ? "ഇമെയിൽ അയക്കുന്നു..." : "Register & Send OTP ✉️"}
            </button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-4">
              <p className="text-sm text-gray-300">
                <span className="text-amber-400 font-bold">{formData.email}</span> എന്ന ഇമെയിലിലേക്ക് അയച്ച 4 അക്ക കോഡ് നൽകുക.
              </p>
            </div>
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-center text-2xl tracking-widest text-white outline-none focus:border-amber-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition text-sm"
            >
              Verify OTP 🚀
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl text-center space-y-3">
            <h3 className="font-bold text-lg">രജിസ്ട്രേഷൻ വിജയിച്ചു! 🎉</h3>
            <p className="text-xs text-gray-300">അക്കൗണ്ട് വിജയകരമായി വെരിഫൈ ചെയ്തിരിക്കുന്നു.</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm"
            >
              ലോഗിൻ ചെയ്യുക 🔑
            </button>
          </div>
        )}
      </div>
    </div>
  );
}