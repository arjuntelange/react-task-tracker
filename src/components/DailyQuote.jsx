import React, { useEffect, useState } from "react";
import "./DailyQuote.css";
import { Quote, RefreshCcw } from "lucide-react";

const quotes = [
  "Small progress is still progress.",
  "Discipline beats motivation every day.",
  "The future depends on what you do today.",
  "Success is the sum of small efforts repeated daily.",
  "Dream big, start small, act now.",
  "Consistency creates results.",
  "You don't have to be great to start, but you have to start to be great.",
  "Focus on the process, not the outcome.",
  "Your only competition is who you were yesterday.",
  "Every task completed is a step closer to your goal.",
  "Stay patient and trust your journey.",
  "Work hard in silence, let success make the noise.",
];

function DailyQuote() {
  const [quote, setQuote] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  function handleRefresh() {
    setIsSpinning(true);
    getRandomQuote();

    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  }

  function getRandomQuote() {
    let newQuote;

    do {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      newQuote = quotes[randomIndex];
    } while (newQuote === quote);

    setQuote(newQuote);
  }

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="quote-card">
      <div className="card-title">
        <h3>
          <Quote size={20} /> Daily Quote{" "}
        </h3>

        <button
          className={`spin-btn ${isSpinning ? "spinning" : ""}`}
          onClick={handleRefresh}
        >
          <RefreshCcw size={18} color="#4f46e5" />
        </button>
      </div>

      <p>{`"${quote}"`}</p>
    </div>
  );
}

export default DailyQuote;
