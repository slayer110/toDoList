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
        {text: 'в', done: false, date: '2.04.2019', id: 1},
        {text: 'б', done: true, date: '2.04.2019', id: 2},
        {text: 'а', done: true, date: '30.08.2019', id: 3},
        {text: 'г', done: true, date: '8.04.2019', id: 4}
      ],
      startDate: '',
      filterDate: '',
      visibleAdd: false,
      visibleSort: false,
      visibleFilter: false,
      error: false,
      textFilter: '',
      sort: ''
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
    console.log(date)
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
    this.setState({sort: sort})
  };

  // sortABC = (a, b) => {
  //   //     if (prop === 'date') {
  //   //       if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return 1;
  //   //       if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return -1;
  //   //     } else {
  //   if (a['text'] > b['text']) return 1;
  //   if (a['text'] < b['text']) return -1;
  // }
  // sort = (prop) => {
  //   let sortedABC = 0;
  //   let sortedCBA = 0;
  //   let arr;
  //   let that = this;
  //   let formatFunc = (par) => par.split('.').reverse().join('.');
  //   let sortABC = (a, b) => {
  //     if (prop === 'date') {
  //       if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return 1;
  //       if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return -1;
  //     } else {
  //     if (a[prop] > b[prop]) return 1;
  //     if (a[prop] < b[prop]) return -1;
  //   }
  // };
  //   let sortCBA = (a, b) => {
  //     if (prop === 'date') {
  //       if (new Date(formatFunc(a[prop])) > new Date(formatFunc(b[prop]))) return -1;
  //       if (new Date(formatFunc(a[prop])) < new Date(formatFunc(b[prop]))) return 1;
  //     } else {
  //       if (a[prop] > b[prop]) return -1;
  //       if (a[prop] < b[prop]) return 1;
  //     }
  //   };
  //
  //   function chooseArray(propDouble, arrFromState) {
  //     if (propDouble === 'date') {
  //       for (let i = 0; i < arrFromState.length - 1; i++) {
  //         if (new Date(formatFunc(arrFromState[i][propDouble])) > new Date(formatFunc(arrFromState[i + 1][propDouble]))) {
  //           sortedCBA++
  //         } else {
  //           sortedABC++
  //         }
  //       }
  //     } else {
  //       for (let i = 0; i < arrFromState.length - 1; i++) {
  //         if (arrFromState[i][prop] > arrFromState[i + 1][prop]) {
  //           sortedCBA++
  //         } else {
  //           sortedABC++
  //         }
  //       }
  //     }
  //
  //     if (sortedABC === arrFromState.length - 1) {
  //       arr = arrFromState.sort(sortCBA);
  //     }
  //     if (sortedCBA === arrFromState.length - 1) {
  //       arr = arrFromState.sort(sortABC);
  //     }
  //     if (sortedABC !== arrFromState.length - 1 && sortedCBA !== arrFromState.length - 1) {
  //       arr = arrFromState.sort(sortABC);
  //     }
  //     that.setState({
  //       [arrFromState]: arr
  //     }, () => {
  //       localStorage.setItem('casesInfo', JSON.stringify(arrFromState))
  //     })
  //   }
  //
  //
  //   chooseArray(prop, this.state.modifiedArr ? this.state.modifiedArr : this.state.casesInfo)
  // };
  //
  // filterDate = (prop, date) => {
  //   if (date === null) {
  //     return false
  //   }
  //   let arr;
  //   let that = this;
  //
  //   function formatMonth() {
  //     if ((date.getMonth() + 1).toString().length === 2 && (date.getMonth() + 1).toString()[0] !== 1) {
  //       return (date.getMonth() + 1)
  //     } else {
  //       return `0${date.getMonth() + 1}`
  //     }
  //   }
  //
  //   let formatDate = `${date.getDate()}.${formatMonth()}.${date.getFullYear()}`;
  //   arr = this.state.casesInfo.filter((elem) => {
  //     return elem[prop] === formatDate
  //   });
  //   this.setState({modifiedArr: arr})
  //
  // };
  //
  filterText = (e) => {
    this.setState({textFilter: e.target.value})
  };
  //
  // checkCase = (index) => {
  //   let arr = this.state.casesInfo.map((elem, item) => {
  //     if (elem.id === index) {
  //       return {...elem, done: !elem.done}
  //     }
  //     return elem
  //   });
  //   this.setState({casesInfo: arr}, () => {
  //     localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
  //   })
  // };
  // checkCaseModifiedArr = (index) => {
  //   function arrChoose(arr) {
  //     return arr.map((elem, item) => {
  //       if (elem.id === index) {
  //         return {...elem, done: !elem.done}
  //       }
  //       return elem
  //     });
  //   }
  //
  //   this.setState({modifiedArr: arrChoose(this.state.modifiedArr), casesInfo: arrChoose(this.state.casesInfo)}, () => {
  //     localStorage.setItem('casesInfo', JSON.stringify(this.state.casesInfo))
  //   })
  // };
  sort = (prop, arrFilter) => {
    let sortedABC = 0;
    let sortedCBA = 0;
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


    if (prop === 'date') {
      for (let i = 0; i < arrFilter.length - 1; i++) {
        if (new Date(formatFunc(arrFilter[i][prop])) > new Date(formatFunc(arrFilter[i + 1][prop]))) {
          sortedCBA++
        } else {
          sortedABC++
        }
      }
    } else {
      for (let i = 0; i < arrFilter.length - 1; i++) {
        if (arrFilter[i][prop] > arrFilter[i + 1][prop]) {
          sortedCBA++
        } else {
          sortedABC++
        }
      }
    }

    if (sortedABC === arrFilter.length - 1) {
      return sortCBA;
    }
    if (sortedCBA === arrFilter.length - 1) {
      return sortABC;
    }
    if (sortedABC !== arrFilter.length - 1 && sortedCBA !== arrFilter.length - 1) {
      return sortABC;
    }

  };

  filterAndSort(arr, text, date, sortArr) {
    let arrFilter;

    function formatMonth() {
      if ((date.getMonth() + 1).toString().length === 2 && (date.getMonth() + 1).toString()[0] !== 1) {
        return (date.getMonth() + 1)
      } else {
        return `0${date.getMonth() + 1}`
      }
    }

    if (text) {
      arrFilter = arr.filter((elem) => {
        return elem['text'].toLowerCase().indexOf(this.state.textFilter) === 0
      });
    } else {
      arrFilter = arr
    }
    if (date) {
      let formatDate = `${date.getDate()}.${formatMonth()}.${date.getFullYear()}`;
      arrFilter = arrFilter.filter((elem) => {
        return elem['date'] === formatDate
      });
    }
    if (sortArr) {
      arrFilter = arrFilter.sort(this.sort(sortArr, arrFilter))
    }
    return arrFilter.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
            checkCase={this.checkCase}/>)

  }

  render() {
    localStorage.clear();
    let cases = this.state.casesInfo.map((elem, index) =>
      <Case key={index} id={elem.id} text={elem.text} done={elem.done} date={elem.date}
            checkCase={this.checkCase}/>);
    console.log(this.state.casesInfo)

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
            {this.state.textFilter || this.state.filterDate || this.state.sort ? this.filterAndSort(this.state.casesInfo, this.state.textFilter, this.state.filterDate, this.state.sort) : cases}
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
