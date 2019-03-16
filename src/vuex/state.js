export default {
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  user: null,
}
