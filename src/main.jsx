import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import Mainpage from "./components/pages/Mainpage";
import Sidebar from "./components/Sidebar";
import Auth from "./components/pages/Auth";

function App() {
  return (
    <BrowserRouter>

      <Sidebar />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="*" element={<h1 style={{color:'white'}}>404 Not Found</h1>} />
      </Routes>

    </BrowserRouter>
  );
}

createRoot(document.getElementById("app")).render(<App />);
export default App;
