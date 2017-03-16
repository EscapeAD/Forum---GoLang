import React, { Component } from 'react';
import Comment              from './Comment';

class Message extends Component {
  render() {
    let message = this.props.state.messages.map((msg)=>{
      return <li key={msg.id}>{msg.message} - <strong>{msg.username}</strong> - <i>{new Date(msg.created_at).toLocaleString()}</i><Comment message_id={msg.id} state={this.props.state}></Comment></li>
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
