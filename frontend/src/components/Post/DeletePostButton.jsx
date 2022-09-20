//import { useState, useContext, useEffect } from 'react'
import { useContext, useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import Alert from '../Dialog/Alert'

export default function DeletePostButton (props) {            

  const id  = props.id ; 
  const  authDatas  = useContext(AuthContext); 
  const toogleEffectRender = authDatas.toogleEffectRender  
  const setToogleEffectRender = authDatas.setToogleEffectRender
  const [open, setOpen] = useState(false);
  const [supr, setSupr] = useState(false);


  async function del () {
    if (supr){
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
  }
  del()

  return (
  <div>
    <Alert open = {open} setOpen = {setOpen} setSupr = {setSupr}/>
    <IconButton onClick={() => {  setOpen(true) }} > 
    <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
    </IconButton>
  </div>
  )


}