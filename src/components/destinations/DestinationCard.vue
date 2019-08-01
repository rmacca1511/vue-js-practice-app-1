<template>
  <div class="destination-cards">
    <div class="destination-card"
    v-for="(destination, index) in destinations"
    :key="index"
    @click="showOverview($event);"
    :data-id="destination.name">
        <h4>{{ destination.name }}</h4>
        <span>{{ destination.country }}</span>
        <span>{{ destination.price }}</span>
        <span v-if="destination.return == true">
          Return Only
        </span>
        <button :link="destination.link">View overview</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DestinationCard',
  computed: {
    isShowingCards() {
      return this.showingDestinations ? '' : 'hidden';
    },
  },
  data() {
    return {
      showingDestinations: true,
      selectedCard: '',
      destinations: {
        Zante: {
          name: 'Zante',
          price: '£145pp',
          country: 'Greece',
          return: false,
          link: 'linkhere',
        },
        Kos: {
          name: 'Kos',
          price: '£129pp',
          country: 'Greece',
          return: false,
          link: 'linkhere',
        },
        'New York': {
          name: 'New York',
          price: '£278pp',
          country: 'Murica',
          return: true,
          link: 'linkhere',
        },
        Birkenhead: {
          name: 'Birkenhead',
          price: '£28pp',
          country: 'United Kingdom',
          return: false,
          link: 'linkhere',
        },
        Algarve: {
          name: 'Algarve',
          price: '£253pp',
          country: 'Portugal',
          return: false,
          link: 'linkhere',
        },
      },
    };
  },
  methods: {
    showOverview(event) {
      this.showingDestinations = false;

      // Remove Hidden class from Destination Overview to show it
      document.getElementsByClassName('destination-overview')[0].classList.remove('hidden');
      document.getElementsByClassName('destination-cards')[0].classList.add('hidden');

      // Remove all other selected classes

      const cards = document.getElementsByClassName('destination-card');
      for (let i = 0; i < cards.length; i += 1) {
        cards[i].classList.remove('destination-card--selected');
      }

      let clickedEl = event.target;
      if (!(clickedEl.classList.contains('destination-card'))) {
        clickedEl = clickedEl.parentElement;
      }
      clickedEl.classList.add('destination-card--selected');
      this.selectedCard = clickedEl.getAttribute('data-id');
    },
  },
};
</script>

<style lang="scss" scoped>
  .destination-card {
    margin: 15px 5px 15px 0px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    height: 180px;

    &--selected {
      box-shadow: 10px 10px 10px #eee;
      border: 1px solid red;
    }
  }
</style>
