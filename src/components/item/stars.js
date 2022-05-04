import React, { Component } from 'react';
import { Rate } from 'antd';
import store from 'store';

import MoviesDBService from '../../services/moviedb-service';

export default class Stars extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    rateValue: store.get(`${this.props.id}`) || 0,
  };

  rateMovie = (rate) => {
    const moviesDBService = new MoviesDBService();
    const { id, sessionID } = this.props;
    this.setState({
      rateValue: rate,
    });
    if (rate === 0) {
      moviesDBService.deleteRateMovie(id, sessionID);
      store.set(`${id}`, `${rate}`);
    } else {
      moviesDBService.rateMovie(id, rate, sessionID);
      store.set(`${id}`, `${rate}`);
    }
  };

  render() {
    const { rateValue } = this.state;
    return (
      <Rate
        allowHalf
        count="10"
        style={{ fontSize: 16 }}
        value={rateValue}
        onChange={this.rateMovie}
      />
    );
  }
}
