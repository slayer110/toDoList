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
    this.setState({
        startDate: date
      }
    );
  };
  text = (e) => {
    this.setState({
        textCase: e.target.value
      }
    );
  };

  checkErrorFunction = () => {
    if (this.state.textCase) {
      this.props.mistake.text = false;
    }
    if (this.state.startDate) {
      this.props.mistake.date = false
    }
  };

  errorClassFunction = (type) => {
    return type ? 'inputsAdd error' : 'inputsAdd'
  };

  render() {
    let formatDate = this.state.startDate ? `${this.state.startDate.getDate()}.${this.props.formatMonth(this.state.startDate)}.${this.state.startDate.getFullYear()}` : '';
    this.checkErrorFunction();
    return <form className='styleAdd' onSubmit={this.props.addCase.bind(null, this.state.textCase, formatDate)}>
      <h2>Add panel</h2>
      <p><input className={this.errorClassFunction(this.props.mistake.text)} type='text'
                onChange={this.text}/></p>
      <DatePicker className={this.errorClassFunction(this.props.mistake.date)} dateFormat="dd.MM.yyyy"
                  selected={this.state.startDate}
                  onChange={this.changeDate}/>
      <p><input type='submit' className='submitBtn' value='save'/></p>
    </form>
  }
}

export default Add
