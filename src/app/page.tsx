import Link from 'next/link';

export default function A1Course() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#1e293b", color: "white", padding: "30px 20px", textAlign: "center", borderBottom: "1px solid #334155" }}>
        <h1 style={{ color: "#f59e0b", margin: 0, fontSize: "2.5rem" }}>German A1 Level Course</h1>
        <p style={{ margin: "10px 0 0 0", color: "#94a3b8", fontSize: "1.1rem" }}>Beginner Level Certification Training - Choose a Module to Learn</p>
      </header>

      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        
        <div style={{ marginBottom: "30px", backgroundColor: "#1e293b", padding: "20px", borderRadius: "10px", border: "1px solid #334155" }}>
          <h2 style={{ color: "#f59e0b", marginTop: 0 }}>About A1 Course</h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
            Welcome to the German A1 course. This beginner level is divided into step-by-step modules. Click on any module below to start learning the lessons, vocabulary, and grammar rules.
          </p>
          <p style={{ margin: "10px 0 0 0", color: "#38bdf8" }}><strong>Duration:</strong> 2 Months | <strong>Mode:</strong> Online Interactive Classes</p>
        </div>

        <h2 style={{ color: "#f59e0b", marginBottom: "20px" }}>Course Modules</h2>
        
        {/* Modules Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          
          <Link href="/courses/a1/module1" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", border: "1px solid #334155", transition: "0.3s", cursor: "pointer", height: "100%" }}>
              <h3 style={{ color: "#fbbf24", marginTop: 0, fontSize: "1.3rem" }}>Module 1: Alphabet & Greetings</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>Learn basic German alphabet, correct pronunciation, and common daily greetings.</p>
              <span style={{ display: "inline-block", marginTop: "15px", color: "#38bdf8", fontWeight: "bold" }}>Start Learning →</span>
            </div>
          </Link>

          <Link href="/courses/a1/module2" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", border: "1px solid #334155", transition: "0.3s", cursor: "pointer", height: "100%" }}>
              <h3 style={{ color: "#fbbf24", marginTop: 0, fontSize: "1.3rem" }}>Module 2: Numbers & Time</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>Master counting, telling time, days of the week, and months in German.</p>
              <span style={{ display: "inline-block", marginTop: "15px", color: "#38bdf8", fontWeight: "bold" }}>Start Learning →</span>
            </div>
          </Link>

          <Link href="/courses/a1/module3" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", border: "1px solid #334155", transition: "0.3s", cursor: "pointer", height: "100%" }}>
              <h3 style={{ color: "#fbbf24", marginTop: 0, fontSize: "1.3rem" }}>Module 3: Basic Grammar & Verbs</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>Understand simple sentence structures, personal pronouns, and basic verb conjugations.</p>
              <span style={{ display: "inline-block", marginTop: "15px", color: "#38bdf8", fontWeight: "bold" }}>Start Learning →</span>
            </div>
          </Link>

          <Link href="/courses/a1/module4" style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "#1e293b", padding: "25px", borderRadius: "10px", border: "1px solid #334155", transition: "0.3s", cursor: "pointer", height: "100%" }}>
              <h3 style={{ color: "#fbbf24", marginTop: 0, fontSize: "1.3rem" }}>Module 4: Everyday Conversations</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>Practice common dialogue scenarios for shopping, travelling, and introducing yourself.</p>
              <span style={{ display: "inline-block", marginTop: "15px", color: "#38bdf8", fontWeight: "bold" }}>Start Learning →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#f59e0b", color: "#0f172a", textDecoration: "none", borderRadius: "6px", fontWeight: "bold" }}>
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}