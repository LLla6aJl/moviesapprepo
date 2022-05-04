import 'antd/dist/antd.css';

export default class MoviesDBService {
  apikey = 'b251d9e32259a47fdc532ea106de2949';

  // eslint-disable-next-line class-methods-use-this
  async guestSession() {
    // eslint-disable-next-line no-return-await
    this.res = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apikey}`
    );
    if (!this.res.ok) {
      throw new Error(`${this.res.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await this.res.json();
  }

  async genresList() {
    // eslint-disable-next-line no-return-await
    this.res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apikey}&language=en-US`
    );
    if (!this.res.ok) {
      throw new Error(`${this.res.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await this.res.json();
  }

  async getResource(keyword = 'return', numberPage = 1) {
    this.res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=en-US&query=${keyword}&page=${numberPage}&include_adult=false`
    );
    if (!this.res.ok) {
      throw new Error(`${this.res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return await this.res.json();
  }

  async getRatedMovies(sessionID) {
    this.res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionID}/rated/movies?api_key=${this.apikey}&language=en-US&sort_by=created_at.asc`
    );
    if (!this.res.ok) {
      throw new Error(`${this.res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return await this.res.json();
  }

  // eslint-disable-next-line class-methods-use-this
  async rateMovie(id, rate, guestSessionId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: `{\r\n  "value": ${rate}\r\n}`,
      redirect: 'follow',
    };
    // eslint-disable-next-line no-return-await
    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apikey}&guest_session_id=${guestSessionId}`,
      requestOptions
    );
  }

  deleteRateMovie = async (id, guestSessionId) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apikey}&guest_session_id=${guestSessionId}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
  };
}
