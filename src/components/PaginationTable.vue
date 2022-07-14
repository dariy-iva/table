<template>
  <section class="pagination-table">
    <b-pagination
      v-model="currentPage"
      :total-rows="filteredItemsLength || rowsLength"
      :per-page="perPage"
      first-number
      last-number
      pills
      class=""
      page-class=""
      ellipsis-class=""/>
    <b-form-group
      label="Элементов на странице:"
      label-cols="auto"
      class="">
      <b-form-radio-group
        v-model="perPage"
        :options="perPageVariants"
        buttons
        button-variant="light"/>
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

<style scoped>

</style>