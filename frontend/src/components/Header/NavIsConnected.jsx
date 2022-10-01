import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import {IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import AvatarHeader from '../Avatar/AvatarHeader'


export default function NavIsConnected(props) {

  const { setIsConnected, setIsDisabled, isAdmin, username } = useContext(AuthContext)  
  const navigate = useNavigate()
  const firstLetter = (username.substring(0,1)).toUpperCase()
  console.log(firstLetter)
  return (

    <Box sx={{  mr: '5%', display: 'flex',flexWrap: 'wrap',  justifyContent: 'center',   alignItems: 'center',   typography: 'body1',       '& > :not(style) + :not(style)': { ml: 4,  },}}>
     
      { isAdmin ? 

        <IconButton onClick={() => {  navigate("/admin") }} > 
          < AdminPanelSettingsIcon color = "secondary"  fontSize='large'/> 
        </IconButton>

      : 
      "" }
      <IconButton onClick={() => {  navigate("/") }} > 
      < HomeIcon color = "secondary"  fontSize='large'/> 
      </IconButton>

      <AvatarHeader />

      <IconButton onClick={() => {  
       setIsConnected(false)
       setIsDisabled(true)
        navigate("/") }} > 
      < LogoutIcon color = "secondary"  fontSize='large'/> 
      </IconButton>
      
    </Box>
  );
}

