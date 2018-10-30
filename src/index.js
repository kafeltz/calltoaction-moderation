/* globals WsApi */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppState from './AppState'

const wsApiConfig = {
    url: 'wss://websocket-stg.eventials.com:8884/rtc',
    debug: false,
    channel: 'iu4jhgf3e62jqa3z',
    email: 'pop@pop.com',
    clientTalkId: '69b56663-10e6-dee8-eba9-1bdc77088cbd',
    'is_moderator': true,
}

const api = new WsApi.default(wsApiConfig, WebSocket)
window.api = api
const props = {
    api: api,
    // links: [{
    //     id: 1,
    //     name: 'Desconto de 5% pra todo mundo!',
    //     url: 'https://www.google.com.br/',
    //     clicks: 4,
    //     finishedAt: null,
    // }, {
    //     id: 2,
    //     name: 'Desconto de 20% pra todo mundo!',
    //     url: 'https://www.xxx.com.br/',
    //     clicks: 2,
    //     finishedAt: '2018-10-26T13:56:38+00:00',
    // }, {
    //     id: 3,
    //     name: 'Desconto de 20% pra todo mundo!',
    //     url: 'https://www.xxx.com.br/',
    //     clicks: 7454,
    // }],
}


ReactDOM.render(<AppState {...props} />, document.getElementById('root'))
