<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import QuestionText from '@/components/question/QuestionText.vue';
import QuestionAlternatives from '@/components/question/QuestionAlternatives.vue';
import QuestionResponse from '@/components/question/QuestionResponse.vue';
import { usePreguntaStore } from '@/stores';
import { SolucionForm } from '@@/types-forms';
import { useSolucionRef } from '@/composables/stores';
import { useSolucionStore } from '@/stores';
import Spinner from '@/components/ui/Spinner.vue';
import { useRouter } from 'vue-router';
//icons
import Cross from '@/components/draws/icons/Cross.vue';
import NextIcon from '@/components/draws/icons/NextIcon.vue';

const router = useRouter();
const solucionStore = useSolucionStore();
const preguntaStore = usePreguntaStore();
const preguntaStoreComp = computed(() => preguntaStore);
const preguntas = computed(() => {
  return preguntaStore.getPregunta;
});
onMounted(async () => {
  await preguntaStore.preguntaGeneralAction();
  await preguntaStore.resetPreguntaStatusAction();
  if (preguntaStore.getPregunta == null) {
    router.push({ name: 'Home' });
  }
});
const selectDisabled = ref(false);
const respuesta = ref({
  color: '',
  message: '',
  status: '',
});
const stateForm = reactive<SolucionForm>({
  question: '',
  level: '',
  answer: '',
});
async function handleSelectClick(answerId: any | 0) {
  selectDisabled.value = true;
  stateForm.answer = answerId;
  stateForm.level = preguntaStore.level;
  stateForm.question = preguntas.value?.id;
  await solucionStore.solucionAction(stateForm);
  respuestaPregunta();
  await preguntaStore.responderAction();
}
async function handleNextClick() {
  solucionStore.$reset();
  preguntaStore.resetPreguntaStatusAction();
  await preguntaStore.preguntaGeneralAction();
  stateForm.answer = '';
  selectDisabled.value = false;
}
async function respuestaPregunta() {
  if (solucionStore.respuesta === true) {
    respuesta.value.status = 'Bien';
    respuesta.value.message = 'Felicidades...!!!';
    respuesta.value.color = 'green';
  } else {
    respuesta.value.status = 'Mal';
    respuesta.value.message = 'La respuesta es: ' + solucionStore.respuestaCorrecta;
    respuesta.value.color = 'red';
  }
}
const { isLoading } = useSolucionRef();
</script>
<template>
  <div class="container">
    <Transition name="view-pregunta">
      <section v-if="preguntaStore.isLoading" class="spinner__loading">
        <Spinner type="green" class="h-8 w-8" />
      </section>
      <section v-else-if="preguntaStoreComp.isError">
        <div class="my-5 flex items-center justify-between">
          <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">
            Lo sentimos ocurrió un error
          </h1>
          <router-link :to="{ name: 'Home' }" class="btn-close button mt-4">
            <Cross class="h-5 w-5"></Cross>
          </router-link>
        </div>
      </section>
      <section v-else>
        <div class="flex items-center justify-between py-5">
          <h1
            class="flex text-lg font-medium uppercase text-blue-600 dark:text-contrast-01 md:text-3xl"
          >
            {{ preguntas?.course.name }}
          </h1>
          <router-link :to="{ name: 'Home' }" class="btn-close button">
            <Cross class="h-5 w-5"></Cross>
          </router-link>
        </div>
        <QuestionText :text="preguntas?.text"></QuestionText>
        <QuestionAlternatives
          :alternativas="preguntas?.alternatives"
          :selectDisabled="selectDisabled"
          @select-item="handleSelectClick"
        ></QuestionAlternatives>
        <div v-if="isLoading" class="flex items-center justify-center">
          <Spinner type="contrast" class="flex h-7 w-7" />
        </div>
        <div v-if="preguntaStoreComp.preguntaStatus != false">
          <QuestionResponse v-bind="respuesta"></QuestionResponse>
        </div>
        <div class="flex flex-row justify-end gap-2">
          <button type="submit" class="btn-close button mt-4 justify-end" @click="handleNextClick">
            <NextIcon class="h-5 w-5"></NextIcon>
          </button>
        </div>
      </section>
    </Transition>
  </div>
</template>
<style scoped>
.btn-close {
  @apply bg-contrast-01;
}
.btn-close:hover {
  filter: drop-shadow(0 0 1em #b3db1faa);
}
.container {
  @apply mx-auto p-10;
}
.spinner__loading {
  @apply flex flex-col items-center justify-center gap-y-3;
}
/* view-pregunta transition */
.view-pregunta-enter-from,
.view-pregunta-leave-to {
  opacity: 0;
}

.view-pregunta-enter-to,
.view-pregunta-leave-leave {
  opacity: 1;
}

.view-pregunta-enter-active,
.view-pregunta-leave-active {
  transition-property: opacity;
  transition-duration: 800ms;
  transition-timing-function: cubic-bezier(0.115, 0.74, 0.855, 1);
  transition-delay: 500ms;
}
</style>
