export default {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    add(state, amount) {
      state.count += amount
    },
    reset(state) {
      state.count = 0
    }
  }
}
