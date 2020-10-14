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
        <img src="../assets/sudoku.svg" class="reaction_logo">
        <h3 class="reaction_title">Sudoku King!</h3>
        <p class="reaction_method">
          你最快能多久解出一个数独呢<br>
          “ 难度从入门级依次提高，完成一道入门级积分+10，难度提高一级，积分额外+10分 ”<br>
          点击屏幕任意一处开始游戏
        </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <img src="../assets/loading.svg" class="reaction_logo loading">
        <h3 class="reaction_title">正在为您生成数独...</h3>
      </div>
      <div class="reaction_intro" v-show="actionCode==2">
        <h3 class="reaction_method">当前难度：{{ difficulty }} </h3>
        <h3 class="reaction_method">请点击空白处进行数字选择</h3>
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <table class="sudoku_table" cellspacing="0">
          <tr v-for="(sudokuRow, indexRow) in sudokuArr" :key="indexRow" :class="'sudoku_row ' + sudokuRowStyle(indexRow)">
            <td v-for="(sudokuCol, indexCol) in sudokuRow" :key="indexCol" :class="'sudoku_col ' + sudokuColStyle(indexRow, indexCol)">
              <p v-if="sudokuCol.type==='num'" style="margin-bottom: 0;color: #8F8F8F;">{{ sudokuCol.num }}</p>
              <input
                maxlength="1"
                class="sudoku_input"
                v-if="sudokuCol.type==='input'"
                v-model="sudokuRow[indexCol].num"
                @click="checkSudoku(indexRow, indexCol, sudokuRow[indexCol].num)"
                readonly
              >
            </td>
          </tr>
        </table>
        <v-dialog
          v-model="dialog"
          width="240px"
        >
          <v-card dark>
            <!-- <v-card-title class="black lighten-1">
              灰色代表已重复的数字
            </v-card-title> -->
            <div style="margin: 0 auto;">
              <v-btn class="ma-2" outlined color="success" v-for="(i, index) in 9" :key="index" :disabled="getNumAvailable(i)" @click="inputNum(i)">
                {{ i }}
              </v-btn>
              <v-btn class="ma-2" outlined color="error" @click="cleanNum()">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-btn
          class="ma-6"
          outlined
          color="success"
          @click="refresh"
        >
          <v-icon>mdi-cached</v-icon>
          换一道？
        </v-btn>
        <v-btn
          class="ma-6"
          outlined
          color="error"
          @click="clean"
        >
          <v-icon>mdi-close</v-icon>
          清空
        </v-btn>
      </div>
      <div class="reaction_intro" v-show="actionCode==3">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <img src="../assets/loading.svg" class="reaction_logo loading">
        <h3 class="reaction_title">正在进入下一关...</h3>
      </div>
      <div class="reaction_intro" v-show="actionCode==4" @click="clickEvent">
        <img src="../assets/smile.svg" class="reaction_logo">
        <h3 class="reaction_title">Congratulations!!!</h3>
        <h3 class="reaction_method">恭喜您完成了所有难度的挑战，获得了共计60分的积分！</h3>
        <h3 class="reaction_method">点击屏幕再次挑战</h3>
      </div>
    </div>
  </div>
</template>

