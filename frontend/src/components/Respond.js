import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class Respond extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: false,
    newMessage: {},
    count: 0
  };
  this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(event){
    event.preventDefault()
    let comment = {
      newMessage:{
        message_id: this.props.message_id,
        username: event.target.username.value,
        message:  event.target.message.value,
      }
    }
    let reply = {
      newMessage:{
        message_id: this.props.message_id,
        username: event.target.username.value,
        message:  event.target.message.value,
        comment_id: this.props.comment_id
      }
    }
    let state = this.props.comment_id ? reply : comment

    this.setState(state,()=>{
      this.props.postResponse(this.state.newMessage)
      this.toggle()
    })
  }

  count(event){
    this.setState({
    count: event.target.value.length
    })
  }
  render() {
    return (
      <span className='pull-right'>
        <Button size="sm" color="secondary" onClick={this.toggle}>Reply</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <ModalHeader>Reply</ModalHeader>
          <ModalBody>
                 <FormGroup>
                   <Label for="username">Username</Label>
                   <Input type="text" name='username' id="username" placeholder="I am batman" required/>
                 </FormGroup>
                 <FormGroup>
                   <Label for="message">Post ({this.state.count}/250)</Label>
                   <Input maxLength="250" onChange={this.count.bind(this)} type="textarea" name='messsage' id="message" required />
                 </FormGroup>
          </ModalBody>
          <ModalFooter>
            <input type='submit' className='btn btn-outline-primary' value='submit' />
            <Button outline color="warning" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Respond;
