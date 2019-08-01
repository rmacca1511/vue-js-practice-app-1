<template>
  <div class="modal__destinations">
    <DestinationCard />
    <DestinationOverview />
  </div>
</template>

<script>
import DestinationCard from './DestinationCard.vue';
import DestinationOverview from './DestinationOverview.vue';

export default {
  name: 'DestinationContainer',
  components: { DestinationCard, DestinationOverview },
};
</script>

<style lang="scss" scoped>
  .modal {
    &__destinations {
      padding: 10px;
      height: 60vh;
      overflow-y: auto;
    }
  }

</style>