<script>
import sudoku from '../common/js/sudokuRepo'
export default {
  data: () => ({
    actionCode: 0,
    timer: null,
    currentSudoku: parseInt(Math.random() * (9 - 0 + 1) + 0, 10),
    sudokuArr: '',
    difficulty: '入门级',
    difScore: '+10',
    dialog: false,
    repeatNums: [],
    currentRow: '',
    currentCol: '',
    tipFlag: false,
    tip: ''
  }),
  methods: {
    colorAction (actionCode) {
      switch (actionCode) {
        case 0:
          return 'background: #113D61'
        case 1:
          return 'background: black'
        case 2:
          return 'background: black'
        case 3:
          return 'background: #113D61'
        case 4:
          return 'background: black'
      }
    },
    clickEvent () {
      if (this.actionCode === 0) {
        this.actionCode = 1
      } else if (this.actionCode === 4) {
        this.actionCode = 0
      }
    },
    sudokuRowStyle (index) {
      if (index === 2 || index === 5) {
        return 'bold_tr'
      } else if (index === 8) {
        return 'no_tr'
      } else {
        return 'normal_tr'
      }
    },
    sudokuColStyle (indexRow, indexCol) {
      let colStyle = ''
      if (indexCol === 2 || indexCol === 5) {
        colStyle = colStyle + 'bold_td '
      } else if (indexCol === 8) {
        colStyle = colStyle + 'no_td '
      } else {
        colStyle = colStyle + 'normal_td '
      }
      if (indexRow === 2 || indexRow === 5) {
        colStyle = colStyle + 'bold_bottom_td'
      }
      return colStyle
    },
    checkRepeat (arr, inputNum) {
      for (const i in arr) {
        if (inputNum === arr[i].num) {
          // console.log('match: ', i)
        }
      }
    },
    checkSudoku (indexRow, indexCol, inputNum) {
      this.repeatNums = []
      this.currentRow = indexRow
      this.currentCol = indexCol
      // this.checkRepeat(this.sudokuArr[indexRow], inputNum)
      let row = []
      row = this.sudokuArr[indexRow]
      const column = []
      for (const i in this.sudokuArr) {
        column.push(this.sudokuArr[i][indexCol])
      }
      // this.checkRepeat(column, inputNum)
      const nineCell = []
      if (indexRow < 3 && indexCol < 3) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 3 && indexRow < 6 && indexCol < 3) {
        for (let i = 3; i < 6; i++) {
          for (let j = 0; j < 3; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 6 && indexRow < 9 && indexCol < 3) {
        for (let i = 6; i < 9; i++) {
          for (let j = 0; j < 3; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow < 3 && indexCol >= 3 && indexCol < 6) {
        for (let i = 0; i < 3; i++) {
          for (let j = 3; j < 6; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 3 && indexRow < 6 && indexRow >= 3 && indexCol < 6) {
        for (let i = 3; i < 6; i++) {
          for (let j = 3; j < 6; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 6 && indexRow < 9 && indexRow >= 3 && indexCol < 6) {
        for (let i = 6; i < 9; i++) {
          for (let j = 3; j < 6; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow < 3 && indexCol >= 6 && indexCol < 9) {
        for (let i = 0; i < 3; i++) {
          for (let j = 6; j < 9; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 3 && indexRow < 6 && indexCol >= 6 && indexCol < 9) {
        for (let i = 3; i < 6; i++) {
          for (let j = 6; j < 9; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      } else if (indexRow >= 6 && indexRow < 9 && indexCol >= 6 && indexCol < 9) {
        for (let i = 6; i < 9; i++) {
          for (let j = 6; j < 9; j++) {
            nineCell.push(this.sudokuArr[i][j])
          }
        }
      }
      const all = row.concat(column).concat(nineCell)
      for (const i in all) {
        this.repeatNums.push(all[i].num)
      }
      this.dialog = true
      // this.checkRepeat(nineCell, inputNum)
    },
    getNumAvailable (i) {
      if (this.repeatNums.indexOf(String(i)) === -1) {
        return false
      } else {
        return true
      }
    },
    clean () {
      for (const i in this.sudokuArr) {
        for (const j in this.sudokuArr[i]) {
          if (this.sudokuArr[i][j].type === 'input') {
            this.sudokuArr[i][j].num = ''
          }
        }
      }
    },
    refresh () {
      this.clean()
      if (this.difficulty === '入门级') {
        let random = parseInt(Math.random() * (9 - 0 + 1) + 0, 10)
        while (random === this.currentSudoku) {
          random = parseInt(Math.random() * (9 - 0 + 1) + 0, 10)
        }
        this.currentSudoku = random
        this.sudokuArr = sudoku.easySudoku[this.currentSudoku]
      } else if (this.difficulty === '普通级') {
        let random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
        while (random === this.currentSudoku) {
          random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
        }
        this.currentSudoku = random
        this.sudokuArr = sudoku.mediumSudoku[this.currentSudoku]
      } else if (this.difficulty === '困难级') {
        let random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
        while (random === this.currentSudoku) {
          random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
        }
        this.currentSudoku = random
        this.sudokuArr = sudoku.hardSudoku[this.currentSudoku]
      }
    },
    win () {
      let space = 0
      for (const i in this.sudokuArr) {
        for (const j in this.sudokuArr[i]) {
          if (this.sudokuArr[i][j].type === 'input') {
            if (!this.sudokuArr[i][j].num) {
              space += 1
            }
          }
        }
      }
      if (space === 0 && this.difficulty !== '困难级') {
        this.clean()
        this.actionCode = 3
        if (this.difficulty === '入门级') {
          this.tipFlag = true
          this.tip = '恭喜您，获得10点积分'
          this.saveScore(10)
          this.difficulty = '普通级'
          const random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
          this.currentSudoku = random
          this.sudokuArr = sudoku.mediumSudoku[this.currentSudoku]
        } else if (this.difficulty === '普通级') {
          this.tipFlag = true
          this.tip = '恭喜您，获得20点积分'
          this.saveScore(20)
          this.difficulty = '困难级'
          const random = parseInt(Math.random() * (4 - 0 + 1) + 0, 10)
          this.currentSudoku = random
          this.sudokuArr = sudoku.hardSudoku[this.currentSudoku]
        }
      } else if (space === 0 && this.difficulty === '困难级') {
        this.difficulty = '入门级'
        const random = parseInt(Math.random() * (9 - 0 + 1) + 0, 10)
        this.currentSudoku = random
        this.sudoKuArr = sudoku.easySudoku[this.currentSudoku]
        this.tipFlag = true
        this.tip = '恭喜您，获得30点积分'
        this.saveScore(30)
        this.clean()
        this.actionCode = 4
      }
    },
    inputNum (i) {
      this.sudokuArr[this.currentRow][this.currentCol].num = String(i)
      this.dialog = false
      this.win()
    },
    cleanNum () {
      this.sudokuArr[this.currentRow][this.currentCol].num = ''
      this.dialog = false
    },
    saveScore (levelScore) {
      let currentScore
      if (this.$store.state.currentGameScore !== '???') {
        currentScore = this.$store.state.currentGameScore
      } else {
        currentScore = 0
      }
      this.$emit('saveScore', currentScore + levelScore)
    }
  },
  watch: {
    actionCode () {
      if (this.actionCode === 1) {
        if (this.timer === null) {
          this.timer = setTimeout(() => {
            this.actionCode = 2
          }, 1500)
        }
      } else if (this.actionCode === 3) {
        if (this.timer === null) {
          this.timer = setTimeout(() => {
            this.actionCode = 2
          }, 1500)
        }
      }
      this.timer = null
    }
  },
  mounted () {
    this.sudokuArr = sudoku.easySudoku[this.currentSudoku]
  }
}
</script>

<style scoped>
.loading {
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
.sudoku_table {
  margin: 10px auto 0 auto;
  border: 3px solid white;
  font-size: 25px;
  /* background: rgb(31, 30, 30); */
}
.normal_tr {
}
.bold_tr {
}
.sudoku_row {
  height: 80px;
  transition: all ease 1s;
}
.normal_td {
  border-right: 1px solid white;
}
.bold_td {
  border-right: 3px solid white;
}
.bold_bottom_td {
  border-bottom: 3px solid white !important;
}
.sudoku_col {
  width: 80px;
  transition: all ease 1s;
  border-bottom: 1px solid white;
}
.sudoku_input {
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;
  text-align: center;
  outline: none;
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  .sudoku_table {
    font-size: 20px;
  }
  .sudoku_row {
    height: 50px;
  }
  .sudoku_col {
    width: 50px;
  }
}
@media screen and (max-width: 600px) {
  .sudoku_table {
    font-size: 18px;
  }
  .sudoku_row {
    height: 40px;
  }
  .sudoku_col {
    width: 40px;
  }
}
@media screen and (max-width: 400px) {
  .sudoku_table {
    font-size: 16px;
  }
  .sudoku_row {
    height: 30px;
  }
  .sudoku_col {
    width: 30px;
  }
}
</style>
