<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import { useTaskStore } from '@/store/TaskStore';
import { mapState } from 'pinia';

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    TodoList
  },
  computed : {
    ...mapState(useTaskStore, ['loggedUser'])         
  },
  beforeMount(){
    if(!this.loggedUser){
      // console.log("no userr found")
      this.$router.push('/login')
    }
  },
  watch:{
    loggedUser(newVal){
      if(!newVal){
        this.$router.push('/login')
      }
    }
  }
}
</script>
