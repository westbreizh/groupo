//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'


export default function LikeButton (props) {
              
  const {likes, id} = props
  const {toogleRender, setToogleRender, isDisabled, userId} = useContext(AuthContext);  



  async function liker () {
      try{
        const response = await fetch(`http://localhost:3001/api/posts/:${id}/like`, {
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

  <IconButton  disabled={isDisabled}  onClick={() => { liker(id) }} > 
  <span> {likes}</span>
  <ThumbUpAltIcon color="secondary" sx={{ fontSize: 30 }}  /> 
  </IconButton>

  )
}