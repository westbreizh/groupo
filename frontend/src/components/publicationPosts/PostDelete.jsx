
//import { useState, useContext, useEffect } from 'react'
import { useContext} from 'react'
import {AuthContext} from '../../Utils/context/index'

function DeletePost (props) {            

  //  const [postDelete, setPostDelete] = useState("")
  
const {id, setPostDelete } = props ; 
const  authDatas  = useContext(AuthContext); 
const toogleEffect = authDatas.toogleEffect  
const setToogleEffect = authDatas.setToogleEffect 
console.log(id)
async function del () {
    try{
      console.log("je rentre dans ma fonction")
      const response = await fetch(`http://localhost:3001/api/posts/:${id}`, {
        mode: "cors",
        method: "DELETE",
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        setPostDelete("")
        setToogleEffect(! toogleEffect)
        console.log(result.message)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      console.log(errorMessage)
    }
  }
  del()

 }

 export default DeletePost