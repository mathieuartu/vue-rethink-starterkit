<template>
  <div>
    <p>Oops, this page does not exists :/</p>
    <p>You will be redirected soon</p>
  </div>
</template>

<script>
export default {
  created() {
    const vm = this
    setTimeout(() => {
      vm.$router.push("/")
    }, 3000)
  }
}
</script>

