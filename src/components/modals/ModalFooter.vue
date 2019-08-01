<template>
  <div>
    <div class="modal__footer">
      <button class="modal__button modal__button--done"
      @click="doneClicked()">
        Done
      </button>
      <button class="modal__button modal__button--cancel"
      @click="closeModal(type)">
        Cancel Changes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalFooter',
  props: ['type'],
  methods: {
    closeModal(type) {
      this.$root.$emit('closeModal', type);
    },
  },
};
</script>

<style lang="scss" scoped>

.modal {
  &__footer {
    display: block;
    margin: 30px auto;
    display: flex;
  }
}
  .modal-footer {


  }
</style>
