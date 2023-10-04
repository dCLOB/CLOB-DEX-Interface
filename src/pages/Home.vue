<template>
  <div id="my-content">
    <main id="root">
      <h1 style="{color: black}">Home page</h1>
      <router-link class="trading-link" :to="{path: '/trading'}">Go to trading</router-link>
    </main>
  </div>
</template>


<script>


export default {
  components: {},
  name: "Home",
}
</script>

<style scoped>
.trading-link {
  font-size: 20px;
  color: red;
}
</style>