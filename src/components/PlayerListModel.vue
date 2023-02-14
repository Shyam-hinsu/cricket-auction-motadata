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
      <div class="flex flex-col w-full justify-center items-center">
        <h4 class="not-margin">
          <b class="text-rose-900 text-xl font-bold"> {{ teamDetailsFor }}</b>
        </h4>
        <div class="w-full justify-start">
          <vs-input v-model="search" placeholder="Search By Name" />
        </div>
        <!-- <input v-model="search" class="p-1 input mt-4 self-start" /> -->
      </div>
    </template>
    <div class="center examplex">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th sort>
              <h1 class="text-lg font-bold">Name</h1>
            </vs-th>
            <vs-th sort>
              <h1 class="text-lg font-bold">Rate</h1>
            </vs-th>
            <vs-th sort v-if="teamDetailsFor === 'All Players'">
              <h1 class="text-lg font-bold">Team</h1>
            </vs-th>
            <vs-th sort> <h1 class="text-lg font-bold">Base Point</h1> </vs-th>
            <vs-th sort>
              <h1 class="text-lg font-bold">Final Bid Point</h1>
            </vs-th>
            <vs-th sort>
              <h1 class="text-lg font-bold">Department</h1>
            </vs-th>
            <vs-th sort>
              <h1 class="text-lg font-bold">Matches</h1>
            </vs-th>

            <vs-th sort>
              <h1 class="text-lg font-bold">Runs</h1>
            </vs-th>
            <vs-th sort>
              <h1 class="text-lg font-bold">Wickets</h1>
            </vs-th>
            <vs-th v-if="teamDetailsFor !== 'All Players'"> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(player, i) in filteredPlayers" :data="player">
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #1373ab">
                {{ player.name }}
              </h1>
            </vs-td>
            <vs-td>
              <font-awesome-icon
                icon="fa-solid fa-star"
                class="text-yellow-400"
                v-for="star in (player || {}).rate"
                :key="star"
              />
            </vs-td>
            <vs-td v-if="teamDetailsFor === 'All Players'">
              <h1 class="text-lg font-bold" style="color: #ab5213">
                {{ player.team }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.basePoint }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{
                  player.team && player.team !== "unselect" ? player.point : ""
                }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.department }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.matches }}
              </h1>
            </vs-td>

            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.runs }}
              </h1>
            </vs-td>
            <vs-td>
              <h1 class="text-lg font-bold" style="color: #13ab99">
                {{ player.wickets }}
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
      search: "",
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
    filteredPlayers() {
      return this.players.filter((player) => {
        return player.name.toLowerCase().includes(this.search.toLowerCase());
      });
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
