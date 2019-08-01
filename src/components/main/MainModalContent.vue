<template>
  <div class="modal__main-wrap">
    <ModalSidebar />
    <ModalMapArea />
  </div>
</template>

<script>
import ModalSidebar from '../modals/ModalSidebar.vue';
import ModalMapArea from '../modals/ModalMapArea.vue';

export default {
  name: 'MainModalContent',
  props: ['main'],
  components: { ModalSidebar, ModalMapArea },
};
</script>

<style lang="scss" scoped>
.modal {
  &__main-wrap {
    display: flex;
    width: 100%;
  }
}
</style>
