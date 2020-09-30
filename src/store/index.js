import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { // 存放的键值对就是所要管理的状态
    unReadMsgArr: [],
    currentGame: null
  },
  mutations: {
    getMsg (state, payload) {
      state.unReadMsgArr.push(payload)
    },
    clearMsg (state) {
      state.unReadMsgArr = []
    },
    chooseGame (state, id) {
      state.currentGame = id
    }
  }
})

export default store
