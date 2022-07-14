<template>
  <div>
    <b-button variant="primary" size="sm" v-b-modal.select-activations-modal>Выбрать</b-button>
    <b-modal id="select-activations-modal" ref="select-activations-modal" hide-header hide-footer centered
             content-class="" body-class="">
      <h3>Выберите филиалы/регионы:</h3>
      <div>
        <b-form-group v-for="filial in filialList" :key="filial.name">
          <div>
            <input type="checkbox" v-model="selectedFilials" :name="filial.name" :value="filial.name"
                   @click="toggleAllRegions">
            <p v-b-toggle="`collapse-filial-${filial.id}`">{{ filial.name }}</p>
          </div>
          <b-collapse v-if="filial.regions.length !== 0" :id="`collapse-filial-${filial.id}`" class="mt-2">
            <b-form-checkbox
              v-for="region in filial.regions"
              :key="region.name"
              v-model="selectedRegions"
              :name="region.name"
              :value="region.name"
              :disabled="checkDisabledRegion(region.name)"
              size="sm"
              class="ml-4"
            >{{ region.name }}
            </b-form-checkbox>
          </b-collapse>
        </b-form-group>
      </div>

      <h3>Выберите дату активации:</h3>
      <b-form-datepicker v-model="dateActivationInputConfig.value" :name="dateActivationInputConfig.name"
                         :min="dateActivationInputConfig.min" :max="dateActivationInputConfig.max"
                         :placeholder="dateActivationInputConfig.label" required size="sm"/>
      <div>
        <b-button variant="outline-danger" size="sm"
                  :disabled="selectedRegions.length === 0 && dateActivationInputConfig.value === ''"
                  @click="clearActivations">Очистить
        </b-button>
        <b-button variant="primary" size="sm"
                  :disabled="selectedRegions.length === 0 && dateActivationInputConfig.value === ''"
                  @click="setSelectedRegions">Применить
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {nowDateInputFormat} from "@/utils/constants";

export default {
  name: "SelectActivations",
  props: {
    selectedRegionsForActivation: Array,
    setSelectedItemsForActivation: Function,
  },
  data() {
    return {
      selectedRegions: [],
      selectedFilials: [],
      dateActivationInputConfig: {
        name: 'date_activation',
        label: 'Дата активации',
        min: '2010-01-01',
        max: nowDateInputFormat,
        value: '',
      },
    }
  },
  computed: {
    filialList() {
      return this.$store.state.support.filialList;
    }
  },
  watch: {
    selectedRegions(newValue, oldValue) {
      if (newValue.length === 0) {
        this.selectedFilials = [];
      } else {
        this.filialList.forEach(filial => {
          let selectedRegions = [];

          filial.regions.forEach(region => {
            if (!newValue.includes(region.name) && oldValue.includes(region.name)) {
              this.selectedFilials = this.selectedFilials.filter(item => item !== filial.name)
            } else if (newValue.includes(region.name) && !this.selectedFilials.includes(region.name)) {
              selectedRegions.push(region.name);
            }
          });

          if (selectedRegions.length !== 0 && selectedRegions.length === filial.regions.length) {
            this.selectedFilials.push(filial.name);
          }
        })
      }
    },
  },
  methods: {
    checkDisabledRegion(region) {
      return this.selectedRegionsForActivation.includes(region);
    },
    toggleAllRegions(e) {
      const regionList = this.filialList
        .find(filial => filial.name === e.target.value)
        .regions.map(region => region.name);

      if (e.target.checked) {
        this.selectedRegions = [...new Set(this.selectedRegions.concat(regionList))];
      } else {
        regionList.forEach(item => {
          this.selectedRegions = this.selectedRegions.filter(region => region !== item || this.selectedRegionsForActivation.includes(item));
        })
      }
    },
    clearActivations() {
      this.selectedRegions = this.selectedRegions.filter(region => this.selectedRegionsForActivation.includes(region));
      this.dateActivationInputConfig.value = '';
    },
    setSelectedRegions() {
      const selectedItems = [];
      this.filialList.forEach(filial => {
        filial.regions.forEach(region => {
          if (this.selectedRegions.includes(region.name) && !this.selectedRegionsForActivation.includes(region.name)) {
            selectedItems.push({region: region.name, date: this.dateActivationInputConfig.value});
          }
        })
      });
      this.setSelectedItemsForActivation(selectedItems);

      this.$refs['select-activations-modal'].hide(true);
    }
  },
  beforeCreate() {
    this.$store.dispatch('getFilialList');

  },
  beforeMount() {
    this.selectedRegions.push(...this.selectedRegionsForActivation);
  }
}
</script>

<style scoped>

</style>