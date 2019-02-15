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
      username: null,
      password: null,
      errorMessage: null,
    }
  },
  methods: {
    login() {
      const vm = this
      const { username, password } = this

      this.$store.dispatch('logUserIn', { username, password })
      .then(()=> {
        vm.errorMessage = ''
        vm.$router.push("/")
      })
      .catch((errorMessage) => {
        return vm.errorMessage = errorMessages[errorMessage]
      })      
    }
  },
}
</script>

<style scoped>
</style>