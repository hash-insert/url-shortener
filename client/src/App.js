import logo from './logo.svg';
import Card from '@mui/material/Card';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';

const url="https://shortenurl.onrender.com"
function App() {
  const [url1,seturl1]=useState('');
  const [alias,setalias]=useState('')
  const [button1,setbutton1]=useState(false)
  // const [url2,seturl2]=useState('')
  // const [button2,setbutton2]=useState('false')
  const [value,setvalue]=useState('')


  const firstButton=async ()=>{
    if(url1 && alias){
      setbutton1(!button1)
  console.log('button')
  const response=await fetch(url+'/map',{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    url:url1,
    alias:alias

   }),
  })
  const data=await response.json();
  setvalue(data.alias)


    }else{
      console.log('else')
      console.log(url1)
      setbutton1(!button1)
      // setbutton2(!button2)
 
      const response2=await fetch(url+'/shorten',{
       method:"POST",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify({
        url:url1
       }),
      })
    
      const received=  await response2.text();
      console.log(received)
      
      setvalue(received)

    }
  }






// const firstButton=async ()=>{
//   setbutton1(!button1)
//   console.log('button')
//   const response=await fetch(url+'/map',{
//    method:"POST",
//    headers:{
//     "Content-Type":"application/json"
//    },
//    body:JSON.stringify({
//     url:url1,
//     alias:alias

//    }),
//   })

  
// }
// const secondButton=async ()=>{
//   setbutton2(!button2)
 
//   const response=await fetch(url+'/shorten',{
//    method:"POST",
//    headers:{
//     "Content-Type":"application/json"
//    },
//    body:JSON.stringify({
//     url:url2
//    }),
//   })
//   console.log(response)
//   const received=  await response.text();
//   console.log(received)
  
//   setvalue(received)

  
// }

  return (
    <div>
      <h1 style={{marginLeft:"630px"}}>welcome to urlshortner</h1>

   
    <div className="App" style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
     
      <Card sx={{width:500,height:450,marginRight:"20px",marginTop:"60px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
       
          <h2>give url and alias</h2>
        <TextField style={{width:"380px"}} id="outlined-basic" label="url" variant="outlined" onChange={(e)=>seturl1(e.target.value)} />
        <br></br>
        <TextField style={{marginTop:'20px',width:"380px"}} id="outlined-basic" label="alias" variant="outlined"  onChange={(e)=>setalias(e.target.value)} />
        <br></br>
        <Button style={{marginTop:"20px"}} variant="contained" onClick={firstButton}>Send</Button>
      {
        value && <h2 style={{color:'green'}}>
          Now you can search using : https://shortenurl.onrender.com/r/{value}
        </h2>
       
      }
      


          
       
       
      </Card>
      {/* <Card sx={{width:500,height:450,marginTop:"60px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
        <h2>give url and get alias</h2>
        <TextField style={{width:"380px"}} id="outlined-basic" label="url" variant="outlined" onChange={(e)=>seturl2(e.target.value)} />
        <br></br>
       
        <Button style={{marginTop:"20px"}} variant="contained" onClick={firstButton}>Send</Button>
        {
        !button2 && <h2 style={{color:'green'}}>
          Now you can search using {value}
        </h2>
       
      }
 */}

      {/* </Card> */}
    
    </div>
    </div>
  );
}

export default App;
