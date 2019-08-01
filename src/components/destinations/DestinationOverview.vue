<template>
  <div class="destination-overview hidden">
    <button @click="showDestinations()">Back</button>
    Destination Overview - {{ selectedCard }}
    <p></p>
    Price - {{ selectedCardPrice }} <br />
    <span v-if="selectedCardReturn">Return Only</span>
    <span v-else>Single Trip</span>
    <img :src="selectedCardImage" />
    <p></p>
    <a :href="selectedCardLink" target="_blank" >Link to Destination Guide</a>
    <p></p>
    <TemparatureGraph />
    <TemparatureGraph />
    <button class="lowest-fares-button">See Lowest Fares</button>
  </div>
</template>

<script>
import TemparatureGraph from '../TemparatureGraph.vue';

export default {
  name: 'DestinationOverview',
  components: { TemparatureGraph },
  data() {
    return {

    };
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
    height: 675px;
    overflow-y: auto;
    border: 1px solid #aaa;
    border-radius: 8px;
  }
</style>
