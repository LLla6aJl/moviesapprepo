export default class MoviesDBService {
  async getResource(search) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b251d9e32259a47fdc532ea106de2949&language=en-US&query=${search}&page=1&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ${res} recived ${res.status}`);
    }

    return await res.json();
  }

  async searchMovie() {
    const res = await this.getResource("return");
    return res.results;
  }
}
