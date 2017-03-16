import React, { Component } from 'react';

class Message extends Component {
  render() {
    let message = this.props.state.messages.map((msg)=>{
      return <li key={msg.id}>{msg.username}</li>
    })
    return (
      <div>
        <ul>
          {message}
        </ul>
      </div>
    );
  }
}

export default Message;
