import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import "bootstrap/dist/css/bootstrap.css"
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = createStore({
  state() {
    return {
      issues: [],
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addTodoTask(state, task) {
      state.issues.push(task)
    },
    trashTodoTask(state, task) {
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.trash = 'true'
        }
      })
      state.issues = tempArray
    },

    doneTodoTask(state, task) {
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.status = 'done'
        }
      })
      state.issues = tempArray
    },
    notDoneTodoTask(state, task) {
      // mutate state
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.status = 'open'
        }
      })
      state.issues = tempArray
    },
    notTrashTask(state, task) {
      // mutate state
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.trash = 'false'
        }
      })
      state.issues = tempArray
    },
    editTodoTask(state, task) {
      // mutate state
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.description = task.description
        }
      })
      state.issues = tempArray
    },

    overDueTodoTask(state, task) {
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.status = 'overdue'
        }
      })
      state.issues = tempArray
    },
    notOverdueTodoTask(state, task) {
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
          item.status = 'open'
        }
      })
      state.issues = tempArray
    },
  },
  getters: {
    getTasksOpens: state => { return state.issues.filter(issue => issue.status === "open" && issue.trash === "false") },
    getTasksDone: state => { return state.issues.filter(issue => issue.status === "done" && issue.trash === "false") },
    getTasksTrash: state => { return state.issues.filter(issue => issue.trash === "true") },
    getTasksOverdue: state => { return state.issues.filter(issue => issue.status === "overdue" && issue.trash === "false") },

    getCountOpen: state => { return state.issues.filter(issue => issue.status === 'open' && issue.trash === "false").length },
    getCountDone: state => { return state.issues.filter(issue => issue.status === 'done' && issue.trash === "false").length },
    getCountTrash: state => { return state.issues.filter(issue => issue.trash === 'true').length },
    getCountOverdue: state => { return state.issues.filter(issue => issue.status === 'overdue').length }
  },
  actions: {
    increment(context){
      context.commit('increment')
    }
  },
  plugins: [vuexLocal.plugin],
});

createApp(App).use(router).use(store).mount('#app')
