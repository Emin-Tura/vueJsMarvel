import { createStore } from 'vuex'


export default createStore({
  state: {
    likeCount: 0,
    totalLikes: 0
  },
  mutations: {
    incrementLikeCount(state) {
      state.likeCount++
      state.totalLikes++
    },
    decrementLikeCount(state) {
      state.likeCount--
      state.totalLikes--
    }
  }
})
