import React, {Component} from 'react';
import './App.css';
import Case from './Cases';
import Add from './formAdd'

class App extends Component {
  constructor() {
    super();
    this.state = {
      casesInfo: [
        {text: 'Помыть пол', done: true, date: '12.06.2019'},
        {text: 'Станцевать', done: false, date: '15.06.2019'}
      ],
      startDate: '',
      visibleAdd: false
    };
  }

  visibleForm = () => {
    this.setState({visibleAdd: !this.state.visibleAdd})
  };
  changeDateForAdd = (date) => {
    this.setState({startDate: date})
  };
  addCase = (cases, date, e) => {
    e.preventDefault();
    this.state.casesInfo.push({text: cases, done: false, date: date});
    this.setState({casesInfo: this.state.casesInfo, visibleAdd: false})
  };

  render() {
    const cases = this.state.casesInfo.map((elem, index) =>
      <Case key={index} text={elem.text} done={elem.done} date={elem.date}/>
    );
    return (<React.Fragment>
        <div className='cases'>
          <h1>Cases</h1>
          <table>
            <thead>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>Done</th>
            </tr>
            </thead>
            <tbody>
            {cases}
            </tbody>
          </table>
        </div>
        <button onClick={this.visibleForm} className='btn'>Add</button>
        {this.state.visibleAdd ? <Add changeDate={this.changeDateForAdd} addCase={this.addCase}/> : ''}
      </React.Fragment>
    )
  }
}

export default App;
