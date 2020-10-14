<template>
  <div class="box">
    <div :class="homeClass()">
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="12"
            lg="12"
            class="col_box"
          >
            <v-card
              class="game_box"
            >
              <v-toolbar
                color="black accent-4"
                dark
                flat
              >
                <v-icon style="margin-right: 12px;">mdi-gamepad-square-outline</v-icon>
                <v-toolbar-title style="margin-right: 12px;">{{ gameName }}</v-toolbar-title>
                <v-icon style="margin-right: 12px;">mdi-counter</v-icon>
                <v-toolbar-title>您的积分: {{ gameScore }}</v-toolbar-title>
              </v-toolbar>
              <space v-if="gameId===null"></space>
              <reaction v-if="gameId===1" @saveScore="saveScore"></reaction>
              <memory v-if="gameId===2" @saveScore="saveScore"></memory>
              <!-- <snake v-if="gameId===2"></snake> -->
              <sudoku v-if="gameId===3" @saveScore="saveScore"></sudoku>
              <gobang v-if="gameId===4" :width='width' @saveScore="saveScore"></gobang>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import reaction from '../components/reaction'
import memory from '../components/memory'
import sudoku from '../components/sudoku'
import gobang from '../components/gobang'
import space from '../components/space'
import api from '../common/js/api'
export default {
  components: {
    reaction,
    memory,
    sudoku,
    gobang,
    space
  },
  name: 'Home',
  props: {
    width: {
      type: Number
    },
    left: {
      type: Boolean
    },
    right: {
      type: Boolean
    }
  },
  data () {
    return {
      gameScore: this.$store.state.currentGameScore,
      gameId: this.$store.state.currentGame
    }
  },
  methods: {
    homeClass () {
      if (this.width < 1264) {
        return 'home home_small'
      } else {
        if (this.right === false) {
          return 'home home_medium'
        } else {
          return 'home home_large'
        }
      }
    },
    getScoreByGame () {
      console.log('getscore')
      this.axios.get(api.GETSCOREBYGAME, {
        params: {
          gId: this.$store.state.currentGame,
          uId: localStorage.getItem('userId')
        }
      }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.best) {
            this.$store.commit('getScoreByName', res.data.data.best)
            this.gameScore = this.$store.state.currentGameScore
          } else {
            this.$store.commit('getScoreByName', '???')
            this.gameScore = this.$store.state.currentGameScore
          }
        }
      })
    },
    saveScore (score) {
      this.axios.post(api.SAVESCORE, this.qs.stringify({
        gId: this.$store.state.currentGame,
        sScore: score
      })).then(res => {
        if (res) {
          this.getScoreByGame()
        }
      })
    }
  },
  computed: {
    gameName () {
      switch (this.gameId) {
        case 1:
          return '400ms?'
        case 2:
          return 'Seven?'
        case 3:
          return 'Sudoku King!'
        case 4:
          return 'Let\'s Gobang'
        default:
          return '？？？'
      }
    }
  },
  mounted () {
    this.gameScoreShow = false
    this.getScoreByGame()
  },
  // beforeUpdate () {
  //   this.gameScoreShow = false
  //   this.getScoreByGame()
  // },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
.game_box {
  // height: calc(100vh - 44px);
  background: #ccc;
  // display: flex;
  // flex-direction: column;
}
</style>
