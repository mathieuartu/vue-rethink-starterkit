<template>
  <div>
    <p v-if="isAuthenticated">Bienvenue {{user.username}}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    const vm = this
    if (this.$store.state.isAuthenticated) {
      const { token } = this.$store.state
      this.$http
        .post("http://localhost:5000/api/user", { token })
        .then(response => {
          vm.user = response.data[0]
        })
    }
  },
  data() {
    return {
      user: {}
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
