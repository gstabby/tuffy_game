<template>
  <div class="reaction">
    <v-snackbar
      v-model="tipFlag"
      timeout="3000"
      color="success"
      absolute
      rounded
    >
      {{ tip }}
    </v-snackbar>
    <div class="reaction_box" :style="colorAction(actionCode)" @click="clickEvent">
      <div class="reaction_intro" v-show="actionCode==0">
        <img src="../assets/wuziqi.svg" class="reaction_logo">
        <h3 class="reaction_title">Let's Gobang</h3>
          <p class="reaction_method">
            六子连珠！Bingo！<br>
            “ 比五子棋更公平！白棋先下一子，然后黑白两方轮流各下两子，六子连珠即可获胜 ”<br>
            “ 每一局都是白子先下，白子获胜您的积分将累加1分 ”<br>
            点击屏幕任意一处开始游戏
          </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <canvas id="chessboard" :width="cWid" :height="cHeight" @click="playChess($event)">
          您的浏览器不支持canvas，请使用最新的浏览器
        </canvas>
        <br>
        <v-btn
          class="ma-6"
          outlined
          color="success"
          :disabled="!isWin"
          @click="refresh"
        >
          <v-icon>mdi-cached</v-icon>
          再来一局！
        </v-btn>
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
    actionCode: 0,
    chessFlag: true,
    isWin: false,
    cellWid: 50,
    cWid: 850,
    cHeight: 850,
    arr: [],
    imgBlack: {},
    imgWhite: {},
    tipFlag: false,
    tip: '',
    isFirst: true,
    times: 1
  }),
  props: {
    width: {
      type: Number
    }
  },
  methods: {
    colorAction (actionCode) {
      switch (actionCode) {
        case 0:
          return 'background: #113D61'
        case 1:
          return 'background: #FEE3B4'
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
      if (this.actionCode === 0) {
        this.actionCode = 1
        this.drawLine()
      }
    },
    playChess (e) {
      let x = e.offsetX / 50
      let y = e.offsetY / 50
      x = Math.round(x - 1)
      y = Math.round(y - 1)
      if (x < 0 || x >= 16 || y < 0 || y >= 16) {
        return
      }
      if (this.arr[x][y] !== 0) {
        // console.log('不能在已经下过棋的地方下')
        return
      }
      if (this.chessFlag) {
        if (this.isFirst === true) {
          this.isFirst = false
          this.chessFlag = false
          // console.log('white', x, y)
          this.drawChess(1, x, y)
        } else if (this.times === 1) {
          this.times += 1
          // console.log('white', x, y)
          this.drawChess(1, x, y)
        } else {
          this.times = 1
          this.chessFlag = false
          // console.log('white', x, y)
          this.drawChess(1, x, y)
        }
      } else {
        if (this.times === 1) {
          this.times += 1
          // console.log('black', x, y)
          this.drawChess(2, x, y)
        } else {
          this.times = 1
          // console.log('black', x, y)
          this.chessFlag = true
          this.drawChess(2, x, y)
        }
      }
    },
    drawLine () {
      const chessBoard = document.getElementById('chessboard')
      const ctx = chessBoard.getContext('2d')
      for (let i = 0; i < chessBoard.width / this.cellWid; i++) {
        ctx.moveTo((i) * this.cellWid, 0)
        ctx.lineTo((i) * this.cellWid, chessBoard.height)
        ctx.moveTo(0, (i) * this.cellWid)
        ctx.lineTo(chessBoard.width, (i) * this.cellWid)
        ctx.stroke()
      }
      this.arr = new Array(16)
      for (let i = 0; i < 16; i++) {
        this.arr[i] = new Array(16)
        for (let j = 0; j < 16; j++) {
          this.arr[i][j] = 0
        }
      }
    },
    drawChess (colorId, x, y) {
      if (this.isWin === true) {
        this.tipFlag = true
        this.tip = '游戏结束了，请点击再来一局'
      } else {
        const chessBoard = document.getElementById('chessboard')
        const ctx = chessBoard.getContext('2d')
        const x0 = x * this.cellWid + 28.5
        const y0 = y * this.cellWid + 28.5
        if (colorId === 1) {
          ctx.drawImage(this.imgWhite, x0, y0)
          this.arr[x][y] = 1
        } else if (colorId === 2) {
          ctx.drawImage(this.imgBlack, x0, y0)
          this.arr[x][y] = 2
        }
        this.judge(colorId, x, y)
      }
    },
    judge (colorId, x, y) {
      let win1 = 0
      let win2 = 0
      let win3 = 0
      let win4 = 0
      for (let i = x; i >= 0; i--) {
        if (this.arr[i][y] !== colorId) {
          break
        }
        win1++
      }
      for (let i = x + 1; i < 15; i++) {
        if (this.arr[i][y] !== colorId) {
          break
        }
        win1++
      }
      for (let i = y; i >= 0; i--) {
        if (this.arr[x][i] !== colorId) {
          break
        }
        win2++
      }
      for (let i = y + 1; i < 15; i++) {
        if (this.arr[x][i] !== colorId) {
          break
        }
        win2++
      }
      // eslint-disable-next-line
      for (let i = x, j = y; i >= 0, j >= 0; i--, j--) {
        if (i < 0 || j < 0 || this.arr[i][j] !== colorId) {
          break
        }
        win3++
      }
      // eslint-disable-next-line
      for (let i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
        if (i >= 15 || j >= 15 || this.arr[i][j] !== colorId) {
          break
        }
        win3++
      }
      // eslint-disable-next-line
      for (let i = x, j = y; i >= 0, j < 15; i--, j++) {
        if (i < 0 || j >= 15 || this.arr[i][j] !== colorId) {
          break
        }
        win4++
      }
      // eslint-disable-next-line
      for (let i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
        if (i >= 15 || j < 0 || this.arr[i][j] !== colorId) {
          break
        }
        win4++
      }
      if (win1 >= 6 || win2 >= 6 || win3 >= 6 || win4 >= 6) {
        if (colorId === 1) {
          this.tipFlag = true
          this.tip = '白棋胜利！积分+1'
          this.isWin = true
          this.saveScore()
        } else if (colorId === 2) {
          this.tipFlag = true
          this.tip = '黑棋胜利！积分不变'
          this.isWin = true
        }
      }
    },
    refresh () {
      this.isWin = false
      const chessBoard = document.getElementById('chessboard')
      const ctx = chessBoard.getContext('2d')
      ctx.clearRect(0, 0, 850, 850)
      this.drawLine()
      this.isFirst = true
      this.times = 1
      this.chessFlag = true
    },
    saveScore () {
      let currentScore
      if (this.$store.state.currentGameScore !== '???') {
        currentScore = this.$store.state.currentGameScore + 1
      } else {
        currentScore = 1
      }
      this.$emit('saveScore', currentScore)
    }
  },
  mounted () {
    // if (this.width > 1700) {
    //   this.cellWid = 50
    //   this.cWid = 850
    //   this.cHeight = 850
    // } else if (this.width <= 1700 && this.width > 750) {
    //   this.cellWid = 40
    //   this.cWid = 640
    //   this.cHeight = 640
    // } else {
    //   this.cellWid = (this.width - 60) / 17
    //   this.cWid = this.width - 60
    //   this.cHeight = this.width - 60
    // }
    this.imgBlack = new Image()
    this.imgBlack.src = require('../assets/blackcircle.svg')
    this.imgWhite = new Image()
    this.imgWhite.src = require('../assets/whitecircle.svg')
    this.tipFlag = true
    this.tip = '很抱歉，该游戏暂时不适配手机屏幕游玩，并且建议您关闭右侧信息栏以获得更佳的游戏体验'
  }
}
</script>

<style scoped>
canvas {
  border: 5px solid black;
}
</style>
