import * as yup from 'yup'


const validationSchemaLogin= yup.object().shape({
    email: yup
        .string()
        .email("l'email est invalide")
        .required("ce champ est obligatoire"),
    password: yup
        .string()
        .required("ce champ est obligatoire")
        //.matches(/^(?=.{4,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/, "le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule,un chiffre et un caractère spéciale")
         //.matches(/[a-z]/, "le mot de passe doit contenir au moins une minuscule")
         //.matches(/[A-Z]/, "le mot de passe doit contenir au moins une majuscule")
         //.matches(/[0-9]/, "le mot de passe doit contenir au moins un chiffre")
         //.min(5, "le mot de passe doit contenir au moins 8 caractères"),
  });
  
  export default validationSchemaLogin