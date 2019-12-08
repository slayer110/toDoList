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
      <a>By tasks</a>
      <input type='text' value={this.props.text} onChange={this.props.filterText}/>
      <a>By date</a>
      <DatePicker dateFormat="dd.MM.yyyy" onChange={this.changeDate}
                  selected={this.state.startDate}/>
    </div>
  }
}

export default Filter;
