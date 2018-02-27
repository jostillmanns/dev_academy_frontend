<template>
  <div>
 	<input
	  type="checkbox"
	  :id="todo.id"
	  :checked="todo.checked"
	  @change="triggerTodoItem({todo})">
	<label :for="todo.id">{{ todo.subject }}</label>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  
export default {
    name: 'Todo',
    props: {
	id: {
	    type: String,
	    required: true,
	}
    },
    computed: {
	todo () {
	    return this.$store.getters.todo(this.id);
	},
    },
    methods: {
	...mapActions([
	    'triggerTodoItem',
	]),
    }
}
</script>
