import React, {useState, useEffect} from 'react'
import './App.css'
const App = () => {

  const filename = 'text.txt';
  const user = 'Faisal';
  const [content, setContent] = useState("");

  useEffect(()=>{

    const get = async()=>{

      const response = await fetch(`http://localhost:666/?filename=${filename}&user=${user}`, 
      {
        method : 'GET'
      });

      const data = await response.json();

      if(data.ok){
        setContent(data.content);
      }
      else{
        setContent("error reading file");
      }

    }

    const interval = setInterval(get, 1000)
    return () => clearInterval(interval)

  },[])

 

    const write = async (e)=>{
      
      e.preventDefault();
      setContent(e.target.value);

      const data ={
        filename : filename,
        content : content,
        user : user
      }
      const wrt = await fetch('http://localhost:666', 
        {
          method :'POST',
          headers: {
            'Content-Type' : 'application/json'
          },

          body : JSON.stringify(data)
        }
      )

      const response = await wrt.json();
      
      if(response.ok){
        console.log('Written')
      }
      else{
        console.error("unable to write");
      }
    }

  
    
  
 

  return (

    
    <div>
      <h1>Live editor 1.1</h1>
      <textarea name="" id="" value={content} onChange={write}></textarea>
      
    </div>
  )
}

export default App
