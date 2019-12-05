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
        {text: 'Помыть пол', done: false, date: '2.04.2019', id: 1},
        {text: 'Расточить', done: true, date: '2.04.2019', id: 2},
        {text: 'Найти ключи', done: true, date: '30.08.2019', id: 3},
        {text: 'Пойти гулять', done: true, date: '8.04.2019', id: 4}
      ],
      startDate: '',
      filterDate: '',
      visibleAdd: false,
      visibleSort: false,
      visibleFilter: false,
      error: false,
      textFilter: '',
      modifiedArr: ''
    };
  }

  visibleAddForm = () => {
    this.setState({visibleAdd: !this.state.visibleAdd});
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

  sort = (prop) => {
    let sortedABC = 0;
    let sortedCBA = 0;
    let arr;
    let that = this;
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

    function chooseArray(propDouble, arrFromState) {
      if (propDouble === 'date') {
        for (let i = 0; i < arrFromState.length - 1; i++) {
          if (new Date(formatFunc(arrFromState[i][propDouble])) > new Date(formatFunc(arrFromState[i + 1][propDouble]))) {
            sortedCBA++
          } else {
            sortedABC++
          }
        }
      } else {
        for (let i = 0; i < arrFromState.length - 1; i++) {
          if (arrFromState[i][prop] > arrFromState[i + 1][prop]) {
            sortedCBA++
          } else {
            sortedABC++
          }
        }
      }

      if (sortedABC === arrFromState.length - 1) {
        arr = arrFromState.sort(sortCBA);
      }
      if (sortedCBA === arrFromState.length - 1) {
        arr = arrFromState.sort(sortABC);
      }
      if (sortedABC !== arrFromState.length - 1 && sortedCBA !== arrFromState.length - 1) {
        arr = arrFromState.sort(sortABC);
      }
      that.setState({
        [arrFromState]: arr
      }, () => {
        localStorage.setItem('casesInfo', JSON.stringify(arrFromState))
      })
    }


    chooseArray(prop, this.state.modifiedArr ? this.state.modifiedArr : this.state.casesInfo)
  };

  filterDate = (prop, date) => {
    if (date === null) {
      return false
    }
    let arr;
    let that = this;

    function formatMonth() {
      if ((date.getMonth() + 1).toString().length === 2 && (date.getMonth() + 1).toString()[0] !== 1) {
        return (date.getMonth() + 1)
      } else {
        return `0${date.getMonth() + 1}`
      }
    }

    let formatDate = `${date.getDate()}.${formatMonth()}.${date.getFullYear()}`;
    arr = this.state.casesInfo.filter((elem) => {
      return elem[prop] === formatDate
    });
    this.setState({modifiedArr: arr})

  };

  filterText = (prop, e) => {
    let arr;
    arr = this.state.casesInfo.filter((elem) => {
      return elem[prop].toLowerCase().indexOf(e.target.value) === 0
    });
    this.setState({textFilter: e.target.value, modifiedArr: arr})

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
  checkCaseModifiedArr = (index) => {
    function arrChoose(arr) {
      return arr.map((elem, item) => {
        if (elem.id === index) {
          return {...elem, done: !elem.done}
        }
        return elem
      });
    }

    this.setState({modifiedArr: arrChoose(this.state.modifiedArr), casesInfo: arrChoose(this.state.casesInfo)}, () => {
      localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
    })
  };

  render() {
    console.log(JSON.parse(localStorage.getItem('casesInfo')))
    let cases;
    if (this.state.textFilter || this.state.filterDate) {
      cases = this.state.modifiedArr.map((elem, index) =>
        <Case key={index} text={elem.text} done={elem.done} date={elem.date} typeArr='modify' id={elem.id}
              checkCaseModifiedArr={this.checkCaseModifiedArr}/>
      );
    } else {
      cases = this.state.casesInfo.map((elem, index) =>
        <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
              checkCase={this.checkCase}/>
      );
    }
    return (<React.Fragment>
        <div className='cases'>
          <h1>Cases</h1>
          <p className='sort' onClick={this.visibleSortForm}
             style={this.state.visibleSort ? {textDecoration: 'underline'} : {}}>sort</p>
          <p className='filter' onClick={this.visibleFilterForm}
             style={this.state.visibleFilter ? {textDecoration: 'underline'} : {}}>filter</p>
          {this.state.visibleFilter ?
            <Filter filterDate={this.filterDate} filterText={this.filterText} changeDate={this.changeDateForFilter}
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
            {cases}
            </tbody>
          </table>
        </div>
        <button onClick={this.visibleAddForm} className='btn'>Add</button>
        {this.state.visibleAdd ?
          <Add changeDate={this.changeDateForAdd} addCase={this.addCase} mistake={this.state.error}/> : ''}
        {this.state.visibleSort ? <Sort sortFunc={this.sort}/> : ''}
      </React.Fragment>
    )
  }
}

export default App;
