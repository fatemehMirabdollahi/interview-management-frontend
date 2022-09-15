<template>
  <transition name="modal-fade">
    <div
      ref="modal"
      class="i-flex i-flex-align-center i-flex-justify-center modal-backdrop"
      tabindex="-1"
    >
      <div class="modal i-flex-column">
        <div class="i-flex i-flex-justify-between modal__header">
          <span class="modal__header-title">{{ title }}</span>
          <img
            class="modal__header-close"
            src="../assets/images/close.svg"
            alt=""
            @click="$emit('esc')"
          />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      el: null,
    };
  },
  mounted() {
    this.el = this.$refs["modal"];
    document.body.addEventListener("keydown", this.esc);
  },
  beforeUnmount() {
    document.body.removeEventListener("keydown", this.esc);
  },
  methods: {
    esc(event) {
      let elString =
        this.el.localName +
        "." +
        Array.from(this.el.classList.values()).join(".");
      let zIndex = window.getComputedStyle(this.el).zIndex;
      let children = document.querySelectorAll(`${elString} *`);
      let anyChildOnTop = Array.from(children).find((child) => {
        let childZIndex = window.getComputedStyle(child).zIndex;
        if (!isNaN(childZIndex) && parseInt(childZIndex) > parseInt(zIndex))
          return true;
        return false;
      });
      if (anyChildOnTop) return;
      if (event.keyCode == 27) {
        this.$emit("esc");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: relative;
  background-color: var(--color-3);
  box-shadow: 2px 2px 5px #65616165;
  border-radius: 10px;
}
.modal-backdrop {
  position: fixed;
  z-index: 1001;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #65616165;
  backdrop-filter: blur(15px);
}

.modal-fade-enter-from,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal__header {
  padding: 16px 24px 16px 24px;
  border-bottom: 1px solid var(--on-color-3);
  color: var(--on-color-3);
  &-title {
    font-size: 20px;
  }
  &-close {
    width: 10px;
    cursor: pointer;
  }
}
</style>
