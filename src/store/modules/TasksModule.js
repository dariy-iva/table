export default {
  state: () => ({
    taskList: [],
    currentTask: {},
  }),

  mutations: {
    setTaskList(state, payload) {
      state.taskList = payload.taskList;
    },
    addTask(state, payload) {
      state.taskList = [payload.task, ...state.taskList];
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload.task;
    },
    clearCurrentTask(state) {
      state.currentTask = {};
    },
  },

  actions: {
    getTaskList({commit}) {
      const taskList = [
        {
          id: 1,
          target: '',
          year: 2019,
          category: '',
          technology: '',
          availability: true,
          functional_code: '',
          functional_name: '',
          activity: '',
          activity_description: '',
          initiator: '',
          activations: [
            {
              region: '',
              date: '',
            },
          ],
          comment: '',
          date_start: '',
          status: '',
          date_finish: '',
        },
        {
          id: 2,
          target: '',
          year: 2017,
          category: '',
          technology: '',
          availability: false,
          functional_code: '',
          functional_name: '',
          activity: '',
          activity_description: '',
          initiator: '',
          activations: [
            {
              region: '',
              date: '',
            },
          ],
          comment: '',
          date_start: '',
          status: '',
          date_finish: '',
        },
        {
          id: 3,
          target: '',
          year: 2022,
          category: '',
          technology: '',
          availability: true,
          functional_code: '',
          functional_name: '',
          activity: '',
          activity_description: '',
          initiator: '',
          activations: [
            {
              region: '',
              date: '',
            },
          ],
          comment: '',
          date_start: '',
          status: '',
          date_finish: '',
        },
      ];

      commit({
        type: 'setTaskList',
        taskList: taskList,
      })
    },
  },
}