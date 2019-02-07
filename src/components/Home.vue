<template>
  <div class="hello">
    <Menu />
    <MovieSearchInput />
    <MovieList />
  </div>
</template>

<script>

import Menu from './Menu'
import MovieList from './MovieList'
import MovieSearchInput from './MovieSearchInput'

export default {
  name: 'Home',
  components: {
    Menu,
    MovieList,
    MovieSearchInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
