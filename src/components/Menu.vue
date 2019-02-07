<template>
    <div class="menu">
      <h1><router-link to="/">Cinerank</router-link></h1>
      <ul>
        <li v-for="item in menu" :key="item.title">
          <router-link :to="item.link">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuItems: {
        logged: [
          {
            title: 'Accueil',
            link: '/'
          },
          {
            title: 'Mes films',
            link: '/my-movies'
          },
          {
            title: 'Mon compte',
            link: '/my-account'
          }
        ],
        notLogged: [
          {
            title: 'Inscription',
            link: '/signup'
          },
          {
            title: 'Se connecter',
            link: '/login'
          }
        ]
      }
    }
  },
  computed: {
    menu () {
      return this.isLogged ? this.menuItems.logged : this.menuItems.notLogged
    },
    isLogged () {
      return Math.random() > 0.5
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
