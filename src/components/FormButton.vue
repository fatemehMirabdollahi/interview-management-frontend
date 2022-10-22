<template>
  <button
    class="i-flex i-flex-align-center i-flex-justify-center"
    @click="$emit('i-click')"
    :class="[
      action == 'secondary' ? 'secondary' : 'primary',
      theme == `light` ? `${action}__light` : '',
      { disable: disable },
    ]"
    :style="{ width: `${size.width}px`, height: `${size.height}px` }"
    :disabled="disable"
  >
    <span class="i-flex i-flex-justify-center i-flex-align-center label">{{
      label
    }}</span>
  </button>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: "primary",
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
  emit: ["i-click"],
};
</script>

<style lang="scss" scoped>
$fontSize: fontSize("lg");
$border: 6px;

.primary {
  cursor: pointer;
  background-color: var(--color-3);
  color: var(--on-color-3);
  font-size: $fontSize;
  border-radius: $border;
  &:focus {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &:hover {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &__light {
    background-color: var(--on-color-3);
    color: var(--color-3);
    &:focus {
      border: none;
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
    &:hover {
      border: none;
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
  }
}
.secondary {
  cursor: pointer;
  background-color: transparent;
  color: var(--color-3);
  border: solid var(--color-3) 1px;
  font-size: $fontSize;
  border-radius: $border;
  &:focus {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &:hover {
    border: 2px solid var(--highlight-color);
    box-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
  }
  &__light {
    color: var(--on-color-3);
    border: solid var(--on-color-3) 1px;
    &:focus {
      border: 2px solid var(--highlight-light-color);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
    &:hover {
      border: 2px solid var(--highlight-light-color);
      box-shadow: var(--highlight-light-color) 1.95px 1.95px 2.6px;
    }
  }
}

.label {
  top: -2px;
  position: relative;
}
.disable {
  &:hover {
    border: none;
    box-shadow: none;
    cursor: default;
  }
  opacity: 0.8;
}
</style>
