<template>
  <div class="destination-overview hidden">
    <div class="destination-overview__wrap">
      <button @click="showDestinations()">Back</button>
      Destination Overview - {{ chosenDestination.name }}
      <p></p>
      Price - {{ chosenDestination.price }} <br />
      <span v-if="chosenDestination.return">Return Only</span>
      <span v-else>Single Trip</span>
      <img class="destination-overview__image" :src="chosenDestination.image" />
      <p></p>
      <a :href="chosenDestination.link" target="_blank" >Link to Destination Guide</a>
      <p></p>
      <TemparatureGraph />
    </div>
    <button class="destination-overview__button">See Lowest Fares</button>
  </div>
</template>

<script>
import TemparatureGraph from './TemparatureGraph.vue';

export default {
  name: 'DestinationOverview',
  components: { TemparatureGraph },
  data() {
    return {
      chosenDestination: {},
    };
  },
  mounted() {
    this.$root.$on('passDestination', (chosenDestination) => {
      this.chosenDestination = chosenDestination;
      console.log(this.chosenDestination);
    });
  },
  methods: {
    showDestinations() {
      document.getElementsByClassName('destination-overview')[0].classList.add('hidden');
      document.getElementsByClassName('destination-cards')[0].classList.remove('hidden');
    },
  },
};
</script>

<style lang="scss" scoped>
  .destination-overview {

    &__wrap {
      height: 650px;
      overflow-y: auto;
      border: 1px solid #aaa;
      border-radius: 8px;
    }

    &__image {
      width: 100%;
    }

    &__button {
      background: #fff100;
      color: #203240;
      width: 100%;
      line-height: 42px;
      padding: 5px 0;
      text-align: center;
      font-size: 22px;
      height: 60px;
      padding: 0;
      border: 2px solid #fff100;
      cursor: pointer;
      display: inline-block;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      position: relative;
      outline: 0;
      appearance: button;
      margin: 10px auto;
      &:hover {
        background: #fff111;
      }
    }
  }
</style>
