<template>
  <div
    class="user-management i-flex i-flex-column i-flex-align-center i-flex-justify-center"
  >
    <div class="i-flex i-flex-column">
      <div class="i-flex user-management__add" @click="showAddMenu = true">
        <i class="bi bi-person-plus"></i>
        <span class="i-flex i-flex-align-center">افزودن کابر جدید</span>
      </div>
      <div class="user-management__table i-flex-column">
        <div
          class="user-management__table__row user-management__table__row--header i-flex"
        >
          <div class="i-flex i-flex-align-center" style="flex: 1"></div>
          <div class="i-flex i-flex-align-center" style="flex: 4">
            نام و نام خانوادگی
          </div>
          <div class="i-flex i-flex-align-center" style="flex: 4">
            نام کاربری
          </div>
          <div class="i-flex i-flex-align-center" style="flex: 1"></div>
        </div>

        <div
          class="user-management__table__row i-flex"
          v-for="(row, index) in users"
          :key="index"
        >
          <div class="i-flex i-flex-align-center" style="flex: 1">
            {{ index + 1 }}
          </div>
          <div class="i-flex i-flex-align-center" style="flex: 4">
            {{ row.name }}
          </div>
          <div class="i-flex i-flex-align-center" style="flex: 4">
            {{ row.username }}
          </div>
          <div
            class="i-flex i-flex-align-center i-flex-justify-even"
            style="flex: 1"
          >
            <i
              class="i-flex bi bi-pencil-square user-management__table-icon"
              @click="openEdit(row)"
            />
            <i
              class="i-flex bi bi-trash3 user-management__table-icon"
              @click="openDelete(row)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-window
    v-if="showAddMenu"
    @esc="showAddMenu = false"
    title="افزودن کاربر جدید"
  >
    <div
      class="i-flex i-flex-column i-flex-align-center i-flex-justify-even user-management__add-menu"
    >
      <div
        class="i-flex i-flex-justify-between user-management__add-menu__fields"
      >
        <span>نام و نام خانوادگی:</span>
        <field-text-input
          theme="light"
          class="user-management__add-menu__input"
          v-model="newUser.name"
        />
      </div>
      <div
        class="i-flex i-flex-justify-between user-management__add-menu__fields"
      >
        <span>نام کاربری:</span>
        <field-text-input
          theme="light"
          class="user-management__add-menu__input"
          v-model="newUser.username"
        />
      </div>
      <div
        class="i-flex i-flex-justify-between user-management__add-menu__fields"
      >
        <span>رمزعبور:</span>

        <field-text-input
          theme="light"
          class="user-management__add-menu__input"
          type="password"
          v-model="newUser.pass"
        />
      </div>
      <div
        class="i-flex i-flex-justify-between user-management__add-menu__fields"
      >
        <span>تکرار رمزعبور:</span>
        <field-text-input
          theme="light"
          class="user-management__add-menu__input"
          type="password"
          v-model="newUser.passConf"
        />
      </div>
      <div
        class="i-flex user-management__add-menu__buttons i-flex-align-center i-flex-justify-between"
      >
        <Button
          label="افزودن"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="confirmAdd"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="cancelAdd"
        />
      </div>
    </div>
  </modal-window>
  <modal-window
    v-if="showEditMenu"
    @esc="showEditMenu = false"
    title="ویرایش کاربر "
  >
    <div
      class="i-flex i-flex-column i-flex-align-center user-management__edit user-management__edit-menu"
    >
      <div
        class="i-flex i-flex-column i-flex-align-center user-management__edit user-management__edit-menu i-flex-1"
      >
        <div
          class="i-flex i-flex-justify-between user-management__edit-menu__fields"
        >
          <span>نام و نام خانوادگی:</span>
          <field-text-input
            theme="light"
            class="user-management__edit-menu__input"
            v-model="selectedUser.name"
          />
        </div>
        <div
          class="i-flex i-flex-justify-between user-management__edit-menu__fields"
        >
          <span>نام کاربری:</span>
          <field-text-input
            theme="light"
            class="user-management__edit-menu__input"
            v-model="selectedUser.username"
          />
        </div>
        <div class="i-flex i-width-1-1 user-management__edit-pass">
          <div
            @click="changePass = !changePass"
            class="i-flex i-flex-justify-center"
          >
            <span>تغییر رمز عبور </span>
            <i
              class="i-flex i-flex-align-center bi"
              :class="[changePass ? 'bi-chevron-up' : 'bi-chevron-down']"
            />
          </div>
        </div>
        <div
          class="i-flex i-flex-justify-between user-management__edit-menu__fields"
          v-if="changePass"
        >
          <span>رمزعبور:</span>

          <field-text-input
            theme="light"
            class="user-management__edit-menu__input"
            type="password"
            v-model="selectedUser.pass"
          />
        </div>
        <div
          class="i-flex i-flex-justify-between user-management__edit-menu__fields"
          v-if="changePass"
        >
          <span>تکرار رمزعبور:</span>
          <field-text-input
            theme="light"
            class="user-management__edit-menu__input"
            type="password"
            v-model="selectedUser.passConf"
          />
        </div>
      </div>
      <div
        class="i-flex user-management__edit-menu__buttons i-flex-align-center i-flex-justify-between"
      >
        <Button
          label="ویرایش"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="confirmEdit"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="cancelEdit"
        />
      </div>
    </div>
  </modal-window>
  <modal-window v-if="showDeleteMenu" @esc="cancelDelete" title="تایید حذف">
    <div class="delete-form i-flex-column i-flex-justify-between">
      <span>آیا از حذف کاربر {{ selectedUser.username }} اطمینان دارید؟</span>
      <div class="delete-form__buttons i-flex i-flex-justify-between">
        <Button
          label="تایید"
          theme="light"
          :size="{ width: 120, height: 40 }"
          @click="confirmDelete"
        />
        <Button
          action="secondary"
          theme="light"
          label="انصراف"
          :size="{ width: 120, height: 40 }"
          @click="cancelDelete"
        />
      </div>
    </div>
  </modal-window>
