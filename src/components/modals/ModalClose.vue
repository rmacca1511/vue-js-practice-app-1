<template>
  <div class="modal__close">
    <button class="modal__button" @click="closeModal(type)">X</button>
  </div>
</template>

<script>
export default {
  name: 'ModalClose',
  props: ['type'],
  methods: {
    closeModal(type) {
      console.log(type);
      this.$root.$emit('closeModal', type);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
