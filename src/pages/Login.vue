<template>
  <form @submit.prevent="login">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username" required>
      </label>
      <label>
        <span>password :</span>
        <input type="text" v-model="password" required>
      </label>
      <button>Login</button>
      <p v-if="errorMessage">{{errorMessage}}</p>
    </fieldset>
  </form>
</template>

<script>
import { errorMessages } from "@/tools/errorMessages"

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

      //Post
      vm.$http
        .post("http://localhost:5000/api/users/login", {
          username: this.username,
          password: this.password
        })
        .then(function(res) {
          const { data } = res
          if (!data.error) {
            vm.$http.defaults.headers.common["Authorization"] =
              data.content.token
            vm.errorMessage = ""
            vm.$store.commit("logUserIn", data.content)
            localStorage.setItem("token", data.content.token)
            vm.$router.push("/")
          } else {
            console.log(errorMessages)
            vm.errorMessage = errorMessages[data.content]
            localStorage.removeItem("token")
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