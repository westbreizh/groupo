//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

export default function DisLikeButton (props) {   
  
  const {dislikes, id} = props
  const {toogleRender, setToogleRender, isDisabled, userId} = useContext(AuthContext);  


  async function disliker () {
      try{
        const response = await fetch(`http://localhost:3001/api/posts/:${id}/dislike`, {
          mode: "cors",
          method: "PUT",
          body: JSON.stringify({  userId : userId } ),
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),

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

  <IconButton  disabled={isDisabled} onClick={() => { disliker(id) }} > 
  <span> {dislikes}</span>
  <ThumbDownAltIcon color="secondary" sx={{ fontSize: 30 }}  /> 
  </IconButton>

  )
}