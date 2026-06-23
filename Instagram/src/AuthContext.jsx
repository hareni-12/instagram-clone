import React,{createContext,useContext,useState,useEffect} from "react";
const AuthContext = createContext(null);
export function AuthProvider({children}){
    const[user,setUser]=useState(null);

    const login=(userData)=>{
        localStorage.setItem("ig_user",JSON.stringify(userData));
        setUser(userData);
    };
    const logout=()=>{
        localStorage.removeItem("ig_user");
            setUser(null);
    };
    return(
        <AuthContext.Provider value={{user,login,logout}}> 
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth()
{
    return useContext(AuthContext);
}