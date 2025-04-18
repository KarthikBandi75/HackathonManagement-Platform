import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AddHackathonPage from "./pages/AddHackathonPage";
import AllHackathonsPage from "./pages/AllHackathonsPage";
import HackathonDetailsPage from "./pages/HackathonDetailsPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const location = useLocation();
  const noNavAndSidebar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!noNavAndSidebar && <Navbar />}
      <div className="flex">
        {!noNavAndSidebar && <Sidebar />}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hackathons/add-hackathon" element={<AddHackathonPage />} />
            <Route path="/hackathons" element={<AllHackathonsPage />} />
            <Route path="/hackathons/:id" element={<HackathonDetailsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;