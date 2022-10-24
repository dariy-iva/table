import Vue from 'vue'
import Vuex from 'vuex'
import TasksModule from "@/store/modules/TasksModule";
import ConfigModule from "@/store/modules/ConfigModule";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpenTaskForm: false,
  },
  getters: {
    isOpenTaskForm(state) {
      return state.isOpenTaskForm;
    }
  },
  mutations: {
    setIsOpenTaskForm(state, payload) {
      state.isOpenTaskForm = payload;
    },
  },
  actions: {
  },
  modules: {
    tasks: TasksModule,
    support: ConfigModule,
  }
})
