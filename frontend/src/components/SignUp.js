import React,{useState} from 'react';
import SignUp from './R_reg';



function App() {

  const [setToken] = useState('');

  const userLogin = (tok) =>{
    setToken(tok)
    console.log(tok);
    
  }


  return (
    <div className="App">
     <SignUp userLogin={userLogin}/>
    </div>
  );
}

export default App;
