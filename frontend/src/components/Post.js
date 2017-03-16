import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Post extends Component {
  constructor(){
    super();
    this.state = {
      newMessage:{}
    }
  }
  handleSubmit(event){
    event.preventDefault()
    this.setState({
      newMessage:{
        username: event.target.username.value,
        message:  event.target.message.value
      }
    },()=>{
      this.props.postMessage(this.state.newMessage)
    })
  }

  render() {
    return (
      <Form className='NewPost' onSubmit={this.handleSubmit.bind(this)}>
             <FormGroup>
               <Label for="username">Username</Label>
               <Input type="text" name='username' id="username" placeholder="John Doe" required/>
             </FormGroup>
             <FormGroup>
               <Label for="message">Post</Label>
               <Input type="textarea" name='messsage' id="message" required />
             </FormGroup>
             <input type='submit' className='btn btn-success' value='submit' />
      </Form>
    );
  }
}

export default Post;