</template>

<script>
import ModalWindow from "./ModalWindow";
import FieldTextInput from "./FieldTextInput";
import Button from "./FormButton";
export default {
  components: { ModalWindow, FieldTextInput, Button },
  data() {
    return {
      users: [],
      showAddMenu: false,
      showEditMenu: false,
      newUser: {
        name: "",
        username: "",
        pass: "",
        passConf: "",
      },
      selectedUser: {},
      oldUsername: "",
      changePass: false,
      showDeleteMenu: false,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios.get("/user/all").then((res) => {
        this.users = res.data;
      });
    },
    cancelAdd() {
      this.newUser = {};
      this.showAddMenu = false;
    },
    confirmAdd() {
      if (
        this.newUser.name &&
        this.newUser.pass &&
        this.newUser.passConf &&
        this.newUser.username &&
        this.newUser.passConf == this.newUser.pass
      ) {
        this.$axios
          .post("/user", {
            name: this.newUser.name,
            password: this.newUser.pass,
            username: this.newUser.username,
          })
          .then(() => {
            this.getUsers();
            this.showAddMenu = false;
          });
      }
    },
    openDelete(user) {
      this.selectedUser = { ...user };
      this.showDeleteMenu = true;
    },
    openEdit(user) {
      this.selectedUser = { ...user };
      this.showEditMenu = true;
      this.oldUsername = user.username;
    },
    cancelDelete() {
      this.selectedUser = {};
      this.showDeleteMenu = false;
    },
    cancelEdit() {
      this.selectedUser = {};
      this.showEditMenu = false;
    },
    confirmDelete() {
      this.$axios.delete(`/user/${this.selectedUser.username}`).then((res) => {
        console.log(res);
        this.getUsers();
      });
      this.showDeleteMenu = false;
      this.selectedUser = {};
    },
    confirmEdit() {
      if (
        this.selectedUser.name &&
        this.selectedUser.username &&
        (!this.changePass ||
          (this.selectedUser.pass &&
            this.selectedUser.passConf &&
            this.selectedUser.passConf == this.selectedUser.pass))
      ) {
        this.$axios
          .put("/user", {
            name: this.selectedUser.name,
            password: this.changePass ? this.selectedUser.pass : null,
            username: this.selectedUser.username,
            oldUsername: this.oldUsername,
          })
          .then(() => {
            this.getUsers();
          });
        this.showEditMenu = false;
        this.selectedUser = {};
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-management {
  width: 100%;
  &__add {
    width: fit-content;
    cursor: pointer;
    margin-bottom: 8px;
    font-size: 18px;
    & > i {
      margin-left: 8px;
      font-size: fontSize("sl");
    }
    &:hover {
      text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
    }
  }
  &__table {
    width: 50%;
    min-width: 900px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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
      height: 60px;
      border-bottom: 1px solid var(--color-2);
      &:last-child {
        border-bottom: 2px solid var(--color-3);
      }
      &:nth-of-type(even) {
        background-color: var(--on-color-3);
      }
    }

    &-icon {
      cursor: pointer;
      font-size: fontSize("xl");
      &:hover {
        text-shadow: var(--highlight-color) 1.95px 1.95px 2.6px;
      }
    }
  }
  &__add-menu {
    min-width: 600px;
    min-height: 500px;
    padding: 32px;
    &__fields {
      width: 90%;
      & > span {
        color: var(--color-1);
      }
    }
    &__input {
      max-width: 220px;
      margin-bottom: 24px;
    }
    &__buttons {
      width: 60%;
      margin-bottom: 32px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__edit-menu {
    min-width: 600px;
    padding: 32px;
    &__fields {
      width: 90%;
      & > span {
        color: var(--color-1);
      }
    }
    &__input {
      max-width: 220px;
      margin-bottom: 32px;
    }
    &__buttons {
      width: 60%;
      margin-bottom: 32px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &__edit {
    &-pass {
      padding-right: 32px;
      color: var(--on-color-3);
      margin-bottom: 32px;
      font-size: fontSize("lg");
      & > div {
        cursor: pointer;
        border-bottom: 1px solid var(--on-color-3);
        padding-bottom: 8px;
      }
      & div > span {
        margin-left: 8px;
      }
    }
  }
}
</style>
