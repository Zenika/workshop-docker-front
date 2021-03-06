<template>
  <section class="todoapp">
    <TodoInput :add-todo="addTodo"/>
    <section class="main" v-show="todos.length" v-cloak>
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" class="todo" :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo"
                 @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
      <ul class="filters">
        <li>
          <router-link to="/all"
                       :class="{ selected: visibility === VISIBILITY.ALL }"
          >
            All
          </router-link>
        </li>
        <li>
          <router-link to="/active"
                       :class="{ selected: visibility === VISIBILITY.ACTIVE }"
          >
            Active
          </router-link>
        </li>
        <li>
          <router-link to="/completed"
                       :class="{ selected: visibility === VISIBILITY.COMPLETED }"
          >
            Completed
          </router-link>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>
<script>
import todoStorage from './helpers/storage'
import TodoInput from './components/TodoInput'
import { VISIBILITY } from './enums/visibility'

// app Vue instance
export default {
  components: {
    TodoInput
  },
  // visibility filters
  filters: {
    all: function (todos) {
      return todos
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed
      })
    },
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  },
  // app initial state
  data () {
    return {
      todos: todoStorage.fetch(),
      editedTodo: null,
      VISIBILITY,
      visibility: VISIBILITY.ALL
    }
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      deep: true,
      handler (todos) {
        todoStorage.save(todos)
      }
    },
    '$route' (to, from) {
      this.visibility = to.params.visibility
    }
  },
  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return this.$options.filters[this.visibility](this.todos)
    },
    remaining: function () {
      return this.$options.filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },
  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function (newTodo) {
      const value = newTodo && newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    removeCompleted: function () {
      this.todos = this.$options.filters.active(this.todos)
    }
  }
}
</script>
