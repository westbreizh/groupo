//import { useState, useContext, useEffect } from 'react'
import { useContext, useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import AlertDelete from '../Dialog/AlertDelete'

export default function DeletePostButton (props) {            

  const id  = props.id ; 
  const  authDatas  = useContext(AuthContext);
  const token = authDatas.token; 
  const toogleRender = authDatas.toogleRender  
  const setToogleRender = authDatas.setToogleRender 
  const [openAlert, setOpenAlert] = useState(false);
  const [supr, setSupr] = useState(false);


  async function del () {
    if (supr){
      try{
        console.log("je rentre dans ma fonction")
        const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
          mode: "cors",
          method: "DELETE",
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + token,
        }})
    
        if (!response.ok) {
          const result = await response.json()
          console.log(result)
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          console.log(result.message)
          setSupr(!supr)

          console.log(toogleRender)
          setToogleRender(!toogleRender)
          console.log(toogleRender)
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
    <AlertDelete openAlert = {openAlert} setOpenAlert = {setOpenAlert} setSupr = {setSupr}/>
    <IconButton onClick={() => {  setOpenAlert(true) }} > 
    <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
    </IconButton>
  </div>
  )


}