import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Respond extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: false,
    newMessage: {}
  };
  this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  checkInfo(){

  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({
      newMessage:{
        message_id: this.props.message_id,
        username: event.target.username.value,
        message:  event.target.message.value
      }
    },()=>{
      this.props.postResponse(this.state.newMessage)
      this.toggle()
    })
  }

  render() {
    return (
      <span>
        <Button size="sm" color="secondary" onClick={this.toggle}>Reply</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <ModalBody>
                 <FormGroup>
                   <Label for="username">Username</Label>
                   <Input type="text" name='username' id="username" placeholder="I am batman" required/>
                 </FormGroup>
                 <FormGroup>
                   <Label for="message">Post</Label>
                   <Input type="textarea" name='messsage' id="message" required />
                 </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input type='submit' className='btn btn-success' value='submit' />
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Respond;
