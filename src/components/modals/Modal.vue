<template>
  <div :class="['hidden', 'modal', type+'-modal']" :data-id="type">
    <ModalHeader :type=type />
    <div class="modal__content">
      <slot>
        <div>This is a generic standard modal</div>
      </slot>
    </div>
    <ModalFooter :type=type />
  </div>
</template>

<script>
import ModalHeader from './ModalHeader.vue';
import ModalFooter from './ModalFooter.vue';

export default {
  name: 'Modal',
  props: ['type'],
  components: { ModalHeader, ModalFooter },
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
  height: auto;
  background: white;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;

  width: 100%;

  @media screen and (min-width: 768px) {
    width: 80%;
  }

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
    flex: 1;
    max-width: 250px;
    margin: 10px 20px;
    appearance: none;
    border: #eee;
    border-radius: 4px;
    padding: 10px;
    font-size: 24px;
    font-size: italic;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #efefef;
    }

    &--done {
      margin-left: 0px;
      background: #ff3838;
      color: white;

      &:hover {
        background: rgba(255, 56, 56, 0.65);
      }
    }

    &--cancel {
      align-items: flex-end;
    }
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
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  &--shown {
    display: block;
  }
}

.date-modal {
  z-index: 1001;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  &--shown {
    display: block;
  }
}

</style>
