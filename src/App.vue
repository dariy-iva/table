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
  --red-color: rgb(255, 0, 0);
  --blue-color-opacity: rgba(13, 110, 253, .2);
  --red-color-opacity: rgba(255, 0, 0, .2);
  --gray-color: rgb(171, 171, 171);
  --black-color: rgb(0, 0, 0);
}

</style>
