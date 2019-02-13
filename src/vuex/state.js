export default {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
}
