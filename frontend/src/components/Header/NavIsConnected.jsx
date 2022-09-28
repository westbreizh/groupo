import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {IconButton, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

export default function NavIsConnected(props) {

  const isAdmin = props.isAdmin;
  const navigate = useNavigate();
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

      <IconButton onClick={() => {  navigate("/userProfil") }} > 
      <Avatar sx={{ bgcolor: 'blueviolet' }}>compte</Avatar>
      </IconButton>

      <Link href="/login"> 
      < LogoutIcon color = "secondary"  fontSize='large'/> 
      </Link>
      
    </Box>
  );
}

