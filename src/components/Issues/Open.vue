<template>
 <div class="content">
  <div class="container mt-5">
    <div class="row">
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Task name</label>
          <input type="text" v-model="this.name" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Description</label>
          <input type="text" v-model="this.description" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>

    </div>
  </div>
  <hr />
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-lg-3 pb-3" v-for="item in tasks" :key="item.name">
        <div class="card" style="width: 18rem;">
          <div class="card-body"> 
            <h5 class="card-title">{{ item.name }} </h5>
            <input class="form-control" :value="item.description" @input="inputDescChange($event, item.id)" />
            <hr />
            <button @click.prevent="doneTask(item.id)" class="btn btn-primary me-2">Done</button>
            <button @click.prevent="trashTask(item.id)" class="btn btn-danger me-2">Trash</button>
            <button @click.prevent="overdueTask(item.id)" class="btn btn-danger">Overdue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="footer py-4 border-top">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-12">
          <h4> <span class="badge bg-warning text-dark me-2"> {{ opentotalCount }}</span>Open Issues</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OpenIssues',
  data() {
    return {
      name: '',
      description: '',
      status: 'open',
      id: Math.floor(900000 * Math.random()) + 100000,
      trash: 'false'
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasksOpens',
      opentotalCount: 'getCountOpen'
    })
  },
  methods: {
    submit() {
      this.$store.commit('addTodoTask', {
        name: this.name,
        description: this.description,
        status: 'open',
        id: this.id,
        trash: this.trash
      })
      this.name = ''
      this.status = ''
      this.description = ''
      this.id = Math.floor(900000 * Math.random()) + 100000
    },
    trashTask(task) {
      this.$store.commit('trashTodoTask', {
        id: task,
      })
    },
    doneTask(task) {
      this.$store.commit('doneTodoTask', {
        id: task,
      })
    },
    overdueTask(task) {
      this.$store.commit('overDueTodoTask', {
        id: task,
      })
    },
    inputDescChange(event, task) {
      this.$store.commit('editTodoTask', {
        description: event.target.value,
        id: task
      })
    }
  }
}
</script>

<style>
 
</style>