<template>
    <div>
      <form @submit.prevent="handleSubmit">
          <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input 
                  type="email" 
                  class="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp" 
                  v-model="email"
              >
              <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input 
                  type="password" 
                  class="form-control" 
                  id="exampleInputPassword1" 
                  v-model="password"
              >
          </div>
          <p class="text-danger">{{ err }}</p>
          <button type="submit" class="btn btn-primary">Sign up</button>
      </form>
    </div>
  </template>
  
  <script>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

  export default {
    data() {
      return {
          email : '',
          password : '',
          err : ''
      };
    },
    methods: {
      handleSubmit:function(){
          // console.log(this.email, this.password)
          const auth = getAuth()
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredentials)=>{
              const user = userCredentials.user
              console.log(user)
              this.err = ''
              this.$router.push('/');
            })
            .catch(error=>{
              this.err = error
              console.log(error)
            })
      }
    }
  };
  </script>
  
  <style scoped>
  </style>