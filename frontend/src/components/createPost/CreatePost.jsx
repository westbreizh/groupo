import { useForm } from "react-hook-form"           // la logique  d'enregistrement des champs des inputs est asuré par le hook useForm 
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'

import { Input, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import "./styles.css";


export default function  CreatePost(props) {

  const {isCreatePostVisible, setIsCreatePostVisible} = props ;
  const  authDatas  = useContext(AuthContext);        //  branchement  sur le contexte global d 'authentification  
  const UserId = authDatas.userId;
  //const Token = authDatas.token;
  const { register,setError, formState: { errors }, handleSubmit } = useForm({       // useForme nous founit la possibilité d'enregistrer les données, gerer les erreurs, et appeler une fonction callback
           mode: 'onTouched'});
  
  
  const onSubmit = async function (data) {            // logique de l'appel de l'API de creation d'enregistrement du backend et du traitement de la réponse
    
    try{
      const response = await fetch(`http://localhost:3001/api/posts`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({  id_user: UserId, title: data.title, texte: data.texte, file: data.file[0]}),
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setIsCreatePostVisible (! isCreatePostVisible)
        window.location.reload()
        return result} 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  
    return (   
    
    <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#121836' }}>
      
      <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
        <IconButton  color= "secondary" onClick={() =>  setIsCreatePostVisible (! isCreatePostVisible) } >
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
    )  
   }
   