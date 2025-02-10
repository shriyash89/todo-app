import { defineStore } from 'pinia'
let preTasks = localStorage.getItem('tasks')

export const useTaskStore = defineStore('counter', {
  state: () => ({ 
    tasks : JSON.parse(preTasks) || []
  }),
  getters: {
    doneCount() {
      let cnt = 0
      for(let t of this.tasks){
          if(t.isDone === true)
              cnt++
      }
      return cnt
    }
  },
  actions: {
      updateTask(newTask) {
        this.tasks.push(newTask)
      },
      updateDone(doneUpdate){
          let index = doneUpdate.key
          for(let t of this.tasks){
              if(t.key === index)
                  t.isDone = doneUpdate.isDone
          }
      },
      editTask:function(updatedTask){
          let index = updatedTask.key
          for(let t of this.tasks){
              if(t.key === index)
                  t.task = updatedTask.task
          }
      },
      deleteTask:function(key){
          this.tasks = this.tasks.filter(t=>t.key!==key)
      }
  },
  watch : {
    tasks : { 
      handler(newVal){
          let newTasks = JSON.stringify(newVal)
          localStorage.setItem('tasks', newTasks)
      },
      deep: true
    }
  }
})
