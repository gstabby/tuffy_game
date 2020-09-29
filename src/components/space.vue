<template>
  <div class="reaction">
    <div class="reaction_box">
      <div class="reaction_intro">
        <img src="../assets/windgame.svg" class="reaction_logo none_game">
        <!-- <h3 class="reaction_title">？</h3> -->
          <p class="reaction_method">
            您当前还未选择任何游戏<br>请前往首页挑战一下或者去游戏商店选择一款吧
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style scoped>
.none_game {
  animation: circle 3s linear infinite;
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
