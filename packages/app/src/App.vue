<script setup lang="ts">
import { reactive, ref, inject, onMounted } from 'vue';
import Todo from './components/Todo.vue';
import TodoForm from './forms/TodoForm.vue';
import type TodoRepository from './repositories/TodoRepository';
import type { Todo as TodoType } from "./types";

const currentDisabledIds = reactive<Set<string>>(new Set());
const inEditingIds = reactive<Set<string>>(new Set());
const todos = ref<Map<string, TodoType>>(new Map());

const todosRepo = inject<TodoRepository>('todosRepository')!;

onMounted(async () => {
    const todosArray = await todosRepo.getAll() as TodoType[];
    todos.value = new Map(todosArray.map(todo => [todo.id, todo]));
});

const deleteTodo = async (id: string) => {
    if(currentDisabledIds.has(id)) return;
    currentDisabledIds.add(id);

    await todosRepo.delete(id);
    todos.value.delete(id);
    currentDisabledIds.delete(id);
};
const checkTodo = async (dto: TodoType) => {
    if(currentDisabledIds.has(dto.id)) return;
    currentDisabledIds.add(dto.id);

    const updated = await todosRepo.update(dto);
    if(updated) {
        todos.value.set(dto.id, updated);
        currentDisabledIds.delete(dto.id);
    }
};

const updateTodo = async (dto: TodoType) => {
    if(dto.content.length > 65) return;

    if(currentDisabledIds.has(dto.id)) return;
    currentDisabledIds.add(dto.id);

    const updated = await todosRepo.update(dto);
    if(updated) {
        todos.value.set(dto.id, updated);
        currentDisabledIds.delete(dto.id);
        inEditingIds.delete(dto.id);
    }
};

const createTodo = async (content: string) => {
    const newTodo = await todosRepo.create(content);
    todos.value.set(newTodo.id ,newTodo);
};

</script>

<template>
    <main>
        <TodoForm @submit="createTodo($event)" />
        <section>
            <Todo
                v-for="[key, todo] in todos"
                :key="key" 
                :todo="todo"
                @toggle="checkTodo($event)"
                :isDisabled="currentDisabledIds.has(key)">

                <template v-if="inEditingIds.has(key)" #default>
                    <textarea
                        v-model="todo.content"
                        class="todo_editbox" 
                        :class="{ 'text-error': todo.content.length > 65 }">
                    </textarea>
                </template>

                <template #append>
                    <template v-if="inEditingIds.has(key)">
                        <button class="bg-success" @click="updateTodo(todo)">save</button>
                        <button class="bg-primary" @click="inEditingIds.delete(key)">cancel</button>
                    </template>

                    <template v-else>
                        <button class="bg-primary" @click="inEditingIds.add(todo.id);">edit</button>
                        <button class="bg-error" @click="deleteTodo(todo.id)">delete</button>
                    </template>
                </template>
            </Todo>
        </section>
    </main>
</template>

<style scoped lang="scss">
    main {
        width: 100%;
        display: flex;
        flex-direction: column;

        @media only screen and (min-width: 500px) {
            grid-column-start: 2;
            grid-column-end: 3;
        }

        section {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            .todo_editbox {
                border: none;
                outline: none;
                border-color: Transparent;
                resize: none;
                border-bottom: 1px dotted grey;
            }
        }
    }
</style>
