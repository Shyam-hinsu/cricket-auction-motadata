<template>
  <div id="app">
    <Header />

    <section class="w-full h-full flex scroller" style="height: 92%">
      <div
        style="width: 25%; height: 100%; border-right: 0.7px solid #4a4c54c2"
        class="p-4 flex flex-col"
      >
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <h1 class="font-bold color-primary">Player List</h1>
            <span class="text-neutral-500">
              Total Points : {{ totalPlayerPoints }}</span
            >

            <span class="text-neutral-500">
              Used Points : {{ usedPlayerPoints }}</span
            >
          </div>
          <!-- <div class="flex flex-col h-full justify-between"> -->
          <!-- <font-awesome-icon
              icon="fa-solid fa-square-plus"
              class="color-primary text-5xl cursor-pointer"
              @click="tglToadd = true"
            /> -->
          <!-- <font-awesome-icon
              icon="fa-solid fa-square-plus"
              class="text-red-900 text-5xl cursor-pointer"
              @click="addAllRecord"
            /> -->
          <!-- </div> -->

          <div class="flex flex-col h-full justify-between">
            <font-awesome-icon
              icon="fa-solid fa-users"
              class="color-primary text-3xl cursor-pointer self-start"
              @click="showTeamInformation('All Players')"
            />
            <font-awesome-icon
              icon="fa-solid fa-group-arrows-rotate"
              class="color-primary text-3xl cursor-pointer self-start"
              @click="showTeamInformation('unselect')"
            />
          </div>
        </div>

        <input v-model="search" class="p-1 input mt-4" />
        <div
          class="flex flex-1 flex-col overflow-auto mt-4 h-fit mb-4"
          style="height: 90%"
        >
          <div
            ref="itemRef"
            class="player bg-neutral-800 flex justify-between item-container player-plate text-neutral-500"
            v-for="p in filteredPlayers"
            :key="p.name"
          >
            <h1>{{ p.name }}</h1>

            <div>
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="cursor-pointer text-red-800"
                @click="deletePalyer(p.id)"
              />

              <span
                variant="transparent"
                class="cursor-move"
                style="padding: 3px 20px"
                :shadow="false"
                shape="circle"
                draggable="true"
                @dragstart="dragStart($event, p)"
                @dragend="dragEnd"
              >
                <font-awesome-icon
                  icon="fa-solid fa-arrows-up-down-left-right"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 75%; height: 100%" class="p-1">
        <div class="flex justify-between w-full">
          <h1 class="color-primary font-bold">Teams</h1>
          <font-awesome-icon
            icon="fa-solid fa-square-plus"
            class="color-primary text-xl cursor-pointer"
          />
        </div>

        <div class="w-full overflow-auto" style="height: 97%">
          <!-- <div
            :style="{
              display: 'grid',
              'grid-auto-rows': 'minmax(300px, max-content)',
              'grid-template-columns': 'repeat(2, minmax(100px, 1fr))',
              'grid-gap': '16px',
            }"
          >
            <div
              v-for="t in 4"
              :key="t"
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(t)"
              @dragover="allowDropSeries($event, t)"
            >
              <div
                class="w-full h-full flex flex-col items-center justify-center"
                @drop="dropSeries($event, t)"
              >
                TEAM {{ t }}
                <br />
                Drag Player
                <br />
                Total Points : 5000
                <br />
                Remaining Points : 500
              </div>
            </div>
          </div> -->
          <div class="justify-center items-center flex m-4" style="height: 30%">
            <div
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container h-full w-4/12"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(teams[0].name)"
              @dragover="allowDropSeries($event, teams[0].name)"
            >
              <div
                class="w-full h-full"
                @drop="dropSeries($event, teams[0].name)"
              >
                <TeamDetails :team="teams[0].name" :all-player="players" />
              </div>
            </div>
          </div>
          <div
            class="justify-between items-center flex m-4"
            style="height: 30%"
          >
            <div
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container h-full w-4/12"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(teams[1].name)"
              @dragover="allowDropSeries($event, teams[1].name)"
            >
              <div
                class="w-full h-full"
                @drop="dropSeries($event, teams[1].name)"
              >
                <TeamDetails :team="teams[1].name" :all-player="players" />
              </div>
            </div>
            <div
              class="bg-primary rounded-3xl p-2 pl-1 cursor-pointer"
              :class="{ glow: !isAllPlayerSelected }"
            >
              <!-- style="height: 60%; width: 10%" -->

              <!-- <img src="dice.svg" class="glow"  /> -->
              <font-awesome-icon
                icon="fa-solid fa-dice-d20"
                class="text-9xl"
                :class="{ glow: !isAllPlayerSelected }"
                style="color: rgb(17, 17, 17)"
                @click="isOpenPlayerSeletionModel = !isOpenPlayerSeletionModel"
              />
            </div>

            <div
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container h-full w-4/12"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(teams[2].name)"
              @dragover="allowDropSeries($event, teams[2].name)"
            >
              <div
                class="w-full h-full"
                @drop="dropSeries($event, teams[2].name)"
              >
                <TeamDetails :team="teams[2].name" :all-player="players" />
              </div>
            </div>
          </div>
          <div class="justify-evenly items-center flex m-4" style="height: 30%">
            <div
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container h-full w-4/12"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(teams[3].name)"
              @dragover="allowDropSeries($event, teams[3].name)"
            >
              <div
                class="w-full h-full"
                @drop="dropSeries($event, teams[3].name)"
              >
                <TeamDetails :team="teams[3].name" :all-player="players" />
              </div>
            </div>
            <div
              class="rounded-lg input flex flex-col items-center justify-center text-neutral-500 text-slate-500 item-container h-full w-4/12"
              style="border-style: dashed !important"
              @dblclick="showTeamInformation(teams[4].name)"
              @dragover="allowDropSeries($event, teams[4].name)"
            >
              <div
                class="w-full h-full"
                @drop="dropSeries($event, teams[4].name)"
              >
                <TeamDetails :team="teams[4].name" :all-player="players" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <playerListModel
      :all-player="players"
      :team-details-for="teamDetailsFor"
      :active="active"
      @close="closeModel"
      @remove-from-team="removeFromTeam"
    />
    <PlayerForm
      @add-player="addpalyer"
      @close="tglToadd = false"
      :active="tglToadd"
    />
    <playerSelectionModel
      :player="dragedPlayer ? dragedPlayer : unsettledPlayers[0]"
      :isDraged="!!dragedPlayer"
      :teams="teams"
      :active="isOpenPlayerSeletionModel"
      :isAllPlayerSelected="isAllPlayerSelected"
      @select-player-in-team="selectPlayerInTeam"
      @close="closePlayerSelectionModel"
    />

    <vs-dialog
      width="450px"
      not-center
      v-model="isConfrimDelete"
      @close="cancelConfrim"
    >
      <!-- <template #header>
        <h4 class="not-margin"><b>Action Delete</b></h4>
      </template> -->

      <template #footer>
        <div class="con-footer flex justify-between items-center">
          <div class="con-content ml-2">
            <p>Are You Sure To Delete Player</p>
          </div>
          <div class="flex">
            <vs-button
              @click="confrimDelete"
              class="bg-red-800"
              style="background-color: red !importent"
            >
              Ok
            </vs-button>
            <vs-button @click="cancelConfrim"> Cancel </vs-button>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import { db } from "@/firebase/firebaseinit";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

