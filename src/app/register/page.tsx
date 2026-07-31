'use client';

import { useState } from 'react';

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "", // പാസ്‌വേർഡിനായി പുതിയ ഫീൽഡ്
    phone: "",
    city: "",
    goal: "Job in Germany",
    preferredTime: "Evening"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      alert("ദയവായി പേര്, ഇമെയിൽ, പാസ്‌വേർഡ്, ഫോൺ നമ്പർ എന്നിവയെല്ലാം പൂരിപ്പിക്കുക!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
      
      // ഇമെയിൽ നേരത്തെ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ എന്ന് പരിശോധിക്കാം
      const emailExists = existingStudents.some(student => student.email === formData.email);
      if (emailExists) {
        alert("ഈ ഇമെയിൽ ഐഡി ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്. ദയവായി ലോഗിൻ ചെയ്യുക!");
        setLoading(false);
        return;
      }

      const newStudent = { 
        ...formData, 
        id: Date.now(), 
        registeredAt: new Date().toLocaleDateString() 
      };
      
      localStorage.setItem("registeredStudents", JSON.stringify([...existingStudents, newStudent]));
      
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-amber-400">ജർമ്മൻ അക്കാദമി രജിസ്ട്രേഷൻ</h2>
          <p className="text-gray-400 text-sm mt-1">അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്ത് ഞങ്ങളുടെ കോഴ്സുകൾ പഠിച്ചു തുടങ്ങൂ.</p>
        </div>

        {success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl text-center space-y-3">
            <h3 className="font-bold text-lg">രജിസ്ട്രേഷൻ വിജയിച്ചു! 🎉</h3>
            <p className="text-xs text-gray-300">നിങ്ങളുടെ അക്കൗണ്ട് വിജയകരമായി ക്രിയേറ്റ് ചെയ്തിരിക്കുന്നു. നൽകിയ ഇമെയിലും പാസ്‌വേർഡും ഉപയോഗിച്ച് നിങ്ങൾക്ക് ലോഗിൻ ചെയ്യാവുന്നതാണ്.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-semibold block mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="നിങ്ങളുടെ മുഴുവൻ പേര്"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">Create Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ഒരു പുതിയ പാസ്‌വേർഡ് നൽകുക"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">City / Location</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="സ്ഥലം (ഉദാ: Kochi)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">Learning Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                >
                  <option value="Job in Germany">Job in Germany</option>
                  <option value="Higher Studies">Higher Studies</option>
                  <option value="Family Visa">Family Visa</option>
                  <option value="General Interest">General Interest</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold block mb-1">Preferred Batch Time</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm"
                >
                  <option value="Morning">Morning Batch</option>
                  <option value="Evening">Evening Batch</option>
                  <option value="Weekend">Weekend Batch</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition text-sm mt-3"
            >
              {loading ? "അക്കൗണ്ട് ക്രിയേറ്റ് ചെയ്യുന്നു..." : "Register & Create Account 🚀"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}