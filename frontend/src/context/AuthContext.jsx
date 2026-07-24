import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const fetchProfile = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const data = await response.json();

      setUser(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async () => {
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
   <AuthContext.Provider
  value={{
    user,
    setUser,
    login,
    logout,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);