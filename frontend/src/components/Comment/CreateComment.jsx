import { useForm } from "react-hook-form"            
import { useContext,useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import {  IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box'; 
import "./styles.css";


export default function  CreateComment(props) {

  const [isCommentPostBoxOpen, setIsCommentPostBoxOpen] = useState(false) ;
  const  authDatas  = useContext(AuthContext); 
  const username = authDatas.username
  const userId = authDatas.userId  
  const toogleRender = authDatas.toogleRender  
  const setToogleRender = authDatas.setToogleRender 
  const { register,setError, formState: { errors }, handleSubmit } = useForm({      
           mode: 'onTouched'});
  const id = props.id

  const onSubmit = async function (data) {            

    try{
      const response = await fetch(`http://localhost:3001/api/comments/:${id}`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({  id_user: userId, texte: data.texte, username: username}),
        headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setIsCommentPostBoxOpen (! isCommentPostBoxOpen)
        console.log(result.message)
        setToogleRender(! toogleRender)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  
    return (   

       <Box>

        { !isCommentPostBoxOpen ? 

          <IconButton onClick={() => setIsCommentPostBoxOpen (! isCommentPostBoxOpen)} > 
          <DriveFileRenameOutlineIcon color="secondary" sx={{ fontSize: 30, marginLeft: "15px" }}  /> 
          </IconButton> :
          
          <Box  sx={{  border: '2px solid white', borderRadius: '35px', width: '100%',
          mx: 'auto', mt: '50px', bgcolor: '#323e78', position: 'absolute',top: "50%",left: '0%', zIndex: 'modal',}}>

            <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
              <IconButton  color= "secondary" onClick={() =>  setIsCommentPostBoxOpen (! isCommentPostBoxOpen )} >
                <CloseIcon  />
              </IconButton>
            </Box>
        


            <form onSubmit={handleSubmit(onSubmit)}>

            <h3> Commentaire </h3>

              <TextareaAutosize  type="text" {...register("texte", { maxLength: 250 }) } placeholder="votre message de 25O caratères max" className="textaera" />
              {errors.texte && <p className="error">{"le message est trop long, vous n'êtes pas écrivain !"}</p>}
              
              <button  type="submit" className="publicate"  > Publier </button>
              <p className="error">{errors.validation?.message}</p>
        
            </form>
          </Box>
        }
      </Box> 
    )
}




   