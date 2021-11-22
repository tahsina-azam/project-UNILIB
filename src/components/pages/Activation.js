import axios from 'axios';
import React from 'react'
import {Button} from 'react-bootstrap'




 function clickMe ()  {
   //alert('you clicked me!');
  const path = window.location.pathname;
  const words = path.split('/');
  console.log(words[3]);
  const token =words[3];
  axios.post('http://localhost:4000/activateAccount',{
    token   
  });
}

const App = () => {
  
  return (
    <div >
      <a href="http://localhost:3000/log-in"> <Button style={{width:'40%',height:40,backgroundColor:'#000000',marginTop:'20%',marginLeft:'30%',justifyContent:'center',alignItems:'center', border: '1px solid #efffff', borderRadius: '3px',fontSize:'15px',color:'white'}} onClick={clickMe}>
           Activate  My  Account
      </Button> </a>
    </div>
  );
};


export default App;