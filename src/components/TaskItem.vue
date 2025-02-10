<template>
  <div>
    <div class="d-flex justify-content-between align-items-center" style="max-width: 360px;">
        <!-- <label class="form-check-label stretched-link" for="firstCheckboxStretched">First checkbox</label> -->
        <div>
          <input v-if="!wantToEdit" class="form-check-input me-1" type="checkbox" value="" id="firstCheckboxStretched" v-model="isChecked" v-on:change="handleCheck" >
          <span v-if="!wantToEdit && !task.isDone" style="margin-left: 12px;">{{task?.task}}  </span>
          <span v-if="task.isDone" style="margin-left: 12px;" class="red-line">
            <span style="color: black;">{{task?.task}}</span> 
          </span>

          <input class="input" type="text" v-if="wantToEdit" v-model="t" v-on:keyup.enter="updateTask"  >
        </div>
        
        <div>
          <button class="btn btn" v-if="wantToEdit" v-on:click="wantToEdit=false" >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button> 
          <button class="btn btn" v-on:click="updateTask" v-if="wantToEdit && !task.isDone" >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
          </button> 
          <button type="button" class="btn btn-light" style="margin-right: 15px;" v-on:click="wantToEdit=true" v-if="!wantToEdit && !task.isDone" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-pen-fill" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
            </svg>
          </button>
          <button type="button" class="btn btn-light" v-if="!wantToEdit" v-on:click="wantToDelete=true" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>

    </div>

    <div v-if="wantToDelete" id="myModal" class="modal">
      <div class="modal-content">
        <p>Are you sure to delete?</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" style="margin-right: 10px;" data-bs-dismiss="modal" v-on:click="wantToDelete=false" >Close</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteToDo" >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore';
import { mapActions } from 'pinia';

export default {
  props : ['task'],
  data() {
    return {
      isChecked : this.task?.isDone,
      wantToEdit : false,
      wantToDelete : false,
      t : this.task?.task
    };
  },
  methods: {
    ...mapActions(useTaskStore, ['updateDone', 'editTask', 'deleteTask']),
    handleCheck:function(){
      // this.$emit('updateDone', {key:this.task?.key, isDone: this.isChecked})
      this.updateDone({key:this.task?.key, isDone: this.isChecked})
    },
    updateTask:function(){
      // this.$emit('editTask', {key:this.task?.key, "task" : this.t})
      this.editTask({key:this.task?.key, "task" : this.t})
      this.wantToEdit = false
    },
    deleteToDo:function(){
      // this.$emit('deleteTask', this.task?.key)
      this.deleteTask(this.task?.key)
    }
  }
};
</script>

<style scoped>
.input{
  border: none;
  border-bottom: 1px solid rgb(55, 53, 53);
}
.input:focus{
  outline:none;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 400px; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
span.red-line {
text-decoration: line-through;
color: green;
}
</style>