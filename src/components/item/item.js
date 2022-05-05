/* eslint-disable prefer-arrow-callback */
import React from 'react';
import './item.scss';
import { format } from 'date-fns';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '../app/app';

import Stars from './stars';

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

function Item() {
  const value = React.useContext(UserContext);
  const { genresList, movies, sessionID } = value;

  const res = movies.map((item) => {
    const {
      // eslint-disable-next-line camelcase
      genre_ids,
      // eslint-disable-next-line camelcase
      poster_path,
      id,
      title,
      // eslint-disable-next-line camelcase
      release_date,
      vote_average: voteAverage,
      overview,
    } = item;

    const overviewTruncated = truncate.apply(overview, [150, true]);
    let genres = genresList.filter(function gen(v) {
      // eslint-disable-next-line prefer-arrow-callback
      // eslint-disable-next-line camelcase
      return genre_ids.some(function gen2(v2) {
        return v.id === v2;
      });
    });
    genres = genres.map((element) => element.name);
    const genresItems = genres.map((genr) => (
      <span className="genr" key={genr}>
        {genr}
      </span>
    ));

    let classNameCircle = '';
    switch (true) {
      case voteAverage <= 3:
        classNameCircle = 'circleRate';
        break;
      case voteAverage > 3 && voteAverage <= 5:
        classNameCircle = 'circleRate E97E00';
        break;
      case voteAverage > 5 && voteAverage <= 7:
        classNameCircle = 'circleRate E9D100';
        break;
      case voteAverage > 7:
        classNameCircle = 'circleRate C66E900';
        break;
      default:
        classNameCircle = 'circleRate';
    }

    return (
      // eslint-disable-next-line no-plusplus
      <li className="li-item" key={id}>
        <div className="item">
          <img
            className="posterImage"
            // eslint-disable-next-line camelcase
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="poster"
          />

          <div className="title">
            <h1>{title}</h1>
            <span className={classNameCircle}>{voteAverage}</span>
          </div>
          <p className="movieDate">
            {format(
              // eslint-disable-next-line camelcase
              release_date ? new Date(release_date) : new Date(),
              'MMMM d, yyyy'
            )}
          </p>
          <p className="genre">{genresItems}</p>
          <p className="description">{overviewTruncated}</p>
        </div>
        <div className="stars">
          <Stars id={id} sessionID={sessionID} />
        </div>
      </li>
    );
  });
  return res;
}

export default Item;

<h1>Harry Potter 20th Anryd ddfdf</h1>;
