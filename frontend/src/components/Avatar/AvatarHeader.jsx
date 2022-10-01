import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import { Avatar } from '@mui/material'
import {IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate } from "react-router-dom"

export default function AvatarHeader(props) {
    let {username, image_urlAvatar} = useContext(AuthContext) 
    const navigate = useNavigate()
    console.log("enddessous avatar url") 
    console.log(image_urlAvatar)
      //<img src={image_urlAvatar}  crossOrigin="anonymous" />

    return (

    <Box>
      <IconButton onClick={() => {  navigate("/userProfil") }} > 
      <Avatar 
        alt={username}  
        src={image_urlAvatar} 
        //src="https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"
        //src = "http://localhost:3001/images/gorille.png"
        crossOrigin="anonymous" 
        sx={{ bgcolor: 'blueviolet'}}
      />
      </IconButton>
    </Box>
    )
}

