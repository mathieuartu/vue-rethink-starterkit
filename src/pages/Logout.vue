<template>
  <div></div>
</template>


<script>
export default {
  async created() {
    localStorage.removeItem("token")
    delete this.$http.defaults.headers.common["Authorization"]
    await this.$store.dispatch("logUserOut")
    this.$router.push("/")  
  }
}
</script>