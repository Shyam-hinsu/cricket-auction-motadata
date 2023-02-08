<template>
  <vs-dialog prevent-clos v-model="open" @close="$emit('close')">
    <template #header>
      <h4 class="not-margin">Add Player</h4>
    </template>

    <div class="con-form">
      <vs-input
        v-model="formdata.name"
        placeholder="name"
        label="name"
        required
      >
        <template #message-danger> Required </template>
      </vs-input>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="addPlayer"> Add Player </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: "player-form",
  data: () => ({
    formdata: {
      name: "",
    },

    input2: "",
    checkbox1: false,
    open: false,
  }),
  props: {
    active: {
      default: false,
    },
  },
  watch: {
    active(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (this.active) {
          this.open = true;
        } else {
          this.open = false;
        }
      }
    },
  },
  methods: {
    addPlayer() {
      this.$emit("add-player", this.formdata);
      this.formdata = {
        name: "",
      };
    },
  },
};
</script>

<style>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
</style>
