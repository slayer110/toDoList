import React, {Component} from 'react';

class Case extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.text}</td>
        <td>{this.props.date}</td>
        <td><input type='checkbox' checked={this.props.done}
                   onChange={this.props.typeArr ? this.props.checkCaseModifiedArr.bind(null,this.props.id) : this.props.checkCase.bind(null, this.props.keyFor)}/>
        </td>
      </tr>
    );
  }
}

export default Case;
