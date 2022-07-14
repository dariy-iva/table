<template>
  <section class="table-tasks">
    <b-table bordered hover sticky-header show-empty
             empty-text="Нет данных."
             empty-filtered-text="Не найдено данных по выбранным параметрам. Попробуйте изменить параметры поиска."
             head-variant="light"
             :fields="fields"
             :items="filteredTaskList.length  ? filteredTaskList : taskList"
             :filter-included-fields="searchOn"
             :filter="searchCell"
             :current-page="currentPage"
             :per-page="perPage"
             class=""
             table-class="123"
             details-td-class="123"
    >
      <template #head(year)="data">
        <span class="">{{ data.label }}</span>
        <FilterHeadTable key-filter="year" :onFilter="filterTasks"/>
      </template>
      <template #cell(availability)="data">
        <span v-if="data.item.availability" class="table-tasks__cell_content_check-icon"/>
      </template>
      <template #cell(activation)="data">
        <span
            v-b-tooltip.hover="{variant: 'info'}"
            v-b-tooltip.hover.title=""
            v-b-tooltip.hover.right
            class="">
          {{ getActivationRegionListText(data.item) }}
        </span>
      </template>
      <template #cell(activation_date)="data">
        {{ data.item.activations.length > 0 ? getLastActivationDate(data.item) : '' }}
      </template>
      <template #cell(date_start)="data">
        {{ data.item.date_start ? new Date(data.item.date_start).toLocaleDateString() : '' }}
      </template>
      <template #cell(date_finish)="data">
        {{ data.item.date_finish ? new Date(data.item.date_start).toLocaleDateString() : '' }}
      </template>
      <template #cell(edit)="data">
        <b-button
            @click="handleEditTaskButtonClick(data.item)"
            variant="warning"
            size="sm"
            class="">редактировать
        </b-button>
      </template>
    </b-table>
  </section>
</template>

<script>
import FilterHeadTable from "@/components/FilterHeadTable";

export default {
  name: "Table",
  props: {
    openTaskForm: Function,
    searchCell: String,
  },
  components: {
    FilterHeadTable,
  },
  data() {
    return {
      fields: [
        {label: 'Назначение', key: 'target',},
        {label: 'Год', key: 'year',},
        {label: 'Категория', key: 'category',},
        {label: 'Технология', key: 'technology',},
        {label: 'Наличие в системе', key: 'availability',},
        {label: 'Код функционала', key: 'functional_code',},
        {label: 'Название функционала', key: 'functional_name',},
        {label: 'Активность', key: 'activity',},
        {label: 'Ответственный', key: 'initiator',},
        {label: 'Активация', key: 'activation',},
        {label: 'Дата последней активации', key: 'activation_date',},
        {label: 'Комментарий', key: 'comment',},
        {label: 'Дата заведения', key: 'date_start',},
        {label: 'Статус', key: 'status',},
        {label: 'Дата завершения', key: 'date_finish',},
        {label: 'Редактирование', key: 'edit',},
      ],
    }
  },

  computed: {
    taskList() {
      return this.$store.state.tasks.taskList;
    },
    searchOn() {
      return this.fields.map(item => item.key);
    },
    currentPage() {
      return this.$store.state.tasks.currentPage;
    },
    perPage() {
      return this.$store.state.tasks.perPage;
    },
    filteredTaskList() {
      return this.$store.state.tasks.filteredTaskList;
    },
  },

  methods: {
    filterTasks(key, values) {
      const filteredTasks = this.taskList.filter(item => values.includes(item[key]));
      this.$store.commit('setFilteredTaskList', {taskList: filteredTasks});
    },
    getActivationRegionListText(task) {
      return task.activations.map(item => item.region).join(', ');
    },
    getLastActivationDate(task) {
      const activationDateList = task.activations.map(item => new Date(item.date));
      const lastActivationDate = activationDateList.sort()[activationDateList.length - 1];
      return lastActivationDate.toLocaleDateString();
    },
    handleEditTaskButtonClick(task) {
      this.$store.commit({
        type: 'setCurrentTask',
        task: task,
      });
      this.openTaskForm(false);
    },
  },

  beforeMount() {
    this.$store.dispatch('getTaskList');
  }
}
</script>

<style>

.table-tasks {
  flex-grow: 1;
}

.table-tasks .b-table-sticky-header {
  max-height: 1000px;
}

.table-tasks__cell_content_check-icon {
  display: block;
  width: 16px;
  height: 16px;
  background: url("../assets/images/checked_icon.svg") center no-repeat;
  margin: 0 auto;
}

</style>