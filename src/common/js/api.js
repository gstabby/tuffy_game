const ip = 'http://192.168.31.250'

const ws = ip + '/ws/endpointChat' // websocket连接

const wstopic = '/topic/chat' // websocket连接

const wssend = '/ws/chat' // websocket连接

const LOGIN = ip + '/login' // 登陆接口

const ISEXPIRED = ip + '/isTokenExpired' // 判断token是否失效

const GETMESSAGE = ip + '/message/allByPage' // 通过页码获取所有留言

const SAVEMESSAGE = ip + '/message/save' // 保存留言

export default {
  ws: ws,
  wstopic: wstopic,
  wssend: wssend,
  LOGIN: LOGIN,
  ISEXPIRED: ISEXPIRED,
  GETMESSAGE: GETMESSAGE,
  SAVEMESSAGE: SAVEMESSAGE
}
