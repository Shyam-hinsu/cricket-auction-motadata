<template>
  <vs-dialog
    auto-width
    not-padding
    overflow-hidden
    prevent-close
    v-model="open"
    @close="closeModel"
  >
    <div style="min-height: 50vh" class="flex" v-if="!isAllPlayerSelected">
      <div style="height: 50vh; width: 50vh">
        <img
          :src="`players-photos/${(player || {}).name}.jpg`"
          alt=""
          style="height: inherit; width: inherit; border-radius: 20px"
        />

        <div class="">
          <font-awesome-icon
            icon="fa-solid fa-star"
            class="text-yellow-400"
            v-for="star in (player || {}).rate"
            :key="star"
          />
        </div>
      </div>

      <div class="flex" style="min-height: 50vh">
        <div style="height: 50vh">
          <div
            style="height: inherit; width: inherit"
            class="flex justify-between flex-col p-4"
          >
            <div>
              <h1 class="text-2xl font-extrabold">{{ (player || {}).name }}</h1>
              <h4 class="text-2xl font-bold">
                Matches: {{ (player || {}).matches }}
              </h4>
              <h4 class="text-2xl font-bold">
                Wickets:{{ (player || {}).wickets }}
              </h4>
              <h4 class="text-2xl font-bold">
                Runs: {{ (player || {}).runs }}
              </h4>

              <h4 class="text-2xl font-bold">
                <span
                  >Expertise :

                  <span
                    v-for="e in (player || {}).expertise"
                    :key="e"
                    class="text-xl"
                  >
                    {{ e }}
                  </span>
                </span>
              </h4>

              <h4 class="text-2xl font-bold">
                Department: {{ (player || {}).department }}
              </h4>
            </div>

            <div class="flex">
              <vs-select
                v-if="!isDraged"
                placeholder="Select Team"
                v-model="formData.team"
                class="mr-4"
              >
                <vs-option
                  :label="team.name"
                  :value="team.name"
                  v-for="team in teams"
                  :key="team.name"
                >
                  {{ team.name }}
                </vs-option>
              </vs-select>
              <h1
                v-else
                style="border-radius: 10px"
                class="mr-4 p-2 bg-slate-300"
              >
                {{ player.team }}
              </h1>
              <vs-input v-model="formData.point" placeholder="Point" />
            </div>
          </div>
          <vs-button
            dark
            shadow
            class="absolute float-right right-0"
            @click="selectPlayerInTeam"
          >
            Select Player
          </vs-button>
        </div>
      </div>
    </div>

    <div
      v-else
      style="min-height: 50vh; width: 80vh"
      class="justify-center items-center bg-sky-200 flex rounded-2xl"
    >
      <h1 class="text-4xl font-extrabold color-primary">
        All Players Are Selected
      </h1>
    </div>
  </vs-dialog>
</template>

<script>
export default {
  name: "PlayerSelectionModel",
  props: {
    active: {
      default: false,
    },
    teams: {
      type: Array,
      required: true,
    },
    player: {
      type: Object,
    },
    isAllPlayerSelected: {
      type: Boolean,
    },
    isDraged: {
      type: Boolean,
    },
  },
  data() {
    return {
      open: false,
      formData: {
        team: "",
        point: (this.player || {}).point,
        id: (this.player || {}).id,
      },
    };
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
      this.$emit("close", (this.player || {}).id);
      this.formData = {
        team: "",
        point: "",
        id: (this.player || {}).id,
      };
    },
    selectPlayerInTeam() {
      // eslint-disable-next-line
      debugger;
      if (
        (this.formData.team !== "" || this.player.team) &&
        this.formData.point
      ) {
        this.$emit("select-player-in-team", {
          id: this.player.id,
          team: !this.isDraged ? this.formData.team : this.player.team,
          point: this.formData.point,
        });
        this.formData = {
          team: "",
          point: "",
        };
      }
    },
  },
};
</script>

<style scoped>
.vs-dialog-content {
  backdrop-filter: saturate(180%) blur(15px);
}
.color-primary {
  color: #1373ab;
}
</style>
