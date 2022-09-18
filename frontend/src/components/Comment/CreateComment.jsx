import { useForm } from "react-hook-form"            
import { useContext,useState} from 'react'
import {AuthContext} from '../../Utils/context/index'
import { Input, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box'; 
//import "./styles.css";


export default function  CreateComment(props) {

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

        { !isCommentPostBoxOpen ? 

          <Button sx={{bgcolor: '#ec5990', fontSize:"22px", textTransform:"none", mt: "20px" }}             
          variant="contained" onClick={() => setIsCommentPostBoxOpen (! isCommentPostBoxOpen)}  >
          comment?</Button> 
          
          :

          <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836', padding: "5%"}}>
            
            <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
              <IconButton  color= "secondary" onClick={() =>  setIsCommentPostBoxOpen (! isCommentPostBoxOpen )} >
                <CloseIcon  />
              </IconButton>
            </Box>
        
            <form onSubmit={handleSubmit(onSubmit)}>
        
              <h1> Nouvelle publication </h1>
        
              <label> Titre : </label>
              <Input type="text" {...register("title",{ required: true }) } placeholder="votre titre" className="input" />
              {errors.title && <p>{"Vous devez écrire un titre l'ami !"}</p>}
              
        
              <label> Message : </label>
              <TextareaAutosize  type="text" {...register("texte", { maxLength: 250 }) } placeholder="votre message de 25O caratères max" className="input" />
              {errors.texte && <p>{"le message est trop long, vous n'êtes pas écrivain !"}</p>}
              
              <label> Inserer un fichier ? </label>
              <Input type="file" {...register("file") } className="input" />
              {errors.file && <p>{"le fichier n'a pas pu être chargé désolé!"}</p>}
        
              <button  type="submit"  > Publier </button>
              <p>{errors.validation?.message}</p>
        
            </form>
          </Box>
        }
      </Box> 
    )
}




   