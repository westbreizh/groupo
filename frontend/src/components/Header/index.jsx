import logo_left from '../../assets/logo_left.png'
import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import LinksIsConnected from './LinksIsConnected'
import LinksIsNotConnected from './LinksIsNotConnected'
import "./styles.css";


function Header() {

  const { connected } = useContext(AuthContext); //     je branche mon composant sur le contexte global d 'authentification
  const { isAdmin } = useContext(AuthContext);

  if (connected) {
    return (

      <div className="header">
      
        <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
    
         <LinksIsConnected isAdmin = {isAdmin}/>

      </div>

    )}

  else {
    return (
      <div className="header">
      
          <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
        
          <LinksIsNotConnected />

      </div>
    );}

  }

  
  
  export default Header;