
import {AuthContext} from '../../Utils/context/index'
import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import DeletePostButton from '../Post/DeletePostButton'
import "./styles.css";

export default function  CommentBox(props) {

  const comment = props.comment
  const  authDatas  = useContext(AuthContext)
  const userId = authDatas.userId  
  const isAdmin = authDatas.isAdmin
  const linuxTime =Date.parse(comment.date)
  const dateTime = new Date(linuxTime)
  const dateFrench= dateTime.toLocaleDateString("fr")

    return (

      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c', position: 'relative', }}> 
          
          <p> {comment.texte}</p>


          <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >
            {userId=== comment.id_user || isAdmin === "y" ? 
              <Box sx={ { display: 'flex', justifyContent: "space-between"   }}  >

              <DeletePostButton id = {comment.id}/>
                  </Box> :
                    ""
                }
          </Box>

          <h6>   {comment.username} le {dateFrench} </h6>

       </Box>
                 
    )   
}        
