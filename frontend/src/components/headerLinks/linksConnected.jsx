import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function LinksConnected(props) {

  const isAdmin = props.isAdmin;

  return (
    <Box
    sx={{
      mr: '5%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      typography: 'body1',
      '& > :not(style) + :not(style)': {
        ml: 2,
      },
    }}
    >

      { isAdmin ? < AdminPanelSettingsIcon color = "secondary" /> : "" }
      <Link href="/"> Déconnexion </Link>
      
    </Box>
  );
}
export default LinksConnected;