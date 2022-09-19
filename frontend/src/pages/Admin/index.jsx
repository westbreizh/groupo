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




export default function  Admin() {

const { connected, setConnected, setIsAdmin } = useContext(AuthContext); 
setIsAdmin("y")


  return (

    
        <h1> En construction </h1>

  )  
 }
 
