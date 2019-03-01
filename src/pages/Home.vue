<template>
  <div>
    <p v-if="isAuthenticated">Bienvenue {{user && user.username}}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
