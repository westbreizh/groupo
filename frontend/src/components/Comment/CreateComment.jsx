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

  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false) ;
  const reRender= props.reRender
  const setReRender = props.setReRender
  const  authDatas  = useContext(AuthContext); 
  const username = authDatas.username
  const userId = authDatas.userId  
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

        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setIsCommentBoxOpen (! isCommentBoxOpen )
        console.log(reRender)
        setReRender(!reRender)
        console.log(reRender)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  
    return (   

       <Box>

        { !isCommentBoxOpen ? 

          <IconButton onClick={() => setIsCommentBoxOpen (! isCommentBoxOpen )}  sx={{textAlign: "center", margin:"auto"}} > 
          <DriveFileRenameOutlineIcon color="secondary" sx={{ fontSize: 40, textAlign: "center", margin:"auto"}}  /> 
          <span>  Commenter</span>
          </IconButton> :
          
          <Box  sx={{  border: '2px solid white', borderRadius: '25px', width: '90%',
          mx: 'auto', mt: '50px', bgcolor: '#323e78', }}>

            <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
              <IconButton  color= "secondary" onClick={() =>  setIsCommentBoxOpen (! isCommentBoxOpen )} >
                <CloseIcon  />
              </IconButton>
            </Box>
        


            <form onSubmit={handleSubmit(onSubmit)}>

            <h3> Votre commentaire </h3>

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




   