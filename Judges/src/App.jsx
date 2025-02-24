import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import JudgeDashboard from "./pages/HomePage.jsx";

import Submission from "./pages/Submission.jsx";

const App = () => {
  return (
     <>
     
        <Routes>
      <Route path="/" element={<JudgeDashboard />} />
      <Route path="/submissions" element={<Submission/>}/>
    </Routes>
    </>
    
  );
}

export default App;
