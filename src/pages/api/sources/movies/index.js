const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${ this.context.token }`);
  }

  async searchMovie(query) {
    console.log('searchMovie');
    console.log(query);
    const { results } = await this.get(`search/movie?query=${query}`);
    return results.filter(r => Boolean(r.poster_path));
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}

export default MoviesAPI;
