//import { useState, useContext, useEffect } from 'react'
import { useState} from 'react'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import AlertDelete from '../Dialog/AlertDelete'

export default function DeleteCommentButton (props) {            

  const { reRender, setReRender, id} = props
  const [openAlert, setOpenAlert] = useState(false);
  const [supr, setSupr] = useState(false);


  async function del () {
    if (supr){
      try{
        const response = await fetch(`http://localhost:3001/api/comments/:${id}`, {
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
          console.log(result.message)
          setSupr(!supr)
          setReRender(!reRender)
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
    <AlertDelete openAlert = {openAlert} setOpenAlert = {setOpenAlert} setSupr = {setSupr} message = {"votre commentaire"}/>
    <IconButton onClick={() => { setOpenAlert(true) }} > 
    <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
    </IconButton>
  </div>
  )


}