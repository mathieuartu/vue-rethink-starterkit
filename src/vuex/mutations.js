export default {
  setLoadingState(state, loadingState) {
    state.isLoading = loadingState
  },
  logUserIn(state, user) {
    state.isAuthenticated = true
    state.user = user
  },
  logUserOut(state) {
    state.isAuthenticated = false
    state.user = null
  },
  setUser(state, data) {
    state.user = data.user
  },

}
