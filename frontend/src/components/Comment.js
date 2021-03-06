import React, { Component } from 'react';
import Reply                from './Reply';
import Respond              from './Respond';

class Comment extends Component {
  render() {
    let comments = this.props.state.comments.map((comment)=>{
      if(this.props.message_id === comment.message_id){
      return <li key={comment.id}><div className="message-box">{comment.message}</div>
      <div className="message-footer bg-primary"><div className='left-div'><span className="user-details">Posted By: <strong>{comment.username}</strong> - <i>{new Date(comment.created_at).toLocaleString()}</i></span></div><div className='right-div'> <span><Respond postResponse={this.props.postResponse.bind(this)} comment_id={comment.id} message_id={comment.message_id}></Respond></span></div></div><Reply comment_id={comment.id} message_id={comment.message_id} state={this.props.state}></Reply></li>
      }
    })
    return (
        <ul>
          {comments}
        </ul>
    );
  }
}

Comment.propTypes = {
  state: React.PropTypes.object,
  postResponse: React.PropTypes.func,
}

export default Comment;
