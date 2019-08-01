<template>
  <div>
    <div :class="[isValidationShown, 'date-validation']">
        <p>Please select a date</p>
    </div>
    <div class="date-content">
        <div class="date-content__year">
        <span @click="yearChange()">&#8249;</span>
        <select @change="yearChange()">
            <option>2019</option>
            <option>2018</option>
        </select>
        <span @click="yearChange()">&#8250;</span>
        </div>
        <div class="date-content__monthcontainer">
        <div
        v-for="(date, index) in availableDates"
        :class="[date.available ? 'date-content__month--available'
        : 'date-content__month--notavailable', 'date-content__month']"
        :key="index" @click="dateClicked($event);" :data-id="date.date">
            <span>{{ date.date }}</span>
        </div>
        </div>
        <div class="date-content__keys">
        <div class="date-content__keyitem date-content__keyitem--available">
            J
        </div>
        <label class="date-content__keylabel">Available</label>
        <div class="date-content__keyitem date-content__keyitem--unavailable">
            J
        </div>
        <label class="date-content__keylabel">Unavailable</label>
        <div class="date-content__keyitem date-content__keyitem--selected">
            &nbsp;
        </div>
        <label class="date-content__keylabel">Selected</label>
        </div>
        <div class="date-content__footer">
        <button class="date-content__button date-content__button--done"
        @click="doneClicked()">
            Done
        </button>
        <button class="date-content__button date-content__button--cancel"
        @click="closeModal()">
            Cancel Changes
        </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateModalContent',
  computed: {
    isValidationShown() {
      return this.showValidationMsg ? 'date-validation--shown' : 'date-validation--hidden';
    },
  },
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
  methods: {
    clearSelections() {
      const dates = document.getElementsByClassName('date-content__month');
      for (let i = 0; i < dates.length; i += 1) {
        dates[i].classList.remove('date-content__month--selected');
      }
      this.showValidationMsg = false;
    },
    dateClicked(event) {
      this.clearSelections();

      let clickedEl = event.target;
      if (!(clickedEl.classList.contains('date-content__month'))) {
        clickedEl = clickedEl.parentElement;
      }
      clickedEl.classList.add('date-content__month--selected');

      const selectedDate = document.getElementsByClassName('date-content__month--selected');
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
  .date-content {
    &__label {
      display: none;
      font-size: 18px;
      @media screen and (min-width: 768px) {
        display: inline;
      }
    }
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
</style>
