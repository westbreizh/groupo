import {AuthContext} from '../../Utils/context/index'
import { useContext, useState } from 'react'
import { IconButton } from '@mui/material'
import NotesIcon from '@mui/icons-material/Notes'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import ModifyPost  from './Modifypost'
import DeletePostButton from './DeletePostButton'
import CreateComment from '../Comment/CreateComment'
import ListComment from '../Comment/ListComment'
import LikeButton from './LikeButton'
import DisLikeButton from './DisLikeButton '
import NumberComments from '../Comment/NumberComments'
import AvatarPostBox from '../Avatar/AvatarPostBox'
import "./styles.css"


export default function  PostBox(props) {

  const post = props.post
  const {isAdmin, isDisabled, userId} = useContext(AuthContext);  
  const [isCommentListOpen, setIsCommentListOpen] = useState(false) 
  const [reRender, setReRender] = useState("false") 
  const linuxTime =Date.parse(post.date)
  const dateTime = new Date(linuxTime)
  const dateFrench= dateTime.toLocaleDateString("fr")


    return (

  
      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c', position: 'relative', }}> 
            
            <h1> {post.titre}</h1>

            {post.image_url !==""? <img src={post.image_url} alt= "l'images de la publication " className='img' crossOrigin="anonymous" /> : ""} 

            <p> {post.texte}</p>

  

            <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >

              {userId=== post.id_user || isAdmin === "y" ? 
                <Box sx={ { display: 'flex', justifyContent: "space-between"   }}  >
                <ModifyPost id={post.id} titre={post.titre} texte={post.texte} image_url= {post.image_url} />
                <DeletePostButton id = {post.id}/>
                    </Box> :
                      ""
                  }

              <Box sx={ { display: 'flex', justifyContent: "space-between", alignItems:"center"   }}  >
                
              
                {!isCommentListOpen? 
                

                  <IconButton  disabled={isDisabled}  onClick={() => setIsCommentListOpen (! isCommentListOpen)} > 
                    <NumberComments id = {post.id}/>
                    <NotesIcon color="secondary" sx={{ fontSize: 30 }}  /> 
                  </IconButton> 
                  
                  :

                  <Box  sx={{  border: '2px solid white', borderRadius: '15px', width: '100%',
                   mx: 'auto', mt: '50px', bgcolor: '#121836', position: 'absolute',top: "90%",left: '0%', zIndex: 'modal',}}>
                  
                    <IconButton  color= "secondary" onClick={() =>  setIsCommentListOpen (! isCommentListOpen )} >
                    <CloseIcon  />
                    </IconButton>

                    <CreateComment id = {post.id} reRender = {reRender} setReRender = {setReRender} />
                    <ListComment id = {post.id} reRender = {reRender} setReRender = {setReRender}/>
                    
                    <IconButton  color= "secondary" onClick={() =>  setIsCommentListOpen (! isCommentListOpen )} >
                    <CloseIcon  />
                    </IconButton>
                    
                    : ""

                  </Box> 
                }

              </Box>

              <Box>
                  <LikeButton id = {post.id} likes = {post.likes}  />
                  <DisLikeButton id = {post.id} dislikes = {post.dislikes} />
              </Box>
              
            </Box>
            <Box sx={ { display: 'flex', justifyContent: "center", alignItems:"baseline"   }}  >
            <AvatarPostBox userId= {post.id_user} />
             <h6>  le {dateFrench} </h6>
            </Box>
      </Box>
          
      )
}        
