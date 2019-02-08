<template>
  <div></div>
</template>


<script>
export default {
  created() {
    localStorage.removeItem("token")
    delete this.$http.defaults.headers.common["Authorization"]
    this.$store.commit("logUserOut")
    this.$router.push("/")
  }
}
</script>