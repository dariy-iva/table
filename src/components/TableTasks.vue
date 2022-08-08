<template>
  <section class="table-tasks">
    <b-table bordered hover show-empty
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
             table-class="table-tasks__table"
             tbody-class="3"
             tbody-tr-class="4"
             thead-class="table-tasks__thead"
             thead-tr-class="6"
             details-td-class="2"
    >
      <template #head(target)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
          <FilterHeadTable key-filter="target" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #head(year)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
        <FilterHeadTable key-filter="year" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #head(category)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
          <FilterHeadTable key-filter="category" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #head(technology)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
          <FilterHeadTable key-filter="technology" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #head(availability)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
          <FilterHeadTable key-filter="availability" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #head(status)="data">
        <div class="table-tasks__head-cell_content_filter">
          <span>{{ data.label }}</span>
          <FilterHeadTable key-filter="status" :onFilter="filterTasks"/>
        </div>
      </template>
      <template #cell(availability)="data">
        <span v-if="data.item.availability" class="table-tasks__cell_content_check-icon"/>
      </template>
      <template #cell(activation)="data">
        <span
          v-b-tooltip.hover="{variant: 'info'}"
          v-b-tooltip.hover.right
          :title="getActivationRegionListText(data.item)"
          class="table-tasks__cell_content_activation-regions">
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
          class="table-tasks__button-edit">редактировать
        </b-button>
      </template>
    </b-table>
  </section>
</template>

<script>
import FilterHeadTable from "@/components/FilterHeadTable";

export default {
  name: "TableTasks",
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

.table-tasks .table-tasks__table {
  display: block;
  overflow: auto;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
}

.table-tasks__table .table-tasks__thead {
  vertical-align: middle;
}

.table-tasks__head-cell_content_filter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.table-tasks__cell_content_activation-regions {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  box-orient: vertical;
  cursor: default;
}

.table-tasks__cell_content_check-icon {
  display: block;
  width: 16px;
  height: 16px;
  background: url("../assets/images/checked_icon.svg") center no-repeat;
  margin: 0 auto;
}

.table-tasks__button-edit.btn {
  display: flex;
  align-items: center;
}

.table-tasks__button-edit::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 7px;
  background: url("../assets/images/edit_icon_black.svg") center / cover no-repeat;
}

</style>