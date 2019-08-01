<template>
  <div class="content">
    <h4>As a Jet2.com user. I want to be able to close the maps modal
      So that I can go back to the main site</h4>
      <p class="success">Clicking the cross in top right will close the modal</p>
      <p>The users search criteria will be retained (as long as possible)</p>
      <p class="success">When the user reopens the modal it will be repopulated with
        their previous search when applicable</p>
      <p class="success">If the user clicks outside the modal (on desktop) then modal will
        close
      </p>

    <button class="build-modal" @click="openModal()"> {{ modalButtonText }}</button>
    <Modal>
      <form class="modal-form" action="/">
        <div class="modal-form__group">
          <label class="modal-form__label" for="search-field">Search:</label>
          <input class="modal-form__input" name="search-field-1" type="text"
          data-handle="searchField1" />
        </div>
        <div class="modal-form__group">
          <label class="modal-form__label" for="search-field">Search Field 2:</label>
          <input class="modal-form__input" name="search-field-2" type="text"
          data-handle="searchField2" />
        </div>
      </form>
    </Modal>
    <ModalOverlay />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';

export default {
  name: 'Exercise2',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      userStorage: {
        searchField1: '',
        searchField2: '',
      },
    };
  },
  mounted() {
    this.$root.$on('closeModal', () => {
      this.closeEvent();
    });
  },
  computed: {
    isModalShown() {
      return this.modalShown ? 'shown' : 'hidden';
    },
  },
  methods: {
    closeEvent() {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      const searchField1 = document.getElementsByName('search-field-1')[0];
      const searchField2 = document.getElementsByName('search-field-2')[0];
      this.userStorage = {
        searchField1: searchField1.value,
        searchField2: searchField2.value,
      };
      searchField1.value = '';
      searchField2.value = '';
    },
    openModal() {
      this.$root.$emit('openModal');
      this.$root.$emit('openOverlay');
    },
    showModal() {
      if (!this.modalShown) {
        this.modalShown = true;
        this.modalButtonText = 'Hide Modal';
        if (this.userStorage) {
          console.log('Populating Field');
          this.populateModal();
        }
      } else {
        this.modalShown = false;
        this.modalButtonText = 'Show Modal';
      }
    },
    populateModal() {
      if (this.userStorage) {
        const searchField1 = document.getElementsByName('search-field-1')[0];
        const searchField2 = document.getElementsByName('search-field-2')[0];
        searchField1.value = this.userStorage.searchField1;
        searchField2.value = this.userStorage.searchField2;
      }
    },
    closeModal() {
      this.closeEvent();
    },
  },
};
</script>

<style lang="scss" scoped>
  .vue-modal {
    position: fixed;
    width: 75%;
    height: 600px;
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
  .modal-form {
    &__group {
      margin: 20px 0px;
    }
    &__label {
      width: 100%;
      display: block;
      font-size: 22px;
      margin: 5px 0px;
    }
    &__input {
      width: 100%;
      display: block;
      font-size: 18px;
      border-radius: 5px;
      padding: 20px;
      border: 1px solid #ccc;
    }
  }
  .build-modal {
    position: absolute;
    width: 210px;
    padding: 3px;
    font-size: 16px;
  }
  .success {
    color: green;
    font-weight: 700;
  }
</style>
