<template>
  <div :class="['hidden', 'modal', type+'-modal']" :data-id="type">
    <ModalHeader :type=type />
    <div class="modal__content">
      <slot>
        <div>This is a generic standard modal</div>
      </slot>
    </div>
  </div>
</template>

<script>
import ModalHeader from './ModalHeader.vue';

export default {
  name: 'Modal',
  props: ['type'],
  components: { ModalHeader },
  data() {
    return {
      modalShown: false,
      airportModalShown: false,
      dateModalShown: false,
    };
  },
  mounted() {
    this.$root.$on('openModal', (type) => {
      switch (type) {
        case 'airport':
          this.modalShown = true;
          this.airportModalShown = true;
          this.dateModalShown = false;
          this.showAirport();
          break;
        case 'date':
          this.modalShown = true;
          this.airportModalShown = false;
          this.dateModalShown = true;
          this.showDate();
          break;
        case 'main':
          this.modalShown = true;
          this.airportModalShown = false;
          this.dateModalShown = false;
          this.showMain();
          break;
        default: break;
      }
    });
    this.$root.$on('closeModal', (type) => {
      switch (type) {
        case 'airport':
          this.modalShown = true;
          this.airportModalShown = false;
          this.hideAirport();
          break;
        case 'date':
          this.modalShown = true;
          this.dateModalShown = false;
          this.hideDate();
          break;
        case 'main':
          this.modalShown = false;
          this.hideMain();
          break;
        default: break;
      }
    });
  },
  computed: {
    isModalShown() {
      let className = '';
      if (this.modalShown) {
        className = 'main';
        if (this.airportModalShown) {
          className = 'main airport';
        } else if (this.dateModalShown) {
          className = 'main date';
        }
      } else {
        className = 'hidden';
      }
      return className;
    },
  },
  methods: {
    showMain() {
      document.getElementsByClassName('main-modal')[0].classList.remove('hidden');
    },
    showAirport() {
      document.getElementsByClassName('airport-modal')[0].classList.remove('hidden');
    },
    showDate() {
      document.getElementsByClassName('date-modal')[0].classList.remove('hidden');
    },
    hideMain() {
      document.getElementsByClassName('main-modal')[0].classList.add('hidden');
    },
    hideAirport() {
      document.getElementsByClassName('airport-modal')[0].classList.add('hidden');
    },
    hideDate() {
      document.getElementsByClassName('date-modal')[0].classList.add('hidden');
    },
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  width: 80%;
  height: auto;
  background: white;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;

  &--hidden {
    display: none;
  }
  &--shown {
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

  &__header {
    width: 100%;
    background: red;
    display: block;
    height: 100px;
  }

  &__content {
    padding: 0px;
    display: flex;
    @media screen and (max-width: 767px) {
      height: 100%;
    }
  }

  &__close {
    text-align: right;
    padding: 20px;
  }

  &__button {
    appearance: none;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 24px;
    cursor: pointer;
    outline: none;
  }

  &__sidebar {
    flex: 0 0 35%;
  }

  &__fields {
    display: flex;
    height: 120px;
    padding: 0px 15px;
    background: #1e3146;
    color: white;
    font-weight: 700;
  }

  &__maparea {
    flex: 0 0 65%;
  }
}

.airport-modal {
  z-index: 1001;
  width: 50%;

  &--shown {
    display: block;
  }
}

.date-modal {
  z-index: 1001;
  width: 50%;

  &--shown {
    display: block;
  }
}

</style>
