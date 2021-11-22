import React, {  Component } from "react";
import '../../App.css';

class App extends Component{
  
  componentDidMount() {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }

  render(){
    return (
      <div >
        <p>here is the user account</p>
      </div>
    )
  }
      
  };
  
  
  export default App;
