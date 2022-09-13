import "./style.css";

 async function sup (id) {            

    try{
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
        window.location.reload()
        console.log(result)
        return result} 
    } 
    catch(err){
      const errorMessage = err.toString();
      console.log(errorMessage)
    }
  }


  export { sup}