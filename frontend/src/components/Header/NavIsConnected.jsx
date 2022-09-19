import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



export default function NavIsConnected(props) {

  const isAdmin = props.isAdmin;

  return (

    <Box sx={{  mr: '5%', display: 'flex',flexWrap: 'wrap',  justifyContent: 'center',   alignItems: 'center',   typography: 'body1',       '& > :not(style) + :not(style)': { ml: 4,  },}}>
     
      { isAdmin ? 

      <Link href="/admin">
        < AdminPanelSettingsIcon color = "secondary"  fontSize='large'/> 
      </Link>
      : 
      "" }

      <Link href="/"> Accueil </Link>
      <Link href="/userProfil"> Mon compte </Link>
      <Link href="/login"> Déconnexion </Link>
      
    </Box>
  );
}
