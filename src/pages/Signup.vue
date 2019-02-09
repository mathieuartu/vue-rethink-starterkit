<template>
  <form @submit.prevent="signup">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>password :</span>
        <input type="text" v-model="password">
      </label>
      <button>Signup</button>
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
    signup() {
      const vm = this

      vm.$http
        .post("http://localhost:5000/api/users/signup", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          const { data } = res
          if (!data.error) {
            vm.$http.defaults.headers.common["Authorization"] =
              data.content.token
            vm.errorMessage = ""
            vm.$store.commit("logUserIn", data.content)
            localStorage.setItem("token", data.content.token)
            vm.$router.push("/")
          } else {
            vm.errorMessage = data.content
            localStorage.removeItem("token")
          }
        })
    }
  }
}
</script>

<style scoped>
</style>