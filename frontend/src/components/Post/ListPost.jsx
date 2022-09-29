import {AuthContext} from '../../Utils/context/index'
import { useState, useContext, useEffect } from 'react'
import PostBox from './PostBox';
import "./styles.css";


export default function  ListPosts() {

  const { toogleRender } = useContext(AuthContext);  
  const [postsArray, setPostsArray] = useState([])
 
  useEffect(() => {
    async function fetchArrayPosts()  {           
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




