import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import "./style.css";
import { Button, IconButton } from '@mui/material';
import ModifyPost  from './Modifypost'
import DeletePost from './PostDelete';

export default function  PublicationPosts() {

  const  authDatas  = useContext(AuthContext);        //  branchement  sur le contexte global d 'authentification  
  const userId = authDatas.userId;
  const isAdmin = authDatas.isAdmin;
  console.log(isAdmin)
  const toogleEffect = authDatas.toogleEffect  
  //const Token = authDatas.token;
  const [postsArray, setPostsArray] = useState([])
  const [postModified, setPostModified] = useState("")
  const [postDelete, setPostDelete] = useState("")

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
          setPostsArray (result.reverse())
          } 
        } 

        catch(err){
          const errorMessage = err.toString();
          console.log(errorMessage);
        } 
    }
    fetchArrayPosts()
  }, [toogleEffect])
 


    return (

      postsArray.map((post) => (
          <Box key={post.id} sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}> 
            
            <h1> {post.titre}</h1>

            {post.image_url !==""? <img src={post.image_url} alt= "oiseau" className='img' crossOrigin="anonymous" /> : ""} 

            <p> {post.texte}</p>

            {userId=== post.id_user || isAdmin === "y" ? 
              <Box > 
                  <IconButton onClick={() => { setPostDelete(post) }} > 
                    <DeleteOutlined color="primary" sx={{ fontSize: 40 }}  /> 
                  </IconButton>
                  {postDelete !== "" && postDelete.id === post.id ? <DeletePost  id = {postDelete.id}  setPostDelete={setPostDelete}  />:""} 

                  <Button 
                  sx={{  border: '2px solid white', borderRadius: '15px', bgcolor: '#ec5990', ml: '2%',  textTransform: 'none'}}  
                  variant="contained" onClick={() =>  setPostModified(post) } >
                  modifier
                  </Button> 
                  {postModified !== "" && postModified.id === post.id ? <ModifyPost  id = {postModified.id}  titre = {postModified.titre} texte = {postModified.texte} image_url = {postModified.image_url} setPostModified = {setPostModified} />:""} 
              </Box>
            :""}
          </Box>
    
      ))
    )
}




