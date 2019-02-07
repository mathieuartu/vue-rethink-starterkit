const tmdb = {}
tmdb.api = {
  baseUrl: 'https://api.themoviedb.org/3/',
  key: 'api_key=3c18c673de86edca179e77d179b7b3f6',
  // moviesInTheatersQuery: 'discover/movie?language=fr&region=FR&release_date.gte=' + getPrevMonth(),
  nameSeachQuery: 'search/movie',
  idFindQuery: 'movie/'
}

tmdb.queries = {
  // moviesInTheaters : tmdb.api.baseUrl + tmdb.api.moviesInTheatersQuery +'&'+ tmdb.api.key,
  nameSearch: tmdb.api.baseUrl + tmdb.api.nameSeachQuery + '?' + tmdb.api.key + '&query=',
  idFind: function (id) { return tmdb.api.baseUrl + tmdb.api.idFindQuery + id + '?' + tmdb.api.key + '&language=fr' }
}

export default tmdb
