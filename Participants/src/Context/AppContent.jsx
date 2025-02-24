import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:7555";
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [userData, setUserData] = useState(null);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,  
        }
      });
      

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error(error.message || "Error fetching user profile");
    }
  };


  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;