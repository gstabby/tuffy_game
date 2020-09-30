<template>
  <div class="box">
    <div :class="homeClass()">
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="12"
            lg="6"
            class="col_box game_box"
          >
            <v-card
              height="200px"
              class="game_back game1_back"
              @click="enterGame(0)"
            >
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="6"
            class="col_box game_box"
          >
            <v-card
              height="200px"
              class="game_back game2_back align-center"
              @click="enterGame(1)"
            >
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="12"
            class="col_box game_box"
          >
            <v-card
              :height="game3Hei"
              class="game_back game3_back"
              @click="enterGame(2)"
            >
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="5"
            class="col_box game_box"
          >
            <v-card
              height="200px"
              class="game_back game4_back"
              @click="enterGame(3)"
            >
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="7"
            class="col_box game_box"
          >
            <v-card
              height="200px"
              class="game_back game5_back"
              @click="enterGame(4)"
            >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
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
    enterGame (id) {
      this.$store.commit('chooseGame', id)
      this.$router.push({
        path: '/gamespace'
      })
    }
  },
  mounted () {
  },
  computed: {
    game3Hei () {
      if (this.width > 1264) {
        return '870px'
      } else {
        return '400px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.game_box {
  padding: 10px;
  transition: opacity ease 1s;
  opacity: .4;
}
.game_box:hover {
  opacity: 1;
}
.game_back {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}
.game1_back {
  background-image: url('../assets/lightning_back.svg');
  background-size: auto;
}
.game2_back {
  background-image: url('../assets/number_back.svg');
  background-color: black;
  background-size: auto;
}
.game3_back {
  background-image: url('../assets/snake_back.jpg');
  background-position-y: 5%;
  background-color: #93AB93;
}
.game4_back {
  background-image: url('../assets/sudoku_back.jpg');
  background-position-y: 0%;
}
.game5_back {
  background-image: url('../assets/gobang_back.jpg');
}
</style>
