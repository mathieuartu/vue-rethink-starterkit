<template>
  <form @submit.prevent="signup">
    <fieldset>
      <label>
        <span>username :</span>
        <input type="text" v-model="username" name="username" required>
      </label>
      <label>
        <span>email address :</span>
        <input type="email" v-model="email" name="email" required>
      </label>
      <label>
        <span>password :</span>
        <input type="text" v-model="password" name="password" required>
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
      username: null,
      password: null,
      email: null,
      errorMessage: null,
    }
  },
  methods: {
    signup() {
      const vm = this
      const { username, password, email } = this

      const regex = RegExp("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$")
      const isPasswordValid = !regex.test(password)

      //Client side-verification
      if (!isPasswordValid) {
        return (this.errorMessage = errorMessages["password_creation_hint"])
      }

      //Send info to the server
      this.$store.dispatch('signUserUp', { username, password, email })
      .then(()=> {
        vm.errorMessage = ''
        vm.$router.push("/")
      })
      .catch((errorMessage) => {
        return vm.errorMessage = errorMessages[errorMessage]
      })
    }
  }
}
</script>

<style scoped>
</style>