import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {AuthProvider} from './Utils/context/index'
import { createRoot } from 'react-dom/client'
import "./styles.css";


import Header from './components/Header'
import SignUp from './pages/Signup/index'
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import Admin from './pages/Admin'
import UserProfil from './pages/ProfilUser'


const root = createRoot(document.getElementById("root"));


root.render(

  <BrowserRouter>
    <AuthProvider>  {/*je delimite le scope la portée de mon context,  on donne acces aux variables d'autorisation aux enfants via le composant fournisseur*/}
      <Header />
      <Routes>
      <Route path='/signup' element={<SignUp />} /> 
            <Route path='/login' element={<Login />} /> 
            <Route path='' element={<Home  />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/userProfil' element={<UserProfil />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)





