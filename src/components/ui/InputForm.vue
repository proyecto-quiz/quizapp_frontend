<script setup lang="ts">
import { Directive, InputHTMLAttributes, useAttrs } from 'vue';
import { ErrorResponse } from '@@/type-config-api';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  name?: string;
  id?: string;
  modelValue: any;

  hasError?: boolean;
  helpErrorMsg?: ErrorResponse['detail'];

  isFocus?: boolean;

  /**
   * Container class
   */
  cClass?: string;

  labelName: string;
  labelClass?: string | 'text-secondary dark:text-primary-light';
}

const emits = defineEmits(['update:modelValue']);
const props = defineProps<Props>();
const attrs = useAttrs();

function handleValueInput(e: any) {
  emits('update:modelValue', e.target?.value);
}

// Directives
const vFocus: Directive = {
  mounted: (e) => {
    if (props.isFocus) e.focus();
  },
};
</script>

<template>
  <slot>
    <div :class="props.cClass || 'block w-auto'">
      <label :class="['text-label', props.labelClass]" :for="name || id">
        {{ props.labelName }}
      </label>
      <div>
        <input
          v-focus="vFocus"
          v-bind="{ ...props, ...attrs }"
          :class="[props.hasError && 'border-error']"
          :value="props.modelValue"
          @input="handleValueInput"
        />
        <slot>
          <small v-if="props.hasError" class="text-help-error">{{ props.helpErrorMsg }}</small>
        </slot>
      </div>
    </div>
  </slot>
</template>

<style scoped>
.text-label {
  @apply font-medium;
}

.border-error {
  @apply border-[1.65px] border-rose-500/50 ring-rose-500/80;
}

.text-help-error {
  @apply font-semibold text-rose-500 drop-shadow-sm;
}
</style>
