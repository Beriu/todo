<script setup lang="ts">
import { ref, computed } from 'vue';

const content = ref('');

const emit = defineEmits<{ (e: 'submit', content: string): void }>();

const submitForm = () => {
    if(content.value === '') return;
    emit('submit', content.value);
    content.value = "";
};

const maxCharacters = 65;
const characterCount = computed(() => content.value.length);
const exceedsCharacterLimit = computed(() => characterCount.value > maxCharacters);

</script>

<template>
    <form @submit.prevent="submitForm()">
        <span :class="{ 'text-error': exceedsCharacterLimit }">
            {{ characterCount }} / {{ maxCharacters }}
        </span>

        <div class="form_elements">
            <input type="text" v-model="content" />
            <button :disabled="!content || exceedsCharacterLimit" type="submit">Create Todo</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;

        .form_elements {
            display: flex;
            
            input {
                flex-grow: 1;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }


        }

        span {
            text-align: right;
        }
    }
</style>