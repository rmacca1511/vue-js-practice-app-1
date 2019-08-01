<template>
  <div class="home">
    <div class="get-started">
      <p><router-link to="/exercise1">User Story 1</router-link>: Opening the Modal</p>
      <p><router-link to="/exercise2">User Story 2</router-link>: Closing the Modal</p>
      <p><router-link to="/exercise3">User Story 3</router-link>: Departure Airport Field</p>
      <p><router-link to="/exercise4">User Story 4</router-link>: Date Modal</p>
      <p><router-link to="/exercise5">User Story 5</router-link>: Flight cards (non mobile)</p>
      <p><router-link to="/exercise6">User Story 6</router-link>: Flight cards (mobile)</p>
      <p><router-link to="/exercise7">User Story 7</router-link>: Destination Overview</p>
      <p><router-link to="/mainbuild">Main Build</router-link>: The Full Thing</p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  created() {
    console.log(process.env.VUE_APP_TEST, process.env.SOME_TEST);
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
</style>
