import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import TodoRepository from './repositories/TodoRepository';

const app = createApp(App);

app.provide('todosRepository', new TodoRepository('http://localhost:5000'));

app.mount('#app');