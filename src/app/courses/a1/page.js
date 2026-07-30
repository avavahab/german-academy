export default function A1Course() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#faf8f5", color: "#333", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#1e293b", color: "white", padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#f59e0b", margin: 0 }}>German A1 Level Course</h1>
        <p style={{ margin: "10px 0 0 0" }}>Beginner Level Certification Training</p>
      </header>

      <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h2>About A1 Course</h2>
        <p>Welcome to the German A1 course. This is the beginner level where you will learn basic grammar, everyday expressions, and simple sentences to introduce yourself and others.</p>
        
        <h3>What you will learn:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>Basic German Alphabet and Pronunciation</li>
          <li>Self-introduction and greetings</li>
          <li>Numbers, time, and days of the week</li>
          <li>Basic sentence structures and simple verbs</li>
        </ul>

        <h3>Course Duration & Fees:</h3>
        <p><strong>Duration:</strong> 2 Months</p>
        <p><strong>Mode:</strong> Online Interactive Classes</p>

        <a href="/" style={{ display: "inline-block", marginTop: "20px", padding: "10px 20px", backgroundColor: "#f59e0b", color: "white", textDecoration: "none", borderRadius: "5px" }}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
}