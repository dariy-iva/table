<template>
  <b-dropdown
      variant="dark"
      size="sm"
      class=""
      menu-class=""
      toggle-class=""
      :ref="`dropdown-${keyFilter}`">
    <b-form-group>
      <b-form-checkbox
          v-model="isAllSelected"
          @change="toggleAllValues"
          size="sm"
          class=""
      >Выбрать все
      </b-form-checkbox>
      <b-form-checkbox-group
          v-model="selectedValues"
          :options="valueList"
          size="sm"
          stacked
          class=""/>
    </b-form-group>

    <b-dropdown-divider/>

    <div>
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
}
</script>

<style scoped>

</style>