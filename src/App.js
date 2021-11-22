import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Activation from './components/pages/Activation';
import UserAccount from './components/pages/UserAccount'

function App() {
  const [state,setState]=useState(false);

  const path = window.location.pathname;
    const words = path.split('/');
    console.log(words[0]);
  
  const requireAuth = () => {
    const path = window.location.pathname;
    const words = path.split('/');
    console.log(words[0]);
    if(words[1]==='unilib'){
      return true;
    }else{
      return false;
    }
  }

  useEffect(() => {
    (
        async () => {
            const response = requireAuth() ;

            setState(response);
        }
    )();
});

  return (
    <>
    <Router>
         <Navbar state={state} setState={setState}/>
         <Switch>
           <Route path='/' exact component=
           {Home} />
           <Route path='/services' exact component=
           {Services} />
            <Route path='/log-in' exact component=
           {LogIn} />
           <Route path='/sign-up' exact component=
           {SignUp} />
           <Route path='/authentication/activation/:token' exact component=
           {Activation} />
            <Route path='/unilib/user/:username' component={UserAccount}/> 
         </Switch>
    </Router>
    </>//will keep all the routers here.
  );
}

export default App;
