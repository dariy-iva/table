<template>
  <section>
    <div>
      <b-form-input
          class=""
          v-model="searchCell"
          type="search"
          placeholder="Поиск"
          size="sm"
      />

      <b-button variant="success" size="sm" @click="handleAddTaskButtonClick">новая запись</b-button>
    </div>
    <b-table bordered hover sticky-header show-empty
             empty-text="Нет данных."
             empty-filtered-text="Не найдено данных по выбранным параметрам. Попробуйте изменить параметры поиска."
             head-variant="light"
             :fields="fields"
             :items="filteredTasks === null ? taskList : filteredTasks"
             :filter-included-fields="searchOn"
             :filter="searchCell"
             class=""
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
    <div>
      <b-pagination
          v-model="currentPage"
          :total-rows="filteredTasks === null ? rowsLength : filteredTasks.length"
          :per-page="rowsLengthSelected"
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
            v-model="rowsLengthSelected"
            :options="rowsLengthVariants"
            buttons
            button-variant="light"/>
      </b-form-group>
    </div>

    <TaskForm v-if="$store.state.isOpenTaskForm" :isNewTask="isNewTask" />
  </section>
</template>

<script>
import FilterHeadTable from "@/components/FilterHeadTable";
import TaskForm from "@/components/TaskForm";

export default {
  name: "Table",
  components: {
    FilterHeadTable,
    TaskForm,
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
      searchCell: null,
      filteredTasks: null,
      currentPage: 1,
      rowsLengthSelected: 10,
      rowsLengthVariants: [5, 10, 20],
      isNewTask: true,
    }
  },

  computed: {
    taskList() {
      return this.$store.state.tasks.taskList;
    },
    searchOn() {
      return this.fields.map(item => item.key);
    },
    rowsLength() {
      return this.taskList.length;
    },
  },

  methods: {
    filterTasks(key, values) {
      this.filteredTasks = this.taskList.filter(item => values.includes(item[key]));
    },
    getActivationRegionListText(task) {
      return task.activations.map(item => item.region).join(', ');
    },
    getLastActivationDate(task) {
      const activationDateList = task.activations.map(item => new Date(item.date));
      const lastActivationDate = activationDateList.sort()[activationDateList.length - 1];
      return lastActivationDate.toLocaleDateString();
    },

    handleAddTaskButtonClick() {
      this.isNewTask = true;
      this.$store.commit('setIsOpenTaskForm', true);
    },
    handleEditTaskButtonClick(task) {
      this.$store.commit({
        type: 'setCurrentTask',
        task: task,
      });
      this.isNewTask = false;
      this.$store.commit('setIsOpenTaskForm', true);
    },
  },

  beforeMount() {
    this.$store.dispatch('getTaskList');
  }
}
</script>

<style>

.table-tasks__cell_content_check-icon {
  display: block;
  width: 16px;
  height: 16px;
  background: url("../assets/images/checked_icon.svg") center no-repeat;
  margin: 0 auto;
}

</style>