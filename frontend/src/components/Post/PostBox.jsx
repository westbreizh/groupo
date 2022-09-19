
import {AuthContext} from '../../Utils/context/index'
import { useContext } from 'react'
import Box from '@mui/material/Box';
import ModifyPost  from './Modifypost'
import DeletePostButton from './DeletePostButton';
import CreateComment from '../Comment/CreateComment'
import ListComment from '../Comment/ListComment';
//import DisLikeButton from './DisLikeButton';

import {IconButton } from '@mui/material'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import "./styles.css";

export default function  PostBox(props) {

  const post = props.post
  const  authDatas  = useContext(AuthContext)
  const userId = authDatas.userId  
  const isAdmin = authDatas.isAdmin
  const linuxTime =Date.parse(post.date)
  const dateTime = new Date(linuxTime)
  const dateFrench= dateTime.toLocaleDateString("fr")


    return (

      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c' }}> 
            
            <h1> {post.titre}</h1>

            {post.image_url !==""? <img src={post.image_url} alt= "oiseau" className='img' crossOrigin="anonymous" /> : ""} 

            <p> {post.texte}</p>


            <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >

              {userId=== post.id_user || isAdmin === "y" ? 
                <Box sx={ { display: 'flex', justifyContent: "space-between"   }}  >
                <ModifyPost post= {post} />
                <DeletePostButton id = {post.id}/>
                    </Box> :
                      ""
                  }

              <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >
                <CreateComment id = {post.id} />
                <ListComment/>
              </Box>

              <Box>
                <IconButton > 
                    < ThumbUpAltIcon color="secondary" sx={{ fontSize: 25 }} /> 
                    <span> 2 </span>
                </IconButton>



                <IconButton > 
                    < ThumbDownAltIcon color="secondary" sx={{ fontSize: 25 }} /> 
                    <span> 2 </span>
                </IconButton>
              </Box>
              
            </Box>
            <h6>  De {post.username} le {dateFrench} </h6>
        </Box>
                 

          
    
      )
      
    
}        
