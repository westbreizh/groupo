
import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import ModifyPost  from './Modifypost'
import DeletePostButton from './DeletePostButton';
import CreateComment from '../Comment/CreateComment'
//import LikeButton from './LikeButton.texte';
//import DisLikeButton from './DisLikeButton';
import "./styles.css";

export default function  PostBox(props) {

  const post = props.post
  const  authDatas  = useContext(AuthContext)
  const userId = authDatas.userId  
  const isAdmin = authDatas.isAdmin
  const toogleEffect = authDatas.toogleEffect  

    return (

          <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}> 
            
            <h1> {post.titre}</h1>

            {post.image_url !==""? <img src={post.image_url} alt= "oiseau" className='img' crossOrigin="anonymous" /> : ""} 

            <p> {post.texte}</p>

            {userId=== post.id_user || isAdmin === "y" ? 
              <Box > 
                <DeletePostButton id = {post.id}/>
                <ModifyPost post= {post} />
              </Box> :
                ""
            }


            <CreateComment id = {post.id} />
        </Box>
          
    
      )
      
    
}        
