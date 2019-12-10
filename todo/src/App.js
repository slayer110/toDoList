import React, {Component} from 'react';
import './App.css';
import Case from './Cases';
import Add from './formAdd';
import Sort from './formSort'
import Filter from './formFilter'
import {loadOptions} from "@babel/core";


class App extends Component {
  constructor() {
    super();
    this.state = {
      casesInfo: JSON.parse(localStorage.getItem('casesInfo')) || [
        {text: 'Валера', done: false, date: '2.04.2019', id: 1},
        {text: 'Виктор', done: true, date: '5.04.2019', id: 2},
      ],
      startDate: '',
      filterDate: '',
      visibleAdd: false,
      visibleSort: false,
      visibleFilter: false,
      error: {text: false, date: false},
      textFilter: '',
      sort: {type: '', direction: ''},
    };
  }

  visibleAddForm = () => {
    this.setState(function (state) {
      return {
        visibleAdd: !state.visibleAdd
      }
    });
  };


  changeDateForAdd = (date) => {
    this.setState(function (state) {
      return {
        startDate: date
      }
    });
  };

  changeDateForFilter = (date) => {
    this.setState(function (state) {
      return {
        filterDate: date
      }
    });
  };

  addCase = (cases, date, e) => {
    e.preventDefault();

    function unicId(arr) {
      let max = 0;
      for (let i in arr) {
        if (arr[i].id > arr[max].id) {
          max = i
        }
      }
      return arr[max].id
    }

    if (cases && date) {
      this.state.casesInfo.push({
        text: cases,
        done: false,
        date: date,
        id: unicId(this.state.casesInfo) + 1
      });
      // this.setState(function (state) {
      //   return {
      //     filterDate: date
      //   }
      // });
      this.setState({casesInfo: this.state.casesInfo, visibleAdd: false, error: false, textFilter: ''}, () => {
        localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
      })
    } else {
      let errorType;
      if (!cases) {
        errorType = {text: true, date: false};
      }
      if (!date) {
        errorType = {text: true, date: false};
      }
      if (!date && !date) {
        errorType = {text: true, date: true};
      }
      this.setState({error: errorType})
    }
  };

  filterText = (e) => {
    this.setState({textFilter: e.target.value})
  };
  checkCase = (index) => {
    let arr = this.state.casesInfo.map((elem) => {
      if (elem.id === index) {
        return {...elem, done: !elem.done}
      }
      return elem
    });
    this.setState({casesInfo: arr}, () => {
      localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
    })
  };

  direction = (prop, direction) => {
    this.setState({sort: {type: prop, direction: direction}})
  };

  sortABC(prop) {
    let formatFunc = (par) => par.split('.').reverse().join('.');
    return (a, b) => {
      if (prop === 'date') {
        if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return 1;
        if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return -1;
      } else {
        if (a[prop] > b[prop]) return 1;
        if (a[prop] < b[prop]) return -1;
      }
    };
  }

  sortCBA(prop) {
    let formatFunc = (par) => par.split('.').reverse().join('.');
    return (a, b) => {
      if (prop === 'date') {
        if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return -1;
        if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return 1;
      } else {
        if (a[prop] > b[prop]) return -1;
        if (a[prop] < b[prop]) return 1;
      }
    };
  }


  filterAndSort(arr, text, date, sort) {
    let arrModified = arr;

    function formatMonth() {
      if ((date.getMonth() + 1).toString().length === 2 && (date.getMonth() + 1).toString()[0] !== 1) {
        return (date.getMonth() + 1)
      } else {
        return `0${date.getMonth() + 1}`
      }
    }

    if (text) {
      arrModified = arr.filter((elem) => {
        return elem['text'].toLowerCase().indexOf(this.state.textFilter.toLowerCase()) === 0
      });
    } else {
      arrModified = arr;
    }
    if (date) {
      let formatDate = `${date.getDate()}.${formatMonth()}.${date.getFullYear()}`;
      arrModified = arrModified.filter((elem) => {
        return elem['date'] === formatDate
      });
    }
    if (sort.direction === 'Up') {
      arrModified.sort(this.sortABC(sort.type)).map((elem, index) =>
        <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date} checkCase={this.checkCase}/>)
    }
    if (sort.direction === 'Down') {
      arrModified.sort(this.sortCBA(sort.type)).map((elem, index) =>
        <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date} checkCase={this.checkCase}/>)
    }
    return arrModified.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date} checkCase={this.checkCase}/>)
  }

  render() {
    return (<React.Fragment>
        <div className='cases'>
          <h1>Cases</h1>
          <p className='sort'>sort</p>
          <p className='filter'>filter</p>
          <Filter filterText={this.filterText} changeDateFilter={this.changeDateForFilter}
                  text={this.state.textFilter}/>
          <table>
            <thead>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>Done</th>
            </tr>
            </thead>
            <tbody>
            {this.filterAndSort(this.state.casesInfo, this.state.textFilter, this.state.filterDate, this.state.sort)}
            </tbody>
          </table>
        </div>
        <button onClick={this.visibleAddForm} className='btn'>Add</button>
        {this.state.visibleAdd ?
          <Add changeDate={this.changeDateForAdd} addCase={this.addCase} mistake={this.state.error}/> : ''}
        <Sort arrows={this.state.sort} sortFunc={this.direction}/>
      </React.Fragment>
    )
  }
}

export default App;
