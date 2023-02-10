<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../types"

const props = defineProps<{ todo: Todo, isDisabled: boolean }>();
const emit = defineEmits<{ (e: 'toggle', dto: Todo): void }>();

const controlsVissibility = ref(false);

const toggle = (isCompleted: boolean) => {
    emit('toggle', { id: props.todo.id, content: props.todo.content, isCompleted });
};

</script>

<template>
    <div
    @mouseenter="controlsVissibility = true"
    @mouseleave="controlsVissibility = false"
    :class="{ disabled: isDisabled }" 
    class="body">
        <div class="prepend">
            <slot name="prepend">
                <input 
                    :disabled="isDisabled" 
                    @input="toggle(!todo.isCompleted)" 
                    type="checkbox" 
                    :checked="todo.isCompleted" />
            </slot>
        </div>
        <div class="content">
            <slot>
                <span :class="{ 'strike': todo.isCompleted }">{{  todo.content }}</span>
            </slot>
        </div>
        <div v-show="controlsVissibility" class="append">
            <slot name="append" :todo="todo"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .body {
        border-radius: var(--border-radius-default);
        background-color: rgba($color: #FFFFFF, $alpha: .1);
        display: flex;
        align-items: center;
        padding: .5rem .5rem;
        gap: .5rem;

        .prepend {
            flex-grow: 0;
        }

        .content {
            flex-grow: 1;
            display: block;
            overflow-wrap: break-word;
        }

        .append {
            display: flex;
            flex-grow: 0;
            flex-direction: row;
            gap: .5rem;
        }
    }

    .strike {
        text-decoration: line-through;
    }

    .disabled {
        pointer-events: none;
        color: grey;
    }
</style>