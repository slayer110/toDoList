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

  render() {
    let that = this;
    if (this.state.textCase) {
      this.props.mistake.text = false;
    }
    if (this.state.startDate) {
      this.props.mistake.date = false
    }

    function formatMonth() {
      if ((that.state.startDate.getMonth() + 1).toString().length === 2 && (that.state.startDate.getMonth() + 1).toString()[0] !== 1) {
        return (that.state.startDate.getMonth() + 1)
      } else {
        return `0${that.state.startDate.getMonth() + 1}`
      }
    }

    let formatDate = this.state.startDate ? `${this.state.startDate.getDate()}.${formatMonth()}.${this.state.startDate.getFullYear()}` : '';
    return <form className='styleAdd' onSubmit={this.props.addCase.bind(null, this.state.textCase, formatDate)}>
      <h2>Add panel</h2>
      <p><input className={this.props.mistake.text ? 'inputsAdd error' : 'inputsAdd'} type='text'
                onChange={this.text}/></p>
      <DatePicker className={this.props.mistake.date ? 'inputsAdd error' : 'inputsAdd'} dateFormat="dd.MM.yyyy"
                  selected={this.state.startDate}
                  onChange={this.changeDate}/>
      <p><input type='submit' className='submitBtn' value='save'/></p>
    </form>
  }
}

export default Add
