import { useContext, useState } from 'react';
import {AuthContext} from '../../Utils/context/index';
import Button from '@mui/material/Button';



export default function Buttons () {

  const [showCreatePost, setShowPassWord] = useState(false) ;

    function renderCreatePost(){
        setShowPassWord (! showCreatePost)
    }
  return (


      <Button variant="contained" onClick={() => {renderCreatePost()}}  > Nouvelle publication </Button>


  );
}