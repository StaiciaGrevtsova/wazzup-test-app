<template>
  <form class="form-inline mb-3" @submit.prevent="onSearchQuery">
    <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="searchText">
    <a href="#" class="text-hide search-btn" @click.prevent="onSearchQuery">Search</a>
  </form>
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    searchText: '',
  }),
  methods: {
    onSearchQuery() {
      this.$emit('searchQuery', this.searchText);
    },
  },
};
</script>

<style scoped>
  .search-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='mx-3' role='img' viewBox='0 0 24 24' focusable='false'%3E%3Ctitle%3ESearch%3C/title%3E%3Ccircle cx='10.5' cy='10.5' r='7.5'%3E%3C/circle%3E%3Cpath d='M21 21l-5.2-5.2'%3E%3C/path%3E%3C/svg%3E");
  }
</style>
