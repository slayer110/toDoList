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

  changeDate = (prop, date) => {
    console.log(prop)
    this.props.changeDate(date);
    // if (prop === 'date') {
    //   formatDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    // } else {
    //   formatDate = prop
    // }
    console.log(date)
    this.props.filterDate(prop, date);
    this.setState({startDate: date})
  };

  render() {
    return <div className='styleFilter'>
      <a>By tasks</a>
      <input type='text' value={this.props.text} onChange={this.props.filterText.bind(null, 'text')}/>
      <a>By date</a>
      <DatePicker dateFormat="dd.MM.yyyy" onChange={this.changeDate.bind(null, 'date')}
                  selected={this.state.startDate}/>
    </div>
  }
}

export default Filter;
