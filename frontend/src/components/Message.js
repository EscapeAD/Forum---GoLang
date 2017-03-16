import React, { Component } from 'react';
import Comment              from './Comment';
import Respond              from './Respond';

class Message extends Component {
  render() {
    let message = this.props.state.messages.map((msg)=>{
      return <li className='all-list' key={msg.id}><div className="message-box">{msg.message}</div>
      <div className="message-footer bg-primary"><Respond postResponse={this.props.postResponse.bind(this)} message_id={msg.id}></Respond>
      <span className="user-details">Posted By: <strong>{msg.username}</strong> - <i>{new Date(msg.created_at).toLocaleString()}</i></span> </div> <Comment postResponse={this.props.postResponse.bind(this)} message_id={msg.id} state={this.props.state}></Comment></li>
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
