<template>
  <div class="overlay">
    <div class="task-form__modal">

      <h3 :class="`task-form__title ${isNewTask ? 'task-form__title_content_add' : 'task-form__title_content_edit'}`">{{ isNewTask ? 'Новая запись' : 'Редактирование записи' }}</h3>

      <form name="task-form" @submit.prevent="handleSubmitTask" @reset.prevent="handleResetForm" class="task-form__form">

        <fieldset class="task-form__fieldset task-form__fieldset_content_general"></fieldset>

        <fieldset class="task-form__fieldset task-form__fieldset_content_functional"></fieldset>

        <fieldset class="task-form__fieldset task-form__fieldset_content_additions"></fieldset>

        <fieldset class="task-form__fieldset task-form__fieldset_content_status"></fieldset>

        <fieldset class="task-form__fieldset task-form__fieldset_content_activations">
          <p>Выберите филиал/регион и дату активации</p>
          <SelectActivations :selectedRegionsForActivation="selectedRegionsForActivation"
                             :setSelectedItemsForActivation="setSelectedItemsForActivation"/>
          <b-table
            :items="formConfig.activations"
            :fields="fieldsActivationsTable"
            show-empty bordered fixed hover sticky-header no-border-collapse head-variant="light"
            empty-text="Нет выбранных филиалов/регионов для активации">
            <template #cell(delete)="data">
              <button v-if="getStatusActivation(data.item)" type="button" @click="handleDeleteActivation(data.item)">x
              </button>
            </template>
            <template #cell(region)="data">
              {{ data.item.region }}
            </template>
            <template #cell(date)="data">
              <input v-if="getStatusActivation(data.item)"
                     type="date" :name="`${data.item.region}-date-activation`"
                     v-model="data.item.date"
                     :min="formConfig.date_start.min"
                     :max="formConfig.date_start.max" placeholder="Дата активации"
              >
              <span v-else>{{new Date(data.item.date).toLocaleDateString()}}</span>
            </template>
          </b-table>
        </fieldset>

        <div class="task-form_buttons">
          <b-button type="reset" variant="outline-danger" size="sm" class="task-form_button">Закрыть
          </b-button>
          <b-button type="submit" variant="primary" size="sm"
                    :disabled="checkValidForm" class="task-form_button">Сохранить
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {nowDateInputFormat, nowYear} from "@/utils/constants";
import SelectActivations from "@/components/SelectActivations";

