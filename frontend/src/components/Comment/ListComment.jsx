import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import NotesIcon from '@mui/icons-material/Notes'
import CommentBox from './CommentBox'
import Box from '@mui/material/Box'
import { Input, IconButton, Button } from '@mui/material'
import "./styles.css";


export default function  ListPosts() {

  const  authDatas  = useContext(AuthContext);        //  branchement  sur le contexte global d 'authentification  
  const toogleRender = authDatas.toogleRender 
  const [commentArray, setCommentArray] = useState([])
 
  useEffect(() => {
    async function fetchArrayComment()  {            // logique de l'appel de l'API de creation d'enregistrement du backend et du traitement de la réponse
      try{
        const response = await fetch(`http://localhost:3001/api/comments`, {
          mode: "cors",
          method: "GET",
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }})
    
        if (!response.ok) {
          const result = await response.json()
          throw new Error(`${response.status}. ${result}`)
        } else{

          const result = await response.json()
          setCommentArray (result.reverse())
          } 
        } 

        catch(err){
          const errorMessage = err.toString();
          console.log(errorMessage);
        } 
    }
    fetchArrayComment()
  }, [toogleRender])


    return (

      <Box>

        { !isCommentListOpen ? 

          <IconButton onClick={() => setIsCommentPostBoxOpen (! isCommentPostBoxOpen)} > 

          <NotesIcon color="secondary" sx={{ fontSize: 30 }}  /> 

          </IconButton> 
          
          
          
          
          :
          

        
          commentArray.map((comment) => (

            <CommentBox key={comment.id} post = {comment} />
          ))
        }
      </Box>
    )
}

        
    




