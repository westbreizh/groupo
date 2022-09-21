//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

export default function DisLikeButton (props) {            
  const post = props.post
  let dislikes = post.dislikes
  const id = post.id
  const authDatas  = useContext(AuthContext); 
  const userID = authDatas.userId 
  const toogleRender = authDatas.toogleRender  
  const setToogleRender = authDatas.setToogleRender 
  const token = authDatas.token;


  async function disliker () {
      try{
        console.log(dislikes)
        console.log("je rentre dans ma fonction")
        const response = await fetch(`http://localhost:3001/api/posts/:${id}/dislike`, {
          mode: "cors",
          method: "PUT",
          body: JSON.stringify({  userId : userID } ),
          headers: {"Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token,
        }})
    
        if (!response.ok) {
          const result = await response.json()
          console.log(result)
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          console.log(result.message)
          setToogleRender(! toogleRender)

          } 
      } 
      catch(err){
        const errorMessage = err.toString();
        console.log(errorMessage)
      }
    }

  

  return (

  <IconButton onClick={() => { disliker(id) }} > 
  <span> {dislikes}</span>
  <ThumbDownAltIcon color="secondary" sx={{ fontSize: 30 }}  /> 
  </IconButton>

  )
}