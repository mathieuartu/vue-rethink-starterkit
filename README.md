# vue-rethink-starterkit

This project is built around the idea to have a instant boilerplate for any new idea.
Authentication is already built-in.
It leverages the use of Vue, Vuex, Vue-Router, Rethinkdb and JWT
Don't forget to add a .env file with at least these contents : 

```
DB_NAME= your rethinkdb database name
DB_PORT= your rethinkdb port
SECRET= your secret key to hash passwords and jwt
```

## Project setup
```
yarn install
```

### Serves an API using RethinkDB
```
yarn api
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your tests
```
yarn test
```

### Lints and fixes files
```
yarn lint
```
