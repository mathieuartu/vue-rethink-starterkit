<template>
  <div>
    <p>Oops, you have to be logged in to see this page :/</p>
    <p>You will be redirected soon</p>
  </div>
</template>

<script>
export default {
  created() {
    const vm = this
    setTimeout(() => {
      vm.$router.push("/login")
    }, 3000)
  }
}
</script>

