,
<template>
  <div id="app">
    <nav>
      <router-link to="/" v-if="loggedUser" >Home|</router-link>
      <router-link to="/login" v-if="!loggedUser" >Login|</router-link>
      <router-link to="/signup" v-if="!loggedUser" >Signup|</router-link>
      <!-- <router-link to="/about" v-if="loggedUser">About|</router-link> -->
      <router-link to="/profile" v-if="loggedUser">profile|</router-link>
      <span
        class="btn btn-primary p-1"
        v-if="loggedUser"  
        @click="handleSignout"
      >log out</span>
      <!-- <button @click="$router.push('/login')">Go to login</button> -->
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { auth } from './firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { mapActions, mapState } from 'pinia';
import { useTaskStore } from './store/TaskStore';
export default{

  data(){
      return {
        
      }
  },
  computed : {
    ...mapState(useTaskStore, ['loggedUser'])
  },
  methods:{
    ...mapActions(useTaskStore,['setLoggedInUser','getTasks']),
    handleSignout:function(){
      // console.log("inside logout")
      const auth = getAuth()
      this.setLoggedInUser(null)
      signOut(auth)
      this.$router.push('/login')
    }
  },
  created(){
    // this.getTasks();
    onAuthStateChanged(auth,(user)=>{
      // console.log("this is user -->",user);
      // this.user = user
      if(user){
        // console.log(this.loggedUser)
        this.setLoggedInUser(user)
        // console.log(this.loggedUser)
      }
      else{
        this.setLoggedInUser(null)
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
