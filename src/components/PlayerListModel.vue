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
        <b> {{ teamDetailsFor }}</b>
      </h4>
    </template>
    <div class="center examplex">
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th sort> Name </vs-th>
            <vs-th sort> team </vs-th>
            <vs-th sort> point </vs-th>
            <vs-th v-if="teamDetailsFor !== 'All Players'"> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(player, i) in players" :data="player">
            <vs-td>
              {{ player.name }}
            </vs-td>
            <vs-td>
              {{ player.team }}
            </vs-td>
            <vs-td>
              {{ player.point }}
            </vs-td>
            <vs-td v-if="teamDetailsFor !== 'All Players'">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="cursor-pointer text-red-600"
                @click="removeFromTeam(player.name)"
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
    removeFromTeam(playerName) {
      this.$emit("remove-from-team", playerName);
    },
  },
};
</script>

<style>
.vs-dialog {
  /* background-color: rgb(17, 17, 17) !important; */
}
</style>
