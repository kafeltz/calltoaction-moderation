import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppState from './AppState'

const props = {
    links: [{
        id: 1,
        name: 'Desconto de 5% pra todo mundo!',
        url: 'https://www.google.com.br/',
        clicks: 4,
        finishedAt: null,
    }, {
        id: 2,
        name: 'Desconto de 20% pra todo mundo!',
        url: 'https://www.xxx.com.br/',
        clicks: 2,
        finishedAt: '2018-10-26T13:56:38+00:00',
    }],
}

ReactDOM.render(<AppState {...props} />, document.getElementById('root'))
