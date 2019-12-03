import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class Add extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      textCase: ''
    }
  }

  changeDate = (date) => {
    this.props.changeDate(date);
    this.setState({startDate: date})
  };
  text = (e) => {
    this.setState({textCase: e.target.value})
  };

  render() {
    let formatDate = this.state.startDate ? `${this.state.startDate.getDate()}.${this.state.startDate.getMonth()}.${this.state.startDate.getFullYear()}` : '';
    return <form className='styleAdd' onSubmit={this.props.addCase.bind(null, this.state.textCase, formatDate)}>
      <h2>Add panel</h2>
      <p><input className='inputsAdd' type='text' onChange={this.text}/></p>
      <DatePicker className='inputsAdd' selected={this.state.startDate} onChange={this.changeDate}/>
      <p><input type='submit' className='submitBtn' value='save'/></p>
    </form>


  }
}

export default Add
