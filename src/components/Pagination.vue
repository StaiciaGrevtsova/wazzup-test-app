<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="currentPage === 1? 'disabled' : ''">
        <span class="page-link" @click="setPage(1)"> &lt;&lt; </span>
      </li>
      <li class="page-item" :class="currentPage === 1? 'disabled' : ''">
        <span class="page-link" @click="setPage(currentPage-1)"> &lt; </span>
      </li>
      <li
        v-for="pageNumber in slicedPages"
        class="page-item"
        :class="pageNumber === currentPage ? 'active' : ''"
        :key="pageNumber"
      >
        <span
          class="page-link"
          @click.prevent="setPage(pageNumber)"
        >
          {{ pageNumber }}
        </span>
      </li>
      <li class="page-item" :class="currentPage === pages.length? 'disabled' : ''">
        <span class="page-link" @click="setPage(currentPage+1)"> &gt; </span>
      </li>
      <li class="page-item" :class="currentPage === pages.length? 'disabled' : ''">
        <span class="page-link" @click="setPage(total / perPage)"> &gt;&gt; </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  data: () => ({
    page: 1,
    pages: [],
    slicedPages: [],
  }),
  props: {
    total: {
      type: Number,
      default: () => (10),
    },
    perPage: {
      type: Number,
      default: () => (10),
    },
    currentPage: {
      type: Number,
      default: () => (1),
    },
  },
  methods: {
    getPages() {
      this.pages = [];
      const numberOfPages = Math.ceil(this.$props.total / this.$props.perPage);
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
      this.slicedPages = this.pages.slice(this.currentPage - 1, 5);
    },
    setPage(value) {
      this.$emit('onPageChanged', value);
    },
  },
  watch: {
    currentPage(val) {
      if (val < 3) {
        this.slicedPages = this.pages.slice(0, 5);
      } else if (val > this.pages.length - 3) {
        this.slicedPages = this.pages.slice(this.pages.length - 5, this.pages.length);
      } else {
        this.slicedPages = this.pages.slice(val - 3, val + 2);
      }
    },
    total() {
      this.getPages();
    },
  },
  created() {
    this.getPages();
  },
};
</script>

<style scoped>
.page-link {
  cursor: pointer;
}
</style>
