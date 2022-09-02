<template>
  <div class="i-flex-1 i-flex-column i-flex-justify-center addYear">
    <div class="i-flex addYear__add" @click="uploadForm = true">
      <img
        class="i-flex addYear__add__icon"
        src="../assets/images/add.svg"
        alt=""
      />

      <span class="i-flex addYear__add-text"
        >اضافه کردن سال جدید جهت مصاحبه</span
      >
    </div>
    <div class="addYear__table i-flex-column">
      <div class="addYear__table__row addYear__table__row--header i-flex">
        <div class="i-flex i-flex-align-center" style="flex: 1"></div>
        <div class="i-flex i-flex-align-center" style="flex: 4">سال</div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          تعداد متقاضیان
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          مصاحبه شده ها
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          تعداد قبولی ها
        </div>
      </div>
      <div
        class="addYear__table__row i-flex"
        v-for="(row, index) in yearData"
        :key="index"
      >
        <div class="i-flex i-flex-align-center" style="flex: 1">
          {{ index + 1 }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 4">
          {{ row.year }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.requests }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.interviewed }}
        </div>
        <div class="i-flex i-flex-align-center" style="flex: 3">
          {{ row.accepts }}
        </div>
      </div>
    </div>
  </div>
  <modal-window v-if="uploadForm" @esc="uploadForm = false">
    <div class="upload i-flex-column">
      <div class="i-flex i-flex-justify-between upload__header">
        <span class="upload__header-title">اضافه کردن سال تحصیلی جدید</span>
        <img
          class="upload__header-close"
          src="../assets/images/close.svg"
          alt=""
          @click="uploadForm = false"
        />
      </div>
      <div class="i-flex-column upload__content">
        <field-text-input theme="light" />
      </div>
    </div>
  </modal-window>
</template>

<script>
import ModalWindow from "./ModalWindow";
import FieldTextInput from "./FieldTextInput";
export default {
  components: { FieldTextInput, ModalWindow },
  data() {
    return {
      yearData: [
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
        {
          year: 1399,
          requests: 200,
          interviewed: 100,
          accepts: 100,
        },
      ],
      uploadForm: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.addYear {
  padding: 100px;

  &__table {
    width: 90%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    // border: solid 1px var(--on-color-1);
    border-collapse: collapse;
    border-radius: 8px;
    font-size: 18px;
    &__row {
      padding: 0 16px;
      &--header {
        background-color: var(--color-3);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: var(--on-color-3);
        padding: 0 16px;
        font-size: 20px;
      }
      height: 50px;
      border-bottom: 1px solid var(--color-2);
      &:last-child {
        border-bottom: 2px solid var(--color-3);
      }
      &:nth-of-type(even) {
        background-color: var(--on-color-3);
      }
      &:hover {
        text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
      }
    }
  }
  &__add {
    align-self: flex-start;
    margin-bottom: 16px;
    cursor: pointer;
    &:hover {
      text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
    }
    &__icon {
      margin-left: 16px;
      width: 25px;
    }
    &-text {
      font-size: 18px;
    }
  }
}
.upload {
  min-width: 600px;
  min-height: 400px;
  padding: 24px;
  color: var(--on-color-3);
  &__header {
    &-title {
      font-size: 20px;
    }
    &-close {
      width: 10px;
      cursor: pointer;
    }
  }
  &__content {
    padding: 10px;
  }
}
</style>
