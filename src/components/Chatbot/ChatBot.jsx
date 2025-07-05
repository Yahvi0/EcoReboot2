// ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

const ChatBot = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ecoChatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // Replace the string below with your actual OpenAI API key
  const openaiApiKey = "YOUR_KEY";

  const toggleChat = () => setIsOpen(!isOpen);
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("ecoChatHistory");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    localStorage.setItem("ecoChatHistory", JSON.stringify(newMessages));
    setInput("");
    setIsTyping(true);

    const systemPrompt = `You are Ask EcoBot 🌿, a helpful and friendly AI assistant for a sustainable development website.
You can answer any question related to:
- Climate change
- CO₂ emissions and reductions
- Renewable energy (solar, wind, etc.)
- Energy and fuel savings
- Sustainable Development Goals (SDGs)
- Green lifestyle tips
- Environmental protection and sustainability policies
- The website's live stats:
   - Distance saved: ${stats.totalDistance} km
   - Fuel saved: ${stats.totalFuelSaved} L
   - CO₂ reduced: ${stats.totalCO2Reduced} kg
   - Money saved: ₹${stats.totalMoneySaved}
Always give helpful, easy-to-understand answers. Also suggest what users can ask if they seem confused.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              ...newMessages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
              })),
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("✅ API Response:", data);

      if (!response.ok) {
        console.error("❌ HTTP Error:", response.status, data);
        throw new Error(data.error?.message || "Unknown error");
      }

      let reply = "";

      if (data.choices && data.choices.length > 0) {
        reply = data.choices[0].message.content;
      } else {
        reply = "⚠️ OpenAI did not return a valid message.";
      }

      const updatedMessages = [...newMessages, { sender: "bot", text: reply }];
      setMessages(updatedMessages);
      localStorage.setItem("ecoChatHistory", JSON.stringify(updatedMessages));
      setIsTyping(false);
      speak(reply);
    } catch (error) {
      console.error("❌ OpenAI API Error:", error);
      const errorMsg = `❌ Something went wrong: ${error.message}`;
      const errorMessages = [...newMessages, { sender: "bot", text: errorMsg }];
      setMessages(errorMessages);
      localStorage.setItem("ecoChatHistory", JSON.stringify(errorMessages));
      setIsTyping(false);
    }
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window))
      return alert("Speech Recognition not supported.");
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
    recognitionRef.current = recognition;
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const suggestedPrompts = (
    <div className="eco-msg bot">
      <strong>Ask EcoBot 🌿 can help you with:</strong>
      <ul>
        <li>🌱 How much CO₂ have I reduced?</li>
        <li>🚗 How can I save more fuel?</li>
        <li>💰 What is green lifestyle?</li>
        <li>⚡ What are renewable energy sources?</li>
        <li>🌍 What are SDGs?</li>
      </ul>
    </div>
  );

  return (
    <>
      <div className="eco-chat-icon" onClick={toggleChat} title="Toggle EcoBot Chat">
        💬
      </div>
      {isOpen && (
        <div className="eco-chat-box" role="dialog" aria-modal="true" aria-label="EcoBot chat window">
          <div className="eco-chat-header">
            Ask EcoBot 🌿
            <button className="clear-btn" onClick={clearChat} aria-label="Clear chat">
              Clear
            </button>
          </div>
          <div className="eco-chat-body" aria-live="polite" aria-relevant="additions">
            {messages.length === 0 ? (
              suggestedPrompts
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`eco-msg ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
            {isTyping && (
              <div className="eco-msg bot">
                <span className="typing-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            )}
          </div>
          <div className="eco-chat-input">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about climate, CO₂, fuel, savings..."
              aria-label="Chat input"
              autoComplete="off"
            />
            <button onClick={sendMessage} aria-label="Send message">
              Send
            </button>
            <button onClick={handleVoice} aria-label="Voice input">
              🎤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
