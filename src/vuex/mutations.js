export default {
  logUserIn(state, data) {
    state.isAuthenticated = true
    state.user = data.user
    state.token = data.token
  },
  logUserOut(state) {
    state.isAuthenticated = false
    state.user = null
    state.token = null
  },
  setUserToken(state, data) {
    state.token = data.token
  },
  setUser(state, data) {
    state.user = data.user
  },

}
