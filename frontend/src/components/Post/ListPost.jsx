import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import "./styles.css";
import PostBox from './PostBox';

export default function  ListPosts() {

  const  authDatas  = useContext(AuthContext);        //  branchement  sur le contexte global d 'authentification  
  const toogleRender = authDatas.toogleRender 
  const [postsArray, setPostsArray] = useState([])
 
  useEffect(() => {
    async function fetchArrayPosts()  {            // logique de l'appel de l'API de creation d'enregistrement du backend et du traitement de la réponse
      try{
        const response = await fetch(`http://localhost:3001/api/posts`, {
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
          setPostsArray (result.reverse())
          } 
        } 

        catch(err){
          const errorMessage = err.toString();
          console.log(errorMessage);
        } 
    }
    fetchArrayPosts()
  }, [toogleRender])


    return (
      
        postsArray.map((post) => (

          <PostBox key={post.id} post = {post} />

        ))
    )
}




