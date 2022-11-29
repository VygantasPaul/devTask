<template>
  
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name:'HomePage'}">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  @click.stop="toggleNavbar()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" v-bind:class=" { 'show': show }">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link v-bind:class="{'nav-link':true, 'active':(this.$route.name === 'IssuesOpen')}" :to="{name:'IssuesOpen'}">Open</router-link>
          </li>
          <li class="nav-item">
            <router-link v-bind:class="{'nav-link':true, 'active':(this.$route.name === 'IssuesDone')}" :to="{name:'IssuesDone'}">Done</router-link>
          </li>
          <li class="nav-item">
            <router-link v-bind:class="{'nav-link':true, 'active':(this.$route.name === 'IssuesTrashed')}" :to="{name:'IssuesTrashed'}">Trashed</router-link>
          </li>
          <li class="nav-item">
            <router-link v-bind:class="{'nav-link':true, 'active':(this.$route.name === 'IssuesOverdue')}" :to="{name:'IssuesOverdue'}">Overdue</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavbarComponent',
  data() {
    return {
      show: false
    }
  },
  computed: mapState(['count']),
  methods: {
    toggleNavbar() {
      this.show = !this.show;
    },
    increment(){
      this.$store.commit('increment');
    },
    decrement(){
      this.$store.commit('decrement');
    }
  }
}
</script>
