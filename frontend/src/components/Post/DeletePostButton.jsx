//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

export default function DeletePostButton (props) {            

  const id  = props.id ; 
  const  authDatas  = useContext(AuthContext); 
  const toogleEffectRender = authDatas.toogleEffectRender  
  const setToogleEffectRender = authDatas.setToogleEffectRender


  async function del () {
      try{
        console.log("je rentre dans ma fonction")
        const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
          mode: "cors",
          method: "DELETE",
          headers: {"Content-Type": "application/json",
                    "Authorization":  "????",
        }})
    
        if (!response.ok) {
          const result = await response.json()
          console.log(result)
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          setToogleEffectRender(! toogleEffectRender)
          console.log(result.message)
          } 
      } 
      catch(err){
        const errorMessage = err.toString();
        console.log(errorMessage)
      }
    }

  

  return (

  <IconButton onClick={() => { del(id) }} > 
  <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
  </IconButton>

  )


}