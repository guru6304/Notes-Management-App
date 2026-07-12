import { createContext, useContext, useState } from "react";
import { clearStorage, getToken, getUser, saveToken, saveUser } from "../utils/storage";

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
const [token,setToken]= useState(
    getToken()
);
const [user,setUser]=useState(
    getUser()
);

const login= (token,user)=>{
    saveToken(token);
    saveUser(user);
    setToken(token);
    setUser(user);
};

const logout = ()=>{
    clearStorage();
    setToken(null);
    setUser(null);
};

return(
    <AuthContext.Provider value={{token,user,login,logout}}>{children}</AuthContext.Provider>
);
};
export const useAuth =()=> useContext(AuthContext);