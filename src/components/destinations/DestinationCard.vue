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
          link: 'https://www.jet2holidays.com/destinations/greece/zante',
          image: 'https://www.jet2holidays.com/-/media/destination%20guide/greece/zante/stavros%20bochali/zth0082_zante_town_0916_01.jpg?h=400&w=600&crop=1&hash=D022B0673EC50BDC5464055BFFC4BA60FDB8E429',
        },
        Kos: {
          name: 'Kos',
          price: '£129pp',
          country: 'Greece',
          return: false,
          link: 'https://www.jet2holidays.com/destinations/greece/kos',
          image: 'https://content.tui.co.uk/adamtui/2018_12/11_14/a2bac304-3911-4867-a027-a9b300efa299/ACC_013554_KOS_22WebOriginalCompressed.jpg?i10c=img.resize(width:658);img.crop(width:658%2Cheight:370)',
        },
        'New York': {
          name: 'New York',
          price: '£278pp',
          country: 'Murica',
          return: true,
          link: 'https://www.jet2holidays.com/city-breaks/destinations/united-states/new-york',
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/c5/9e/6f/new-york-in-one-day-guided.jpg',
        },
        Birkenhead: {
          name: 'Birkenhead',
          price: '£28pp',
          country: 'United Kingdom',
          return: false,
          link: 'https://www.jet2holidays.com/city-breaks/destinations/united-states/new-york',
          image: 'http://jmu-journalism.org.uk/wp-content/uploads/2018/02/ms2-e1517928245428.png',
        },
        Algarve: {
          name: 'Algarve',
          price: '£253pp',
          country: 'Portugal',
          return: false,
          link: 'https://www.jet2holidays.com/destinations/portugal/algarve',
          image: 'https://pesweb.azureedge.net/spimg/hotelphotos/all-inclusive-resort-algarve-aerial-view-beach.jpg?scale=downscaleonly&encoder=freeimage&progressive=true&quality=70&w=401&h=202&mode=crop',
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

      const chosenDestination = clickedEl.getAttribute('data-id');

      this.$root.$emit('passDestination', this.destinations[chosenDestination]);
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
