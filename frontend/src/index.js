import App from './App.vue';
import Router from 'vue-router';
import Todos from './Todos.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import uuid from 'js-uuid';

Vue.use(Vuex);
Vue.use(Router);

const updatedTodos = (todos, update) => {
    return todos.map(todo => {
	if (todo.id !== update.id) {
	    return todo;
	}

	return update;
    });
};

const store = new Vuex.Store({
    modules: {
	pink: {
	    namespaced: true,
	    state: {
		defaultColor: 'pink',
	    },
	    getters: {
		getColor: (state) => {
		    return state.defaultColor;
		}
	    },
	},
	green: {
	    namespaced: true,
	    state: {
		colors: {
		    defaultColor: 'green',
		},
	    },
	    getters: {
		getColor: (state) => {
		    return state.colors.defaultColor;
		}
	    }
	}
    },
    state: {
	loadingTodos: true,
	todos: [],
	todoRequestError: '',
    },
    mutations: {
	storeTodos (state, {todos}) {
	    state.todos = todos;
	},
	todoRequestError (state, {message}) {
	    state.todoRequestError = message;
	},
	disableLoadingTodos (state) {
	    state.loadingTodos = false;
	},
	updateTodos (state, { todos }) {
	    state.todos = todos;
	},
    },
    getters: {
	todo: (state) => (id) => {
	    return state.todos.filter(todo => todo.id === id)[0];
	},
	todos: (state) => {
	    return state.todos;
	},
	loadingTodos: (state) => {
	    return state.loadingTodos;
	},
	todoRequestError: (state) => {
	    return state.todoRequestError;
	},
    },
    actions: {
	triggerTodoItem ({ commit, getters }, { todo }) {
	    todo.checked = !todo.checked;
	    
	    axios.post('/todos', updatedTodos( getters.todos, todo) )
		.then(response => commit('updateTodos', { todos: updatedTodos( getters.todos, todo) }))
		.catch(error => store.commit('todoRequestError', {message: 'error updating todos' }));
	},
	storeTodo({ commit, getters }, { subject }) {
	    const todos = [...getters.todos, {id: uuid.v4(), checked: false, subject: subject}];
	    axios.post('/todos', todos)
		.then(response => commit('updateTodos', { todos }))
		.catch(error => store.commit('todoRequestError', {message: 'error updating todos' }));
	}
    }
});

const router = new Router({
    mode: 'hash',
    routes: [
	{
	    path: '/todos/:color',
	    component: Todos,
	    beforeEnter: (to, from, next) => {
		next();
		
	    	axios.get('/todos')
	    	    .then(response => {
			store.commit('storeTodos', { todos: response.data });
			store.commit('disableLoadingTodos');
		    })
	    	    .catch(error => store.commit('todoRequestError', {message: 'error loading data' }) );
	    },
	},
    ],
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
