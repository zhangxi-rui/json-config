<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL,
      version: process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
