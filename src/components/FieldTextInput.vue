<template>
  <div
    class="i-flex-1 i-flex-column field__body"
    :style="{ opacity: disabled ? '0.5' : '1' }"
  >
    <span class="field__label">{{ label }} :</span>
    <div class="i-flex field">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus'), (focused = true)"
        @focusout="focused = false"
        :type="type"
        :disabled="disabled"
        :readonly="readOnly"
        :placeholder="placeholder"
        class="input"
        :class="[{ 'input-selected': selected }]"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  created() {},
};
</script>
<style lang="scss" scoped>
$text-disable-color: #b2b3b6;
$field-height: 40px;
.input {
  padding: 7.5px 12px;
  min-width: 0;
  border-radius: 6px;
  height: $field-height;
  border: none;
  background: var(--color-3);
  z-index: 2;
  width: 100%;
  font-size: fontSize("l");
  color: var(--on-color-3);

  &:disabled {
    color: $text-disable-color;
  }
  &:focus {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &-selected {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
}
.field {
  &__body {
    min-height: 40px;
  }
  position: relative;
  text-align: center;
  width: 100%;
  color: var(--on-color-3);
  &__label {
    font-size: fontSize("l");
    margin-bottom: 15px;
    color: var(--on-color-1);
  }
}
</style>
