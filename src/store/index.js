import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { // 存放的键值对就是所要管理的状态
    unReadMsgArr: [],
    currentGame: null,
    scoreArr: [
      {
        score: '?',
        g_id: 1,
        sort: '?'
      },
      {
        score: '?',
        g_id: 2,
        sort: '?'
      },
      {
        score: '?',
        g_id: 3,
        sort: '?'
      },
      {
        score: '?',
        g_id: 4,
        sort: '?'
      }
    ],
    currentGameScore: '???'
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
    },
    getScore (state, arr) {
      for (const i in arr) {
        for (const j in state.scoreArr) {
          if (arr[i].g_id === state.scoreArr[j].g_id) {
            state.scoreArr[j].score = arr[i].score
            state.scoreArr[j].sort = arr[i].sort
          }
        }
      }
    },
    getScoreByName (state, score) {
      state.currentGameScore = score
    }
  }
})

export default store
