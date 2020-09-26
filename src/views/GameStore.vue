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
            >
              <v-icon color="white">mdi-gamepad-square-outline</v-icon>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="12"
            class="col_box game_box"
          >
            <v-card
              height="870px"
              class="game_back game3_back"
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
    }
  },
  mounted () {
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
  background-image: url('../assets/game1.jpg');
}
.game2_back {
  background-image: url('../assets/game2.jpg');
  background-position-y: 10%;
}
.game3_back {
  background-image: url('../assets/game4.jpg');
}
.game4_back {
  background-image: url('../assets/game3.jpg');
  background-size: cover;
}
.game5_back {
  background-image: url('../assets/game5.jpg');
  background-position-y: 10%;
}
</style>
