import React, { useState, createContext} from 'react';

export const AuthContext = createContext(); 

export const AuthProvider = (props) => {      
    const [isConnected, setIsConnected] = useState(false)
    const [userId, setUserId ] = useState('')
    const [isAdmin, setIsAdmin ] = useState()
    const [username, setUsername ] = useState()
    const [image_urlAvatar, setImage_urlAvatar ] = useState()
    const [toogleRender, setToogleRender ] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [userIdPost, setUserIdPost] = useState(true)


    return (
        <AuthContext.Provider value={{  userId, setUserId, isDisabled, setIsDisabled,
        isConnected, setIsConnected, isAdmin, setIsAdmin, toogleRender, setToogleRender, username, setUsername, image_urlAvatar, setImage_urlAvatar, userIdPost, setUserIdPost  }}>
            {props.children} 
        </AuthContext.Provider>
);
}










