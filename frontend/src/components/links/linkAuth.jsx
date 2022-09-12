import Box from '@mui/material/Box';
import Link from '@mui/material/Link';



function LinkAuth() {
  return (
    <Box
    sx={{
      mr: '100px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      typography: 'body1',
      '& > :not(style) + :not(style)': {
        ml: 2,
      },
    }}
    >
      <Link href='Signup' >Inscription</Link>
      <Link href="Login"> Connexion </Link>
    </Box>
  );
}
export default LinkAuth;