import React, { Component } from 'react';
import './item.css';
import { format } from 'date-fns';

function truncate(numberSymbols, useWordBoundary) {
  if (this.length <= numberSymbols) {
    return this;
  }
  const subString = this.substring(0, numberSymbols - 1);
  return `${
    useWordBoundary
      ? subString.substring(0, subString.lastIndexOf(' '))
      : subString
  }...`;
}
export default class Item extends Component {
  render() {
    const { myarray } = this.props;
    let maxId = 100;
    const res = myarray.map((item) => {
      const overviewTruncated = truncate.apply(item.overview, [200, true]);
      return (
        // eslint-disable-next-line no-plusplus
        <li className="li-item" key={maxId++}>
          <div className="item">
            <img
              className="posterImage"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="poster"
            />
            <div className="posterTitle">
              <h1>{item.title}</h1>
              <p className="movieDate">
                {format(new Date(item.release_date), 'MMMM d, yyyy')}
              </p>
              <p className="genre">Drama, Action</p>
              <p className="description">{overviewTruncated}</p>
            </div>
          </div>
        </li>
      );
    });
    return res;
  }
}
