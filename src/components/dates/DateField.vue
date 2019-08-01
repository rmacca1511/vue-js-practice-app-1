<template>
  <div class="date-field">
    <label class="date-field__label">When:</label>
    <input type="text" class="date-field__input"
    @click="openModal('date')"
    placeholder="Please select a date..." />
  </div>
</template>

<script>
export default {
  name: 'DateField',
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

  },
  computed: {
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
    openModal(type) {
      this.$root.$emit('openModal', type);
      this.$root.$emit('openOverlay', type);
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
  .date-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    &__label {
      display: none;
      font-size: 18px;
      flex: 1;
      align-self: flex-start;
      @media screen and (min-width: 768px) {
        display: inline;
      }
    }

    &__input {
      flex: 1;
      align-self: flex-start;
      margin: 5px 0px;
      padding: 15px 30px;
      border-radius: 4px;
      border: 1px solid #ccc;
      height: 50px;
      font-size: 22px;
      padding: 3px;
      font-size: 16px;
    }
  }
</style>
