import React, {Component} from 'react';
import './App.css';
import Case from './Cases';


class App extends Component {
  constructor() {
    super();
    this.state = {
      cases: [
        {text: 'Помыть пол', done: true},
        {text: 'Станцевать', done: false}
      ]
    };
  }

  render() {
    const cases = this.state.cases.map((elem, index) =>
      <Case key={index} text={elem.text} done={elem.done}/>
    );
    return (<div>
      {cases}</div>)
  }
}

export default App;
