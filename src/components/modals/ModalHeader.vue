<template>
  <div class="modal__header">
    <ModalClose :type=type />
  </div>
</template>

<script>
import ModalClose from './ModalClose.vue';

export default {
  name: 'ModalHeader',
  props: ['type'],
  components: { ModalClose },
};
</script>

<style lang="scss" scoped>

</style>
