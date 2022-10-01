import { useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../Utils/context/index'
import Box from '@mui/material/Box'; 
import ModifyUser from "./ModifyUser";
import DeleteUserButton from './DeleteUserButton';


export default function  UserProfil() {

      const  authDatas  = useContext(AuthContext)
      const id = authDatas.userIdPost  
      const [user, setUser] = useState("")
      const [reRender, setReRender] = useState("false") 
 

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
      },[id, reRender] )
          

  return (

      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c' }}> 

        <h1> {user.username} </h1>
      
        <div className="userData"> Nom d'utilisateur : {user.username} </div>
        <div className="userData"> Nom : {user.forName} </div>
        <div className="userData"> Prénom : {user.lastName} </div>
        <div className="userData"> email : {user.email} </div>
        <div className="userData"> Description : {user.texte} </div>

        <Box sx={{display: "flex", justifyContent: "space-between"   }}>
            <ModifyUser user = {user} reRender = {reRender} setReRender = {setReRender} />
            <DeleteUserButton user = {user} />
        </Box>
        
      </Box>
          
  )  
 }
 
