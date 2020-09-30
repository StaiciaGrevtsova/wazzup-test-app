<template>
  <div id="app">
    <Notification />
    <div class="container">
      <div class="text-center">
        <button
          @click.prevent="onShowValues"
          class="btn btn-lg btn-primary mb-4 button-spinner"
          :disabled="loading"
        >
          <span class="spinner spinner-border spinner-border-sm" v-if="loading"></span>
          Показать пользователей
        </button>
      </div>
      <div class="table-wrapper">
        <Table :list="usersList" :columns="usersColumns" @showModal="onShowModal"/>
      </div>
    </div>
    <Modal
      v-if="isShownModal"
      @close="isShownModal = false"
      :header="'User info'"
      :data="userInfo"
      :dataField="usersModalInfo"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'App',
  components: {
    Table,
    Modal,
    Notification,
  },
  data: () => ({
    usersColumns: ['fullname', 'uname', 'company', 'email', 'state'],
    usersModalInfo: ['fullname', 'fullAddress'],
    loading: false,
    isShownModal: false,
  }),
  computed: {
    ...mapGetters('users', [
      'usersList',
      'userInfo',
    ]),
  },
  methods: {
    ...mapActions('users', [
      'fetchUsers',
      'getCurrentUser',
    ]),
    ...mapActions(['showNotify']),
    onShowValues() {
      this.loading = true;
      this.fetchUsers()
        .then(() => {
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
          this.showNotify({
            msg: error,
            title: 'Error',
            variant: 'danger',
          });
        });
    },
    onShowModal(id) {
      this.getCurrentUser(id)
        .then(() => {
          this.isShownModal = true;
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

body {
  padding-top: 40px;
  background-color: #f5f5f5;
}

.table-wrapper {
  position: relative;
}

.button-spinner .spinner {
  vertical-align: baseline;
}
</style>
