// la logique de validation et d'enregistrement des champs des inputs est asuré par le hook useForm 
// couplé à yupResolver qui definit le shéma, le masque des entrées valable
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchemaSignup from '../../Utils/validation-shema/validationShemaLogin'
import { DevTool } from "@hookform/devtools";

// gestion d'un state local pour la gestion de visualisation du mot de passe
// les variables des entrées sont gérées par hookForm comme vue ci-dessus
import { useState } from 'react'


// logique de navigation asssuré par le hook useNavigate
import { useNavigate } from "react-router-dom";

// on importe différents composant de la bibliothèque material-ui, 
//la gestion du css est assuré par le fichier ./styles.css que lon importe
import { Input, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./styles.css";



export default function  SignUp() {

   // syntaxe et logique propre à useForm avec integration de yup
  const { register ,control , setError, formState: { errors }, handleSubmit } = useForm({
          resolver: yupResolver(validationSchemaSignup),
          mode: 'onTouched'});

  const navigate = useNavigate();


 //gestion de l'affichage du mot de passe
 const [showPassword, setShowPassWord] = useState(false) ;
 const handleClickShowPassword = () => {
   setShowPassWord( !showPassword );
 };
 const handleMouseDownPassword = (event) => {
   event.preventDefault();
 };



  // logique de l'appel de l'API login du backend et  traitement de la réponse
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
    <> 
 
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Inscription</h1>
        <label > Nom d'utilisateur:</label>
        <Input  type = "text" {...register("userName")} className="input" />
        <p>{errors.userName?.message}</p>
           
        <label> Email: </label>
        <Input type="email" {...register("email")} className="input" />
        <p>{errors.email?.message}</p>

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
        <p>{errors.password?.message}</p>

        
        <button  type="submit"> S'inscrire</button>
        <p>{errors.validation?.message}</p>

      </form>


    <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
}
 
