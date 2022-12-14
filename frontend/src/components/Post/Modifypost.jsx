import { useForm } from "react-hook-form"           
import { Input, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useContext, useState} from 'react'
import {AuthContext} from '../../Utils/context/index'



export default function  ModifyPost(props) {
  const { id, titre, texte, image_url} = props
  const { toogleRender, setToogleRender } = useContext(AuthContext)
  const [isModifyPostBoxOpen, setIsModifyPostBoxOpen] = useState(false) ;  
  const { register,setError, formState: { errors }, handleSubmit } = useForm({       
           mode: 'onTouched'});


const onSubmit = async function (data) {          

    try{
        const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
        mode: "cors",
        method: "PUT",
        body: JSON.stringify({  title: data.title, texte: data.texte, file: data.file[0], imageUrl: image_url }),
        headers: {"Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token') }})
  
      if (!response.ok) {
        const result = await response.json()
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setToogleRender(!toogleRender)
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


          <IconButton onClick={() => setIsModifyPostBoxOpen(!isModifyPostBoxOpen)} > 
          <DesignServicesIcon color="secondary" sx={{ fontSize: 30, marginLeft: '5px' }}  /> 
          </IconButton> :
      
          <Box  sx={{  border: '2px solid white', borderRadius: '15px', width: '100%',
           mx: 'auto', mt: '50px', bgcolor: '#121836', position: 'absolute',top: "10%",left: '0%', zIndex: 'modal',}}>
            
            <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
              <IconButton  color= "secondary" onClick={() => setIsModifyPostBoxOpen(!isModifyPostBoxOpen) } >
                <CloseIcon  />
              </IconButton>
            </Box>
        
            <form onSubmit={handleSubmit(onSubmit)}>
        
              <h1> Modifier votre publication </h1>
        
              <label> Titre : </label>
              <Input type="text" {...register("title",{ required: true }) } defaultValue = {titre}  className="input" />
              {errors.title && <p>{"Vous devez ??crire un titre l'ami !"}</p>}
              
        
              <label> Message : </label>
              <TextareaAutosize  type="text" {...register("texte", { maxLength: 250 }) } defaultValue={texte} className="input" />
              {errors.texte && <p>{"le message est trop long, vous n'??tes pas ??crivain !"}</p>}
              
              <label> Inserer ou modifier votre fichier ? </label>
              <Input type="file" {...register("file") }  className="input" />
              {errors.file && <p>{"le fichier n'a pas pu ??tre charg?? d??sol??!"}</p>}
        
              <button  type="submit"  > Modifier </button>
              <p>{errors.validation?.message}</p>
        
            </form>
          </Box>
        }  
      </Box>
    )
}
   
