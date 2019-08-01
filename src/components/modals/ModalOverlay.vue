<template>
  <div
  :class="[isOverlayShowing, isAirportOverlayShowing, isDateOverlayShowing,
  'modal-overlay', type+'-modal-overlay']"
   @click="closeModal(type)"></div>
</template>

<script>
export default {
  name: 'ModalOverlay',
  props: ['type'],
  data() {
    return {
      overlayShowing: false,
      airportOverlayShowing: false,
      dateOverlayShowing: false,
    };
  },
  mounted() {
    this.$root.$on('openOverlay', (type) => {
      switch (type) {
        case 'airport': this.overlayShowing = true; this.airportOverlayShowing = true; this.dateOverlayShowing = false; break;
        case 'date': this.overlayShowing = true; this.airportOverlayShowing = false; this.dateOverlayShowing = true; break;
        case 'main': this.overlayShowing = true; this.airportOverlayShowing = false; this.dateOverlayShowing = false; break;
        default: break;
      }
    });
    this.$root.$on('closeModal', (type) => {
      switch (type) {
        case 'airport': this.overlayShowing = true; this.airportOverlayShowing = false; break;
        case 'date': this.overlayShowing = true; this.dateOverlayShowing = false; break;
        case 'main': this.overlayShowing = false; break;
        default: break;
      }
    });
  },
  computed: {
    isOverlayShowing() {
      return this.overlayShowing ? 'modal-overlay--shown' : 'modal-overlay--hidden';
    },
    isAirportOverlayShowing() {
      return this.airportOverlayShowing ? 'airport-modal-overlay--shown' : 'airport-modal-overlay--hidden';
    },
    isDateOverlayShowing() {
      return this.dateOverlayShowing ? 'date-modal-overlay--shown' : 'date-modal-overlay--hidden';
    },
  },
  methods: {
    closeModal(type) {
      this.$root.$emit('closeModal', type);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 0;

  &--shown {
    display: block;
  }
  &--hidden {
    display: none;
  }
}

.airport-modal-overlay {
  display: none;
  z-index: 2;

  &--shown {
    display: block;
  }
}

.date-modal-overlay {
  display: none;
  z-index: 2;

  &--shown {
    display: block;
  }
}
</style>
