<template>
  <div class="content">
    <h4>As a user. I want to see a guide on my selected destination.
      So that I have more information to help me decide
    </h4>
    <p class="success">Clicking the flight card will launch the destination overview
      (or non-mobile by clicking the destination pin or the 'Selected' Flight card)
    </p>
    <p class="success">There will be a standard image for each destination displayed</p>
    <p class="success">Link to destination guide page - to open in new tab</p>
    <p>We will display (departure airport) to (destination) E.G. Leeds Bradford to Rome
      (This will update as the user selects different departure pins on the map)</p>
    <p>Month Year</p>
    <p>Description field will be a rich text field containing custom HTML content</p>
    <p>From £XXpp one-way. Based on 1 adult, one way price. (Price will update as the
      user changes departure base)
    </p>
    <p class="success">When New York is set as the destination, the price will
      be based on 1 adult, return price. I.e. From '£XXpp return'
    </p>
    <p class="success">The temparature graphic will be displayed with the month
      represented by the first letter of the month E.G. J for January</p>
    <p class="success">The 'See lowest fares' will be docked and remain in a fixed
      position on the screen</p>
    <p>Clicking 'See lowest fares' button will launch search results with a return
      journey search for that destination from your selected departure airport in the
      chosen month</p>
    <p class="success">Clicking back will keep the route selected but the card list will reappear
      (non-mobile) (On mobile the user will be taken back to the map view)</p>

    <button class="build-modal" @click="openModal()"> {{ modalButtonText }}</button>
    <img class="map" src="../assets/map.png" alt="" />
    <Modal>
      <div class="map-modal">
          <div :class="[stateOfSidebar, 'map-modal__sidebar']">
              <div :class="[isDestinationsShown, 'map-modal__cardcontainer']">
                <div class="destination-card"
                v-for="(destination, index) in destinations"
                :key="index"
                @click="showOverview($event);"
                :data-id="destination.name">
                  <h4>{{ destination.name }}</h4>
                  <p>{{ destination.country }}</p>
                  <p>{{ destination.price }}</p>
                  <span v-if="destination.return == true">
                    Return Only
                    </span>
                  <p>&nbsp;</p>
                  <button :link="destination.link">View overview</button>
                </div>
              </div>
              <div :class="[isOverviewShown, 'map-modal__destinationoverview']">
                <div class="destination-overview">
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
                </div>
                <button class="lowest-fares-button">See Lowest Fares</button>
              </div>
          </div>
          <div class="map-modal__map">
              <img :src="url" />
          </div>
      </div>
    </Modal>
    <ModalOverlay />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';
import TemparatureGraph from '../components/TemparatureGraph.vue';

export default {
  name: 'Exercise7',
  components: { Modal, ModalOverlay, TemparatureGraph },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      showingDestinations: true,
      showingOverview: false,
      isOverview: false,
      selectedCard: '',
      selectedCardImage: '',
      selectedCardLink: '',
      selectedCardPrice: '',
      selectedCardReturn: false,
      url: 'https://i.stack.imgur.com/k0akf.png',
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
  mounted() {
    this.$root.$on('closeModal', () => {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      this.showDestinations();
    });
  },
  computed: {
    isModalShown() {
      return this.modalShown ? 'shown' : 'hidden';
    },
    isDestinationsShown() {
      return this.showingDestinations ? 'map-modal__cardcontainer--shown' : 'map-modal__cardcontainer--hidden';
    },
    isOverviewShown() {
      return this.showingOverview ? 'map-modal__destinationoverview--shown' : 'map-modal__destinationoverview--hidden';
    },
    stateOfSidebar() {
      return this.isOverview ? 'map-modal__sidebar--overview' : '';
    },
  },
  methods: {
    showModal() {
      if (!this.modalShown) {
        this.modalShown = true;
        this.modalButtonText = 'Hide Modal';
      } else {
        this.modalShown = false;
        this.modalButtonText = 'Show Modal';
      }
    },
    openModal() {
      this.$root.$emit('openModal');
      this.$root.$emit('openOverlay');
    },
    closeModal() {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      this.showDestinations();
    },
    showOverview(event) {
      this.showingDestinations = false;
      this.showingOverview = true;

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
      this.selectedCardImage = this.destinations[this.selectedCard].image;
      this.selectedCardLink = this.destinations[this.selectedCard].link;
      this.selectedCardPrice = this.destinations[this.selectedCard].price;
      this.selectedCardReturn = this.destinations[this.selectedCard].return;

      this.isOverview = true;
    },
    showDestinations() {
      this.showingDestinations = true;
      this.showingOverview = false;
      this.isOverview = false;
    },
  },
};
</script>

<style lang="scss" scoped>

  .lowest-fares-button {
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
  }

  .map-modal {
    margin: -100px;
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 767px) {
      height: 100%;
    }
    &__sidebar {
      height: 100%;
      flex: 0 0 35%;
      margin: 20px;
      @media screen and (max-width: 767px) {
        position: absolute;
        width: 100%;
        height: 240px;
        overflow-x: auto;
        overflow-y: hidden;
        bottom: 20px;
        left: 0%;
        margin: 0px;

        &--overview {
          height: 100%;
          bottom: 0px;
          position: relative;
          width: 100%;
          flex: 0 0 100%;
        }
      }
    }
    &__map {
      height: 100%;
      flex: 0 0 65%;
      img {
        width: 95%;
        margin: 30px 0px;
      }
      @media screen and (max-width: 767px) {
        flex: 0 0 100%;
        img {
          height: 100%;
          width: auto;
          margin: 0px;
        }
      }
    }

    &__cardcontainer {
      height: 750px;
      overflow-y: scroll;
      transition: opacity 0.25s linear;
      &--shown {
        display: block;
        @media screen and (max-width: 767px) {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          height: 215px;
        }
      }
      &--hidden {
        display: none;
      }
    }

    &__destinationoverview {
      height: 750px;
      transition: opacity 0.25s linear;
      border: 1px solid #ccc;
      text-shadow: 0 0 black;
      border-radius: 4px;
      padding: 10px;
      &--shown {
        display: block;
      }
      &--hidden {
        display: none;
      }

      img {
        max-width: 450px;
      }
    }
  }

  .destination-card {
    margin: 15px 5px 15px 0px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      flex: 0 0 70%;
      margin: 0 2.5%;
      background: white;
    }
    &--selected {
      box-shadow: 10px 10px 10px #eee;
      border: 1px solid red;
    }
  }

  .destination-overview {
    height: 675px;
    overflow-y: auto;
  }

  .vue-modal {
    position: fixed;
    width: 75%;
    height: auto;
    background: white;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;

    &.hidden {
      display: none;
    }
    &.shown {
      display: block;
    }
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: 100vh;
      transform: translateX(0%), translateY(0%);
      transform: translateX(0%) translateY(0%);
      top: 0%;
      left: 0%;
      position: fixed;
    }
  }
  .shown {
    display: block;
  }
  .hidden {
    display: none;
  }
  .map {
    height: 300px;
    height: 300px;
    display: block;
  }
  .success {
    color: green;
    font-weight: 700;
  }
</style>
