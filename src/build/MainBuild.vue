<template>
  <div class="map-app">
    <button class="map-app__button" @click="openModal('main')"> {{ modalButtonText }}</button>
    <p>Or, Alternatively, click the map below to launch the modal</p>
    <img class="map-app__map" :src="mapUrl" alt="" @click="openModal('main')" />
    <!-- Main Content -->
    <Modal type="main">
        <MainModalContent type="main" />
    </Modal>
    <!-- Airport Modal -->
    <Modal type="airport">
        <AirportModalContent type="airport" />
    </Modal>
    <!-- Date Modal -->
    <Modal type="date">
        <DateModalContent type="date" />
    </Modal>
    <ModalOverlay type="main" />
    <ModalOverlay type="airport" />
    <ModalOverlay type="date" />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';

import MainModalContent from '../components/main/MainModalContent.vue';
import AirportModalContent from '../components/airports/AirportModalContent.vue';
import DateModalContent from '../components/dates/DateModalContent.vue';


export default {
  name: 'MainBuild',
  components: {
    Modal,
    ModalOverlay,
    MainModalContent,
    AirportModalContent,
    DateModalContent,
  },
  data() {
    return {
      modalButtonText: 'Launch Modal',
      mapUrl: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/2:1/w_2500,c_limit/GoogleMapTA.jpg',
    };
  },
  methods: {
    openModal(type) {
      this.$root.$emit('openModal', type);
      this.$root.$emit('openOverlay', type);
    },
  },
};
</script>

<style lang="scss" scoped>


.map-app {
  text-align: center;
  @media screen and (min-width: 768px) {
    line-height: 50px;
  }
  &__button {
    width: 100%;
    line-height: 42px;
    padding: 5px 0;
    text-align: center;
    font-size: 22px;
    height: 60px;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -.5px;
    border: 2px solid;
    cursor: pointer;
    display: inline-block;
  }

  &__map {
    width: 100%;
    cursor: pointer;
  }
}
</style>
