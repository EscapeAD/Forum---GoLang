import React, { Component } from 'react';
import Reply                from './Reply';

class Comment extends Component {
  render() {
    let comments = this.props.state.comments.map((comment)=>{
      if(this.props.message_id === comment.message_id){
      return <li key={comment.id}>{comment.message} - <strong>{comment.username}</strong> - <i>{new Date(comment.created_at).toLocaleString()}</i> <Reply comment_id={comment.id} message_id={comment.message_id} state={this.props.state}></Reply></li>
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
