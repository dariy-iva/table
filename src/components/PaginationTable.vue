<template>
  <section class="pagination-table">
    <b-pagination
      v-model="currentPage"
      :total-rows="filteredItemsLength || rowsLength"
      :per-page="perPage"
      first-number
      last-number
      pills
      class="pagination-table__pagination"
      next-class="pagination-table__transition-button"
      prev-class="pagination-table__transition-button"/>
    <b-form-group
      label="Элементов на странице:"
      class="pagination-table__per-page-container">
      <b-form-radio-group
        v-model="perPage"
        :options="perPageVariants"
        buttons
        button-variant="light"
      class="pagination-table__per-page-select"/>
    </b-form-group>
  </section>
</template>

<script>
export default {
  name: "PaginationTable",
  data() {
    return {
      perPageVariants: [5, 10, 20],
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state.tasks.currentPage;
      },
      set(page) {
        this.$store.commit('setCurrentPage', page);
      },
    },
    perPage: {
      get() {
        return this.$store.state.tasks.perPage;
      },
      set(perPage) {
        this.$store.commit('setPerPage', perPage);
      },
    },
    rowsLength() {
      return this.$store.state.tasks.taskList.length;
    },
    filteredItemsLength() {
      return this.$store.state.tasks.filteredTaskList.length;
    },
  },
}
</script>

<style>

.pagination-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-table__pagination {
  margin-bottom: 0;
}

.pagination-table__transition-button .page-link {
  border: none;
}

.pagination-table__per-page-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-table__per-page-container legend {
  padding: 0;
}

.pagination-table__per-page-select label.active {
  background-color: #ced4da;
}

.pagination-table__per-page-select label:hover {
  background-color: #ced4da;
}

.pagination-table__per-page-select label input[type="radio"] {
  position: absolute;
  clip: rect(0,0,0,0);
  pointer-events: none;
}


</style>