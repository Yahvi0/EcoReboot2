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

  const toggleChat = () => setIsOpen(!isOpen);
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("ecoChatHistory");
  };

  const dummyReplies = [
    "🌱 Try switching to public transport twice a week!",
    "💡 Did you know switching to LEDs saves 80% energy?",
    "🌍 The SDGs are 17 global goals to make the world better by 2030!",
    "⚡ Solar energy is a powerful renewable energy source.",
    "💰 Living green can reduce your electricity bill up to 30%!"
  ];

  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { sender: "user", text: input }];
  setMessages(newMessages);
  localStorage.setItem("ecoChatHistory", JSON.stringify(newMessages));
  setInput("");
  setIsTyping(true);

  setTimeout(() => {
    const userText = input.toLowerCase();

    let reply = "🤔 Hmm... I'm not sure. Try asking about CO₂ or fuel savings!";
    if (userText.includes("most co2") || userText.includes("highest emissions")) {
      reply = "🇨🇳 China consistently had the highest CO₂ emissions from 2019 to 2023 — nearly 10,000 Mt each year.";
    } else if (userText.includes("least co2") || userText.includes("lowest emissions")) {
      reply = "🇧🇷 Brazil had the lowest CO₂ emissions among the listed countries — staying under 500 Mt.";
    } else if (userText.includes("usa emissions")) {
      reply = "🇺🇸 The USA's CO₂ emissions dropped from around 5000 Mt in 2019 to about 4700 Mt in 2023.";
    } else if (userText.includes("india emissions")) {
      reply = "🇮🇳 India's emissions slowly increased and reached around 2800 Mt in 2023.";
    } else if (userText.includes("future emissions") || userText.includes("2030 goals")) {
      reply = "📉 If sustainability goals are met, all countries are projected to reduce CO₂ by 2030 — especially China and the USA.";
    } else if (userText.includes("eco reboot goal") || userText.includes("mission")) {
      reply = "🎯 EcoReboot aims to help reduce **10 million tons** of CO₂ by 2030, aligned with UN SDGs. Let’s go green!";
    } else if (userText.includes("co2") || userText.includes("carbon")) {
      reply = `🌍 You've reduced approx. ${stats?.totalCO2Reduced || 20} kg of CO₂ by using eco routes. Keep it up!`;
    } else if (userText.includes("fuel")) {
      reply = `⛽ Try walking or use bicycles in case of short distances or you can even switch to EV vehicles`;
    } else if (userText.includes("hi")) {
      reply = `Hi. Welcome here!`;
    } else if (userText.includes("sdg") || userText.includes("sustainable development")) {
      reply = `📘 The SDGs are 17 global goals by the UN to create a better future. Wanna know more about any one of them?`;
    } else if (userText.includes("renewable")) {
      reply = `⚡ Renewable energy includes solar, wind, hydro, and more. They're clean, sustainable, and awesome.`;
    } else if (userText.includes("green lifestyle") || userText.includes("eco friendly")) {
      reply = `🌱 A green lifestyle means reducing plastic, using public transport, eating local food, and saving electricity.`;
    }

    const updatedMessages = [...newMessages, { sender: "bot", text: reply }];
    setMessages(updatedMessages);
    localStorage.setItem("ecoChatHistory", JSON.stringify(updatedMessages));
    setIsTyping(false);
    speak(reply);
  }, 1000);
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
        <div className="eco-chat-box">
          <div className="eco-chat-header">
            Ask EcoBot 🌿
            <button className="clear-btn" onClick={clearChat}>
              Clear
            </button>
          </div>
          <div className="eco-chat-body">
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
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={handleVoice}>🎤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