import Header from "./components/Header.vue";
import playerListModel from "./components/PlayerListModel.vue";
import PlayerForm from "./components/playerForm.vue";
import playerSelectionModel from "./components/playerSelectionModel.vue";
import TeamDetails from "./components/TeamDetails.vue";

import players from "./allPlayerData";

export default {
  name: "App",
  components: {
    Header,
    playerListModel,
    PlayerForm,
    playerSelectionModel,
    TeamDetails,
  },

  data() {
    this.teams = [
      {
        name: "one",
      },
      {
        name: "two",
      },
      {
        name: "three",
      },
      {
        name: "four",
      },
      {
        name: "five",
      },
    ];

    return {
      search: "",
      dragedPlayer: undefined,
      teamDetailsFor: undefined,
      active: false,
      notesCollectionRef: undefined,

      getNotesSnapshots: undefined,
      players: [],
      tglToadd: false,
      formOpen: true,
      value7: "",
      options: 1,
      abandonPlayer: [],
      isOpenPlayerSeletionModel: false,

      playersRowData: players,
      isConfrimDelete: false,
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.notesCollectionRef = collection(db, "players");

      this.getPlayers();
    },
    getPlayers() {
      // eslint-disable-next-line
      debugger;

      let notesCollectionQuery = query(
        this.notesCollectionRef,
        orderBy("name")
      );

      this.getNotesSnapshots = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let players = [];
          querySnapshot.forEach((doc) => {
            console.log();
            let player = {
              id: doc.id,
              name: doc.data().name,
              department: doc.data().department,
              email: doc.data().email,
              rate: doc.data().rate,
              expertise: doc.data().expertise,
              matches: doc.data().matches,
              runs: doc.data().runs,
              wickets: doc.data().wickets,
              team: doc.data().team,
              point: doc.data().point,
            };
            players.unshift(player);
          });
          this.players = players;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async addpalyer(data) {
      // eslint-disable-next-line
      debugger;

      await setDoc(doc(this.notesCollectionRef, uuidv4()), {
        name: data.name,
      }).finally(() => {
        this.tglToadd = false;
      });
    },

    async deletePalyer(id) {
      this.confrimToDeletId = id;
      this.isConfrimDelete = true;
    },

    async confrimDelete() {
      await deleteDoc(doc(this.notesCollectionRef, this.confrimToDeletId));
      this.confrimToDeletId = undefined;
      this.isConfrimDelete = false;
    },
    cancelConfrim() {
      this.confrimToDeletId = undefined;
      this.isConfrimDelete = false;
    },
    showTeamInformation(t) {
      this.teamDetailsFor = t;
      this.active = true;
    },
    dragStart(event, item) {
      event.dataTransfer.effectAllowed = "copy";
      this.dragedPlayer = item;
      event.dataTransfer.setDragImage(
        event.target.closest(".item-container"),
        0,
        0
      );
    },
    dragEnd() {
      // this.dragedPlayer = undefined;
    },
    dropSeries(e, t) {
      if (this.dragedPlayer) {
        e.preventDefault();

        let index = this.players.findIndex(
          (item) => item.id === this.dragedPlayer.id
        );
        this.players = [
          ...this.players.slice(0, index),
          {
            ...this.players[index],
            team: t,
          },
          ...this.players.slice(index + 1),
        ];

        this.dragedPlayer = {
          ...this.dragedPlayer,
          team: t,
        };
        this.isOpenPlayerSeletionModel = true;
        e.preventDefault();
      }
    },
    allowDropSeries(e) {
      if (this.dragedPlayer) {
        e.preventDefault();
      }
    },
    closeModel() {
      this.active = false;
      this.teamDetailsFor = undefined;
    },

    async removeFromTeam(id) {
      // let index = this.players.findIndex((item) => item.name === name);
      // this.players = [
      //   ...this.players.slice(0, index),
      //   {
      //     ...this.players[index],
      //     team: undefined,
      //   },
      //   ...this.players.slice(index + 1),
      // ];

      const washingtonRef = doc(this.notesCollectionRef, id);
      await updateDoc(washingtonRef, {
        team: null,
        point: 500,
      });
    },
    async selectPlayerInTeam(data) {
      // eslint-disable-next-line
      debugger;
      // let index = this.players.findIndex((item) => item.id === data.id);
      // this.players = [
      //   ...this.players.slice(0, index),
      //   {
      //     ...this.players[index],
      //     team: data.team,
      //     point: Number(data.point),
      //   },
      //   ...this.players.slice(index + 1),
      // ];

      const washingtonRef = doc(this.notesCollectionRef, data.id);
      await updateDoc(washingtonRef, {
        team: data.team,
        point: data.point,
      });
      this.dragedPlayer = undefined;
      this.isOpenPlayerSeletionModel = false;
    },
    async closePlayerSelectionModel(id) {
      if (id) {
        // let index = this.players.findIndex((item) => item.id === id);
        // this.players = [
        //   ...this.players.slice(0, index),
        //   {
        //     ...this.players[index],
        //     team: "unselect",
        //   },
        //   ...this.players.slice(index + 1),
        // ];

        const washingtonRef = doc(this.notesCollectionRef, id);
        await updateDoc(washingtonRef, {
          team: "unselect",
        });
      }

      this.dragedPlayer = undefined;
      this.isOpenPlayerSeletionModel = false;
    },
    addAllRecord() {
      this.playersRowData.forEach(async (eachPlayers) => {
        await setDoc(doc(this.notesCollectionRef, uuidv4()), {
          name: eachPlayers.Name,
          department: eachPlayers.Department,
          email: eachPlayers.Email,
          rate: eachPlayers["Please Rate your Expertise"],
          expertise: eachPlayers["Please choose your expertise"]
            .split(";")
            .filter((e) => e !== ""),

          matches:
            eachPlayers["Please specify - Total Matches played till date"],

          runs: eachPlayers["Please specify - Total runs scored till date"],
          wickets: eachPlayers["Please specify - Total wickets taken"],
          point: 500,
        });
      });
    },
  },
  computed: {
    unsettledPlayers() {
      return this.players.filter(
        (player) => player.team === undefined || player.team === null
      );
    },
    unselectedPlayers() {
      return this.players.filter((player) => player.team === "unselect");
    },
    totalPlayerPoints() {
      return this.players.reduce((acc, player) => {
        if (player.point) {
          return acc + Number(player.point);
        } else {
          return acc;
        }
      }, 0);
    },
    usedPlayerPoints() {
      return this.players.reduce((acc, player) => {
        if (player.team && player.team !== "unselect" && player.point) {
          return acc + Number(player.point);
        } else {
          return acc;
        }
      }, 0);
    },
    filteredPlayers() {
      return this.unsettledPlayers.filter((player) => {
        return player.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    isAllPlayerSelected() {
      return (
        !this.unsettledPlayers.length &&
        !this.unselectedPlayers.length &&
        !this.dragedPlayer
      );
    },
  },
  watch: {
    unsettledPlayers(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue.length === 0 && this.unselectedPlayers.length) {
          this.players.forEach(async (player) => {
            if (player.team === "unselect") {
              // let index = this.players.findIndex(
              //   (item) => item.id === player.id
              // );
              // this.players = [
              //   ...this.players.slice(0, index),
              //   {
              //     ...this.players[index],
              //     team: undefined,
              //   },
              //   ...this.players.slice(index + 1),
              // ];

              const washingtonRef = doc(this.notesCollectionRef, player.id);
              await updateDoc(washingtonRef, {
                team: null,
              });
            }
          });
        }
      }
    },
  },
};
</script>

<style>
@import "./index.css";
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(59, 59, 59);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #686868;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #212121;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: rgb(17, 17, 17);
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.player {
  margin: 5px 0px;
  padding: 5px;
  border-radius: 5px;
}
.input {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #4a4c54c2;
}

.item-container:hover {
  /* box-shadow: 0 0 11px rgba(33, 33, 33, 1); */

  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 16px;
}
.player-plate:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 1);
}
.color-primary {
  color: #1373ab;
}

.bg-primary {
  background-color: #1373ab;
}

.glow {
  animation: glow 0.5s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px -10px #1373abb3;
  }
  to {
    box-shadow: 0 0 10px 10px #1373abb3;
  }
}

.con-image {
  border-radius: inherit;
}

.con-image img {
  display: block;
  position: relative;
  border-radius: inherit;
  max-width: 350px;
}

.img-container {
  width: 300px;
  height: 300px;
  float: left;
}
</style>
