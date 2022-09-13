import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import {AuthContext} from '../../Utils/context/index';
import CreatePost from '../../components/createPost/CreatePost';
import PublicationPosts from '../../components/publicationPosts/PublicationPosts' ;
import "./styles.css";

export default function  Home() {

const  authDatas  = useContext(AuthContext);       
const isConnected = authDatas.connected; 
const [isCreatePostVisible, setIsCreatePostVisible] = useState(false) ;


if(isConnected)

    return (

    <div>
        
        { !isCreatePostVisible ?
        
            <Button sx={{bgcolor: '#ec5990', mt:"20px", ml:"40%", fontSize:"22px", textTransform:"none"  }} 
            variant="contained" onClick={() => setIsCreatePostVisible (! isCreatePostVisible)}  >
            Ajouter une publication </Button> 
            : 
            <CreatePost isCreatePostVisible = { isCreatePostVisible }  setIsCreatePostVisible = { setIsCreatePostVisible} /> 
        }
        
            < PublicationPosts />
        
    </div>
    )
else

        return (
            < PublicationPosts />
        )

}

