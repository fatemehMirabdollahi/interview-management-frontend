<template>
  <div
    class="i-flex-1 i-flex-column field__body"
    :class="
      theme == 'light'
        ? 'field__body--light'
        : theme == 'contrast'
        ? 'field__body--contrast'
        : ''
    "
    :style="{ opacity: disabled ? '0.5' : '1' }"
  >
    <span v-if="label" class="field__label">{{ label }} :</span>
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
        :class="[
          {
            'input-selected': selected,
            'input--light': theme == 'light',
            'input--contrast': theme == 'contrast',
            'input-error': error,
          },
        ]"
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
    theme: {
      type: String,
    },
    range: {
      type: Object,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    error() {
      if (this.range)
        if (
          this.modelValue < this.range.min ||
          this.modelValue > this.range.max ||
          (!Number(this.modelValue) && Number(this.modelValue) !== 0)
        ) {
          return true;
        }
      return false;
    },
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
  &:hover {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &-selected {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }

  &--light {
    background: var(--on-color-3);
    color: var(--color-3);
    &:focus {
      // border: 2px solid var(--highlight-light-color);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
      border: none;
    }
    &:hover {
      // border: 2px solid var(--highlight-light-color);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
      border: none;
    }
  }
  &--contrast {
    background-color: transparent;
    color: var(--on-color-1);
    border: solid 1px var(--color-3);
    &:focus {
      border: solid 1px var(--color-3);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
    &:hover {
      border: solid 1px var(--color-3);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
  }
  &-error {
    border: 2px red solid !important;
  }
}
.field {
  position: relative;
  text-align: center;
  width: 100%;
  color: var(--on-color-3);
  &__body {
    min-height: 40px;
    &--light {
      .field__label {
        color: var(--on-color-3);
      }
    }
  }
  &__label {
    font-size: fontSize("l");
    margin-bottom: 15px;
    color: var(--on-color-1);
  }
  &--light {
    color: var(--color-3);
  }
}
</style>
