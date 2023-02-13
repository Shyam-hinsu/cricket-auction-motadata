<template>
  <div class="h-full w-full flex flex-col justify-between p-2">
    <h1 class="self-center">{{ team }}</h1>
    <div style="height: 70%" class="flex justify-center items-center mb-2">
      <img
        :src="`${team}.png`"
        alt=""
        style="height: 100%"
        class="rounded-lg"
      />
    </div>

    <div class="flex justify-around" style="border-top: 1px dashed !important">
      <div>
        <span style="color: #1373ab">5000</span> &nbsp;/ &nbsp;
        <span style="color: #4e9e62">{{ usedPoints }}</span>
      </div>
      ||
      <div>{{ totelOwnPlayers }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamDetails",
  props: {
    allPlayer: {
      type: Array,
      require: true,
    },
    team: {
      type: String,
      require: true,
    },
  },
  computed: {
    usedPoints() {
      return this.allPlayer.reduce((acc, player) => {
        if (player.team === this.team) {
          return acc + Number(player.point);
        } else {
          return acc;
        }
      }, 0);
    },
    totelOwnPlayers() {
      return this.allPlayer.filter((player) => player.team === this.team)
        .length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
