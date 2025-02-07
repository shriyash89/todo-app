<template>
  <div class="app-div">
    <TodoList></TodoList>
  </div>
</template>

<script>

import TodoList from './components/TodoList.vue';

export default {
  components : {
    TodoList : TodoList
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
.app-div{
  margin: 0;
}
</style>