<template>
  <form @submit.prevent="login">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>password :</span>
        <input type="text" v-model="password">
      </label>
      <button>Login</button>
      <p>is Logged : {{isLogged}}</p>
      <p v-if="errorMessage">{{errorMessage}}</p>
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    login() {
      const vm = this
      vm.$http
        .post("http://localhost:5000/api/users/login", {
          username: this.username,
          password: this.password
        })
        .then(function(res) {
          const { data } = res
          if (!data.error) {
            vm.$store.commit("updateUser", data.data)
            vm.errorMessage = ""
          } else {
            console.log(data.message)
            vm.errorMessage = data.message
          }
        })
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isLogged() {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>

<style scoped>
</style>