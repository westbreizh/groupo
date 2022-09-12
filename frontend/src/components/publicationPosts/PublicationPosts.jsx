import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import Box from '@mui/material/Box';
import "./style.css";





export default function  PublicationPosts() {

return (

<Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}>
      
<h1> bonjour</h1>



<p> mon futur paragraphe de texte ... est ce qu'il va passer a la ligne quand le texte va devenir plus grand</p>

 </Box>



)
}