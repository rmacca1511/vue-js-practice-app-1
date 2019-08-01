<template>
  <div class="content">
    <h4>Flight Cards (Mobile)
    </h4>
    <h3>VIEW IN MOBILE SCREEN</h3>
    <p>On Mobile, the cards display when a destination is selected</p>
    <p class="success">The cards will display in a scrollable carousel</p>
    <p>The chosen destination will be displayed and centred in the carousel in a selected state</p>
    <p class="success">The entire card will be clickable</p>
    <p class="success">Clicking the card will launch the destination overview</p>
    <p class="success">If user is on the destination overview page, and clicks "back", the selected
      route will still be highlighted</p>
    <p>Clicking the highlighted destination will also take you to the destination overview</p>
    <p class="success">The carousel does not infinitely loop: once you reach the end of
      the carousel, it stops.</p>
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
                  Destination Overview
                </div>
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

export default {
  name: 'Exercise6',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      showingDestinations: true,
      showingOverview: false,
      isOverview: false,
      selectedCard: '',
      url: 'https://i.stack.imgur.com/k0akf.png',
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
      overflow-y: scroll;
      transition: opacity 0.25s linear;
      &--shown {
        display: block;
      }
      &--hidden {
        display: none;
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
