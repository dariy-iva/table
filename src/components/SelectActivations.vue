<template>
  <div>
    <b-button variant="primary" size="sm" v-b-modal.select-activations-modal>Выбрать</b-button>
    <b-modal id="select-activations-modal" ref="select-activations-modal" hide-header hide-footer centered
             content-class="" body-class="">
      <h3>Выберите филиалы/регионы:</h3>
      <div>
        <b-form-group v-for="filial in filialList" :key="filial.value">
          <div>
            <input type="checkbox" v-model="selectedFilials" :name="filial.value" :value="filial.value"
                   @click="toggleAllRegions">
            <p v-b-toggle="`collapse-${filial.value}`">{{ filial.value }}</p>
          </div>
          <b-collapse v-if="filial.regions.length !== 0" :id="`collapse-${filial.value}`" class="mt-2">
            <b-form-checkbox
              v-for="region in filial.regions"
              :key="region.value"
              v-model="selectedRegions"
              :name="region.value"
              :value="region.value"
              :disabled="checkDisabledRegion(region.value)"
              size="sm"
              class="ml-4"
            >{{ region.value }}
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
      return [];
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
            if (!newValue.includes(region.value) && oldValue.includes(region.value)) {
              this.selectedFilials = this.selectedFilials.filter(item => item !== filial.value)
            } else if (newValue.includes(region.value) && !this.selectedFilials.includes(region.value)) {
              selectedRegions.push(region.value);
            }
          });

          if (selectedRegions.length !== 0 && selectedRegions.length === filial.regions.length) {
            this.selectedFilials.push(filial.value);
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
        .find(filial => filial.value === e.target.value)
        .regions.map(region => region.value);

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
          if (this.selectedRegions.includes(region.value) && !this.selectedRegionsForActivation.includes(region.value)) {
            selectedItems.push({region: region.value, date: this.dateActivationInputConfig.value});
          }
        })
      });
      this.setSelectedItemsForActivation(selectedItems);

      this.$refs['select-activations-modal'].hide(true);
    }
  },
  beforeMount() {
    this.$store.dispatch('getFilialList');
    this.selectedRegions.push(...this.selectedRegionsForActivation);

  }
}
</script>

<style scoped>

</style>