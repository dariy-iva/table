import Vue from 'vue'
import Vuex from 'vuex'
import TasksModule from "@/store/modules/TasksModule";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpenTaskForm: false,
  },
  getters: {
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
  }
})
