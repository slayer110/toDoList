import React, {Component} from 'react';
import './App.css';
import Case from './Cases';
import Add from './formAdd';
import Sort from './formSort'
import Filter from './formFilter'

class App extends Component {
  constructor() {
    super();
    this.state = {
      casesInfo: JSON.parse(localStorage.getItem('casesInfo')) || [
        {text: 'Валера', done: false, date: '2.04.2019', id: 1},
        {text: 'Виктор', done: true, date: '5.04.2019', id: 2},
        {text: 'Ганна', done: true, date: '2.04.2019', id: 3},
        {text: 'Женя', done: true, date: '8.04.2019', id: 4}
      ],
      startDate: '',
      filterDate: '',
      visibleAdd: false,
      visibleSort: false,
      visibleFilter: false,
      error: false,
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

  visibleSortForm = () => {
    this.setState({visibleSort: !this.state.visibleSort});
  };

  visibleFilterForm = () => {
    this.setState({visibleFilter: !this.state.visibleFilter});
  };

  changeDateForAdd = (date) => {
    this.setState({startDate: date})
  };

  changeDateForFilter = (date) => {
    this.setState({filterDate: date})
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

    if (cases) {
      this.state.casesInfo.push({
        text: cases,
        done: false,
        date: date,
        id: unicId(this.state.casesInfo) + 1
      });
      this.setState({casesInfo: this.state.casesInfo, visibleAdd: false, error: false, textFilter: ''}, () => {
        localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
      })
    } else {
      this.setState({error: true})
    }
  };
  setSort = (sort) => {
    if (this.state.sort.type !== sort) {
      this.state.sort.direction = '';
    }
    let srt;
    if (this.state.sort.direction) {
      if (this.state.sort.direction === 'sortABC') {
        srt = 'sortCBA';
      } else {
        srt = 'sortABC'
      }
    }
    this.setState({sort: {type: sort, direction: srt}})
  };

  filterText = (e) => {
    this.setState({textFilter: e.target.value})
  };
  checkCase = (index) => {
    let arr = this.state.casesInfo.map((elem, item) => {
      if (elem.id === index) {
        return {...elem, done: !elem.done}
      }
      return elem
    });
    this.setState({casesInfo: arr}, () => {
      localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
    })
  };
  sort = (prop, arrSort) => {
    console.log(arrSort, arrSort[0]);
    let sortedABC = 0;
    let sortedCBA = 0;
    let formatFunc = (par) => par.split('.').reverse().join('.');
    let sortABC = (a, b) => {
      if (prop === 'date') {
        if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return 1;
        if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return -1;
      } else {
        if (a[prop] > b[prop]) return 1;
        if (a[prop] < b[prop]) return -1;
      }
    };
    let sortCBA = (a, b) => {
      if (prop === 'date') {
        if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return -1;
        if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return 1;
      } else {
        if (a[prop] > b[prop]) return -1;
        if (a[prop] < b[prop]) return 1;
      }
    };


    if (prop === 'date') {
      for (let i = 0; i < arrSort.length - 1; i++) {
        if (new Date(formatFunc(arrSort[i][prop])) > new Date(formatFunc(arrSort[i + 1][prop]))) {
          sortedCBA++
        } else {
          sortedABC++
        }

      }
    } else {
      for (let i = 0; i < arrSort.length - 1; i++) {
        if (arrSort[i][prop] > arrSort[i + 1][prop]) {
          sortedCBA++
        } else {
          sortedABC++
        }
      }
    }

    if (!this.state.sort.direction) {
      if (sortedABC === arrSort.length - 1) {
        this.state.sort = {type: prop, direction: 'sortCBA'};
        return sortCBA;
      }
      if (sortedCBA === arrSort.length - 1) {
        this.state.sort = {type: prop, direction: 'sortABC'};
        return sortABC;
      }
      if (sortedABC !== arrSort.length - 1 && sortedCBA !== arrSort.length - 1) {
        this.state.sort = {type: prop, direction: 'sortABC'};
        return sortABC;
      }
    } else {

      if (this.state.sort.direction === 'sortABC') {
        return sortABC
      } else {
        return sortCBA
      }
    }
  };

  filterAndSort(arr, text, date, sortType) {
    let arrModified;
    let arrSort = false;

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
      arrModified = arr
    }
    if (date) {
      let formatDate = `${date.getDate()}.${formatMonth()}.${date.getFullYear()}`;
      arrModified = arrModified.filter((elem) => {
        return elem['date'] === formatDate
      });
    }
    if (sortType['type']) {
      arrModified.sort(this.sort(sortType['type'], arrModified));
    }
    return arrModified.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date} checkCase={this.checkCase}/>)
  }

  render() {
    localStorage.clear()
    let cases = this.state.casesInfo.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
            checkCase={this.checkCase}/>);
    return (<React.Fragment>
        <div className='cases'>
          <h1>Cases</h1>
          <p className='sort' onClick={this.visibleSortForm}
             style={this.state.visibleSort ? {textDecoration: 'underline'} : {}}>sort</p>
          <p className='filter' onClick={this.visibleFilterForm}
             style={this.state.visibleFilter ? {textDecoration: 'underline'} : {}}>filter</p>
          {this.state.visibleFilter ?
            <Filter filterText={this.filterText} changeDateFilter={this.changeDateForFilter}
                    text={this.state.textFilter}/> : ''}
          <table>
            <thead>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>Done</th>
            </tr>
            </thead>
            <tbody>
            {this.state.textFilter || this.state.filterDate || this.state.sort.direction || this.state.sort.type ? this.filterAndSort(this.state.casesInfo, this.state.textFilter, this.state.filterDate, this.state.sort) : cases}
            </tbody>
          </table>
        </div>
        <button onClick={this.visibleAddForm} className='btn'>Add</button>
        {this.state.visibleAdd ?
          <Add changeDate={this.changeDateForAdd} addCase={this.addCase} mistake={this.state.error}/> : ''}
        {this.state.visibleSort ? <Sort sortFunc={this.setSort}/> : ''}
      </React.Fragment>
    )
  }
}

export default App;
