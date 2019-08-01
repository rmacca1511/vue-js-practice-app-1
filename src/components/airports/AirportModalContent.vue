<template>
  <div class="airport-modal__wrap">
    <div :class="[isValidationShown, 'airport-validation']">
      <p>Please select an airport</p>
    </div>
    <div class="airport-modal__header">
      <span class="airport-modal__clear" @click="clearAll()">
        Clear All Selections
      </span>
    </div>
    <div class="airport-modal__cards" v-for="(airport, index) in ukAirports" :key="index">
      <AirportItem :airport=airport />
    </div>
    <div class="airport-modal-footer">
      <button class="airport-modal-footer__button airport-modal-footer__button--done"
      @click="doneClicked()">
        Done
      </button>
      <button class="airport-modal-footer__button airport-modal-footer__button--cancel"
      @click="closeModal(type)">
        Cancel Changes
      </button>
    </div>
  </div>
</template>

<script>
import AirportItem from './AirportItem.vue';

export default {
  name: 'AirportModalContent',
  components: { AirportItem },
  props: ['type'],
  computed: {
    isValidationShown() {
      return this.showValidationMsg ? 'airport-validation--shown' : 'airport-validation--hidden';
    },
  },
  data() {
    return {
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
      checkedUkAirports: {},
    };
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
    closeModal(type) {
      this.clearAll();
      this.$root.$emit('closeModal', type);
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

  .airport-modal {
    &__wrap {
      width: 100%;
      padding: 0px 20px;
    }
    &__header {
      width: 100%;
      display: block;
    }
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

</style>
