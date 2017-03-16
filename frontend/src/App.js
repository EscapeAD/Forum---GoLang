import React, { Component } from 'react';
import Navbar               from './components/Navbar';
import Message              from './components/Message';
import Post                 from './components/Post';
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

  postMessage(data){
    Axios.post('http://localhost:8080/api/forum/messages', JSON.stringify(data))
         .then(response =>{
           console.log(response)
         })
         .catch(error=>{
           console.log(error)
         })
  }

  getForum(){
    Axios.get('http://localhost:8080/api/forum')
         .then(response =>{
           this.setState({messages: response.data.Messages})
           this.setState({comments: response.data.Comments})
           this.setState({replies:  response.data.Replies})
         })
         .catch(error=>{
           console.log(error)
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
      <Post postMessage={this.postMessage.bind(this)}></Post>
      <Message state={this.state}></Message>
      </div>
      </div>
    );
  }
}

export default App;
