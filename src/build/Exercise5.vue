<template>
  <div class="content">
    <h4>As a non-mobile user, I want to see the results in a list. So that I can also
      see a non map view of what's available
    </h4>
    <p class="success">The available flight cards based on the current routes
      available will be displayed always  by default and be displayed in price
      order, low to high.
    </p>
    <p class="success">The card will display the Destination and the country</p>
    <p class="success">The card will display the per person price of that trip</p>
    <p class="success">It will be a one-way price. With the exception of New York & Iceland,
      where the price will be a return flight price, as we do not sell one-way flights
      to New York or Iceland</p>
    <p>Clicking anywhere on the card will highlight the selected route on the map</p>
    <p class="success">It will also launch the destination overview for
    that specific destination</p>
    <p class="success">If the user returns to the card view from the destination
      guide the selected card will be in a selected state</p>
    <p>The list will always centre on the select ed item</p>
    <p>Clicking the highlighted destination will also take you to the destination overview</p>
    <button class="build-modal" @click="openModal()"> {{ modalButtonText }}</button>
    <img class="map" src="../assets/map.png" alt="" />
    <Modal>
      <div class="map-modal">
          <div class="map-modal__sidebar">
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
  name: 'Exercise5',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      showingDestinations: true,
      showingOverview: false,
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
    },
    showDestinations() {
      this.showingDestinations = true;
      this.showingOverview = false;
    },
  },
};
</script>

<style lang="scss" scoped>

  .map-modal {
    margin: -100px;
    display: flex;
    flex-direction: row;
    &__sidebar {
      height: 100%;
      flex: 0 0 35%;
      margin: 20px;
    }
    &__map {
      height: 100%;
      flex: 0 0 65%;
      img {
        width: 95%;
        margin: 30px 0px;
      }
    }

    &__cardcontainer {
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
      width: 100%;
      height: 100%;
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
