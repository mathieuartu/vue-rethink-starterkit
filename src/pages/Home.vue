<template>
  <div>
    <p v-if="isAuthenticated">Bienvenue {{user && user.username}}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: {},
    }
  },
  asyncComputed: {
    user() {
      if(!this.$store.state.user && this.$store.state.isAuthenticated) {
        return this.$store.dispatch('getUser')
      } else {
        return this.$store.state.user
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
