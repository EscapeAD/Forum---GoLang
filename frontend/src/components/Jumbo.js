import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Jumbo extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Nav-eddit</h1>
          <p className="lead">Simple yet not so simple web forum.</p>
          <hr className="my-2" />
          <p>Web developer Challenge.</p>
          <p className="lead">
            <Button color="primary">Create a Post</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Jumbo;
