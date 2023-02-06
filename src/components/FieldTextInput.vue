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
        @focus="$emit('focus'), (focused = true), (clicked = true)"
        @focusout="focused = false"
        @change="$emit('change')"
        :type="type"
        :disabled="disabled"
        :readonly="readOnly"
        :placeholder="placeholder"
        class="input"
        :id="id"
        :class="[
          {
            'input-selected': selected,
            'input--light': theme == 'light',
            'input--contrast': theme == 'contrast',
            'input-error': hasError && clicked,
          },
        ]"
      />
      <i
        v-b-tooltip.hover
        :title="errorMessage"
        class="bi bi-exclamation-circle-fill error-icon"
        v-if="hasError && clicked"
      ></i>
    </div>
  </div>
</template>
<script>
import { computed, watch, onMounted } from "vue";
import { useField } from "vee-validate";

export default {
  emits: ["update:modelValue", "focus", "change"],
  setup(props) {
    if (props.type == "number") {
      const mandatoryValidationRules = [];
      const validationRules = computed(() => {
        const rules = props.rules.join("|");
        if (rules.search(/(double|integer|numeric)/) < 0) {
          return [...mandatoryValidationRules, ...props.rules].join("|");
        }
        return rules;
      });
      const { errorMessage, value } = useField("numberField", validationRules);
      const hasError = computed(() => {
        return errorMessage.value != undefined;
      });
      watch(
        () => props.modelValue,
        (newValue) => {
          value.value = newValue;
        }
      );

      return {
        errorMessage,
        hasError,
        value,
      };
    } else {
      const validationRules = [...props.rules].join("|");
      const { errorMessage, value } = useField("textField", validationRules);
      const hasError = computed(() => {
        return errorMessage.value != undefined;
      });
      onMounted(() => {
        value.value = props.modelValue;
      });
      watch(
        () => props.modelValue,
        (newValue) => {
          value.value = newValue;
        }
      );
      return { errorMessage, hasError, value };
    }
  },
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
    rules: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      focused: false,
      clicked: false,
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
.error-icon {
  color: red;
  position: absolute;
  top: 9px;
  left: 7px;
  z-index: 2;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
