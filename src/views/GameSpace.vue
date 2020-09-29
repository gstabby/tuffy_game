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
                <v-toolbar-title>High Score: {{ gameScore }}</v-toolbar-title>
              </v-toolbar>
              <space v-if="gameId===null"></space>
              <reaction v-if="gameId===0"></reaction>
              <memory v-if="gameId===1"></memory>
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
import space from '../components/space'
export default {
  components: {
    reaction,
    memory,
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
      gameId: null
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
          return '400ms？'
        case 1:
          return '七个数字？'
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
