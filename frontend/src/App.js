import React, { Component } from 'react';
import Navbar               from './components/Navbar';
import Message              from './components/Message';
import Axios                from  'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      messages: [],
      comments: [],
      replies:  []
    }
  }

  getForum(){
    Axios.get('http://localhost:8080/api/forum')
         .then(response =>{
           this.setState({messages: response.data.messages})
           this.setState({comments: response.data.comments})
           this.setState({replies:  response.data.replies})
         })
  }

  componentWillMount(){
    this.getForum()
  }

  render() {
    return (
      <div className="App">
      <Navbar></Navbar>
      <div className='container'>
      <h1> Top of Bar</h1>
      <Message></Message>
      </div>
      </div>
    );
  }
}

export default App;
