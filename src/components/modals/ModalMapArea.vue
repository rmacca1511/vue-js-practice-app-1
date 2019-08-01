<template>
  <div class="modal__maparea">
    &nbsp;
    <!-- <img class="modal__map" :src="mapUrl" alt="" @click="openModal()" /> -->
  </div>
</template>

<script>
export default {
  name: 'ModalMapArea',
  data() {
    return {
      mapUrl: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/2:1/w_2500,c_limit/GoogleMapTA.jpg',
    };
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    &__maparea {
      width: 100%;
      background: url('https://media.wired.com/photos/59269cd37034dc5f91bec0f1/2:1/w_2500,c_limit/GoogleMapTA.jpg');
      background-size: cover;
    }
  }
</style>
