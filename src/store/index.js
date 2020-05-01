import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vid: ''   //视频ID
  },
  mutations: {
    goDetail(state, id) {
      state.vid = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
