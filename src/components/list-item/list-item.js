import React, { Component } from 'react';

import MoviesDBService from '../../services/moviedb-service';
import Item from '../item/item';
import './list-item.css';

export default class ListItem extends Component {
  moviesDBService = new MoviesDBService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    myarray: [],
  };

  searchMovie() {
    this.moviesDBService.searchMovie().then((movies) => {
      this.setState({
        myarray: movies,
      });
    });
  }

  render() {
    this.searchMovie();
    const { myarray } = this.state;
    return (
      <ul className="item-list">
        <Item myarray={myarray} />
      </ul>
    );
  }
}
