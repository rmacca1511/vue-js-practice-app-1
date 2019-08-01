<template>
  <div class="content">
    <h4>As a user searching via the map. I want to be able to specify departure airports.
      So that I can decide where to fly from.
    </h4>
      <p>Needs to be able to pre-populate depending on which page
        the user launches the modal from</p>
      <p class="success">Clicking in the field will launch the UK airports modal</p>
      <p>Non-mobile devices the field will have a label of 'From'</p>
      <p class="success">The modal will contain the full list of UK airports</p>
      <p class="success">The user can select one, many or all airports</p>
      <p class="success">'Done' and 'Cancel changes' buttons should be present</p>
      <p class="success">Clicking 'Done' without an airport selected will show a
        validation message at the top of the modal.</p>
      <p class="success">The clear all button will remove all selections</p>
      <p class="success">Clicking 'Done' will run the search with the user's selections applied</p>
      <p class="success">Clicking 'Cancel changes' or 'x' will discard all user selection
        and close the modal</p>
      <p>On any non-mobile device clicking outside the modal will close the modal</p>
      <p class="success">Any unapplied selections will be lost when the modal is closed</p>
      <h2>The Departure Airport Field</h2>
      <label>UK Departure Airport</label>
      <br>
      <label class="airport-field__label">From:</label>
      <input type="text" class="airport-field__input" @click="openModal()" />
      <Modal>
        <div :class="[isValidationShown, 'airport-validation']">
          <p>Please select an airport</p>
        </div>
        <div class="airport-modal-header">
          <span class="airport-modal-header__clear" @click="clearAll()">
            Clear All Selections
          </span>
        </div>
        <div v-for="(airport, index) in ukAirports" :key="index">
          <div class="airport-card" @click="cardClicked($event)" :data-id="airport.code">
            <input class="airport-card__checkbox" type="checkbox" :data-id="airport.code"
            @change="inputChecked()" />
            <div class="airport-card__code">
              Code: {{ airport.code }}
            </div>
            <div class="airport-card__name">
              Name: {{ airport.name }}
            </div>
            <div class="airport-card__loc">
              Location: {{ airport.location }}
            </div>
          </div>
        </div>
        <div class="airport-modal-footer">
          <button class="airport-modal-footer__button airport-modal-footer__button--done"
          @click="doneClicked()">
            Done
          </button>
          <button class="airport-modal-footer__button airport-modal-footer__button--cancel"
          @click="closeModal()">
            Cancel Changes
          </button>
        </div>
      </Modal>
      <ModalOverlay />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';

export default {
  name: 'Exercise3',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      isValid: false,
      showValidationMsg: false,
      ukAirports: {
        Stansted: {
          code: 'STA',
          name: 'Stansted Airport',
          location: 'London',
        },
        Heathrow: {
          code: 'HEA',
          name: 'Heathrow Airport',
          location: 'London',
        },
        Manchester: {
          code: 'MAN',
          name: 'Manchester Airport',
          location: 'Manchester',
        },
      },
      userStorage: {
        searchField1: '',
        searchField2: '',
      },
      checkedUkAirports: {},
    };
  },
  mounted() {
    this.$root.$on('closeModal', () => {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      this.clearAll();
      this.isValid = true;
      this.validate();
    });
  },
  computed: {
    isModalShown() {
      return this.modalShown ? 'shown' : 'hidden';
    },
    isValidationShown() {
      return this.showValidationMsg ? 'airport-validation--shown' : 'airport-validation--hidden';
    },
  },
  methods: {
    clearAll() {
      const checks = document.getElementsByClassName('airport-card__checkbox');

      for (let i = 0; i < checks.length; i += 1) {
        if (checks[i].checked === true) {
          checks[i].checked = false;
        }
      }
      this.isValid = false;
      this.checkedUkAirports = [];
      this.inputChecked();
    },
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
      this.clearAll();
      this.isValid = true;
      this.validate();
    },
    doneClicked() {
      if (Object.keys(this.checkedUkAirports).length > 0) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      this.validate();

      //  Ready to run search
      if (this.isValid) {
        this.runSearch();
      }
    },
    cardClicked(event) {
      const checks = document.getElementsByClassName('airport-card__checkbox');
      let clickedEl = event.target.parentElement;
      if (!(clickedEl.classList.contains('airport-card'))) {
        clickedEl = clickedEl.firstElementChild;
      }
      const airportCode = clickedEl.getAttribute('data-id');
      for (let i = 0; i < checks.length; i += 1) {
        if (checks[i].getAttribute('data-id') === airportCode) {
          if (clickedEl.classList.contains('airport-card--selected')) {
            checks[i].checked = false;
          } else {
            checks[i].checked = true;
          }
          this.inputChecked();
        }
      }
    },
    inputChecked() {
      const checks = document.getElementsByClassName('airport-card__checkbox');
      const inputs = document.getElementsByClassName('airport-card');
      const newCheckedAirportArray = {};

      for (let i = 0; i < checks.length; i += 1) {
        const newAirport = {};
        newAirport.code = inputs[i].getAttribute('data-id');
        if (checks[i].checked === true) {
          inputs[i].classList.add('airport-card--selected');
          newCheckedAirportArray[newAirport.code] = newAirport.code;
        } else {
          inputs[i].classList.remove('airport-card--selected');
        }
      }
      this.checkedUkAirports = newCheckedAirportArray;
    },
    runSearch() {
      console.log('gonna search');
      console.log(this.checkedUkAirports);
    },
    validate() {
      if (!this.isValid) {
        this.showValidationMsg = true;
      } else {
        this.showValidationMsg = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .airport-field {

    &__label {
      font-size: 18px;
    }

    &__input {
      display: block;
      margin: 5px 0px;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #ccc;
      height: 35px;
      font-size: 22px;
      width: 210px;
      padding: 3px;
      font-size: 16px;
    }

  }

  .airport-card {
    display: flex;
    border: 2px solid #ccc;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    margin: 10px 0px;
    cursor: pointer;

    &:hover, &--selected {
      background: #ccc;
    }

    &__checkbox {
      visibility: hidden;
    }

    &__code {
      flex: 1;
    }
    &__name {
      flex: 1;
    }
    &__loc {
      flex: 1;
    }
  }

  .airport-validation {
    display: block;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: red;
    transition: opacity 0.6s linear;
    &--shown {
      opacity: 1;
    }
    &--hidden {
      opacity: 0;
    }
  }

  .airport-modal-header {
    width: 100%;
    display: block;
    &__clear {
      float: right;
      font-size: 14px;
      text-decoration: underline;
      color: #ccc;
      cursor: pointer;
      margin: 5px 0px;
      &:hover {
        color: #aaa;
      }
    }
  }

  .airport-modal-footer {
    display: block;
    margin: 30px auto;
    display: flex;
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
  }

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
  .shown {
    display: block;
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

  .success {
    color: green;
    font-weight: 700;
  }
</style>
