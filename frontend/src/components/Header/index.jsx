import logo_left from '../../assets/logo_left.png'
import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import NavIsConnected from './NavIsConnected'
import NavIsDisconnected from './NavIsDisconnected'


function Header() {

  const { isConnected, isAdmin} = useContext(AuthContext); 

  if (isConnected) {
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