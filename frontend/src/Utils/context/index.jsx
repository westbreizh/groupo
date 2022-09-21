import React, { useState, createContext} from 'react';

export const AuthContext = createContext(); 

export const AuthProvider = (props) => {      
    const [isConnected, setIsConnected] = useState(false)
    const [token, setToken ] = useState('')
    const [userId, setUserId ] = useState('')
    const [isAdmin, setIsAdmin ] = useState()
    const [username, setUsername ] = useState()
    const [toogleRender, setToogleRender ] = useState(false)

    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, 
        isConnected, setIsConnected, isAdmin, setIsAdmin, toogleRender, setToogleRender, username, setUsername }}>
            {props.children} 
        </AuthContext.Provider>
);
}










