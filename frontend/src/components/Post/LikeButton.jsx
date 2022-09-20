//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

export default function LikeButtoner (props) {            
  const post = props.post
  let likes = post.likes
  const id = post.id
  const authDatas  = useContext(AuthContext); 
  const userID = authDatas.userId 
  const toogleEffectRender = authDatas.toogleEffect  
  const setToogleEffectRender = authDatas.setToogleEffectRender 
  console.log("je suis dans like")
  console.log(likes)

  async function liker () {
      try{
        likes+=1
        console.log(likes)
        console.log("je rentre dans ma fonction")
        const response = await fetch(`http://localhost:3001/api/posts/:${id}/like`, {
          mode: "cors",
          method: "PUT",
          body: JSON.stringify({ id: id, likes: likes, userId : userID } ),
          headers: {"Content-Type": "application/json",
                    "Authorization":  "????",
        }})
    
        if (!response.ok) {
          const result = await response.json()
          console.log(result)
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          console.log(result.message)
          setToogleEffectRender(!toogleEffectRender)
          } 
      } 
      catch(err){
        const errorMessage = err.toString();
        console.log(errorMessage)
      }
    }

  

  return (

  <IconButton onClick={() => { liker(id) }} > 
  <span> {likes}</span>
  <ThumbUpAltIcon color="secondary" sx={{ fontSize: 30 }}  /> 
  </IconButton>

  )
}