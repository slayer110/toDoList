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
            error: {date: false, text: false},
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
        errorType = {text: false, date: true};
      }
      if (!date && !cases) {
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


  sorting(prop, direction) {
    if (direction === 'Down') {
      return (a, b) => {
        if (a[prop] > b[prop]) return -1;
        if (a[prop] < b[prop]) return 1;
      }
    } else {
      return (a, b) => {
        if (a[prop] > b[prop]) return 1;
        if (a[prop] < b[prop]) return -1;
      }
    }
  }

  formatMonth = (date) => {
    if ((date.getMonth() + 1).toString().length === 2 && (date.getMonth() + 1).toString()[0] !== 1) {
      return (date.getMonth() + 1)
    } else {
      return `0${date.getMonth() + 1}`
    }
  };

  formatDate = (date) => `${date.getDate()}.${this.formatMonth(date)}.${date.getFullYear()}`;

  reverseDate = (par) => par.split('.').reverse().join('.');

  filterAndSort(arrCase, text, date, sort) {
    let arr = [...arrCase].map((elem) => {
      return Object.assign({}, elem)
    });

    let arrModified = arr;
    const elemCase = (elem, index) => {
      let elemDate = elem.date;
      if (sort.direction) {
        elemDate = this.formatDate(elem.date);
      }
      return <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elemDate}
                   checkCase={this.checkCase}/>
    };

    if (text) {
      arrModified = arr.filter((elem) => {
        return elem['text'].toLowerCase().indexOf(this.state.textFilter.toLowerCase()) === 0
      });
    } else {
      arrModified = arr;
    }
    if (date) {
      arrModified = arrModified.filter((elem) => {
        return elem['date'] === this.formatDate(date)
      });
    }
    if (sort.direction) {
      arrModified = arrModified.map((elem) => {
        return {...elem, date: new Date(this.reverseDate(elem.date))}
      }).sort(this.sorting(sort.type, sort.direction));
    }
    localStorage.setItem('sort', JSON.stringify(this.state.sort));
    return arrModified.map(elemCase)
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
          <Add changeDate={this.changeDateForAdd} addCase={this.addCase} mistake={this.state.error} formatMonth={this.formatMonth}/> : ''}
      </React.Fragment>
    )
  }
}

export default App;
