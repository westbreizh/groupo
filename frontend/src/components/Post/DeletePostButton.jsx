//import { useState, useContext, useEffect } from 'react'
import { useContext, useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import AlertDelete from '../Dialog/AlertDelete'


export default function DeletePostButton (props) {            

  const {toogleRender, setToogleRender} = useContext(AuthContext);  
  const id  = props.id ; 
  const [openAlert, setOpenAlert] = useState(false);
  const [supr, setSupr] = useState(false);


  async function del () {
    if (supr){
      try{
        const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
          mode: "cors",
          method: "DELETE",
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }})
    
        if (!response.ok) {
          const result = await response.json()
          console.log(result)
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          setSupr(!supr)
          console.log(result.message)
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
    <AlertDelete openAlert = {openAlert} setOpenAlert = {setOpenAlert} setSupr = {setSupr} message = {"votre publication"}/>
    <IconButton onClick={() => {  setOpenAlert(true) }} > 
    <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
    </IconButton>
  </div>
  )


}