import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Jumbotron, Form, FormGroup, Label, Input } from 'reactstrap';


class Post extends Component {
  constructor(){
    super();
    this.state = {
      modal: false,
      newMessage:{}
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
    this.forceUpdate()
  }

  render() {
    return (
      <div>
      <Jumbotron>
        <h1 className="display-3">Nav-eddit</h1>
        <p className="lead">Simple yet not so simple web forum.</p>
        <hr className="my-2" />
        <p>Web developer Challenge.</p>
        <p className="lead">
          <Button onClick={this.toggle} color="primary">Create a Post</Button>
        </p>
      </Jumbotron>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <ModalHeader>
        Create a New Thread
        </ModalHeader>
        <ModalBody>
               <FormGroup>
                 <Label for="username">Username</Label>
                 <Input type="text" name='username' id="username" placeholder="I am batman" required/>
               </FormGroup>
               <FormGroup>
                 <Label for="message">Post</Label>
                 <Input maxlength="250" type="textarea" name='messsage' id="message" required />
               </FormGroup>
        </ModalBody>
        <ModalFooter>
          <input type='submit' className='btn btn-outline-primary' value='submit' />
          <Button outline color="warning" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
      </div>
    );
  }
}

export default Post;
