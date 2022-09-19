import React, { useState, createContext} from 'react';

// création d'un contexte de state globale 
export const AuthContext = createContext(); 


 // création d'un fournisseur de contexte pour les composants enfants qui 
 // auront accès aux variables et pourront les modifier
export const AuthProvider = (props) => {      
    const [connected, setConnected] = useState(false)
    const [token, setToken ] = useState('')
    const [userId, setUserId ] = useState('')
    const [isAdmin, setIsAdmin ] = useState()
    const [username, setUsername ] = useState()

    const [toogleEffectRender, setToogleEffectRender ] = useState(false)
return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId, 
    connected, setConnected, isAdmin, setIsAdmin, toogleEffectRender, setToogleEffectRender, username, setUsername }}>
        {props.children} 
    </AuthContext.Provider>
);
}

// syntaxe à revoir AutContex.  compsant.composant?








