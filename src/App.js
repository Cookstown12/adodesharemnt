import React from "react";
import SecondPage from "./SecondPage";

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-dobe-img">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10">
        <SecondPage />
      </div>
    </div>
  );
}

export default App;
