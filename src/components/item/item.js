/* eslint-disable prefer-arrow-callback */
import React from 'react';
import './item.scss';
import { format } from 'date-fns';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '../app/app';

import poster from './no-product.png';
import Stars from './stars';
import { Circle, truncate, Genres } from './helper';

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
    // eslint-disable-next-line camelcase
    let src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    if (src === 'https://image.tmdb.org/t/p/w500null') {
      src = poster;
    }
    const genresItems = Genres(genresList, genre_ids);

    return (
      // eslint-disable-next-line no-plusplus
      <li className="li-item" key={id}>
        <div className="item">
          <img
            className="posterImage"
            // eslint-disable-next-line camelcase
            src={src}
            alt="poster"
          />
          <div className="title">
            <h1>{title}</h1>
            <span className={Circle(voteAverage)}>{voteAverage}</span>
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
