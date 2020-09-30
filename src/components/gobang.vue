<template>
  <div class="reaction">
    <div class="reaction_box" :style="colorAction(actionCode)" @click="clickEvent">
      <div class="reaction_intro" v-show="actionCode==0">
        <img src="../assets/wuziqi.svg" class="reaction_logo">
        <h3 class="reaction_title">Let's Gobang</h3>
          <p class="reaction_method">
            六子连珠！Bingo！<br>点击屏幕任意一处开始游戏
          </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">等待绿色...</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==2">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">点击!!!</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==3">
        <img src="../assets/exclamatory.png" class="reaction_logo">
        <h3 class="reaction_title">你点的太快啦!!!</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    actionCode: 0
  }),
  methods: {
    colorAction (actionCode) {
      switch (actionCode) {
        case 0:
          return 'background: #113D61'
        case 1:
          return 'background: #8D1313'
        case 2:
          return 'background: #28680F'
        case 3:
          return 'background: #113D61'
        case 4:
          return 'background: #113D61'
        case 5:
          return 'background: #000000'
      }
    },
    clickEvent () {
    }
  },
  watch: {
  }
}
</script>

<style scoped>
</style>
