import React, {Component} from 'react';

class Case extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.text}</td>
        <td>{this.props.date}</td>
        <td><input type='checkbox' checked={this.props.done} onChange={this.props.checkCase.bind(null,this.props.id)}/>
        </td>
      </tr>
    );
  }
}

export default Case;
