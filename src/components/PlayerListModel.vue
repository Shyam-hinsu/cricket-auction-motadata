<template>
  <vs-dialog
    scroll
    auto-width
    overflow-hidden
    full-screen
    v-model="open"
    @close="closeModel"
  >
    <template #header>
      <h4 class="not-margin">
        <b class="text-rose-900 text-xl font-bold"> {{ teamDetailsFor }}</b>
      </h4>
    </template>
    <div class="center examplex">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th sort>
              <h1 class="text-lg font-bold">Name</h1>
            </vs-th>
            <vs-th sort v-if="teamDetailsFor === 'All Players'">
              <h1 class="text-lg font-bold">Team</h1>
            </vs-th>
            <vs-th sort> <h1 class="text-lg font-bold">Point</h1> </vs-th>
            <vs-th v-if="teamDetailsFor !== 'All Players'"> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(player, i) in players" :data="player">
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #1373ab">
                {{ player.name }}
              </h1>
            </vs-td>
            <vs-td v-if="teamDetailsFor === 'All Players'">
              <h1 class="text-lg font-bold" style="color: #ab5213">
                {{ player.team }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.point }}
              </h1>
            </vs-td>
            <vs-td v-if="teamDetailsFor !== 'All Players'">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="cursor-pointer text-red-600"
                @click="removeFromTeam(player.id)"
              />
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <template #footer> </template>
  </vs-dialog>
</template>

<script>
export default {
  name: "player-list-model",
  props: {
    allPlayer: {
      type: Array,
      require: true,
    },
    teamDetailsFor: {
      default: undefined,
    },
    active: {
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    players() {
      if (this.teamDetailsFor !== "All Players") {
        return this.allPlayer.filter(
          (player) => player.team === this.teamDetailsFor
        );
      } else {
        return this.allPlayer;
      }
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
    closeModel() {
      this.$emit("close");
    },
    removeFromTeam(id) {
      this.$emit("remove-from-team", id);
    },
  },
};
</script>

<style>
.vs-dialog {
  /* background-color: #1e2023 !important;
  color: white !important; */
}

.vs-dialog-content .vs-dialog--scroll .vs-dialog__content {
  max-height: 85%;
}
</style>
