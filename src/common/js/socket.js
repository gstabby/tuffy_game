import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import api from './api.js'
import store from '../../store'
let stompClient
let timer
let headers
let socket

function connect () {
  socket = new SockJS(api.ws)
  stompClient = Stomp.over(socket)
  headers = {
    Authorization: ''
  }
  stompClient.connect(headers, () => {
    stompClient.subscribe(api.wstopic, msg => {
      if (msg.body) {
        const repObj = JSON.parse(msg.body)
        store.commit('getMsg', repObj)
      }
      console.log('订阅成功')
      console.log(msg.body)
    }, headers)
    stompClient.send(api.wssend,
      headers,
      JSON.stringify({
        token: localStorage.getItem('token'),
        join: true
      }))
  }, (err) => {
    console.log('连接失败')
    console.log(err)
  })
}

function disconnect () {
  if (stompClient) {
    stompClient.disconnect()
  }
}

function initConnect () {
  connect()
  timer = setInterval(() => {
    try {
      stompClient.send('连接正常')
    } catch (err) {
      console.log('断线了: ' + err)
      connect()
    }
  }, 60000)
}

function destroyConnect () {
  disconnect()
  clearInterval(timer)
}

function sendMsg (content) {
  stompClient.send(api.wssend,
    headers,
    JSON.stringify(content)
  )
}

export default {
  connect: connect,
  disconnect: disconnect,
  initConnect: initConnect,
  destroyConnect: destroyConnect,
  sendMsg: sendMsg
}