export default {
  name: "TaskForm",
  props: {
    isNewTask: Boolean,
  },
  components: {
    SelectActivations,
  },
  data() {
    return {
      currentTask: null,
      formConfig: {
        target: {
          name: 'target',
          label: 'Назначение',
          options: [
            {value: null, text: 'Назначение', disabled: true},
            'Функционал', 'Тестирование', 'Прочее'],
          value: this.isNewTask ? null : this.currentTask.target,
          required: true,
        },
        year: {
          name: 'year',
          label: 'Год',
          get options() {
            const options = [];
            options.push({value: null, text: 'Год', disabled: true});
            for (let i = 0; i < nowYear - 2011; i++) {
              options.push({value: 2010 + i, text: 2010 + i});
            }
            return options;
          },
          value: this.isNewTask ? null : this.currentTask.year,
          required: true,
        },
        category: {
          name: 'category',
          label: 'Категория',
          options: [
            {value: null, text: 'Категория', disabled: true},
            'Новый сервис',
            'Новый функционал',
            'Другое'
          ],
          value: this.isNewTask ? null : this.currentTask.category,
          required: true,
        },
        technology: {
          name: 'technology',
          label: 'Технология',
          options: [
            {value: null, text: 'Технология', disabled: true},
            '2G',
            '3G',
            '4G',
            '5G',
            'Мульти',
          ],
          value: this.isNewTask ? null : this.currentTask.technology,
          required: true,
        },
        availability: {
          name: 'availability',
          label: 'Наличие в системе',
          checked: this.isNewTask ? true : this.currentTask.availability,
          required: true,
        },
        functional_code: {
          name: 'functional_code',
          label: 'Код функционала',
          options: [
            {value: null, text: 'Код функционала', disabled: true},
          ],
          value: this.isNewTask ? null : this.currentTask.functional_code,
          required: false,
        },
        functional_name: {
          name: 'functional_name',
          label: 'Название функционала',
          options: [
            {value: null, text: 'Название функционала', disabled: true},
          ],
          value: this.isNewTask ? null : this.currentTask.functional_name,
          required: true,
        },
        activity: {
          name: 'activity',
          label: 'Активность',
          options: [
            {value: null, text: 'Активность', disabled: true},
            'Тестирование нового функционала',
            'Применение нового функционала',
            'Сверка/доактивация на сети',
          ],
          value: this.isNewTask ? null : this.currentTask.activity,
          required: true,
        },
        initiator: {
          name: 'initiator',
          label: 'Ответственный',
          options: [
            {value: null, text: 'Ответственный', disabled: true},
          ],
          value: this.isNewTask ? null : this.currentTask.initiator,
          required: true,
        },
        activations: this.isNewTask ? [] : this.currentTask.activations,
        comment: {
          name: 'comment',
          label: 'Комментарий',
          value: this.isNewTask ? '' : this.currentTask.comment,
          required: false,
        },
        date_start: {
          name: 'date_start',
          label: 'Дата заведения',
          min: '2010-01-01',
          max: nowDateInputFormat,
          value: this.isNewTask ? nowDateInputFormat : this.currentTask.date_start,
          required: true,
        },
        status: {
          name: 'status',
          label: 'Статус',
          options: [
            {value: null, text: 'Статус', disabled: true},
            'В работе',
            'Завершено',
          ],
          value: this.isNewTask ? null : this.currentTask.status,
          required: true,
        },
        date_finish: {
          name: 'date_finish',
          label: 'Дата завершения',
          value: this.isNewTask ? '' : this.currentTask.date_finish,
          required: false,
          disabled: true,
        },
        id: {
          value: this.isNewTask ? null : this.currentTask.id,
        }
      },
      fieldsActivationsTable: [
        {key: 'delete', label: '', class: 'text-center'},
        {key: 'region', label: 'Регион', class: 'text-center'},
        {key: 'date', label: 'Дата', class: 'text-center'},
      ],
    }
  },
  computed: {
    getInputValues() {
      return {
        target: this.formConfig.target.value,
        year: this.formConfig.year.value,
        category: this.formConfig.category.value,
        technology: this.formConfig.technology.value,
        availability: this.formConfig.availability.checked,
        functional_code: this.formConfig.functional_code.value,
        functional_name: this.formConfig.functional_name.value,
        activity: this.formConfig.activity.value,
        initiator: this.formConfig.initiator.value,
        activations: this.formConfig.activations,
        comment: this.formConfig.comment.value,
        date_start: this.formConfig.date_start.value,
        status: this.formConfig.status.value,
        date_finish: this.formConfig.date_finish.value,
        id: this.formConfig.id.value,
      }
    },
    checkValidForm() {
      let invalidElements = [];
      Object.values(this.formConfig).forEach(item => {
        if (item.required && !item.value) {
          invalidElements.push(item);
        }
      });

      return invalidElements.length !== 0 || this.formConfig.activations.length === 0
    },
    selectedRegionsForActivation() {
      return this.formConfig.activations.map(item => item.region);
    },
  },
  methods: {
    setSelectedItemsForActivation(items) {
      this.formConfig.activations.unshift(...items);
    },
    getStatusActivation(activation) {
      return this.isNewTask
        ? true
        : !this.$store.state.tasks.currentTask.activations
          .map(item => item.region).includes(activation.region);
    },
    handleDeleteActivation(activation) {
      this.formConfig.activations = this.formConfig.activations.filter(item => item.region !== activation.region)
    },
    handleSubmitTask() {
      if (this.isNewTask) {
        this.$store.commit({
          type: 'addTask',
          task: this.getInputValues,
        })
      }
    },
    handleResetForm() {
      !this.isNewTask && this.$store.commit('clearCurrentTask');
      this.$store.commit('setIsOpenTaskForm', false);
    },
  },
  beforeCreate() {
    this.currentTask = this.$store.state.tasks.currentTask;
  }
}
</script>

<style scoped>
.overlay {
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .5);
}

.task-form__modal {
  width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 15px;
  background-color: white;
}

.task-form__title {
  font-size: 25px;
  line-height: 1.3;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

.task-form__title::before {
  content: '';
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 10px;
  background: center / cover no-repeat;
}

.task-form__title_content_add::before {
  background-image: url("../assets/images/folder_icon_blue.svg");
}

.task-form__title_content_edit::before {
  background-image: url("../assets/images/edit_icon_blue.svg");
}

.task-form__form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "general functional"
    "additions status"
    "activations activations"
    "buttons buttons";
  grid-gap: 10px;
}

.task-form__fieldset {
  border: 1px solid var(--blue-color-opacity);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 5px 10px 2px var(--blue-color-opacity);
}

.task-form__fieldset_content_general {
  grid-area: general;
}

.task-form__fieldset_content_functional {
  grid-area: functional;
}

.task-form__fieldset_content_additions {
  grid-area: additions;
}

.task-form__fieldset_content_status {
  grid-area: status;
}

.task-form__fieldset_content_activations {
  grid-area: activations;
}

.task-form_buttons {
  display: flex;
  justify-content: end;
  gap: 15px;
  grid-area: buttons;
}

.task-form_button {
  min-width: 100px;
}
</style>