<template>
  <div class="airport-card__wrap" @click="cardClicked($event)" :data-id="airport.code">
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
</template>

<script>
export default {
  name: 'AirportItem',
  props: ['airport'],
};
</script>

<style lang="scss" scoped>
  .airport-card {

    &__wrap {
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
</style>
