export default {
  state: () => ({
    taskList: [],
    filteredTaskList: [],
    currentTask: {},
    currentPage: 1,
    perPage: 10,
  }),

  getters: {
    taskList(state) {
      return state.taskList;
    },
    currentTask(state) {
      return state.currentTask;
    },
    filteredTaskList(state) {
      return state.filteredTaskList;
    },
    currentPage(state) {
      return state.currentPage;
    },
    perPage(state) {
      return state.perPage;
    },
  },

  mutations: {
    setTaskList(state, payload) {
      state.taskList = payload.taskList;
    },
    addTask(state, payload) {
      payload.task.id = state.taskList.length + 1;
      state.taskList = [payload.task, ...state.taskList];
      state.filteredTaskList = state.taskList;
    },
    updateTask(state, payload) {
      const updateTaskIndex = state.taskList.findIndex(item => item.id === payload.task.id);
      state.taskList.splice(updateTaskIndex, 1, payload.task);
      if (state.filteredTaskList.length) {
        const updateTaskIndex = state.filteredTaskList.findIndex(item => item.id === payload.task.id);
        state.filteredTaskList.splice(updateTaskIndex, 1, payload.task)
      }
    },
    deleteTask(state, payload) {
      state.taskList = state.taskList.filter(task => task.id !== payload.task.id);
      state.filteredTaskList.length && (state.filteredTaskList = state.filteredTaskList.filter(task => task.id !== payload.task.id));
    },
    setFilteredTaskList(state, payload) {
      state.filteredTaskList = payload.taskList;
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload.task;
    },
    clearCurrentTask(state) {
      state.currentTask = {};
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setPerPage(state, payload) {
      state.perPage = payload;
    },
  },

  actions: {
    getTaskList({commit}) {
      const taskList = [
        {
          id: 1,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 2,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 3,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 4,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 5,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 6,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 7,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 8,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 9,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 10,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 11,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 12,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 13,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 14,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 15,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 16,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 17,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 18,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 19,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 20,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 21,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 22,
          target: 'Функционал',
          year: 2019,
          category: 'Новый сервис',
          technology: '4G',
          availability: true,
          functional_code: '001',
          functional_name: 'RASANT',
          activity: 'Применение нового функционала',
          activity_description: '',
          initiator: 'Иванов И.И.',
          activations: [
            {
              region: 'Белгородская область',
              date: '2022-04-05',
            },
            {
              region: 'Ямало-Ненецкий автономный округ',
              date: '2022-06-13',
            },
            {
              region: 'Республика Хакасия',
              date: '2022-06-13',
            },
            {
              region: 'Курганская область',
              date: '2022-04-05',
            },
            {
              region: 'Чеченская Республика',
              date: '2022-04-05',
            },
            {
              region: 'Ставропольский край',
              date: '2022-04-05',
            },
            {
              region: 'Астраханская область',
              date: '2022-04-05',
            },
            {
              region: 'Ярославская область',
              date: '2022-01-30',
            },
            {
              region: 'Москва',
              date: '2022-01-30',
            },
            {
              region: 'Липецкая область',
              date: '2022-01-30',
            },
          ],
          comment: '',
          date_start: '2022-01-30',
          status: 'В работе',
          date_finish: '',
        },
        {
          id: 23,
          target: 'Тестирование',
          year: 2017,
          category: 'Новый функционал',
          technology: '5G',
          availability: false,
          functional_code: '',
          functional_name: 'Nokia',
          activity: 'Тестирование нового функционала',
          activity_description: '',
          initiator: 'Кузнецова К.К.',
          activations: [
            {
              region: 'Санкт-Петербург',
              date: '2022-07-14',
            },
          ],
          comment: '',
          date_start: '2021-12-31',
          status: 'Завершено',
          date_finish: '2022-03-07',
        },
        {
          id: 24,
          target: 'Прочее',
          year: 2022,
          category: 'Другое',
          technology: 'Мульти',
          availability: true,
          functional_code: '005',
          functional_name: 'Hybradio RDS-Net',
          activity: 'Сверка/доактивация на сети',
          activity_description: '',
          initiator: 'Дмитриева Д.Д.',
          activations: [],
          comment: '',
          date_start: '2022-04-28',
          status: 'В работе',
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