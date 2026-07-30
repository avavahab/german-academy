import Link from 'next/link';

export default function Module1() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#1e293b", color: "white", padding: "30px 20px", textAlign: "center", borderBottom: "1px solid #334155" }}>
        <h1 style={{ color: "#f59e0b", margin: 0, fontSize: "2.2rem" }}>A1 - Module 1: Alphabet & Greetings</h1>
        <p style={{ margin: "10px 0 0 0", color: "#94a3b8" }}>German Academy - Beginner Level Training</p>
      </header>

      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", backgroundColor: "#1e293b", borderRadius: "10px", border: "1px solid #334155" }}>
        <h2 style={{ color: "#fbbf24", marginTop: 0 }}>Lesson Content</h2>
        <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
          In this module, you will learn the fundamentals of the German alphabet (Das Alphabet), correct pronunciation rules, and how to greet people formally and informally.
        </p>

        <h3 style={{ color: "#38bdf8", marginTop: "20px" }}>Topics Covered:</h3>
        <ul style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
          <li>German Alphabet (A to Z) and Umlauts (ä, ö, ü, ß)</li>
          <li>Basic Greetings: Guten Morgen, Hallo, Tschüss</li>
          <li>Formal vs Informal: "Sie" and "du"</li>
          <li>Simple introductory phrases</li>
        </ul>

        <div style={{ marginTop: "30px" }}>
          <Link href="/courses/a1" style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#f59e0b", color: "#0f172a", textDecoration: "none", borderRadius: "6px", fontWeight: "bold" }}>
            ← Back to A1 Modules
          </Link>
        </div>
      </div>
    </div>
  );
}