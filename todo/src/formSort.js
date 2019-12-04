import React, {Component} from 'react';
import './App.css';

class Sort extends Component {

  render() {
    return <div className='styleSort'>
      <a onClick={this.props.sortFunc.bind(null,'text')}>By tasks</a>
      <a onClick={this.props.sortFunc.bind(null,'date')}>By date</a>
    </div>
  }
}

export default Sort;
