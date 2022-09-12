import logo_left from '../../assets/logo_left.png'
import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import LinksAuth from '../headerLinks/linksAuth'
import LinksConnected from '../headerLinks/linksConnected'
import "./styles.css";


function Header() {

  const { connected } = useContext(AuthContext); //     je branche mon composant sur le contexte global d 'authentification
  const { isAdmin } = useContext(AuthContext);

  if (connected) {
    return (

      <div className="header">
      
        <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
    
         <LinksConnected isAdmin = {isAdmin}/>

      </div>

    )}

  else {
    return (
      <div className="header">
      
          <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
        
          <LinksAuth />

      </div>
    );}

  }

  
  
  export default Header;