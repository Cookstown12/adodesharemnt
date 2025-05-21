import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/step-two" element={<SecondPage />} />
        <Route path="/step-three" element={<ThirdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
