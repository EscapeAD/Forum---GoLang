import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Axios  from  'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  getForum(){
    Axios.get('http://localhost:8080/api/forum')
         .then(data =>{
           console.log(data)
         })
  }
  componentWillMount(){
    this.getForum()
  }

  render() {
    return (
      <div className="App">
      <Navbar></Navbar>
      </div>
    );
  }
}

export default App;
