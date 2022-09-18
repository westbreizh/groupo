import { useForm } from "react-hook-form"           
import { Input, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import "./styles.css";
import { useContext, useState} from 'react'
import {AuthContext} from '../../Utils/context/index'



export default function  ModifyPost(props) {
const post = props.post
const id = post.id
const titre = post.titre
const texte = post.texte
const image_url = post.image_url
const { register,setError, formState: { errors }, handleSubmit } = useForm({       
           mode: 'onTouched'});
const  authDatas  = useContext(AuthContext);             
const toogleEffectRender = authDatas.toogleEffectRender  
const setToogleEffectRender = authDatas.setToogleEffectRender

const [isModifyPostBoxOpen, setIsModifyPostBoxOpen] = useState(false) ;




const onSubmit = async function (data) {          

    try{
        const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
        mode: "cors",
        method: "PUT",
        body: JSON.stringify({  title: data.title, texte: data.texte, file: data.file[0], imageUrl: image_url }),
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()

        setToogleEffectRender(!toogleEffectRender)
        console.log(result.message)
        setIsModifyPostBoxOpen(!isModifyPostBoxOpen)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  
    return (  
    
      <Box>

        { !isModifyPostBoxOpen ? 
          <Button sx={{  border: '2px solid white', borderRadius: '15px', bgcolor: '#ec5990', ml: '2%',  textTransform: 'none'}}  
            variant="contained" onClick={() =>  setIsModifyPostBoxOpen(!isModifyPostBoxOpen)} >
          modifier
          </Button> :
      
          <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}>
            
            <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
              <IconButton  color= "secondary" onClick={() => setIsModifyPostBoxOpen(!isModifyPostBoxOpen) } >
                <CloseIcon  />
              </IconButton>
            </Box>
        
            <form onSubmit={handleSubmit(onSubmit)}>
        
              <h1> Modifier votre publication </h1>
        
              <label> Titre : </label>
              <Input type="text" {...register("title",{ required: true }) } defaultValue = {titre}  className="input" />
              {errors.title && <p>{"Vous devez écrire un titre l'ami !"}</p>}
              
        
              <label> Message : </label>
              <TextareaAutosize  type="text" {...register("texte", { maxLength: 250 }) } defaultValue={texte} className="input" />
              {errors.texte && <p>{"le message est trop long, vous n'êtes pas écrivain !"}</p>}
              
              <label> Inserer ou modifier votre fichier ? </label>
              <Input type="file" {...register("file") }  className="input" />
              {errors.file && <p>{"le fichier n'a pas pu être chargé désolé!"}</p>}
        
              <button  type="submit"  > Modifier </button>
              <p>{errors.validation?.message}</p>
        
            </form>
          </Box>
        }  
      </Box>
    )
}
   
