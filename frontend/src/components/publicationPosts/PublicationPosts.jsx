import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import "./style.css";
import { Button, IconButton } from '@mui/material';
import { sup } from './functions'
import ModifyPost  from './Modifypost'


export default function  PublicationPosts() {

  const  authDatas  = useContext(AuthContext);        //  branchement  sur le contexte global d 'authentification  
  const UserId = authDatas.userId;
  //const Token = authDatas.token;

  const [postsArray, setPostsArray] = useState([])
  const [postModified, setPostModified] = useState("")


 
  console.log(`mon premier tableau ${postsArray}`)

  useEffect(() => {
    async function fetchArrayPosts()  {            // logique de l'appel de l'API de creation d'enregistrement du backend et du traitement de la réponse


    try{
      const response = await fetch(`http://localhost:3001/api/posts`, {
        mode: "cors",
        method: "GET",
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{

        const result = await response.json()
        setPostsArray (result)
        } 
       } 

    catch(err){
      const errorMessage = err.toString();
       console.log(errorMessage);
    } 
  }
    fetchArrayPosts()
  }, [])



  if( postModified !== ""){

    return (
    <ModifyPost  id = {postModified.id}  titre = {postModified.titre} texte = {postModified.texte} image_url = {postModified.image_url}  />
  )}

  else {
    
    return (
    postsArray.reverse().map((post) => (

        <Box key={post.id} sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}> 
          
          <h1> {post.titre}</h1>

          <img src={post.image_url} alt= "oiseau" className='img' crossOrigin="anonymous" /> 

          <p> {post.texte}</p>

          <div className='contenair_button'>

            <IconButton onClick={() => {sup(post.id)}}> 
              <DeleteOutlined color="primary" sx={{ fontSize: 40 }}  /> 
            </IconButton>

            <Button sx={{  border: '2px solid white', borderRadius: '15px', bgcolor: '#ec5990', ml: '2%',  textTransform: 'none'}}  
            variant="contained" onClick={() =>  setPostModified(post) } >
            modifier </Button> 
            
            <Button variant="contained" onClick={() => {sup(post.id)}} sx={{  border: '2px solid white', borderRadius: '15px', bgcolor: '#ec5990', ml: '2%',  textTransform: 'none'}} >
            commenter </Button>

          </div>

        </Box> )))
    }
 }


