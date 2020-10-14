<template>
  <div class="memory">
    <div class="reaction_box" @click="clickEvent">
      <div class="reaction_intro" v-show="actionCode==0">
        <img src="../assets/number.png" class="reaction_logo">
        <h3 class="reaction_title">Seven?</h3>
          <p class="reaction_method">
            平均每个人一次能记住七个数字，你能记住更多吗？<br>
            点击屏幕任意一处开始游戏
          </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">{{ numBorn }}</h3>
        <div class="outer_liner">
          <div class="inner_liner" :style="per()"></div>
        </div>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==2">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <!-- <h3 class="reaction_title">请输入刚才的数字</h3> -->
        <p class="reaction_method" style="line-height: 5px;">
          请输入刚才出现的数字<br>
          <input type="text" class="number_input" v-model="numInput"><br>
          <button class="number_button" @click="submitNum">提交</button>
        </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==3">
        <p class="number_name">正确答案</p>
        <p class="number_req">{{ numBorn }}</p>
        <p class="number_name">你的答案</p>
        <p class="number_req" :style="numIsWin()">{{ numInput }}</p>
        <h3 class="level">第 {{ level }} 关</h3>
        <button class="number_button" v-show="!isWin" @click.stop="stopLevel">返回</button>
        <button class="number_button" v-show="isWin" @click.stop="upLevel">下一关 </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    actionCode: 0,
    timeWidth: 100,
    timeOver: 2,
    numInput: '',
    numBorn: [],
    // numBornShow: '',
    level: 1,
    timer1: null,
    timer2: null,
    isWin: null
  }),
  methods: {
    enterKey (event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
          ? event.which
          : event.charCode
      if (code === 13) {
        this.submitNum()
      }
    },
    enterKeyupDestroyed () {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup () {
      document.addEventListener('keyup', this.enterKey)
    },
    clickEvent () {
      switch (this.actionCode) {
        case 0:
          this.actionCode = 1
          this.bornNum()
          break
      }
    },
    per () {
      return 'width: ' + this.timeWidth + 'px;' + 'transition: all ease ' + this.timeOver + 's;'
    },
    submitNum () {
      if (this.numInput.length === 0 || this.numInput === null) {
        this.actionCode = 2
      } else {
        const numReal = this.trim(this.numInput)
        if (numReal === this.numBorn) {
          this.isWin = true
          this.actionCode = 3
        } else {
          this.saveScore()
          this.isWin = false
          this.actionCode = 3
        }
      }
      this.timeWidth = 100
    },
    trim (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    },
    bornNum () {
      this.numBorn = []
      for (let i = 0; i < this.level; i++) {
        this.numBorn.push(parseInt(Math.random() * (9 - 0 + 1) + 0, 10))
      }
      this.numBorn = this.numBorn.join('')
    },
    numIsWin () {
      if (!this.isWin) {
        return 'color: black;text-decoration: line-through;'
      }
    },
    stopLevel () {
      this.numInput = ''
      this.actionCode = 0
      this.level = 1
      this.timeOver = 2
    },
    upLevel () {
      this.numInput = ''
      this.level += 1
      this.timeOver = 2 + 0.5 * this.level
      // this.timeOver = 1
      this.actionCode = 1
      this.bornNum()
    },
    saveScore () {
      this.$emit('saveScore', this.level)
    }
  },
  watch: {
  },
  updated () {
    if (this.actionCode === 1) {
      if (this.timer1 === null) {
        this.timer1 = setTimeout(() => {
          this.timeWidth = 0
          clearTimeout(this.timer1)
          this.timer1 = null
        }, 0)
      }
      if (this.timer2 === null) {
        this.timer2 = setTimeout(() => {
          this.actionCode = 2
          clearTimeout(this.timer2)
          this.timer2 = null
        }, this.timeOver * 1000)
      }
    }
  },
  mounted () {
    // 绑定enter事件
    this.enterKeyup()
  },
  destroyed () {
    // 销毁enter事件
    this.enterKeyupDestroyed()
  }
}
</script>

<style scoped>
.outer_liner {
  width: 100px;
  height: 5px;
  background: #226CBB;
  margin: 0 auto;
}
.inner_liner {
  height: 5px;
  background: white;
}
.number_input {
  margin-top: 40px;
  width: 80%;
  height: 50px;
  background: grey;
  border-radius: 30px;
  text-align: center;
  color: white;
}
.number_input:focus {
  outline: none;
}
.number_button {
  margin-top: 30px;
  background: #ecd469;
  font-size: 20px;
  width: 120px;
  height: 50px;
  border-radius: 30px;
  color: #272727;
  font-weight: bold;
  transition: all ease .3s;
}
.number_button:focus {
  outline: none;
}
.number_button:hover {
  background: white;
}
.number_name {
  opacity: .6;
  font-size: 40px;
  margin-bottom: 10px;
  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
}
.number_req {
  color: white;
  font-size: 48px;
  transition: all ease .5s;
}
.level {
  margin-top: 50px;
  font-size: 100px;
  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
}
@media only screen and (max-width: 1200px) { .number_name{ font-size: 39px; margin-bottom: 10px; } .number_req{ font-size: 46px; } .level { font-size: 100px; margin-top: 48px; } .number_button { width: 115px; height: 48px; font-size: 20px; } }
@media only screen and (max-width: 1100px) { .number_name{ font-size: 38px; margin-bottom: 10px; } .number_req{ font-size: 44px; } .level { font-size: 100px; margin-top: 46px; } .number_button { width: 110px; height: 46px; font-size: 20px; } }
@media only screen and (max-width: 1000px) { .number_name{ font-size: 37px; margin-bottom: 10px; } .number_req{ font-size: 42px; } .level { font-size: 90px; margin-top: 44px; } .number_button { width: 105px; height: 44px; font-size: 20px; } }
@media only screen and (max-width: 900px) { .number_name{ font-size: 36px; margin-bottom: 10px; } .number_req{ font-size: 40px; } .level { font-size: 80px; margin-top: 42px; } .number_button { width: 100px; height: 42px; font-size: 19px; } }
@media only screen and (max-width: 800px) { .number_name{ font-size: 35px; margin-bottom: 10px; } .number_req{ font-size: 38px; } .level { font-size: 70px; margin-top: 40px; } .number_button { width: 95px; height: 40px; font-size: 18px; } }
@media only screen and (max-width: 700px) { .number_name{ font-size: 34px; margin-bottom: 9px; } .number_req{ font-size: 36px; } .level { font-size: 60px; margin-top: 38px; } .number_button { width: 90px; height: 38px; font-size: 17px; } }
@media only screen and (max-width: 600px) { .number_name{ font-size: 33px; margin-bottom: 8px; } .number_req{ font-size: 34px; } .level { font-size: 50px; margin-top: 36px; } .number_button { width: 85px; height: 36px; font-size: 16px; } }
@media only screen and (max-width: 500px) { .number_name{ font-size: 32px; margin-bottom: 7px; } .number_req{ font-size: 32px; } .level { font-size: 40px; margin-top: 34px; } .number_button { width: 80px; height: 34px; font-size: 15px; } }
@media only screen and (max-width: 400px) { .number_name{ font-size: 31px; margin-bottom: 6px; } .number_req{ font-size: 30px; } .level { font-size: 30px; margin-top: 32px; } .number_button { width: 75px; height: 32px; font-size: 14px; } }
@media only screen and (max-width: 300px) { .number_name{ font-size: 30px; margin-bottom: 5px; } .number_req{ font-size: 28px; } .level { font-size: 20px; margin-top: 30px; } .number_button { width: 70px; height: 30px; font-size: 13px; } }
</style>
