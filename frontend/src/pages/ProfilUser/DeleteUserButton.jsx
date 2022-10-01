import {AuthContext} from '../../Utils/context/index'
import { useContext, useState } from 'react'
import {IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import AlertDelete from '../../components/Dialog/AlertDelete'
import { useNavigate } from "react-router-dom";


export default function DeleteUserButton (props) {            
  const user = props.user
  const id = user.id
  const [openAlert, setOpenAlert] = useState(false);
  const [supr, setSupr] = useState(false);
  const navigate = useNavigate();
  const { setIsConnected, setIsDisabled } = useContext(AuthContext);  



  async function del () {
    if (supr){
      try{
        const response = await fetch(`http://localhost:3001/api/user/:${id}`, {
          mode: "cors",
          method: "DELETE",
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }})
    
        if (!response.ok) {
          const result = await response.json()
          throw new Error(`${response.status}. ${result}`)
        } else{
          const result = await response.json()
          console.log(result.message)
          setSupr(!supr)
          setIsConnected(false)
          setIsDisabled(true)
          navigate("/");

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
    <AlertDelete message = {"votre compte"} openAlert = {openAlert} setOpenAlert = {setOpenAlert} setSupr = {setSupr}/>
    <IconButton onClick={() => {  setOpenAlert(true) }} > 
    <DeleteOutlined color="secondary" sx={{ fontSize: 30 }}  /> 
    </IconButton>

  </div>
  )


}