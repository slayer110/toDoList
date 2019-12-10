import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Sort from "./formSort";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      textCase: '',
      startDate: ''
    }
  }

  changeDate = (date) => {
    this.props.changeDateFilter(date);
    this.setState({startDate: date})
  };

  render() {
    return <div className='styleFilter'>
      <p style={{color: 'blue', fontSize: '20px'}}>filter</p>
      <a>By tasks</a>
      <p><input type='text' value={this.props.text} onChange={this.props.filterText}/></p>
      <a>By date</a>
      <p><DatePicker dateFormat="dd.MM.yyyy" onChange={this.changeDate}
                     selected={this.state.startDate}/></p>
    </div>
  }
}

export default Filter;
