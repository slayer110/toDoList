import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
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
    return <form onSubmit={this.props.addCase.bind(null, this.state.textCase, formatDate)}>
      <p><input type='text' onChange={this.text}/></p>
      <DatePicker selected={this.state.startDate} onChange={this.changeDate}/>
      <p><input type='submit' value='save'/></p>
    </form>


  }
}

export default Add
