<template>
  <form @submit.prevent="login">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username" name="username" required>
      </label>
      <label>
        <span>password :</span>
        <input type="password" v-model="password" name="password" required>
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
    async login() {
      const { username, password } = this

      try {
        await this.$store.dispatch('logUserIn', { username, password })
        this.errorMessage = ''
        this.$router.push("/")
      } catch(errorMessage) {
        this.errorMessage = errorMessages[errorMessage]
      }

    },
  },
}
</script>

<style scoped>
</style>