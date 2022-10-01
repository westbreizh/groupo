import { useState, useEffect } from 'react'
import CommentBox from './CommentBox'

export default function  ListPosts( props) {

  const { reRender, setReRender, id} = props
  const [commentArray, setCommentArray] = useState([])


  useEffect(() => {
    async function fetchArrayComment()  {            
      try{
        const response = await fetch(`http://localhost:3001/api/comments/:${id}`, {
          mode: "cors",
          method: "GET",
          headers: {"Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }})
    
        if (!response.ok) {
          const result = await response.json()
          throw new Error(`${response.status}. ${result}`)
        } else{

          const result = await response.json()
          setCommentArray (result.reverse())
          } 
        } 

        catch(err){
          const errorMessage = err.toString();
          console.log(errorMessage);
        } 
    }
    fetchArrayComment()
  },[id, reRender] )


      return (

            commentArray.map((comment) => (
              <CommentBox key={comment.id} comment = {comment} reRender = {reRender} setReRender = {setReRender} />  
            )) 
      )
 }
     


        
    




