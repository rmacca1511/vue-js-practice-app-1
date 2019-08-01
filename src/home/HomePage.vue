<template>
  <div class="home">
    <div class="get-started">
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
