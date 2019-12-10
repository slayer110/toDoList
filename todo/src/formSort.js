import React, {Component} from 'react';
import './App.css';
import up_arrow from "./images/up_arrow.png";
import down_arrow from "./images/down_arrow.png";
import up_arrow_active from "./images/up_arrow_active.png";
import down_arrow_active from "./images/down _arrow_active.png";

class Sort extends Component {

  render() {
    return <div className='styleSort'>
      <div className="byTask">
        <img
          src={this.props.arrows.direction === 'Up' && this.props.arrows.type === 'text' ? up_arrow_active : up_arrow}
          onClick={this.props.sortFunc.bind(null, 'text', 'Up')}
        />
        <img
          src={this.props.arrows.direction === 'Down' && this.props.arrows.type === 'text' ? down_arrow_active : down_arrow}
          onClick={this.props.sortFunc.bind(null, 'text', 'Down')}/>
      </div>
      <div className='byDate'>
        <img
          src={this.props.arrows.direction === 'Up' && this.props.arrows.type === 'date' ? up_arrow_active : up_arrow}
          onClick={this.props.sortFunc.bind(null, 'date', 'Up')}/>
        <img
          src={this.props.arrows.direction === 'Down' && this.props.arrows.type === 'date' ? down_arrow_active : down_arrow}
          onClick={this.props.sortFunc.bind(null, 'date', 'Down')}/>
      </div>
    </div>
  }
}

export default Sort;
