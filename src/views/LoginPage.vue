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
        <p class="text-danger pt-1">{{ error }}</p>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/TaskStore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { mapState } from 'pinia';

export default {
  data() {
    return {
        email : '',
        password : '',
        error : ''
    };
  },
  methods: {
    handleSubmit:function(){
        // console.log(this.email, this.password)
        const auth = getAuth()
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredentials)=>{
            const user = userCredentials.user
            console.log("user", user)
            this.error = ''
            this.$router.push('/')
          })
          .catch(err=>{
            console.log("err.Error",err)
            this.error = "invalid-credential"
          })
    }
  },
  computed : {
    ...mapState(useTaskStore, ['loggedUser'])
  },
  beforeMount(){
      // console.log(this.loggedUser)
      if(this.loggedUser){
        // console.log("inside login created -> "+ "user does exist")
        this.$router.push('/')
      }
      else{
        // console.log("inside login created -> "+ "user is not exist")
      }
  },
  watch:{
    loggedUser(newVal){
      if(newVal){
        this.$router.push('/')
      }
    }
  }
};
</script>

<style scoped>
</style>