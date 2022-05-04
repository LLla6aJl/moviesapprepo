import { Component } from 'react';
import './searchmovie.scss';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

export default class SearchMovie extends Component {
  // eslint-disable-next-line react/state-in-constructor

  onSearch = (e) => {
    const { searchQueryChange } = this.props;
    const trimUserRequest = e.target.value.replace(/ +/g, ' ').trim();
    searchQueryChange(trimUserRequest);
  };

  render() {
    return (
      <input
        className="inputSearch"
        type="text"
        onChange={debounce(this.onSearch, 1000)}
        placeholder="Type to search..."
      />
    );
  }
}

SearchMovie.defaultProps = {
  searchQueryChange: () => {},
};

SearchMovie.propTypes = {
  searchQueryChange: PropTypes.func,
};
