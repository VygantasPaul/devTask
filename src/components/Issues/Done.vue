<template>
  <div class="content">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-lg-3" v-for="item in tasks" :key="item.name">
          <div class="card" style="width: 20rem;">
            <div class="card-body"> 
              <h5 class="card-title">{{ item.name }}</h5>
              <input class="form-control" :value="item.description" @input="inputDescChange($event, item.id)" />
              <hr />
              <button @click.prevent="notDoneTask(item.id)" class="btn btn-primary me-2">Not Done</button>
              <button @click.prevent="trashTask(item.id)" class="btn btn-danger me-2">Trash</button>
              <button @click.prevent="overDueTask(item.id)" class="btn btn-danger">Overdue</button>
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
          <h4> <span class="badge bg-success text-white me-2"> {{ donetotalCount }}</span>Done Issues</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DoneIssues',
  computed: {
    ...mapGetters({
      tasks: 'getTasksDone',
      donetotalCount: 'getCountDone'
    })
  },
  methods: {
    trashTask(task) {
      this.$store.commit('trashTodoTask', {
        id: task,
      })

    },
    overDueTask(task) {
      this.$store.commit('overDueTodoTask', {
        id: task,
      })
    },
    notDoneTask(task) {
      this.$store.commit('notDoneTodoTask', {
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