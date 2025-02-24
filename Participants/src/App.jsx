import { Route, Routes, useNavigate, useLocation, matchPath } from "react-router-dom";
import Home from "./Pages/Homepage.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import MyProfile from "./Pages/Myprofile.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import EmailVerificationPage from "./Pages/EmailVerificationPage.jsx";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage.jsx";
import ForgotOtpPage from "./Pages/ForgotOtpPage.jsx";
import ResetPasswordPage from "./Pages/ResetPasswordPage.jsx";
import AllHackathons from "./Pages/AllHackathons.jsx";
import HackathonDetails from "./Pages/hackathonDetails.jsx";
import Register from "./Pages/Register.jsx";
import MyRegistrations from "./Pages/MyRegistrations.jsx";
import Submit from "./Pages/Submit.jsx";

const App = () => {
  const location = useLocation();

  const authRoutes = ["/login", "/signup", "/forgot-password", "/verify-email", "/verify-otp"];
  const isAuthRoute =
    authRoutes.includes(location.pathname) ||
    matchPath("/reset-password/:otp", location.pathname);

  const containerClass = isAuthRoute
    ? "min-h-screen bg-gradient-to-br from-blue-100 to-green-100"
    : "ml-7 mr-7";

  return (
    <div className={containerClass}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {!isAuthRoute && <Navbar />}

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<ForgotOtpPage />} />
        <Route path="/reset-password/:otp" element={<ResetPasswordPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hackathons" element={<AllHackathons/>}/>
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/view-hackathon/:id" element={<HackathonDetails/>}/>
        <Route path="/register/:id" element={<Register/>}/>
        <Route path="/My-Registrations" element={<MyRegistrations/>}/>
        <Route path="/submit" element={<Submit/>}/>
      </Routes>

      {!isAuthRoute && <Footer />}
    </div>
  );
};

export default App;
