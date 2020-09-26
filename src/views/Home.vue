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
              class="card_box game_carousel_box"
            >
              <v-carousel hide-delimiters cycle height="400px">
                <v-carousel-item
                  v-for="(img, i) in imgs"
                  :key="i"
                  :src="img.src"
                ></v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="8"
            class="col_box"
          >
            <v-card
              class="card_box news_box"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/game3.jpg"
              >
                <v-card-title>测测您的反应力？</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0 indigo_text">反应力</v-card-subtitle>
              <v-card-text class="black_text">
                <div>当前排名第一的玩家：
                  <v-chip
                    class="ma-2"
                    color="indigo darken-3"
                    outlined
                    label
                  >
                    <v-icon left>mdi-trophy-outline</v-icon>
                    Tuffy: 234
                  </v-chip>
                </div>
                <div>
                  <div class="btn_news">
                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-share-outline</v-icon>
                      分享
                    </v-btn>

                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-trophy-award</v-icon>
                      挑战一下？
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <v-card
              class="card_box news_box"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/game4.jpg"
              >
                <v-card-title>蛇口夺食！</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0 indigo_text">Top ?</v-card-subtitle>
              <v-card-text class="black_text">
                <div>
                  当前排名第一的玩家：
                  <v-chip
                    class="ma-2"
                    color="indigo darken-3"
                    outlined
                    label
                  >
                    <v-icon left>mdi-trophy-outline</v-icon>
                    Tuffy: 234
                  </v-chip>
                </div>
                <div>
                  <div class="btn_news">
                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-share-outline</v-icon>
                      分享
                    </v-btn>

                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-trophy-award</v-icon>
                      挑战一下？
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <v-card
              class="card_box news_box"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/game2.jpg"
              >
                <v-card-title>数独之王 花落谁家</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0 indigo_text">Top ?</v-card-subtitle>
              <v-card-text class="black_text">
                <div>
                  当前排名第一的玩家：
                  <v-chip
                    class="ma-2"
                    color="indigo darken-3"
                    outlined
                    label
                  >
                    <v-icon left>mdi-trophy-outline</v-icon>
                    Tuffy: 234
                  </v-chip>
                </div>
                <div>
                  <div class="btn_news">
                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-share-outline</v-icon>
                      分享
                    </v-btn>

                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-trophy-award</v-icon>
                      挑战一下？
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <v-card
              class="card_box news_box"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/backsword.png"
              >
                <v-card-title>你能瞬间记忆电话号码吗？</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0 indigo_text">Top ?</v-card-subtitle>
              <v-card-text class="black_text">
                <div>
                  当前排名第一的玩家：
                  <v-chip
                    class="ma-2"
                    color="indigo darken-3"
                    outlined
                    label
                  >
                    <v-icon left>mdi-trophy-outline</v-icon>
                    Tuffy: 234
                  </v-chip>
                </div>
                <div>
                  <div class="btn_news">
                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-share-outline</v-icon>
                      分享
                    </v-btn>

                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-trophy-award</v-icon>
                      挑战一下？
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <v-card
              class="card_box news_box"
            >
              <v-img
                class="white--text align-end"
                height="300px"
                src="../assets/backgirl.png"
              >
                <v-card-title>无情剑问无情</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0 indigo_text">Top ?</v-card-subtitle>
              <v-card-text class="black_text">
                <div>
                  当前排名第一的玩家：
                  <v-chip
                    class="ma-2"
                    color="indigo darken-3"
                    outlined
                    label
                  >
                    <v-icon left>mdi-trophy-outline</v-icon>
                    Tuffy: 234
                  </v-chip>
                </div>
                <div>
                  <div class="btn_news">
                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-share-outline</v-icon>
                      分享
                    </v-btn>

                    <v-btn
                      color="indigo"
                      text
                    >
                      <v-icon>mdi-trophy-award</v-icon>
                      挑战一下？
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            lg="4"
            class="col_box"
          >
            <v-card
              class="card_box announce_box"
            >
              <v-card-title>
                <v-icon
                  large
                  left
                  color="white"
                >
                  mdi-ninja
                </v-icon>
                <span class="title font-weight-light" style="color: white;">Game Tuffy</span>
              </v-card-title>
              <v-card-text class="headline font-weight-bold" style="color: white;">
                “ 欢迎来到Tuffy的游戏小站，请尽情享受里面的游戏，并尝试和陌生人来一场比拼吧！”
              </v-card-text>
              <v-card-actions>
                <v-list-item class="grow" align="right">
                  <v-list-item-content>
                    <v-list-item-title style="color: white;">From Tuffy</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-actions>
            </v-card>
            <v-card
              class="card_box rank_box"
            >
              <div class="text-center justify-center py-4" style="background: #1E1E1E;">
                <h3 class="font-weight-bold card_title white_text">
                  <v-icon color="white">mdi-trophy</v-icon>
                  排行榜
                </h3>
              </div>
              <v-tabs
                v-model="tab"
                background-color="#1E1E1E"
                color="white"
                center-active
                align-with-title
              >
                <v-tab
                  v-for="rank in ranks"
                  :key="rank.tab"
                >
                  {{ rank.tab }}
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(rank, n) in ranks"
                  :key="n"
                >
                  <v-card tile style="text-align: center;">
                    <v-simple-table dark>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center">排名</th>
                            <th class="text-center">昵称</th>
                            <th class="text-center">分数</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(range, i) in rank.ranges" :key="range.id">
                            <td v-if="i==0"><v-icon color="yellow">mdi-trophy</v-icon></td>
                            <td v-if="i==1"><v-icon color="#ddd">mdi-trophy</v-icon></td>
                            <td v-if="i==2"><v-icon color="brown">mdi-trophy</v-icon></td>
                            <td v-if="i>2">{{ i + 1 }}</td>
                            <td>{{ range.name }}</td>
                            <td>{{ range.score }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
            <v-card
              class="card_box message_box"
            >
              <div class="text-center justify-center py-4" style="background: #1E1E1E;">
                <h3 class="font-weight-bold card_title white_text">
                  <v-icon color="white">mdi-message-bulleted</v-icon>
                  留言板
                </h3>
              </div>
              <v-list dark three-line>
                <template v-for="(message, index) in messages">
                  <v-divider
                    :key="index"
                  ></v-divider>
                  <v-list-item
                    :key="message.title"
                  >
                    <v-list-item-avatar tile>
                      <v-img :src="'http://192.168.31.250/avatar/' + message.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ message.username }}</v-list-item-title>
                      <v-list-item-action-text>{{ message.m_date }}</v-list-item-action-text>
                      <v-list-item-subtitle> - {{ message.m_content }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-divider></v-divider>
                <v-list-item>
                  <div class="text-center" style="margin: 0 auto;width: 100%;">
                    <v-pagination
                      v-model="currentPage"
                      :length="maxPage"
                      dark
                      color="#1976d2"
                      :total-visible="7"
                    ></v-pagination>
                  </div>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-action-text>
                      <v-form v-model="valid" ref="form">
                        <v-textarea
                          :rules="rules"
                          outlined
                          auto-grow
                          label="欢迎在此处留言"
                          v-model="msgLeave"
                          style="margin-top: 20px;"
                        ></v-textarea>
                        <v-btn
                          outlined
                          color="success"
                          :disabled="!valid"
                          style="float: right;"
                          @click="saveMessage"
                        >
                          <v-icon left>mdi-pencil</v-icon> 留言
                        </v-btn>
                      </v-form>
                    </v-list-item-action-text>
                    <v-snackbar
                      v-model="tipFlag"
                      timeout="3000"
                      color="success"
                      absolute
                      rounded
                    >
                      {{ tip }}
                    </v-snackbar>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import api from '../common/js/api'
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
      imgs: [
        {
          src: require('../assets/game1.jpg')
        },
        {
          src: require('../assets/backsword.png')
        },
        {
          src: require('../assets/game3.jpg')
        },
        {
          src: require('../assets/game4.jpg')
        },
        {
          src: require('../assets/backgirl.png')
        }
      ],
      tab: null,
      ranks: [
        { tab: 'Reaction', content: 'Tab 1 Content', ranges: [{ id: 0, name: 'tuffy', score: '234' }, { id: 1, name: 'sihai', score: '24' }, { id: 2, name: 'hai', score: '1.2' }, { id: 3, name: 'Long', score: '3234' }, { id: 4, name: 'Long', score: '3234' }, { id: 5, name: 'Long', score: '3234' }, { id: 6, name: 'Long', score: '3234' }, { id: 7, name: 'Long', score: '3234' }, { id: 8, name: 'Long', score: '3234' }, { id: 9, name: 'Long', score: '3234' }] },
        { tab: 'Snake food', content: 'Tab 2 Content', ranges: [{ id: 0, name: 'tuffy', score: '234' }, { id: 1, name: 'sihai', score: '24' }, { id: 2, name: 'hai', score: '1.2' }, { id: 3, name: 'Long', score: '3234' }, { id: 4, name: 'Long', score: '3234' }, { id: 5, name: 'Long', score: '3234' }, { id: 6, name: 'Long', score: '3234' }, { id: 7, name: 'Long', score: '3234' }, { id: 8, name: 'Long', score: '3234' }, { id: 9, name: 'Long', score: '3234' }] },
        { tab: '数独King', content: 'Tab 3 Content', ranges: [{ id: 0, name: 'tuffy', score: '234' }, { id: 1, name: 'sihai', score: '24' }, { id: 2, name: 'hai', score: '1.2' }, { id: 3, name: 'Long', score: '3234' }, { id: 4, name: 'Long', score: '3234' }, { id: 5, name: 'Long', score: '3234' }, { id: 6, name: 'Long', score: '3234' }, { id: 7, name: 'Long', score: '3234' }, { id: 8, name: 'Long', score: '3234' }, { id: 9, name: 'Long', score: '3234' }] },
        { tab: 'Memory phone number？', content: 'Tab 4 Content', ranges: [{ id: 0, name: 'tuffy', score: '234' }, { id: 1, name: 'sihai', score: '24' }, { id: 2, name: 'hai', score: '1.2' }, { id: 3, name: 'Long', score: '3234' }, { id: 4, name: 'Long', score: '3234' }, { id: 5, name: 'Long', score: '3234' }, { id: 6, name: 'Long', score: '3234' }, { id: 7, name: 'Long', score: '3234' }, { id: 8, name: 'Long', score: '3234' }, { id: 9, name: 'Long', score: '3234' }] },
        { tab: 'No one live', content: 'Tab 5 Content', ranges: [{ id: 0, name: 'tuffy', score: '234' }, { id: 1, name: 'sihai', score: '24' }, { id: 2, name: 'hai', score: '1.2' }, { id: 3, name: 'Long', score: '3234' }, { id: 4, name: 'Long', score: '3234' }, { id: 5, name: 'Long', score: '3234' }, { id: 6, name: 'Long', score: '3234' }, { id: 7, name: 'Long', score: '3234' }, { id: 8, name: 'Long', score: '3234' }, { id: 9, name: 'Long', score: '3234' }] }
      ],
      messages: [],
      rules: [
        value => !!value || '请不要留言空白',
        value => (value || '').length <= 250 || '最多留言250个字'
      ],
      msgLeave: '',
      currentPage: 1,
      maxPage: 1,
      tipFlag: false,
      tip: '',
      valid: false
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
    getMessageLeave () {
      this.axios.get(api.GETMESSAGE, {
        params: {
          currentPage: this.currentPage
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.messages = res.data.data.records
          this.maxPage = res.data.data.pages
        }
      })
    },
    saveMessage () {
      this.axios.post(api.SAVEMESSAGE, this.qs.stringify({
        content: this.msgLeave
      })).then(res => {
        if (res.data.code === 200) {
          this.msgLeave = ''
          this.tip = '留言成功'
          this.tipFlag = true
          this.currentPage = 1
          this.$refs.form.reset()
          this.getMessageLeave()
        } else {
          this.tip = res.data.msg
          this.tipFlag = true
        }
      }).catch(error => {
        if (error) {
          this.tip = '服务器错误，请稍后再试'
          this.tipFlag = true
        }
      })
    }
  },
  computed: {
  },
  watch: {
    currentPage () {
      this.getMessageLeave()
    }
  },
  mounted () {
    const formData = new FormData()
    const formLogin = {
      username: 'gs',
      password: '111111'
    }
    for (const key in formLogin) {
      formData.append(key, formLogin[key])
    }
    this.axios.post(api.LOGIN, formData)
      .then(res => {
        const token = res.headers.authorization
        localStorage.setItem('token', token)
        localStorage.setItem('user', res.data.data.username)
        localStorage.setItem('userId', res.data.data.id)
        localStorage.setItem('created', res.data.data.created)
        localStorage.setItem('email', res.data.data.email)
        localStorage.setItem('avatar', res.data.data.avatar)
      })
      .catch(error => {
        if (error) {
        }
      })
    this.getMessageLeave()
  }
}
</script>

<style lang="less" scoped>
.game_carousel_box {
  height: 400px;
}
.news_box {
  height: 425px;
  margin-bottom: 20px;
  background: #ddd !important;
  opacity: .7;
  transition: all ease 1s;

  .btn_news {
    float: right;
  }
}
.news_box:hover {
  background: white !important;
  opacity: 1;
}
.announce_box {
  background: #1E1E1E !important;
  margin-bottom: 20px;
}
.rank_box {
  background: #1E1E1E !important;
  margin-bottom: 20px;
}
.message_box {
}
.v-list--three-line .v-list-item .v-list-item__subtitle, .v-list-item--three-line .v-list-item__subtitle {
  -webkit-line-clamp: 100;
  text-align: justify;
}
// @keyframes opacityDeep
// {
//   from {
//     opacity: .5;
//   }
//   to {
//     opacity: 1;
//   }
// }
// @keyframes opacityShallow
// {
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: .5;
//   }
// }
</style>
