import { useForm } from "react-hook-form"           
import { Input, IconButton, InputAdornment} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
//import validationSchemaUser from '../../Utils/validation-shema/validationShemaUser'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function  ModifyUser(props) {
  const { reRender, setReRender, user} = props
  const [showPassword, setShowPassWord] = useState(false) ;
  const { register,setError, formState: { errors }, handleSubmit } = useForm({       
            mode: 'onTouched'});
  const handleClickShowPassword = () => {
              setShowPassWord( !showPassword );
            };
  const handleMouseDownPassword = (event) => {
              event.preventDefault();
            };
  const [isModifyBoxOpen, setIsModifyBoxOpen] = useState(false) ;



  const onSubmit = async function (data) {          

    try{
        const response = await fetch(`http://localhost:3001/api/user/:${user.id}`, {
        mode: "cors",
        method: "PUT",
        body: JSON.stringify({  username: data.username, lastName: data.lastName, forName: data.forName, email: data.email, texte: data.texte}),
        headers: {"Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }})
  
      if (!response.ok) {
        const result = await response.json()
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setIsModifyBoxOpen(!isModifyBoxOpen)
        setReRender(!reRender)
        console.log(result)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
   
  return (  
  
    <Box>

      { !isModifyBoxOpen ? 


        <IconButton onClick={() => setIsModifyBoxOpen(!isModifyBoxOpen)} > 
        <DesignServicesIcon color="secondary" sx={{ fontSize: 30, marginLeft: '5px' }}  /> 
        </IconButton> :
    
        <Box  sx={{  border: '2px solid white', borderRadius: '15px', width: '100%', maxWidth: '580px',
           mt: '50px', bgcolor: '#121836', position: 'absolute',top: "10%",left: 'center', zIndex: 'modal',}}>
          
          <Box  sx={{ maxWidth: '58px', marginX: "left"}}>
            <IconButton  color= "secondary" onClick={() => setIsModifyBoxOpen(!isModifyBoxOpen) } >
              <CloseIcon  />
            </IconButton>
          </Box>
      

          <form onSubmit={handleSubmit(onSubmit)}>
      
            <h1> Modifier votre profil </h1>
      
            <label> Nom d'utilisateur : </label>
              <Input  type = "text" {...register("username")} defaultValue = {user.username} className="input" />
              <p className="error">{errors.userName?.message}</p>
            <label> Nom  : </label>
            <Input type="text" {...register("forName",{ maxLength: 20 }) } defaultValue = {user.forName}  className="input" />
            {errors.forName && <p className="error">{"Votre nom ne doit pas dépasser 20 caractères !"}</p>}
            
            <label> Prenom : </label>
            <Input type="text" {...register("lastName",{ maxLength: 20 }) } defaultValue = {user.lastName}  className="input" />
            {errors.lastName && <p className="error">{"Votre prénom ne doit pas dépasser 20 caractères ! !"}</p>}

            <label> Email : </label>
            <Input type="email" {...register("email",{ required: true }) } defaultValue = {user.email}  className="input" />
            <p className="error">{errors.email?.message}</p>


            <label>Ancien mot de passe : </label>
            <Input type={showPassword? "text" : "password"} {...register("password") }  className="input"
              endAdornment={
              <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >          
              {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
              }/>

            <label>Nouveau mot de passe : </label>
            <Input type={showPassword? "text" : "password"} {...register("password") }  className="input"
              endAdornment={
              <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >          
              {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
              }/>


            <label> Description : </label>
            <TextareaAutosize  type="text" {...register("texte", { maxLength: 250 }) } defaultValue={user.texte} className="input" />
            {errors.texte && <p>{"le message est trop long, vous n'êtes pas écrivain !"}</p>}


            <button  type="submit"  > Modifier </button>
            <p>{errors.validation?.message}</p>
      
          </form>
        </Box>
      }  
    </Box>
  )
}
   
