<template>
<div v-bind:style="{ color: getColor }">
  <h1>Todo List</h1>
  <div v-if="todoRequestError !== ''">
    {{ todoRequestError }}
  </div>
  <div v-else>
    <p v-if="loadingTodos">Loading...</p>
    <ul v-else>
      <template v-for="todo in todos">
	<todo :id="todo.id"></todo>
      </template>
    </ul>

    <div>
      <input type="text" v-model="todo">
      <input type="submit" @click="addTodo" value="Add item">
    </div>
  </div>  
</div>
</template>

<script>
import { mapActions } from 'vuex';
import Todo from './Todo.vue';
import { mapGetters } from './vuex/modules';
  
export default {
    name: 'TodoList',
    data() {
	return {
	    todo: '',
	};
    },
    components: {
	Todo,
    },
    computed: {
	...mapGetters({ getters: [
	    'loadingTodos',
	    'todos',
	    'todoRequestError',
	]}),
	namespace () {
	    return this.$route.params.color;
	},
	...mapGetters({ prop: 'namespace', getters: [
	    'getColor',
	]})
    },
    methods: {
	...mapActions([
	    'storeTodo',
	]),
	addTodo() {
	    this.storeTodo({ subject: this.todo });
	    this.todo = "";
	},
    },
}
</script>
