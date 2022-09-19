import { useForm } from "react-hook-form"            
import { useContext,useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import { Input, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotesIcon from '@mui/icons-material/Notes';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box'; 
//import "./styles.css";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


export default function  ListComment (props) {

  const [isCommentPostBoxOpen, setIsCommentPostBoxOpen] = useState(false) ;
  const  authDatas  = useContext(AuthContext); 
  const userId = authDatas.userId  
  const toogleEffectRender = authDatas.toogleEffectRender  
  const setToogleEffectRender = authDatas.setToogleEffectRender 
  //const Token = authDatas.token;
  const { register,setError, formState: { errors }, handleSubmit } = useForm({      
           mode: 'onTouched'});
  const id = props.id

  const onSubmit = async function (data) {            
    
    try{
      const response = await fetch(`http://localhost:3001/api/comments/:${id}`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({  id_user: userId, title: data.title, texte: data.texte, file: data.file[0]}),
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setIsCommentPostBoxOpen (! isCommentPostBoxOpen)
        setToogleEffectRender(! toogleEffectRender)
        console.log(result.message)} 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  
    return (   

       <Box>
          <IconButton > 
          <DriveFileRenameOutlineIcon color="secondary" sx={{ fontSize: 30 }}  /> 
          </IconButton> :


          </Box>
        
      
    )
}




   