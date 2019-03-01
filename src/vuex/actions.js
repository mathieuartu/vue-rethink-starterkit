import axios from 'axios'

const fetchUser = async token => {
  const response = await axios.post("http://localhost:5000/api/user", {
    token
  })
  const { data } = response
  if (data.error) throw data.error
  return response.data[0]
}

const loginSignupUser = async (context, userInfo, method) => {
  const response = await axios.post(`http://localhost:5000/api/users/${method}`, userInfo)
  const { data } = response

  if (data.error) {
    localStorage.removeItem("token")
    throw data.content
  }

  const { token } = data.content
  axios.defaults.headers.common["Authorization"] = token
  localStorage.setItem("token", token)

  const user = await fetchUser(token)
  context.commit("logUserIn", { token, user })
}

export default {
  logUserIn(context, userInfo) {
    return loginSignupUser(context, userInfo, 'login')
  },

  signUserUp(context, userInfo) {
    return loginSignupUser(context, userInfo, 'signup')
  },

  logUserOut(context) {
    context.commit('logUserOut')
  },

  async getUser(context) {
    const user = await fetchUser(context.state.token)
    context.commit('setUser', { user })
  },
}