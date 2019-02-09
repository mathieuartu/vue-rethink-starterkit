<template>
  <div id="app">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>
import Menu from "@/components/Menu"

export default {
  name: "App",
  components: {
    Menu
  }
}
</script>

<style>
@import url("./css/reset.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
