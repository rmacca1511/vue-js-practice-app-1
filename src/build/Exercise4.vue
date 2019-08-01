<template>
  <div class="content">
    <h4>As a user. I want to be able to change the date. So that
      I can look for flights in a given month.</h4>
    <p>When a user lands on the page and there is a predefined, or offset month, the date field
      should read 'Month Year' e.g. July 2019.
    </p>
    <p>If no date is specified in Sitecore the default will be the next
       calendar month with availability.</p>
    <p class="success">Clicking in the field will open the modal</p>
    <p>Non-mobile devices the field will have a label of 'When'</p>
    <p>User will be able to select the relevant year using the
      drop down or the chevrons</p>
    <p class="success">User can select a month from the calendar below</p>
    <p class="success">All months in the past or without availability will be greyed out</p>
    <p class="success">Selected month will be displayed in green state</p>
    <p class="success">'Done' and 'Cancel' changes buttons will be present
      by default. Clicking 'Done'
      with no month selected will show a validation message at the top of the modal</p>
    <p class="success">The colour key at the bottom explains each state in the calendar.</p>
    <p class="success">Only available months should be selectable</p>
    <p class="success">Clicking 'x' or 'Cancel Changes' would cancel changes</p>
    <p class="success">Clicking 'x' or 'Cancel Changes' would take user back to map</p>
    <h2>The Date Field</h2>
    <label>UK Date</label>
    <br>
    <label class="date-field__label">When:</label>
    <input type="text" class="date-field__input" @click="openModal()" />
    <img class="map" src="../assets/map.png" alt="" />
    <Modal>
      <div :class="[isValidationShown, 'date-validation']">
        <p>Please select an airport</p>
      </div>
      <div class="date-modal">
        <div class="date-modal__year">
          <span @click="yearChange()">&#8249;</span>
          <select @change="yearChange()">
            <option>2019</option>
            <option>2018</option>
          </select>
          <span @click="yearChange()">&#8250;</span>
        </div>
        <div class="date-modal__monthcontainer">
          <div
          v-for="(date, index) in availableDates"
          :class="[date.available ? 'date-modal__month--available'
          : 'date-modal__month--notavailable', 'date-modal__month']"
          :key="index" @click="dateClicked($event);" :data-id="date.date">
              <span>{{ date.date }}</span>
          </div>
        </div>
        <div class="date-modal__keys">
          <div class="date-modal__keyitem date-modal__keyitem--available">
              J
          </div>
          <label class="date-modal__keylabel">Available</label>
          <div class="date-modal__keyitem date-modal__keyitem--unavailable">
              J
          </div>
          <label class="date-modal__keylabel">Unavailable</label>
          <div class="date-modal__keyitem date-modal__keyitem--selected">
              &nbsp;
          </div>
          <label class="date-modal__keylabel">Selected</label>
        </div>
        <div class="date-modal__footer">
          <button class="date-modal__button date-modal__button--done"
          @click="doneClicked()">
            Done
          </button>
          <button class="date-modal__button date-modal__button--cancel"
          @click="closeModal()">
            Cancel Changes
          </button>
        </div>
      </div>
    </Modal>
    <ModalOverlay />
  </div>
</template>

<script>
import Modal from '../components/modals/Modal.vue';
import ModalOverlay from '../components/modals/ModalOverlay.vue';

export default {
  name: 'Exercise4',
  components: { Modal, ModalOverlay },
  data() {
    return {
      modalShown: false,
      modalButtonText: 'Show Modal',
      selectedDate: '',
      isValid: false,
      showValidationMsg: false,
      availableDates: {
        jan: {
          date: 'Jan 2019',
          available: false,
        },
        feb: {
          date: 'Feb 2019',
          available: false,
        },
        mar: {
          date: 'Mar 2019',
          available: false,
        },
        apr: {
          date: 'Apr 2019',
          available: false,
        },
        may: {
          date: 'May 2019',
          available: false,
        },
        jun: {
          date: 'June 2019',
          available: false,
        },
        jul: {
          date: 'July 2019',
          available: true,
        },
        aug: {
          date: 'Aug 2019',
          available: true,
        },
        sep: {
          date: 'Sept 2019',
          available: true,
        },
        oct: {
          date: 'Oct 2019',
          available: false,
        },
        nov: {
          date: 'Nov 2019',
          available: true,
        },
        dec: {
          date: 'Dec 2019',
          available: true,
        },
      },
    };
  },
  mounted() {
    this.$root.$on('closeModal', () => {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      this.selectedDate = '';
      this.clearSelections();
    });
  },
  computed: {
    isModalShown() {
      return this.modalShown ? 'shown' : 'hidden';
    },
    isValidationShown() {
      return this.showValidationMsg ? 'date-validation--shown' : 'date-validation--hidden';
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
        this.selectedDate = '';
      }
    },
    openModal() {
      this.$root.$emit('openModal');
      this.$root.$emit('openOverlay');
    },
    clearSelections() {
      const dates = document.getElementsByClassName('date-modal__month');
      for (let i = 0; i < dates.length; i += 1) {
        dates[i].classList.remove('date-modal__month--selected');
      }
      this.showValidationMsg = false;
    },
    closeModal() {
      this.modalShown = false;
      this.modalButtonText = 'Show Modal';
      this.selectedDate = '';
      this.clearSelections();
    },
    dateClicked(event) {
      this.clearSelections();

      let clickedEl = event.target;
      if (!(clickedEl.classList.contains('date-modal__month'))) {
        clickedEl = clickedEl.parentElement;
      }
      clickedEl.classList.add('date-modal__month--selected');

      const selectedDate = document.getElementsByClassName('date-modal__month--selected');
      this.selectedDate = selectedDate[0].getAttribute('data-id');
    },
    doneClicked() {
      if (this.selectedDate === '') {
        this.showValidationMsg = true;
      } else {
        this.showValidationMsg = false;
      }
      console.log(this.selectedDate);
    },
    yearChange() {
      console.log('Year change Logic');
    },
  },
};
</script>

<style lang="scss" scoped>

  .date-modal {
    &__year {
      display: flex;
      padding: 10px;
      margin: 5px auto;
      > * {
        flex: 1;
        font-size: 25px;
        cursor: pointer;
        &:last-child {
          text-align: right;
        }
      }
    }

    &__keys {
      display: flex;
    }

    &__keyitem {
      flex: 0 0 30px;
      width: 30px;
      height: 25px;
      border: 1px solid #ccc;
      margin: 15px;
      text-align: center;
      padding-top: 5px;
      &--available {
        color: black;
      }

      &--selected {
        background: #93e093;
      }

      &--unavailable {
        color: #ccc;
      }
    }

    &__keylabel {
      flex: 0 0 50px;
      align-self: center;
    }

    &__monthcontainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

    }

    &__month {
      align-self: center;
      font-size: 18px;
      flex: 0 0 20%;
      height: 140px;
      border: 1px solid #ccc;
      margin: 2%;
      text-align: center;
      cursor: pointer;
      display: flex;
      justify-content: center;

      > * {
        align-self: center;
      }

      &:hover {
        background: #ccc;
        color: white;
      }

      &--notavailable {
        color: #ccc;
        cursor: default;
        pointer-events: none;
      }

      &--selected {
        background: #93e093;
        color: white;
        font-weight: 700;

        &:hover {
          background: #93e093;
          color: white;
          font-weight: 700;
        }
      }
    }
    &__footer {
      display: block;
      margin: 30px auto;
      display: flex;
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

  }

  .date-validation {
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

  .date-field {

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

  .vue-modal {
    position: fixed;
    width: 75%;
    height: auto;
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
