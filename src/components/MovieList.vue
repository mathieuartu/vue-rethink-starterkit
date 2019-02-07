<template>
  <div class="movies">
    <ul>
      <li v-for="movie in movieList" :key="movie.id" class="movie">
        <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`">
        <select>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    movieList () {
      return this.$store.state.movieList
    }
  }
}
</script>

<style scoped>
</style>
