
import {AuthContext} from '../../Utils/context/index'
import { useContext, useState } from 'react'
import { Input, IconButton, Button } from '@mui/material'
import Box from '@mui/material/Box'
import ModifyPost  from './Modifypost'
import DeletePostButton from './DeletePostButton'
import CreateComment from '../Comment/CreateComment'
import ListComment from '../Comment/ListComment'
import LikeButton from './LikeButton'
import DisLikeButton from './DisLikeButton '
import NotesIcon from '@mui/icons-material/Notes'
import CloseIcon from '@mui/icons-material/Close';
import "./styles.css";
import NumberComments from '../Comment/NumberComments'

export default function  PostBox(props) {

  const post = props.post
  const  authDatas  = useContext(AuthContext)
  const isDisabled  = authDatas.isDisabled 
  const userId = authDatas.userId  
  const isAdmin = authDatas.isAdmin
  const linuxTime =Date.parse(post.date)
  const dateTime = new Date(linuxTime)
  const dateFrench= dateTime.toLocaleDateString("fr")
  const [isCommentListOpen, setIsCommentListOpen] = useState(false) 
  const [reRender, setReRender] = useState("false") 


    return (

  
      <Box  sx={{  border: '2px solid white', borderRadius: '15px', maxWidth: '580px', mx: 'auto', mt: '50px', bgcolor: '#111b4c', position: 'relative', }}> 
            
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
                  <LikeButton post = {post} reRender = {reRender} setReRender = {setReRender} />
                  <DisLikeButton post = {post} reRender = {reRender} setReRender = {setReRender} />
              </Box>
              
            </Box>
            <h6>   {post.username} le {dateFrench} </h6>

      </Box>
          
      )
}        
