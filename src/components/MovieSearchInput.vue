<template>
    <div class="search">
      <input type="search" v-model="movieSearchString" @keyup="fetchMovies"/>
    </div>
</template>

<script>

import tmdb from '../tools/tmdb'

export default {
  data () {
    return {
      movieSearchString: '',
      movieList: []
    }
  },
  methods: {
    fetchMovies () {
      const s = this.movieSearchString
      if (s.length > 3) {
        fetch(`${tmdb.queries.nameSearch}${this.movieSearchString}`)
          .then(response => response.json())
          .then(data => {
            this.$store.commit('updateMovieList', data.results)
          })
      } else {
        this.$store.commit('updateMovieList', [])
      }
    }
  }
}
</script>
