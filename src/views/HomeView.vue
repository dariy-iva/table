<template>
  <main class="home">
    <section class="search-and-add-task">
      <b-form-input
        class=""
        v-model="searchTableCell"
        type="search"
        placeholder="Поиск"
        size="sm"
      />
      <b-button variant="success" size="sm" @click="handleOpenTaskForm(true)">новая запись</b-button>
    </section>
    <Table :openTaskForm="handleOpenTaskForm" :searchCell="searchTableCell" />
    <PaginationTable />
    <TaskForm v-if="isOpenTaskForm" :isNewTask="isNewTask" />
  </main>
</template>

<script>
import Table from "@/components/Table";
import PaginationTable from "@/components/PaginationTable";
import TaskForm from "@/components/TaskForm";

export default {
  name: 'HomeView',
  components: {
    Table,
    PaginationTable,
    TaskForm
  },
  data() {
    return {
      isNewTask: true,
      searchTableCell: null,
    }
  },
  computed: {
    isOpenTaskForm() {
      return this.$store.state.isOpenTaskForm;
    },
  },
  methods: {
    handleOpenTaskForm(statusTask) {
      this.isNewTask = statusTask;
      this.$store.commit('setIsOpenTaskForm', true);
    },
  },
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
