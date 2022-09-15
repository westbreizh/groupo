export default async function LikeOrNot (props) {  

    const userId = props.userId
    const id = props.id
    const appreciate = props.appreciate
    
    try{
      const response = await fetch(`http://localhost:3001/api/posts/:${id}/like`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ userID: userId}),
        headers: {"Content-Type": "application/json",
                  "Authorization":  "????",
      }})
  
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
        throw new Error(`${response.status}. ${result}`)
      } else{
        const result = await response.json()
        console.log(result.message)
        } 
    } 
    catch(err){
      const errorMessage = err.toString();
      console.log(errorMessage)
    }
  }

