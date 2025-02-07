<template>
  <div class="container d-flex justify-content-center align-items-center m-4">
    <div>
        <h1 class="heading">To Do</h1>

        <div class="card" style="width: 405px;max-width: 407px;">

            <div class="card-body border border-dark rounded">
                <div>
                    <div class="card mt-4">
                        <div class="p-0 card-body border border-dark rounded">
                            <AddTask v-on:addNewTask="updateTasks($event)" ></AddTask>
                        </div>
                    </div>
                
                    <div class="card border border-dark rounded mt-3">
                        <div class="card-body" style="max-width: 407px;" >
                            <div>
                                <b class="text-warning">Peding Tasks</b>
                                <div>
                                    <p v-if="tasks.length===0" class="text-center">No tasks yet!</p>
                                    <p v-if="tasks.length!==0 && doneCount===tasks.length" class="text-center">Hurrey, all tasks done!</p>
                                    <ul class="list-group">
                                        <li class="mb-2" v-for="(task) in tasks" v-bind:key="task.key" >
                                            <TaskItem 
                                                v-if="!task.isDone" 
                                                v-bind:task="task" 
                                                v-on:updateDone = "updateDone($event)"
                                                v-on:editTask = "editTask($event)"
                                                v-on:deleteTask = "deleteTask($event)"
                                            >
                                            </TaskItem>
                                        </li>
                                    </ul>
                                </div>
                            
                                <b class="text-warning">Done Tasks</b>
                                <div>
                                    <p v-if="tasks.length!==0 && doneCount===0" class="text-center">nothing is completed yet!!</p>
                                    <ul class="list-group">
                                        <li  class="mb-2" v-for="(task) in tasks" v-bind:key="task.key" >
                                            <TaskItem 
                                                v-if="task.isDone" 
                                                v-bind:task="task" 
                                                v-on:updateDone="updateDone($event)" 
                                                v-on:deleteTask = "deleteTask($event)"
                                            ></TaskItem>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import AddTask from './AddTask.vue';
import TaskItem from './TaskItem.vue';

export default {
    components : {
        AddTask : AddTask,
        TaskItem : TaskItem
    },
    data() {
        return {
            tasks : [],
            doneCount : 0
        };
    },
    methods: {
        updateTasks:function(newTask){
            const newObj = {
                task : newTask,
                key : uuidv4(),
                isDone : false
            }
            this.tasks.push(newObj)
        },
        updateDone:function(doneUpdate){
            let index = doneUpdate.key
            for(let t of this.tasks){
                if(t.key === index)
                    t.isDone = doneUpdate.isDone
            }
            
            let cnt = 0
            for(let t of this.tasks){
                if(t.isDone === true)
                    cnt++
                console.log(this.doneCount)
                this.doneCount = cnt
                console.log(this.doneCount)
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
    }
};
</script>

<style scoped>
.heading{
    font-family: "Lucida Console", "Courier New", monospace;
    text-align: center;
}
ul {
    list-style-type: none;
    padding-left: 16px;
}
</style>
