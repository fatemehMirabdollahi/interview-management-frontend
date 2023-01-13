<template>
  <div
    class="i-flex i-flex-align-center i-flex-1"
    :class="{ 'picker-hidden': iconOnly }"
  >
    <div class="i-flex i-flex-align-center picker__box">
      <input
        :id="id"
        class="i-flex-1 i-flex-align-center i-flex-justify-center"
        type="text"
        v-model="datetime"
      />
      <i class="icon bi bi-calendar2-week" @click="$emit('esc')" />
    </div>
    <picker
      format="X"
      v-model="value"
      :value="modelValue"
      :disable="disableFuture"
      locale="fa"
      :convert-numbers="true"
      :color="color"
      :type="type"
      @change="input"
      :element="id"
      :multiple="multiple"
    >
    </picker>
  </div>
</template>
<script>
import Picker from "vue3-persian-datetime-picker";
import moment from "moment-jalaali";

export default {
  props: {
    disableFuture: {
      type: Function,
      default: () => {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      default: null,
    },
    type: {
      default: "date",
    },
    id: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Picker,
  },
  data() {
    return {
      value: this.modelValue,
    };
  },
  computed: {
    datetime() {
      if (!this.iconOnly) {
        let m;
        if (this.modelValue) {
          m = moment.unix(this.modelValue);
          return this.type == "datetime"
            ? m.format("HH:mm jYYYY/jMM/jDD")
            : m.format("jYYYY/jMM/jDD");
        }
      }
      return null;
    },
    color() {
      return "#394454";
    },
  },
  methods: {
    input(v) {
      this.$emit(
        "update:modelValue",
        v.map((el) => el.format("jYYYY/jMM/jDD"))
      );
    },
  },
};
</script>
<style lang="scss" scoped>
$field-height: 40px;
input {
  border: none;
  padding: 0;
  min-width: 0;
  background-color: transparent;
  height: $field-height;
  width: 100%;
  z-index: 2;
  &:disabled {
    color: var(--on-color-2);
  }
}
.picker {
  &-hidden {
    .picker__box {
      border: none;
      padding: 0;
      & > input {
        width: 40px;
        cursor: pointer;
        color: var(--color-1);
      }
    }
  }
  &__box {
    border-radius: 4px;
    border: 1px solid var(--color-3);
    color: var(--gray1);
    padding: 2px 12px;
    height: $field-height;
    width: 100%;
  }
}
.icon {
  position: relative;
  left: 39px;
  font-size: 40px;
}
.picker__box {
  position: relative;
  &:hover {
    text-shadow: var(--highlight-color) 1px 1px 2px;
  }
}
</style>
