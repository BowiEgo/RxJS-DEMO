<template>
  <div id="app">
    <router-view></router-view>
    <!--<loading></loading>
    <pieChart></pieChart>
    <particleText></particleText>-->
    <!--<mouseArrow></mouseArrow>-->
    <!--<perspective-card></perspective-card>-->
  </div>
</template>

<script>
// import pieChart from './pages/pie'
// import loading from './pages/loadingTest'
// import particleText from './pages/particleText'
// import mouseArrow from './pages/mouseArrow'
// import perspectiveCard from './pages/perspectiveCard'

export default {
  name: 'app',
  components: {
    // pieChart,
    // loading,
    // particleText,
    // mouseArrow
    // perspectiveCard
  }
}
</script>

<style>
* {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
