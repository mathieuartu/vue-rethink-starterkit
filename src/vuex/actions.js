import axios from 'axios'

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user")
    return response.data[0]
  } catch (error) {
    throw error
  }
}

const loginSignupUser = async (context, userInfo, method) => {
  const response = await axios.post(`http://localhost:5000/api/users/${method}`, userInfo)
  const { data } = response

  if (data.error) {
    localStorage.removeItem("token")
    throw data.content
  }

  const { token } = data.content
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  localStorage.setItem("token", token)

  const user = await fetchUser()
  context.commit("logUserIn", user)
}

export default {
  logUserIn(context, userInfo) {
    return loginSignupUser(context, userInfo, 'login')
  },

  signUserUp(context, userInfo) {
    return loginSignupUser(context, userInfo, 'signup')
  },

  logUserOut(context) {
    localStorage.removeItem("token")
    context.commit('logUserOut')
  },

  async getUser(context) {
    try {
      const user = await fetchUser()
      context.commit('setUser', { user })
    } catch (error) {
      context.dispatch('logUserOut')
    }
  },
}