export default {
  updateUser(state, user) {
    state.isAuthenticated = true
    state.user = user
  }
}
