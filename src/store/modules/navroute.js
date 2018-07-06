const navroute = {
  state: {
    activeIndex: '/financial/overview'
  },
  mutations: {
    // 设置当前激活的tab
    // SET_ACTIVE_INDEX: (state, payload) => {
    //   state.activeIndex = payload.index
    // }
    SET_ACTIVE_INDEX (state, payload) {
      state.activeIndex = payload.index
    }
  },
  actions: {
    set_active_index ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_ACTIVE_INDEX', payload)
      })
    }
  }
}

export default navroute
