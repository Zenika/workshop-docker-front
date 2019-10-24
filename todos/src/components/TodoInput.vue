<template>
  <header class="header">
    <h1>
      todos
    </h1>
    <input class="new-todo"
           autofocus
           autocomplete="off"
           placeholder="What needs to be done?"
           v-model="newTodo"
           @keyup.enter="registerNewTodo"
    >
  </header>
</template>
<script>
export default {
  name: 'TodoInput',
  props: {
    addTodo: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      newTodo: ''
    }
  },
  methods: {
    registerNewTodo () {
      this.addTodo(this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>
<style>
  h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
</style>
