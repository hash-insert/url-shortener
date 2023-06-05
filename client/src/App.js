import { useState } from 'react'
import './App.css';
import axios from "axios";


function App() {
  const [url, setURL] = useState("");
  const [alias, setAlias] = useState("");
  const [resalias,setResalias] = useState("");
  const serverUrl = "https://url-shorteners.onrender.com";

  function handleSubmit() {
    if (url && alias) {
      axios.post(`${serverUrl}/map`,{
        "url":url,
        "alias":alias
     }).then((data)=>{
      console.log(data);
      setResalias(data.data.alias);
     })
    } else {
       axios.post(`${serverUrl}/shorten`,
       {
          "url": url
        }
      ).then((data)=>{
        console.log(data)
        setResalias(data.data.alias);
      })
    }
  }

  return (
    <>
      <div className="App">
        <h2>URL Shortener Web-service.</h2>
        <div className='Form_box'>
          <div class="mb-3">
            <label style={{ color: 'white' }} for="formGroupExampleInput" class="form-label">URL</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Paste the URL" onChange={(e) => { setURL(e.target.value) }} />
          </div>
          <div class="mb-3">
            <label style={{ color: 'white' }} for="formGroupExampleInput2" class="form-label">Alias</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Alias of the URL" onChange={(e) => { setAlias(e.target.value) }} />
          </div>
          {resalias&&<p style={{ color: 'white' }}>{`Alias: ${serverUrl}/r/${resalias}`}</p>}
          <button type="button" class="btn btn-secondary" style={{ backgroundColor: '#9DB2BF' }} onClick={handleSubmit}>Shorten URL</button>
        </div>
      </div>
    </>
  );
}

export default App;
