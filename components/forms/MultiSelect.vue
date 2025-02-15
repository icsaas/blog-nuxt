<script setup lang="ts">
interface Props {
  modelValue: any[]
  options: {label: string, value: any}[]
  placeholder?: string
  noDataPlaceholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  noDataPlaceholder: 'No data'
})

const emit = defineEmits<{
  (e: 'update:modelValue', newValues: any[]): void
}>()

const displayValues = computed(() => {
  if (!props.modelValue || !props.modelValue.length) return ''

  return props.options.filter((option) => {
    return props.modelValue.includes(option.value)
  }).map(option => option.label).join(', ')
})

const handleChange = (option: { label: string, value: any }) => {
  // Uncheck
  if (props.modelValue.includes(option.value)) {
    emit('update:modelValue', props.modelValue.filter(value => value !== option.value))
  } else {
  // Check
    emit('update:modelValue', [ ...props.modelValue, option.value ])
  }
}
</script>

<template>
  <div class="dropdown">
    <div
      :tabindex="0"
      class="input input-bordered input-sm w-full cursor-pointer"
    >
      <span
        :class="{
          'opacity-70': !displayValues,
        }"
      >
        {{ displayValues || placeholder }}
      </span>
    </div>
    <div
      :tabIndex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-w-lg max-h-64 overflow-y-auto z-20"
    >
      <!-- Without div ul and li will break flex -->
      <div v-if="options.length">
        <ul
          v-for="option in options"
          :key="option.value"
        >
          <li class="form-control items-start p-0">
            <label class="label cursor-pointer space-x-2 w-full justify-start py-2">
              <input
                type="checkbox"
                :checked="modelValue.includes(option.value)"
                :aria-checked="modelValue.includes(option.value)"
                class="checkbox checkbox-primary"
                @change="() => handleChange(option)"
              >
              <span class="label-text">{{ option.label }}</span>
            </label>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="text-center p-2"
      >
        {{ noDataPlaceholder }}
      </div>
    </div>
  </div>
</template>
