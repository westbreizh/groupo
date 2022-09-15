// la logique de validation et d'enregistrement des champs des inputs est asuré par le hook useForm 
// couplé à yupResolver qui definit le shéma, le masque des entrées valable
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchemaLogin from '../../Utils/validation-shema/validationShemaLogin'

// prise en charge de deux states un local pour la gestion de visualisation du mot de passe
// un state global pour les données d'authentification connexion 
// les variables des entrées sont gérées par hookForm comme vue ci-dessus
import { useContext, useState } from 'react'
import {AuthContext} from '../../Utils/context/index'

// logique de navigation asssuré par le hook useNavigate
import { useNavigate } from "react-router-dom";

// on importe différents composant de la bibliothèque material-ui, 
//la gestion du css est assuré par le fichier ./styles.css que lon importe
import { Input, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./styles.css";



export default function  Login() {

//  branchement  sur le contexte global d 'authentification avec declaration par destructuration
// des fonction pour modifier la valeur des variables. 
  const { setToken, setUserId, setIsAdmin, setConnected } = useContext(AuthContext);  
 
 // syntaxe et logique propre à useForm avec integration de yup
  const { register,setError, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(validationSchemaLogin),
         mode: 'onTouched'
        });

  const navigate = useNavigate();

  //gestion de l'affichage du mot de passe
  const [showPassword, setShowPassWord] = useState(false) ;
  const handleClickShowPassword = () => {
    setShowPassWord( !showPassword );
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // logique de l'appel de l'API login du backend et du traitement de la réponse
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
      setConnected(true);
      navigate("/");
    } 
  } 
    catch(err){
      const errorMessage = err.toString();
      setError("validation", { type:"manual", message: errorMessage} )
    }
}

  // le rendu de notre composant
  return (

      <form onSubmit={handleSubmit(onSubmit)}>

        <h1> Connexion </h1>

        <label> Email: </label>
        <Input type="email" {...register("email") } className="input" />
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


        <button  type="submit"  > Se connecter </button>
        <p>{errors.validation?.message}</p>

      </form>
  )  
 }
 
