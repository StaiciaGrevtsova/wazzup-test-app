<template>
  <div v-if="shownTable">
    <Search @searchQuery="showSearchData"/>
    <table class="table table-hover table-striped table-bordered">
      <thead class="thead-dark">
      <tr>
        <th
          v-for="(col, index) in columns"
          class="sorting"
          :class="col === currentSort ? 'sorting-' + currentSortDirection : ''"
          :key="index"
          @click="handleSort(col)"
        >{{ col | capitalize(col) }}
        </th>
      </tr>
      </thead>
      <tbody v-if="showItems && showItems.length">
      <tr
        v-for="item in showItems"
        :key="item.id"
        @click="modalOpen(item.id)"
      >
        <td v-for="(col, index) in columns" :key="index">
          {{ item[col] }}
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="columns.length" class="text-center">
          Ничего не найдено
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination
      :currentPage="itemsCurrentPage"
      :perPage="itemsPerPage"
      :total="itemsLength"
      @onPageChanged="pageChanged"
    />
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Table',
  components: {
    Search,
    Pagination,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    columns: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    shownTable: false,
    currentSort: '',
    currentSortDirection: 'asc',
    listItems: [],
    showItems: [],
    itemsCurrentPage: 1,
    itemsPerPage: 10,
    itemsLength: null,
  }),
  watch: {
    // list prop is init -> show table with data
    list: function (val) {
      this.listItems = val;
      this.itemsLength = this.listItems && this.listItems.length;
      this.pageChanged(this.itemsCurrentPage);
      this.shownTable = val && !!val.length;
      return val;
    },
  },
  computed: {
    sortedItems: {
      get() {
        return this.listItems;
      },
      set(newValue) {
        this.listItems = newValue;
        this.itemsLength = newValue && newValue.length;
      },
    },
  },
  methods: {
    /**
     * Function sort data in key-column
     * @param {String} key - column name for sorting
     */
    handleSort(key) {
      // desc => asc => desc => asc => ...
      if (key === this.currentSort) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = key;
      this.sortedItems.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirection === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return modifier;
        return 0;
      });
      // go to first page
      this.pageChanged(1);
    },
    /**
     * Function return searched data in serializing by properties array of objects
     * @param {String} value - string for searching
     * @returns {Array}
     */
    showSearchData(value) {
      // case insensitive search
      const searchValue = value && value.toLowerCase();
      this.listItems = this.$props.list;
      const { columns } = this.$props;
      // search only if property is shown on table and add requirement ID for each item
      this.sortedItems = this.serializeList(this.listItems, [...columns, 'id']);
      if (searchValue) {
        this.sortedItems = this.listItems.filter((row) => String(Object.values(row))
          .toLowerCase()
          .indexOf(searchValue) > -1);
      }
      // go to first page
      this.pageChanged(1);
    },
    /**
     * Function return filtered array of object only by specific properties
     * @param {Array} items - array of objects
     * @param {Array} columns - array of properties
     * @returns {Array}
     */
    serializeList(items, columns) {
      return items.map((obj) => columns.reduce((acc, col) => {
        acc[col] = obj[col];
        return acc;
      }, {}));
    },
    /**
     * Function change page of table list
     * @param {Number} page
     */
    pageChanged(page = 1) {
      const from = (page * this.itemsPerPage) - this.itemsPerPage;
      const to = (page * this.itemsPerPage);
      this.itemsCurrentPage = page;
      this.showItems = this.sortedItems.slice(from, to);
    },
    /**
     * Function open modal on row click
     * @param {Number | String} id - id of object element to shown
     */
    modalOpen(id) {
      this.$emit('showModal', id);
    },
  },
};
</script>

<style scoped>
.sorting {
  background-position: right .375rem center;
  padding-right: calc(.75rem + .65em);
  cursor: pointer;
  background-image: none;
  background-repeat: no-repeat;
  background-size: .65em 1em;
}

.sorting:hover {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none' fill='%23ffffff'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22zm0 100l25-23 24-22H1l25 22z' fill='%23ffffff'/%3E%3C/svg%3E");
}

.sorting-asc,
.sorting-asc:hover {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath d='M51 1l25 23 24 22H1l25-22z' fill='%23ffffff'/%3E%3Cpath opacity='.3' d='M51 101l25-23 24-22H1l25 22z' fill='%23ffffff'/%3E%3C/svg%3E");
}

.sorting-desc,
.sorting-desc:hover {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22z' fill='%23ffffff'/%3E%3Cpath d='M51 101l25-23 24-22H1l25 22z' fill='%23ffffff'/%3E%3C/svg%3E");
}
</style>
