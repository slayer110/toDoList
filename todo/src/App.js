import React, {Component} from 'react';
import './App.css';
import Case from './Cases';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cases: [
        {text: 'Помыть пол', done: true},
        {text: 'Станцевать', done: false}
      ],
      startDate: new Date()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const cases = this.state.cases.map((elem, index) =>
      <Case key={index} text={elem.text} done={elem.done}/>
    );
    return (<div>
        {cases}
        <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default App;
