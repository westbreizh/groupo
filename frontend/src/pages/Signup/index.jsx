import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchemaSignup from '../../Utils/validation-shema/validationShemaSignup'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Input, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box'; 



export default function  SignUp() {

  const { register , setError, formState: { errors }, handleSubmit } = useForm({
            resolver: yupResolver(validationSchemaSignup),
            mode: 'onTouched'});
  const navigate = useNavigate();
  const [showPassword, setShowPassWord] = useState(false) ;
  const handleClickShowPassword = () => {
    setShowPassWord( !showPassword );
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async function (data) {
    try{
      const response = await fetch(`http://localhost:3001/api/user/signup`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({userName: data.userName, email: data.email, password: data.password}),
        headers: {"Content-Type": "application/json"}})

        if (!response.ok) {
          const result = await response.json();
          throw new Error(`${response.status}. ${result.message}`);
        }else {
    
        let result = await response.json();
        alert(result.message);
        navigate("/login");
      }
    }

    catch(err){
      const errorMessage = err.toString();
      console.log(errorMessage)
      
      setError("validation", { type:"manual", message: errorMessage} )
    }
  }
  

  return (
  
    <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c' }}> 

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Inscription</h1>

        <label > Nom d'utilisateur:</label>
        <Input  type = "text" {...register("userName")} className="input" />
        <p className="error">{errors.userName?.message}</p>
           
        <label> Email: </label>
        <Input type="email" {...register("email")} className="input" />
        <p className="error">{errors.email?.message}</p>

        <label> mot de passe : </label>
        <Input type={showPassword? "text" : "password"} {...register("password") }  className="input"
           endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
         <p className="error">{errors.password?.message}</p>

        
        <button  type="submit"> S'inscrire</button>
        <p className="error">{errors.validation?.message}</p>

      </form>
    </Box>
  );
}
 
