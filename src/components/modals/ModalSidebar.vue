<template>
  <div class="modal__sidebar">
    <div class="modal__fields">
      <AirportField />
      <DateField />
    </div>

    <DestinationContainer />
  </div>
</template>

<script>
import AirportField from '../airports/AirportField.vue';
import DateField from '../dates/DateField.vue';
import DestinationContainer from '../destinations/DestinationContainer.vue';

export default {
  name: 'ModalSidebar',
  components: { AirportField, DateField, DestinationContainer },
};
</script>

<style lang="scss" scoped>

</style>
