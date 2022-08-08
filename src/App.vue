<template>
  <div id="app">
    <header></header>
    <router-view/>
    <footer></footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  gap: 20px;
  --blue-color: rgb(13, 110, 253);
  --blue-color-opacity: rgba(13, 110, 253, .2);
}

</style>
