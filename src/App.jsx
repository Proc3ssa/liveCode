import React, {useState, useEffect} from 'react'
import './App.css'
const App = () => {

  const filename = 'text.txt';
  const user = 'Faisal';
  const {content, setContent} = useState("");

  useEffect( ()=>{
    const change =  async (e) =>{
      e.preventDefault();
    
      const data = {
        filename : filename,
        content : content,
        user : user
      }
    
        try {
          const fetch = await fetch('localhost:666',
            {
              method:'POST',
              headers: {
                'Content-type' :'application/json'
              },
              body : JSON.stringify(data)
      
            }
          );
      
          const response = await fetch.json();
    
          if(response.ok){
            setContent = response.content;
          }
          else{
            console.log(response);
          }
    
        } catch (error) {
          console.log(error)
        }
        
      }
  },[])
 

  return (

    
    <div>
      <h1>Live editor 1.1</h1>
      <textarea name="" id="" value={content} onChange={(e) => change(e)}></textarea>
      
    </div>
  )
}

export default App
