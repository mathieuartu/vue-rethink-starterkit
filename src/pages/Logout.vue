<template>
  <div></div>
</template>


<script>
export default {
  created() {
    const vm = this
    localStorage.removeItem("token")
    delete this.$http.defaults.headers.common["Authorization"]
    this.$store.dispatch("logUserOut").then(()=> {
      vm.$router.push("/")
    })
    
  }
}
</script>