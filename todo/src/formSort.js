import React, {Component} from 'react';
import './App.css';
import up_arrow from "./images/up_arrow.png";
import down_arrow from "./images/down_arrow.png";
import up_arrow_active from "./images/up_arrow_active.png";
import down_arrow_active from "./images/down _arrow_active.png";

class Sort extends Component {
  visibleArrow = (direction) => {
    if (this.props.typeSort === this.props.arrows.type && direction === this.props.arrows.direction) {
      if (direction === 'Down') {
        return down_arrow_active
      }
      if (direction === 'Up') {
        return up_arrow_active
      }
    } else {
      if (direction === 'Down') {
        return down_arrow
      }
    }
    if (direction === 'Up') {
      return up_arrow
    }
  };


  render() {
    return <div className='styleSort'>
      <div>
        <img
          src={this.visibleArrow('Up')}
          onClick={this.props.sortFunc.bind(null, this.props.typeSort, 'Up')}
        />
        <img
          src={this.visibleArrow('Down')}
          onClick={this.props.sortFunc.bind(null, this.props.typeSort, 'Down')}/>
      </div>
    </div>
  }
}

export default Sort;
