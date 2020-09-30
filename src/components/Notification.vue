<template>
  <div v-if="isShown" class="alert" :class="'alert-' + variant">
    <h5>{{ title }}</h5>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  data: () => ({
    isShown: false,
    variant: 'success',
    msg: '',
    title: '',
    timer: null,
  }),
  computed: {
    ...mapGetters(['messagePool']),
  },
  watch: {
    messagePool: 'showNotification',
  },
  methods: {
    showNotification({ variant, msg, title }) {
      this.isShown = true;
      this.variant = variant;
      this.msg = msg;
      this.title = title;
      this.startDismissTimer();
    },
    hideNotification() {
      this.isShown = false;
      this.clearDismissTimer();
    },
    startDismissTimer() {
      this.clearDismissTimer();
      this.timer = setTimeout(this.hideNotification, 3000);
    },
    clearDismissTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style scoped>
.alert {
  position: absolute;
  top: 0;
  right: 20px;
  min-width: 230px;
  font-size: 14px;
}
</style>
