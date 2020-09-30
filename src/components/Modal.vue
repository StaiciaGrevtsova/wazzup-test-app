<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__mask" @click="$emit('close')"></div>
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            {{ header }}
            <div class="modal__close" @click="$emit('close')">&times;</div>
          </div>
          <div class="modal__body">
            <ul class="list-unstyled">
              <li v-for="(item, field, index) in dataList" :key="index">
                <b>{{ field | capitalize(field) }}</b>: {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    dataField: {
      type: Array,
      default: () => ([]),
    },
    header: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    dataList() {
      const { data, dataField } = this.$props;
      return dataField.reduce((acc, field) => {
        if (Object.prototype.hasOwnProperty.call(data, field)) acc[field] = data[field];
        return acc;
      }, {});
    },
  },
  mounted: function () {
    const self = this;
    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        self.$emit('close');
      }
    });
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__mask {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  &__wrapper {
    position: relative;
    min-width: 150px;
    background: #fff;
    color: #333;
    display: flex;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
  }

  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.5rem;
    border-bottom: 1px solid #dee2e6;
  }

  &__body {
    flex: 1;
    padding: 1em;
    overflow: auto;
  }

  &__close {
    cursor: pointer;
    font-size: 1.5rem;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .5s
}

.modal-enter, .modal-leave-to {
  opacity: 0
}
</style>
