import React,{useState} from 'react';
import Login from './R_log';

function App() {

  const [token,setToken] = useState('');

  const userLogin = (tok) =>{
    setToken(tok)
    console.log(tok);
    
  }


  return (
    <div className="App">
     <Login userLogin={userLogin}/>
    </div>
  );
}

export default App;
