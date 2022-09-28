import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchemaLogin from '../../Utils/validation-shema/validationShemaLogin'
import { useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../Utils/context/index'
import { useNavigate } from "react-router-dom";
import { Input, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box'; 




export default function  UserProfil() {

      const  authDatas  = useContext(AuthContext)
      const id = authDatas.userId  
      const [user, setUser] = useState("") 

      useEffect(() => {
            async function fetchGetOneUser()  {           
            try{
            const response = await fetch(`http://localhost:3001/api/user/:${id}`, {
                  mode: "cors",                
                  method: "GET",
                  headers: {"Content-Type": "application/json",
                  Authorization: 'Bearer ' + localStorage.getItem('token'),

            }})
            
            if (!response.ok) {
                  const result = await response.json()
                  throw new Error(`${response.status}. ${result}`)
            } else{
      
                  const result = await response.json()
                  console.log(result)
                  setUser (result[0])
                  } 
            } 
      
            catch(err){
                  const errorMessage = err.toString();
                  console.log(errorMessage);
            } 
            }
            fetchGetOneUser()
      },[id] )
          

  return (

      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c' }}> 

        <h1> Votre profil</h1>
      
        <div className="userData"> Nom d'utilisateur : {user.username} </div>
        <div className="userData"> Nom :  </div>
        <div className="userData"> Prénom :  </div>
        <div className="userData"> Description :  </div>




      
      </Box>
          
  )  
 }
 
