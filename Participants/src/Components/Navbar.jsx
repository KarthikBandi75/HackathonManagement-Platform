import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../Context/AppContent.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken, userData, setUserData, token } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    setUserData(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

return (
  
  <div className="flex items-center justify-between py-4 mb-5 text-lg">
    <img onClick={() => navigate('/')} className="cursor-pointer w-44" src={assets.Logo} alt="Logo" />

    
    <ul className="hidden gap-6 text-base font-medium md:flex">
      <NavLink to="/" className={({ isActive }) => isActive ? "active text-blue-500" : ""}> <li className="py-1 text-lg cursor-pointer">Home</li> </NavLink>
      <NavLink to="/hackathons" className={({ isActive }) => isActive ? "active text-blue-500" : ""}> <li className="py-1 text-lg cursor-pointer">All Hackathons</li> </NavLink>
      <NavLink to="/about"   className={({ isActive }) => isActive ? "active text-blue-500" : ""} > <li className="py-1 text-lg cursor-pointer">About</li> </NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "active text-blue-500" : ""}> <li className="py-1 text-lg cursor-pointer">Contact</li> </NavLink>
    </ul>

    <div className="flex items-center gap-4">
      {
       token && userData ? (
        
        <div className="relative flex items-center gap-2 cursor-pointer group">
          
          <div className="px-1 rounded-full">
            <img className="w-8 rounded-full" src={userData.image} alt="User Profile" />
          </div>
          
          <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

          <div className="absolute top-0 right-0 z-20 hidden text-base font-medium text-gray-600 pt-14 group-hover:block">
            <div className="flex flex-col gap-4 p-4 rounded min-w-48 bg-stone-100">
              <p onClick={() => navigate('/my-profile')} className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/my-registrations')} className="cursor-pointer hover:text-black">My Registrations</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
      ) 
      : 
      (
        <button onClick={() => navigate('/signup')} className="hidden px-8 py-3 font-light text-white rounded-full bg-primary md:block"> Create Account </button>
      )
      }

      
     
    </div>
  </div>
);
};

export default Navbar;