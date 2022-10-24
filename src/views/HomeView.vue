<template>
  <main class="home">
    <section class="search-and-add-task">
      <b-form-input
        v-model="searchTableCell"
        class="search-and-add-task__search"
        type="search"
        placeholder="Поиск записей"
        size="sm"
      />
      <b-button variant="success"
                size="sm"
                class="search-and-add-task__button"
                @click="handleOpenTaskForm(true)">новая запись
      </b-button>
    </section>
    <TableTasks :openTaskForm="handleOpenTaskForm"
                :searchCell="searchTableCell"/>
    <PaginationTable/>
    <TaskForm v-if="isOpenTaskForm"
              :isNewTask="isNewTask"/>
  </main>
</template>

<script>
import {mapGetters} from 'vuex';
import TableTasks from "@/components/TableTasks";
import PaginationTable from "@/components/PaginationTable";
import TaskForm from "@/components/TaskForm";

export default {
  name: 'HomeView',
  components: {
    TableTasks,
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
    ...mapGetters(['isOpenTaskForm']),
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
  gap: 20px;
}

.search-and-add-task {
  display: flex;
}

.search-and-add-task .search-and-add-task__search {
  width: 40%;
}

.search-and-add-task .search-and-add-task__button {
  min-width: 150px;
  margin-left: auto;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.search-and-add-task__button::before {
  content: '';
  display: inline-block;
  width: 25px;
  height: 25px;
  background: url("../assets/images/folder_icon.svg") center / contain no-repeat;
  margin-right: 10px;
}

</style>
