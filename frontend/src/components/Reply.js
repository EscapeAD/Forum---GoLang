import React, { Component } from 'react';

class Reply extends Component {
  render() {
    let replies = this.props.state.replies.map((reply)=>{
      if(this.props.comment_id === reply.comment_id && this.props.message_id === reply.message_id){
      return <li key={reply.id}><div className="message-box">{reply.message}</div><div className="message-footer bg-primary"><span className="user-details">Posted By: <strong>{reply.username}</strong> - <i>{new Date(reply.created_at).toLocaleString()}</i></span></div></li>

    }
    })
    return (
        <ul>
          {replies}
        </ul>
    );
  }
}

export default Reply;
