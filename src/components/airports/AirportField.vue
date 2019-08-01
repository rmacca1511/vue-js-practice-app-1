<template>
  <div class="airport-field">
      <label class="airport-field__label">From:</label>
      <input type="text" class="airport-field__input"
      @click="openModal('airport')"
      placeholder="Please Select an Airport..." />
  </div>
</template>

<script>
export default {
  name: 'AirportField',
  methods: {
    openModal(type) {
      this.$root.$emit('openModal', type);
      this.$root.$emit('openOverlay', type);
    },
  },
};
</script>

<style lang="scss" scoped>
  .airport-field {
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
