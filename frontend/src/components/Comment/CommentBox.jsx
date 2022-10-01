import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import Box from '@mui/material/Box'
import DeleteCommentButton from './DeleteCommentButton'
import "./styles.css";

export default function  CommentBox(props) {

  const { reRender, setReRender, comment} = props
  const { isAdmin, userId} = useContext(AuthContext);  
  const linuxTime =Date.parse(comment.date)
  const dateTime = new Date(linuxTime)
  const dateFrench= dateTime.toLocaleDateString("fr")
  
    return (

      <Box  sx={{ backgroundColor:"#59c5ac", border: '2px solid white', borderRadius: '15px', width: '90%', mx: 'auto', mt: '15px', position: 'relative', }}> 
          
          <p> {comment.texte}</p>


          <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >
            {userId=== comment.id_user || isAdmin === "y" ? 
              <Box sx={ { display: 'flex', justifyContent: "space-between"   }}  >

                    
              <DeleteCommentButton id = {comment.id} reRender = {reRender} setReRender = {setReRender}/>

          </Box> :
                    ""
                }
          </Box>

          <h6>   {comment.username} le {dateFrench} </h6>

       </Box>
                 
    )   
}        
