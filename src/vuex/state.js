export default {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || '',
  user: {},
}
