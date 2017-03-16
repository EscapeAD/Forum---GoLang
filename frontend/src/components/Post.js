import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Post extends Component {
  render() {
    return (
      <Form className='NewPost'>
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
