<template>
  <div class="content">
    <div class="container mt-5">
      <div class="row">
        <div class="col-3" v-for="item in tasks" :key="item.name">
          <div class="card" style="width: 20rem;">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <input class="form-control" :value="item.description" @input="inputDescChange($event, item.id)" />
              <hr /> 
              <button  v-if="item.status === 'overdue'" @click.prevent="notOverdueTask(item.id)" class="btn btn-primary me-2">Not Overdue</button>
              <button @click.prevent="doneTask(item.id)" class="btn btn-danger me-2">Done</button>
              <button @click.prevent="trashTask(item.id)" class="btn btn-danger">Trash</button>
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
          <h4> <span class="badge bg-danger text-white me-2"> {{ getCountOverdue }}</span>Overdue Issues</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OverdueIssues',
  computed: {
    ...mapGetters({
      tasks: 'getTasksOverdue',
       getCountOverdue: 'getCountOverdue'
    })
  },
  methods: {
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
    inputDescChange(event, task) {
      this.$store.commit('editTodoTask', {
        description: event.target.value,
        id: task
      })
    },
    notOverdueTask(task) { 
      this.$store.commit('notOverdueTodoTask', {
        id: task,
      })
    },
  }
}
</script>
<style>

</style>