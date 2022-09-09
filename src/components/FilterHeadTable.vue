<template>
  <b-dropdown
      variant="dark"
      size="sm"
      class="filter-head"
      menu-class="filter-head__menu"
      :toggle-class="`filter-head__button ${!isAllSelected ? 'filter-head__button_active' : ''}`"
      :ref="`dropdown-${keyFilter}`">
    <b-form-group class="filter-head__form-group">
      <b-form-checkbox
          v-model="isAllSelected"
          @change="toggleAllValues"
          size="sm"
          class="filter-head__parent-input"
      >Выбрать все
      </b-form-checkbox>
      <b-form-checkbox-group
          v-model="selectedValues"
          :options="valueList"
          size="sm"
          stacked
          class="filter-head__child-inputs"/>
    </b-form-group>

    <b-dropdown-divider/>

    <div class="filter-head__buttons">
      <b-button
          @click="clearSelectedValues"
          :disabled="selectedValues.length === 0"
          variant="outline-danger"
          size="sm"
      >Очистить
      </b-button>
      <b-button
          @click="filterItems"
          :disabled="selectedValues.length === 0"
          variant="primary"
          size="sm"
      >Применить
      </b-button>
    </div>
  </b-dropdown>
</template>

<script>
export default {
  name: "FilterHeadTable",
  props: {
    keyFilter: String,
    onFilter: Function,
  },
  data() {
    return {
      selectedValues: [],
      isAllSelected: false,
    }
  },

  computed: {
    valueList() {
      return this.keyFilter === 'availability'
          ? [{text: 'Да', value: true}, {text: 'Нет', value: false}]
          : [...new Set(this.$store.state.tasks.taskList.map(item => item[this.keyFilter]))];
    },
  },

  watch: {
    selectedValues(newValue) {
      this.isAllSelected = newValue.length === 0
          ? false
          : newValue.length === this.valueList.length;
    },
  },

  methods: {
    filterItems() {
      this.onFilter(this.keyFilter, this.selectedValues);
      this.$refs[`dropdown-${this.keyFilter}`].hide(true);
    },
    toggleAllValues(checked) {
      this.selectedValues = !checked
          ? []
          : this.keyFilter === 'availability'
              ? this.valueList.map(item => item.value)
              : this.valueList.slice();
    },
    clearSelectedValues() {
      this.selectedValues = [];
    },
  },
  beforeMount() {
    this.selectedValues = [...new Set(this.$store.state.tasks.taskList.map(item => item[this.keyFilter]))];
  }
}
</script>

<style>

.dropdown.b-dropdown.filter-head {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.filter-head button.btn.filter-head__button {
  display: flex;
  padding: 0;
  background-color: inherit;
  border: none;
}

.filter-head .filter-head__button:focus, .filter-head .filter-head__button:active {
  box-shadow: none;
}

.filter-head .filter-head__button::after {
  color: var(--black-color);
}

.filter-head .filter-head__button_active::after {
  color: var(--blue-color);
}

.filter-head__form-group {
  padding: 0 10px;
  max-height: 150px;
  overflow-y: scroll;
}

div.custom-checkbox.filter-head__parent-input {
  padding: 0;
  display: flex;
  gap: 5px;
}

.filter-head__child-inputs div {
  display: flex;
  gap: 5px;
}

.filter-head__buttons {
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 0 10px;
}

.filter-head__button {
  align-items: center;
  justify-content: end;
}

</style>