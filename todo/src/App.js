import React, {Component} from 'react';
import './App.css';
import Case from './Cases';
import Add from './formAdd';
import Sort from './formSort'
import Filter from './formFilter'

class App extends Component {
  constructor() {
    let initialStateSort = JSON.parse(localStorage.getItem('sort')) || {type: '', direction: ''};
    let initialStateArray = JSON.parse(localStorage.getItem('casesInfo')) || [
      {text: 'Валера', done: false, date: '2.04.2019', id: 1},
      {text: 'Виктор', done: true, date: '5.04.2019', id: 2},
    ];
    super();
    this.state = {
      casesInfo: initialStateArray,
      startDate: '',
      filterDate: '',
      visibleAdd: false,
      visibleSort: false,
      visibleFilter: false,
      error: {text: false, date: false},
      textFilter: '',
      sort: initialStateSort,
    };
  }

  visibleAddForm = () => {
    this.setState((state) => {
      return {
        visibleAdd: !state.visibleAdd
      }
    });
  };


  changeDateForAdd = (date) => {
    this.setState({startDate: date})
  };

  changeDateForFilter = (date) => {
    this.setState({filterDate: date});
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
      let arr = [...this.state.casesInfo].map((elem) => {
        return Object.assign({}, elem)
      });
      arr.push({
        text: cases,
        done: false,
        date: date,
        id: unicId(this.state.casesInfo) + 1
      });
      this.setState(() => {
          return {
            casesInfo: arr,
            visibleAdd: false,
            error: false,
            textFilter: ''
          }
        }, () => {
          localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
        }
      );
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
      this.setState({
        error: errorType
      });
    }
  };

  filterText = (e) => {
    this.setState({
      textFilter: e.target.value
    });
  };
  checkCase = (index) => {
    let arr = [...this.state.casesInfo].map((elem) => {
      return Object.assign({}, elem)
    });
    arr = arr.map((elem) => {
      if (elem.id === index) {
        return {...elem, done: !elem.done}
      }
      return elem
    });
    this.setState(() => {
        return {
          casesInfo: arr
        }
      },
      () => {
        localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
      }
    );
  };

  direction = (prop, direction) => {
    this.setState({
        sort: {type: prop, direction: direction}
      }
    );
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


  filterAndSort(arrCase, text, date, sort) {
    let arr = [...arrCase].map((elem) => {
      return Object.assign({}, elem)
    });
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
        <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
              checkCase={this.checkCase}/>)
    }
    if (sort.direction === 'Down') {
      arrModified.sort(this.sortCBA(sort.type)).map((elem, index) =>
        <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
              checkCase={this.checkCase}/>)
    }
    localStorage.setItem('sort', JSON.stringify(this.state.sort));
    return arrModified.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date} checkCase={this.checkCase}/>)
  }

  render() {
    return (<React.Fragment>
        <div className='cases'>
          <h1>Cases</h1>
          <Filter filterText={this.filterText} changeDateFilter={this.changeDateForFilter}
                  text={this.state.textFilter}/>
          <Sort arrows={this.state.sort} sortFunc={this.direction}/>
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
      </React.Fragment>
    )
  }
}

export default App;
