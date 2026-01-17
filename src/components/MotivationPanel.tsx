import React, { useEffect, useState } from "react";

const quoteApi = () => {
  const quotes = [
    "writing poems with semi-colons",
    "hello world",
    "touch grass",
    "hail the dark mode",
    "slow is smooth & smooth is fast",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

function MotivationPanel() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [auto, setAuto] = useState(false);

  const loadQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const q = quoteApi();
      setQuote(q);
      setLoading(false);
    }, 1000); //delay
  };

  //auto load
  useEffect(() => {
    if (!auto) return;

    loadQuote();

    const id = setInterval(() => {
      loadQuote();
    }, 10000);

    return () => clearInterval(id);
  }, [auto]);

  //unmount quote
  useEffect(() => {
    if (!auto) {
      setLoading(false);
      setQuote("");
    }
  }, [auto]);

  //component
  return (
    <div>
      <h2>Get Motivated</h2>

      <button onClick={loadQuote}>Load</button>
      <br />
      <p>{loading ? "Loading Your Quote..." : quote}</p>
      <div
        onClick={() => setAuto((prev) => !prev)}
        style={{
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        AutoLoad {auto ? "✔" : ""}
      </div>
    </div>
  );
}

export default MotivationPanel;
