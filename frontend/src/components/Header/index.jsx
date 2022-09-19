import logo_left from '../../assets/logo_left.png'
import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import NavIsConnected from './NavIsConnected'
import NavIsDisconnected from './NavIsDisconnected'
import "./styles.css";


function Header() {

  const { connected } = useContext(AuthContext); 
  const { isAdmin } = useContext(AuthContext);

  if (connected) {
    return (

      <div className="header">
      
        <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
    
         <NavIsConnected isAdmin = {isAdmin}/>

      </div>

    )}

  else {
    return (
      <div className="header">
      
          <img src={logo_left}  alt="logo-groupomania" className="img_header"/>
        
          <NavIsDisconnected />

      </div>
    );}

  }

  
  
  export default Header;