<template>
  <v-app style="background: #303030;">
    <v-btn dark class="menu_btn home_menu_btn" @click="exchangeMenuLeft">
      <v-icon color="white">mdi-menu</v-icon>
    </v-btn>
    <v-btn fab dark x-large color="primary" class="mx-2 menu_btn user_menu_btn" @click="exchangeMenuRight">
      <v-icon color="white">mdi-fire</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <!-- <v-card-title class="headline grey lighten-2">
          温馨提示
        </v-card-title> -->
        <v-card-text style="padding-top: 20px;">
          确定要登出吗？
        </v-card-text>
        <!-- <v-divider></v-divider> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="destroyLogin"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      fixed
      dark
      v-model="drawerLeft"
      color="#212121"
      floating
      width="340px"
    >
      <v-list
        class="py-0"
        nav
      >
        <v-list-item two-line>
          <v-list-item-avatar tile>
            <img src="./assets/ninja weapon.svg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Tuffy's game</v-list-item-title>
            <v-list-item-subtitle>steam</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="toLink(item.link)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
              <v-chip
                v-show="$store.state.unReadMsgArr&&item.title==='chat room'"
                class="ma-2"
                color="error"
                text-color="white"
                x-small
                label
              >
                {{ $store.state.unReadMsgArr.length }}
              </v-chip>
              <v-chip
                v-show="currentGame&&item.title==='Game Space'"
                class="ma-2"
                color="success"
                text-color="white"
                x-small
                label
              >
                {{ currentGame }}
              </v-chip>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toBlog">
          <v-list-item-icon>
            <v-icon>mdi-text-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              To Blog
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      fixed
      dark
      v-model="drawerRight"
      right
      width="340px"
      color="black"
    >
      <v-container>
        <v-row justify="center">
          <v-subheader v-if="user.id===null">Welcome to Tuffy's game !</v-subheader>
          <v-subheader v-if="user.id===null">登录后才可以看到您的纪录以及参与排名</v-subheader>
          <v-subheader v-if="user.id!==null">Welcome {{ user.name }}</v-subheader>
          <v-expansion-panels popout v-if="user.id!==null">
            <v-expansion-panel
              v-for="(message, i) in messages"
              :key="i"
              hide-actions
            >
              <v-expansion-panel-header>
                <v-row
                  align="center"
                  class="spacer"
                  no-gutters
                >
                  <v-col
                    class="text-no-wrap"
                    cols="5"
                    sm="4"
                  >
                    <v-chip
                      v-if="message.rank"
                      :color="`${message.color} lighten-4`"
                      class="ml-0 mr-4"
                      label
                      small
                      outlined
                    >
                      Rank {{ message.rank }}
                    </v-chip>
                    <strong v-html="message.title"></strong>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text v-text="message.text"></v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="pa-4">
          <v-btn block color="primary" v-if="user.id===null" @click="login">登录</v-btn>
          <v-btn block color="error" v-else @click="dialog=!dialog">登出</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <router-view :width="screenWidth" :left="drawerLeft" :right="drawerRight"></router-view>
  </v-app>
</template>

<script>
// import store from './store/index'
import socket from './common/js/socket'
import api from './common/js/api'
export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'Game Store', icon: 'mdi-shopping', link: '/gamestore' },
        { title: 'Game Space', icon: 'mdi-gamepad-square', link: '/gamespace' },
        { title: 'Chat Room', icon: 'mdi-chat-processing', link: '/chatroom' }
      ],
      closeIcon: 'mdi-close-box-outline',
      drawerLeft: false,
      drawerRight: false,
      messages: [
        {
          color: 'red',
          rank: this.$store.state.scoreArr[0].sort,
          title: '400ms?',
          text: '您的最高纪录是： ' + this.$store.state.scoreArr[0].score
        },
        {
          color: 'teal',
          rank: this.$store.state.scoreArr[1].sort,
          title: 'Seven?',
          text: '您的最高纪录是： ' + this.$store.state.scoreArr[1].score
        },
        {
          color: 'red',
          rank: this.$store.state.scoreArr[2].sort,
          title: 'Sudoku King!',
          text: '您的最高纪录是： ' + this.$store.state.scoreArr[2].score
        },
        {
          color: 'teal',
          rank: this.$store.state.scoreArr[3].sort,
          title: 'Let\'s Gobang',
          text: '您的最高纪录是： ' + this.$store.state.scoreArr[3].score
        }
      ],
      level: 123,
      screenWidth: 0,
      screenHeight: '',
      user: {
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('user')
      },
      dialog: false
    }
  },
  computed: {
    currentGame () {
      switch (this.$store.state.currentGame) {
        case 1:
          return 'Playing: 400ms?'
        case 2:
          return 'Playing: Seven?'
        case 3:
          return 'Playing: Sudoku King!'
        case 4:
          return 'Playing: Let\'s Gobang'
        default:
          return 'Playing: ？？？'
      }
    }
  },
  methods: {
    exchangeMenuLeft () {
      this.drawerLeft = !this.drawerLeft
    },
    exchangeMenuRight () {
      this.drawerRight = !this.drawerRight
    },
    closeDrawer () {
      this.drawerLeft = false
      this.drawerRight = false
    },
    openDrawer () {
      this.drawerLeft = true
      this.drawerRight = true
    },
    toLink (link) {
      this.$router.push({
        path: link
      })
    },
    getScoreById () {
      this.axios.get(api.GETUSER, {
        params: {
          uId: this.user.id
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('getScore', res.data.data)
          for (const i in this.messages) {
            this.messages[i].rank = this.$store.state.scoreArr[i].sort
            this.messages[i].text = '您的最高得分是： ' + Math.abs(this.$store.state.scoreArr[i].score)
          }
        }
      })
    },
    destroyLogin () {
      this.dialog = !this.dialog
      localStorage.clear()
      location.reload()
    },
    login () {
      window.location.href = 'http://tuffy.viphk.ngrok.org/login?from=game'
    },
    toBlog () {
      window.location.href = 'http://tuffy.viphk.ngrok.org/blog'
    }
  },
  mounted () {
    if (document.body.clientWidth > 1263) {
      this.drawerLeft = true
      this.drawerRight = true
    }
    this.screenWidth = document.body.clientWidth
    this.screenHeight = document.body.clientHeight
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
      })()
    }
    if (localStorage.getItem('token')) {
      this.axios.get(api.ISEXPIRED, {
        params: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.data === true) {
          localStorage.clear()
        } else {
          this.user.id = localStorage.getItem('userId')
          this.user.name = localStorage.getItem('user')
        }
      })
    }
    if (this.user.id) {
      this.getScoreById()
    }
    socket.initConnect()
  },
  beforeDestroy () {
    socket.destroyConnect()
  },
  watch: {
    screenWidth () {
      if (this.screenWidth < 1264) {
        if (this.drawerLeft === true && this.drawerRight === true) {
          this.closeDrawer()
        }
      } else if (this.screenWidth >= 1264) {
        // this.drawerLeft = true
        if (this.drawerLeft === false && this.drawerRight === false) {
          this.openDrawer()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.menu_btn {
  position: fixed;
}
.home_menu_btn {
  top: 20px;
  left: 20px;
  z-index: 5;
}
.user_menu_btn {
  bottom: 45%;
  right: 20px;
  z-index: 7;
}
@media screen and (max-width: 700px) {
  .user_menu_btn {
    bottom: 15%;
  }
}
</style>
