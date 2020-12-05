import React, { Component } from 'react';
import style from './Filter.module.css';

class Filter extends Component {
  state = {}
  render() {
    const { filterValue, handlerFilter } = this.props;
    return (
      <label className={style.filterInput}>
        Find contacts by name:
        <input type="text" value={filterValue} onChange={handlerFilter} />
      </label>
    );
  }
}

export default Filter;