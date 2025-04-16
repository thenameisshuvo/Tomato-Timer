// src/Components/QuoteDisplay.jsx
import React, { useState, useEffect } from 'react';
import './QuoteDisplay.css'; // Optional: for styling

// A larger list of English motivational quotes
const motivationalQuotes = [
  "The only way to do great work is to love what you do.", // Steve Jobs
  "Believe you can and you're halfway there.", // Theodore Roosevelt
  "Strive not to be a success, but rather to be of value.", // Albert Einstein
  "The mind is everything. What you think you become.", // Buddha
  "Your time is limited, don't waste it living someone else's life.", // Steve Jobs
  "The future belongs to those who believe in the beauty of their dreams.", // Eleanor Roosevelt
  "It does not matter how slowly you go as long as you do not stop.", // Confucius
  "Everything you’ve ever wanted is on the other side of fear.", // George Addair
  "Success is not final, failure is not fatal: It is the courage to continue that counts.", // Winston Churchill
  "Hardships often prepare ordinary people for an extraordinary destiny.", // C.S. Lewis
  "Act as if what you do makes a difference. It does.", // William James
  "The secret of getting ahead is getting started.", // Mark Twain
  "Don't watch the clock; do what it does. Keep going.", // Sam Levenson
  "Keep your face always toward the sunshine, and shadows will fall behind you.", // Walt Whitman
  "You are never too old to set another goal or to dream a new dream.", // C.S. Lewis
  "It’s not whether you get knocked down, it’s whether you get up.", // Vince Lombardi
  "What you get by achieving your goals is not as important as what you become by achieving your goals.", // Zig Ziglar
  "Do one thing every day that scares you.", // Eleanor Roosevelt
  "The best way to predict the future is to create it.", // Peter Drucker
  "Either you run the day, or the day runs you.", // Jim Rohn
  "Start where you are. Use what you have. Do what you can.", // Arthur Ashe
  "The journey of a thousand miles begins with a single step.", // Lao Tzu
  "You don't have to be great to start, but you have to start to be great.", // Zig Ziglar
  "Dream big and dare to fail.", // Norman Vaughan
  "Our greatest glory is not in never failing, but in rising up every time we fail.", // Ralph Waldo Emerson
  "Failure will never overtake me if my determination to succeed is strong enough.", // Og Mandino
  "Knowing is not enough; we must apply. Willing is not enough; we must do.", // Johann Wolfgang von Goethe
  "Build your own dreams, or someone else will hire you to build theirs.", // Farraj Gray
  "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", // Jamie Paolinetti
  "The only limit to our realization of tomorrow will be our doubts of today.", // Franklin D. Roosevelt
  "What seems impossible today will one day become your warm-up." // Unknown
];

function QuoteDisplay() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Select a random quote when the component loads
    if (motivationalQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    } else {
      setQuote("No quotes available.");
    }

    // Optional: Set an interval to change the quote periodically
    /*
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    }, 15000); // Change quote every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
    */

  }, []); // Empty dependency array means this runs once on mount

  // Function to manually change the quote (e.g., bind to a button)
  const changeQuote = () => {
     const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
     setQuote(motivationalQuotes[randomIndex]);
  };

  return (
    <div className="quote-display-container">
      <p className="quote-text">"{quote}"</p>
      {/* Optional button to get a new quote */}
      <button onClick={changeQuote}>New Quote</button>
    </div>
  );
}

export default QuoteDisplay;