import './App.css';
import InventionCard from './components/InventionCard';

function App() {
  const dummyInvention = {
    title: "Reverse Microwave",
    description: "Cools food instantly so you can eat leftovers in 3 seconds.",
    votes: 42
  };

  return (
    <div className="App">
      <header style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🧠 The Most Useless Inventions Ever</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          A hilarious collection of inventions that solve absolutely nothing.
        </p>
      </header>

      <main style={{ padding: "1rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>💡 What is this?</h2>
        <p>
          This is a fun project built with the MERN stack that showcases the most absurd,
          impractical and weirdly fascinating inventions from around the world.
        </p>

        <InventionCard invention={dummyInvention} /> {/* 👈 Added Component Here */}

        <h2>🛠️ Tech Stack</h2>
        <ul>
          <li>Frontend: React + Vite</li>
          <li>Backend: Node.js + Express</li>
          <li>Database: MongoDB Atlas</li>
        </ul>

        <h2>📢 Features</h2>
        <ul>
          <li>Submit your own bizarre inventions</li>
          <li>Upvote the most ridiculous ones</li>
          <li>Leaderboard of the top useless creations</li>
        </ul>
      </main>

      <footer style={{ textAlign: "center", marginTop: "2rem", padding: "1rem" }}>
        <p>Created for the Kalvium ASAP Project 🚀</p>
      </footer>
    </div>
  );
}

export default App;
