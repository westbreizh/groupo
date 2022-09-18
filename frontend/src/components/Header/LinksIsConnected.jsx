import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconButton } from '@mui/material';


export default function LinksIsConnected(props) {

  const isAdmin = props.isAdmin;

  return (

    <Box sx={{  mr: '5%', display: 'flex',flexWrap: 'wrap',  justifyContent: 'center',   alignItems: 'center',   typography: 'body1',       '& > :not(style) + :not(style)': { ml: 4,  },}}>
     
      { isAdmin ? 
      <IconButton onClick={() => { }} > 
        < AdminPanelSettingsIcon color = "secondary"  fontSize='large'/> 
      </IconButton>
      : 
      "" }
      
      <Link href="/"> Déconnexion </Link>
      
    </Box>
  );
}
