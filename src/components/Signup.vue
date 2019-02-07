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
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    signup() {
      this.$http
        .post("http://localhost:5000/api/users/signup", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>
</style>