<template>
  <form @submit.prevent="signup">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username" required>
      </label>
      <label>
        <span>password :</span>
        <input type="text" v-model="password" required>
      </label>
      <button>Signup</button>
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
    signup() {
      const vm = this
      const regex = RegExp("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$")
      const isPasswordValid = !regex.test(this.password)

      //Client side-verification
      if (!isPasswordValid) {
        return (this.errorMessage = errorMessages["password_creation_hint"])
      }

      //Send info to the server
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
            vm.errorMessage = errorMessages[data.content]
            localStorage.removeItem("token")
          }
        })
    }
  }
}
</script>

<style scoped>
</style>