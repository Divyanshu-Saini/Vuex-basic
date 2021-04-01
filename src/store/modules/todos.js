import axios from 'axios';

// data storage
const state = {
    todos: []
};

// gett data stored in storage
const getters = {
    allTodos: state => state.todos
};

/**
 * @description perform action on data storage
 * @param {commit} used to mutating the data/ modifing data in the storage
 */
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit('setTodos', response.data);
    },

    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });

        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },

    async filterTodos({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
    },

    async updateTodo({ commit }, updTodo) {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`);

        commit('updTodo', updTodo);
    }
};

// actuall data change logic
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => (state.todos = state.todos.filter(ele => ele.id != id)),
    updTodo: (state, updTodo) => {
        const index = state.todos.findIndex(ele => ele.id === updTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
