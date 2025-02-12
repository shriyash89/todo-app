<template>
  <div class="about">
    <div>
      <h1>Hello, {{ getName }}!</h1>
      <p>email : {{ loggedUser.email }}</p>
      <b>uid : {{ loggedUser.uid }}</b>
    </div>
    
  </div>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore';
import { mapState } from 'pinia';


export default {
    computed : {
      ...mapState(useTaskStore, ['loggedUser']),
      getName(){
          let name = this.loggedUser.email.slice(0,this.loggedUser.email.indexOf('@')) 
          return name
      }
    }
}
</script>