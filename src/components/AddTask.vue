<template>
  <div class="d-flex justify-content-between">
    <input 
        v-model='task' 
        type="text" 
        placeholder="add a task.." 
        v-on:keyup.enter="handleAdd"
    >
    <span v-on:click="handleAdd" >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>
    </span>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore';
import { mapActions } from 'pinia';
import {v4 as uuidv4} from 'uuid';

export default {
  data() {
    return {
      task : ''
    };
  },
  methods: {
    ...mapActions(useTaskStore, ['updateTask']),
    handleAdd:function(){
      this.task = this.task.trim()
      if(this.task !== ''){
          this.updateTask({
                task : this.task,
                key : uuidv4(),
                isDone : false
          })
          // this.$emit('addNewTask', this.task)
          this.task = ''
      }
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  outline: none;
  margin-left: 14px;
}
span:hover{
  cursor: pointer;
}
</style>