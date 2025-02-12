import { defineStore } from 'pinia'
import {  db } from '@/firebaseConfig'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite'

export const useTaskStore = defineStore('counter', {
  state: () => ({ 
    tasks : [],
    loggedUser : null
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
      async updateTask(newTask) {
        const docRef = await addDoc(collection(db, "tasks"),{uid:this.loggedUser.uid,...newTask})
        this.tasks.push({"id":docRef.id,...newTask})
      },
      async updateDone(doneUpdate){
          let index = doneUpdate.key
          const washingtonRef = doc(db, "tasks", doneUpdate.id);
          await updateDoc(washingtonRef, {
            isDone : doneUpdate.isDone
          });
          for(let t of this.tasks){
              if(t.key === index)
                  t.isDone = doneUpdate.isDone
          }
      },
      editTask:async function(updatedTask){
          let index = updatedTask.key
          const washingtonRef = doc(db, "tasks", updatedTask.id);
          await updateDoc(washingtonRef, {
            task : updatedTask.task
          });
          for(let t of this.tasks){
              if(t.key === index)
                  t.task = updatedTask.task
          }
      },
      deleteTask:async function(key, id){
          await deleteDoc(doc(db, "tasks", id))
          this.tasks = this.tasks.filter(t=>t.key!==key)
      },
      setLoggedInUser(user){
        this.loggedUser = user;
      },
      getTasks(){
        // console.log("fetchins tasks",this.loggedUser?.uid);
        if(!this.loggedUser?.uid) return;
        
        this.tasks = []
        const q = query(collection(db, "tasks"), where("uid", "==", this.loggedUser.uid));
        getDocs(q).then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            // console.log(doc.data());
            this.tasks.push({id:doc.id,...doc.data()})
          })
          }).catch((e)=>{
            console.log("something wrong",e);
          })
      }
  }
})
