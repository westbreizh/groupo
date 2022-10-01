import { Avatar } from '@mui/material'
import {IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {AuthContext} from '../../Utils/context/index'
export default function AvatarPostBox(props) {
    const id = props.userId
    const navigate = useNavigate()
    const {  setUserIdPost  } = useContext(AuthContext); 
    const [avatarUser, setAvatarUser] = useState([])

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
            setAvatarUser (result[0])
            setUserIdPost(id)
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

    <Box>
      
      <IconButton onClick={() => {  navigate("/userProfil") }} >
      <Avatar 
        alt={avatarUser.username}  
        src={avatarUser.image_urlAvatar} 
        crossOrigin="anonymous" 
        sx={{ bgcolor: 'blueviolet', width: 24, height: 24 }}
      />
        <div className='avatarUsename'>  {avatarUser.username} </div>
      </IconButton>
    </Box>
    )
}

