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
              class="chat_box"
            >
              <v-toolbar
                color="black accent-4"
                dark
                flat
              >
                <v-icon style="margin-right: 12px;">mdi-message-outline</v-icon>
                <v-toolbar-title>Tuffy的聊天室</v-toolbar-title>
              </v-toolbar>
              <div class="chat_container">
                <v-card
                  flat
                  v-for="(chat, n) in chats"
                  :key="n"
                  :class="isSelfChat(chat.uid==selfId)"
                >
                  <v-alert
                    v-if="chat.join==true"
                    dense
                    color="grey"
                    type="info"
                  >
                    {{ chat.username }} join
                  </v-alert>
                  <v-card-text v-if="chat.uid!=selfId&&chat.join!=true">
                    <v-row class="mb-4" align="center">
                      <v-avatar tile><img :src="'http://192.168.31.250/avatar/' + chat.avatar" /></v-avatar>
                      <strong class="title" style="margin-left: 10px;">{{ chat.username }}</strong>
                      <v-spacer></v-spacer>
                    </v-row>
                    <p>
                      {{ chat.content }}<v-icon>{{ chat.spirit }}</v-icon>
                    </p>
                  </v-card-text>
                  <v-card-text v-if="chat.uid==selfId&&chat.join!=true" style="text-align: right;">
                    <v-row class="mb-4" align="center">
                      <v-spacer></v-spacer>
                      <strong class="title" style="margin-right: 10px;">{{ chat.username }}</strong>
                      <v-avatar tile><img :src="'http://192.168.31.250/avatar/' + chat.avatar" /></v-avatar>
                    </v-row>
                    <p>
                      <v-icon>{{ chat.spirit }}</v-icon>{{ chat.content }}
                    </p>
                  </v-card-text>
                </v-card>
              </div>
              <div class="send_box">
                <v-text-field
                  v-model="message"
                  append-outer-icon='mdi-send'
                  :prepend-icon="icon"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Message"
                  type="text"
                  @click:append-outer="sendMessage"
                  @click:prepend="changeIcon"
                  @click:clear="clearMessage"
                  @keyup.enter="sendMessage"
                ></v-text-field>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import socket from '../common/js/socket'
export default {
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
      chats: this.$store.state.unReadMsgArr,
      iconIndex: 0,
      icons: [
        'mdi-keyboard-space',
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue'
      ],
      message: 'Hey!',
      recept: '',
      selfId: localStorage.getItem('userId')
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
    isSelfChat (isSelf) {
      if (!isSelf) {
        return 'chat_list left_list'
      } else {
        return 'chat_list right_list'
      }
    },
    sendMessage () {
      if (this.icon === 'mdi-keyboard-space') {
        socket.sendMsg(
          {
            token: localStorage.getItem('token'),
            content: this.message,
            join: false
          }
        )
      } else {
        socket.sendMsg(
          {
            token: localStorage.getItem('token'),
            content: this.message,
            spirit: this.icon,
            join: false
          }
        )
      }
      console.log('临时聊天内容' + socket.tempRecive)
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },
    resetIcon () {
      this.iconIndex = 0
    },
    changeIcon () {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    }
  },
  computed: {
    icon () {
      return this.icons[this.iconIndex]
    }
  }
}
</script>

<style lang="less" scoped>
.chat_box {
  height: calc(100vh - 44px);
  background: #ccc;
  // display: flex;
  // flex-direction: column;
}
.chat_container {
  height: calc(100% - 128px);
  padding: 0 10px;
  overflow-y: auto;
}
.chat_list {
  width: 100%;
  background: transparent;
}
.left_list {
}
.right_list {
}
.send_box {
  padding: 0 10px;
}
@media screen and (max-width: 1264px) {
  .chat_box {
    height: calc(100vh - 100px);
  }
}
</style>
