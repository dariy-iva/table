export default {
  state: () => ({
    filialList: [],
  }),

  mutations: {
    setFilialList(state, payload) {
      state.filialList = payload.filialList;
    },
  },

  actions: {
    getFilialList({commit}) {
      const filialList = [];

      commit({
        type: 'setFilialList',
        filialList: filialList,
      })
    },
  },
}