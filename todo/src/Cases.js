import React, {Component} from 'react';

class Case extends Component {

  render() {
    return (
      <div>
        <p>{this.props.text}<input type='checkbox' checked={this.props.done}/></p>
      </div>
    );
  }
}

export default Case;
