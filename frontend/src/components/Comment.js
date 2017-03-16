import React, { Component } from 'react';

class Comment extends Component {
  render() {
    let comments = this.props.state.comments.map((comment)=>{
      if(this.props.id === comment.message_id){
      return <li key={comment.id}>{comment.message} - <strong>{comment.username}</strong> - <i>{new Date(comment.created_at).toLocaleString()}</i></li>
      }
    })
    return (
        <ul>
          {comments}
        </ul>
    );
  }
}

export default Comment;
