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
              <reaction v-if="gameId===0"></reaction>
              <memory v-if="gameId===1"></memory>
              <snake v-if="gameId===2"></snake>
              <sudoku v-if="gameId===3"></sudoku>
              <gobang v-if="gameId===4"></gobang>
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
import snake from '../components/snake'
import sudoku from '../components/sudoku'
import gobang from '../components/gobang'
import space from '../components/space'
export default {
  components: {
    reaction,
    memory,
    snake,
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
      gameScore: '???',
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
    }
  },
  computed: {
    gameName () {
      switch (this.gameId) {
        case 0:
          return '400ms?'
        case 1:
          return 'Seven?'
        case 2:
          return 'Retro Snaker'
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
  },
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
