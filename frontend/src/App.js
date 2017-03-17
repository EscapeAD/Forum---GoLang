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
           this.getForum()
         })
         .catch(error=>{
           if (error.response) {
                 // The request was made, but the server responded with a status code
                 // that falls out of the range of 2xx
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
               } else {
                 // Something happened in setting up the request that triggered an Error
                 console.log('Error', error.message);
               }
               console.log(error.config);
         })
  }

  postResponse(data){
    let address = data.comment_id ? 'http://localhost:8080/api/forum/messages/comments/replies' : 'http://localhost:8080/api/forum/messages/comments';
    Axios.post(address, JSON.stringify(data))
         .then(response =>{
           this.getForum();
         })
         .catch(error=>{
           if (error.response) {
                 // The request was made, but the server responded with a status code
                 // that falls out of the range of 2xx
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
               } else {
                 // Something happened in setting up the request that triggered an Error
                 console.log('Error', error.message);
               }
               console.log(error.config);
        })
  }

  getForum(){
    Axios.get('http://localhost:8080/api/forum')
         .then(response =>{
           // Grab state from server
           this.setState({messages: response.data.Messages})
           this.setState({comments: response.data.Comments})
           this.setState({replies:  response.data.Replies})
         })
         .catch(error=>{
           if (error.response) {
                 // The request was made, but the server responded with a status code
                 // that falls out of the range of 2xx
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
               } else {
                 // Something happened in setting up the request that triggered an Error
                 console.log('Error', error.message);
               }
               console.log(error.config);
        })
  }

  componentWillMount(){
    this.getForum()
  }

  render() {
    return (
      <div className="App">
      <Navbar></Navbar>
      <Post postMessage={this.postMessage.bind(this)}></Post>
      <div className='container'>
      <Message postResponse={this.postResponse.bind(this)} state={this.state}></Message>
      </div>
      </div>
    );
  }
}

export default App;
