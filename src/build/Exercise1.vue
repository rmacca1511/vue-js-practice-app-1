<template>
  <div class="content">
    <h4>As a Jet2.com user. I want to be able to launch the maps modal.
      So that I can search via map view</h4>
      <p class="success">User clicks the static map image or the button to launch the modal</p>
      <p>The modal launches full screen on all devices</p>
      <p>The component should be reusable across different pages and
        the image should be interchangeable</p>
      <p>The wording on the button should be editable</p>
    <button class="build-modal" @click="openModal()"> {{ modalButtonText }}</button>
    <Modal>
      This is a Modal for User Story 1
    </Modal>
    <ModalOverlay />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';

export default {
  name: 'Exercise1',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
    };
  },
  mounted() {
    this.$root.$on('closeModal', () => {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
    });
  },
  computed: {
    isModalShown() {
      return this.modalShown ? 'shown' : 'hidden';
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
    },
  },
};
</script>

<style lang="scss" scoped>
  .vue-modal {
    position: fixed;
    width: 75%;
    height: 400px;
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
  .hidden {
    display: none;
  }
  .build-modal {
    position: absolute;
    width: 210px;
    padding: 3px;
    font-size: 16px;
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
