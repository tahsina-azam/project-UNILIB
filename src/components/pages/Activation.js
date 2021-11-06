import axios from 'axios';
import React from 'react'
import {Button} from 'react-bootstrap'

 function clickMe () {
   alert('you clicked me!');
  const token = window.location.pathname.token;
  console.log(token);
  axios.post('http://localhost:4000/activateAccount',{
    token
  });

}

const App = () => {
  
  return (
    <div >
      <Button style={{width:'40%',height:40,backgroundColor:'#000000',marginTop:'20%',marginLeft:'30%',justifyContent:'center',alignItems:'center', border: '1px solid #efffff', borderRadius: '3px',fontSize:'15px',color:'white'}} onClick={clickMe}>
           Activate  My  Account
      </Button>
    </div>
  );
};


export default App;