import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchemaLogin from '../../Utils/validation-shema/validationShemaLogin'
import { useContext, useState } from 'react'
import {AuthContext} from '../../Utils/context/index'
import { useNavigate } from "react-router-dom";
import { Input, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box'; 




export default function  Login() {

  const { setToken, setUserId, setIsAdmin, setIsConnected, setUsername } = useContext(AuthContext);  
  const { register,setError, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(validationSchemaLogin),
         mode: 'onTouched'
        });
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
    const response = await fetch(`http://localhost:3001/api/user/login`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({  email: data.email, password: data.password }),
      headers: {"Content-Type": "application/json"}})

      if (!response.ok) {
        const result = await response.json()
        throw new Error(`${response.status}. ${result.message}`);
      }else {
        const result = await response.json()
      setToken(result.token);
      setUserId(result.id);
      setIsAdmin(result.is_admin);
      setIsConnected(true);
      setUsername(result.username)
      localStorage.setItem('token', result.token)
      localStorage.setItem('id', result.id)
      localStorage.setItem('admin', result.is_admin)
      navigate("/");
    } 
  } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
}


  return (

    <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c' }}> 

      <form onSubmit={handleSubmit(onSubmit)}>

        <h1> Connexion </h1>

        <label> Email: </label>
        <Input type="email" {...register("email") } className="input" />
        <p className="error">{errors.email?.message}</p>

        <label> Mot de passe : </label>
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
        <button  type="submit"  > Se connecter </button>
        <p className="error">{errors.validation?.message}</p>

      </form>
    </Box>
  )  
 }
 
