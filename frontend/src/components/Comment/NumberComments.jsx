import { useState, useEffect } from 'react'
export default function  NumberComments( props) {
  
  const [numberComments, setNumberComments] = useState("0")

  const id = props.id

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
          setNumberComments (result.length)
          } 
        } 

        catch(err){
          const errorMessage = err.toString();
          console.log(errorMessage);
        } 
    }
    fetchArrayComment()
  }, [id])


      return (
                <span> {numberComments}</span>
 
            )
      
 }
     


        
    




