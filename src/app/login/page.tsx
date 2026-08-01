'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("ദയവായി ഇമെയിലും പാസ്‌വേർഡും നൽകുക!");
      return;
    }

    setLoading(true);

    // localStorage-ൽ സേവ് ചെയ്തിട്ടുള്ള രജിസ്റ്റർ ചെയ്ത വിദ്യാർത്ഥികളുടെ വിവരങ്ങൾ പരിശോധിക്കുന്നു
    const existingStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
    
    const student = existingStudents.find(
      (s: any) => s.email === email && s.password === password
    );

    if (student) {
      // ലോഗിൻ വിജയകരമെങ്കിൽ യൂസർ ഡാറ്റ ലോക്കൽ സ്റ്റോറേജിൽ സെറ്റ് ചെയ്യാം
      localStorage.setItem("loggedInUser", JSON.stringify(student));
      alert(`സ്വാഗതം, ${student.fullName}! ലോഗിൻ വിജയിച്ചു. 🎉`);
      router.push("/placement-test");
    } else {
      alert("തെറ്റായ ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേർഡ്. ദയവായി വീണ്ടും ശ്രമിക്കുക.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-amber-400">ജർമ്മൻ അക്കാദമി ലോഗിൻ</h2>
          <p className="text-gray-400 text-sm mt-1">നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് സ്വാഗതം</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs font-semibold block mb-1">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs font-semibold block mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="നിങ്ങളുടെ പാസ്‌വേർഡ്"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition text-sm mt-2"
          >
            {loading ? "ലോഗിൻ ചെയ്യുന്നു..." : "Login 🚀"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          അക്കൗണ്ട് ഇല്ലെങ്കിൽ?{" "}
          <a href="/register" className="text-amber-400 hover:underline font-semibold">
            രജിസ്റ്റർ ചെയ്യുക
          </a>
        </p>
      </div>
    </div>
  );
}