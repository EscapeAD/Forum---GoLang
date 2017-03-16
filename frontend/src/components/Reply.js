import React, { Component } from 'react';

class Reply extends Component {
  render() {
    let replies = this.props.state.replies.map((reply)=>{
      if(this.props.comment_id === reply.comment_id && this.props.message_id === reply.message_id){
      return <li key={reply.id}>{reply.message} - <strong>{reply.username}</strong> - <i>{new Date(reply.created_at).toLocaleString()}</i></li>
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
