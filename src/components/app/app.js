/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Spin, Alert, Layout, Pagination, Tabs } from 'antd';
import store from 'store';
import 'antd/dist/antd.min.css';

import MoviesDBService from '../../services/moviedb-service';
import './app.scss';
// eslint-disable-next-line import/no-cycle
import ListItem from '../list-item/list-item';
import SearchMovie from '../search/searchmovie';

const { TabPane } = Tabs;
export const UserContext = React.createContext();

export default class App extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    movies: [],
    loading: false,
    error: false,
    errorMessage: 'Что-то пошло не так, но мы работаем над этим',
    searchQuery: 'return',
    numberPage: 1,
    sessionID: '',
    genresList: [],
    tabPane: '1',
    totalPages: 1,
  };

  moviesDBService = new MoviesDBService();

  componentDidMount() {
    this.searchMovie();
    this.getSessionID();
    this.getGenres();
  }

  onMovieLoaded = (movies) => {
    const { numberPage } = this.state;
    if (movies.results) {
      if (!movies.total_results) {
        this.onError(movies.total_results);
      } else
        this.setState({
          totalPages: movies.total_pages,
          numberPage,
          movies: movies.results,
          loading: false,
          error: false,
        });
    } else {
      this.onError(movies);
    }
  };

  onError = (err) => {
    if (!err) {
      const errorMessage = 'по вашему запросу не найдены фильмы';
      this.setState({
        error: true,
        loading: false,
        errorMessage,
      });
    } else {
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  searchQueryChange = (searchQuery) => {
    if (searchQuery === '') return;
    this.setState(
      {
        searchQuery,
        loading: true,
        numberPage: 1,
      },
      () => {
        this.searchMovie();
      }
    );
  };

  getSessionID = () => {
    this.moviesDBService.guestSession().then((body) => {
      store.set('guestSessionId', `${body.guest_session_id}`);
      this.setState({
        sessionID: body.guest_session_id,
      });
    });
  };

  getGenres = () => {
    this.moviesDBService.genresList().then((body) => {
      this.setState({
        genresList: body.genres,
      });
    });
  };

  searchMovie = () => {
    const { searchQuery, numberPage } = this.state;

    this.moviesDBService
      // eslint-disable-next-line react/destructuring-assignment
      .getResource(searchQuery, numberPage)
      .then(this.onMovieLoaded)
      .catch(this.onError);
  };

  searchRatedMovies = () => {
    const { sessionID, numberPage } = this.state;
    this.moviesDBService
      // eslint-disable-next-line react/destructuring-assignment
      .getRatedMovies(sessionID, numberPage)
      .then(this.onMovieLoaded)
      .catch(this.onError);
  };

  changePage = (page) => {
    const { tabPane } = this.state;

    this.setState(
      {
        numberPage: page,
        loading: true,
      },
      () => {
        if (tabPane === '1') {
          this.searchMovie();
        } else {
          this.searchRatedMovies();
        }
      }
    );
  };

  changeTabPane = (key) => {
    if (key !== '1') {
      this.setState(
        {
          tabPane: key,
          loading: true,
          numberPage: 1,
        },
        () => {
          this.searchRatedMovies();
        }
      );
    } else {
      this.setState(
        {
          tabPane: key,
          loading: true,
          numberPage: 1,
        },
        () => {
          this.searchMovie();
        }
      );
    }
  };

  render() {
    const { Footer, Content } = Layout;
    const {
      sessionID,
      numberPage,
      totalPages,
      movies,
      loading,
      error,
      errorMessage,
      genresList,
      tabPane,
    } = this.state;

    const hasData = !(loading || error);
    const errorMessageAlert = error ? (
      <Alert message="error" description={errorMessage} type="error" showIcon />
    ) : null;
    const spinner = loading ? <Spin size="large" /> : null;
    const content = hasData ? <ListItem /> : null;
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = { genresList, movies, sessionID };
    const search =
      tabPane === '1' ? (
        <SearchMovie searchQueryChange={this.searchQueryChange} />
      ) : null;
    const pagination = (
      <Pagination
        defaultCurrent={1}
        current={numberPage}
        total={totalPages}
        showSizeChanger={false}
        onChange={this.changePage}
      />
    );
    return (
      <div>
        <Online>
          <UserContext.Provider value={contextValue}>
            <Layout>
              <Content>
                <div className="tabs">
                  <Tabs
                    defaultActiveKey="1"
                    centered
                    onChange={this.changeTabPane}
                  >
                    <TabPane tab="Search" key="1" />
                    <TabPane tab="Rated" key="2" />
                  </Tabs>
                </div>
                {search}
                {spinner}
                {errorMessageAlert}
                {content}
              </Content>
              <Footer>{pagination}</Footer>
            </Layout>
          </UserContext.Provider>
        </Online>
        <Offline>
          <Alert
            message="error"
            description="You are offline, please connect internet"
            type="error"
            showIcon
          />
        </Offline>
      </div>
    );
  }
}
