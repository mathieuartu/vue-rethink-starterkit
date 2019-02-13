import axios from 'axios'

const fetchUser = token => {
  return new Promise((resolve, reject) => {
    axios.post("http://localhost:5000/api/user", {
      token
    }).then(response => {
      const user = response.data[0]
      resolve(user)
    }).catch(err => reject(err))
  })
}

const loginSignupUser = (context, userInfo, method) => {
  return new Promise((resolve, reject) => {
    const { username, password } = userInfo
    axios.post(`http://localhost:5000/api/users/${method}`, {
      username, password,
    }).then(response => {
      const { data } = response

      if (!data.error) {
        const { token } = data.content
        axios.defaults.headers.common["Authorization"] = token
        localStorage.setItem("token", token)

        fetchUser(token).then(user => {
          context.commit("logUserIn", { token, user })
          resolve()
        })

      } else {
        localStorage.removeItem("token")
        reject(data.content)
      }
    })
  })
}

export default {
  logUserIn(context, userInfo) {
    loginSignupUser(context, userInfo, 'login')
  },

  signUserUp(context, userInfo) {
    loginSignupUser(context, userInfo, 'signup')
  },

  logUserOut(context) {
    return new Promise((resolve) => {
      resolve(context.commit('logUserOut'))
    })
  },

  getUser(context) {
    return new Promise((resolve, reject) => {
      fetchUser(context.state.token).then(user => {
        context.commit('setUser', { user })
        resolve(user)
      })
    })
  }
}