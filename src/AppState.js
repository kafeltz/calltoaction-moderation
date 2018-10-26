import React from 'react'
import PropTypes from 'prop-types'

import App from './App'

class AppState extends React.Component {
    static propTypes = {
        links: PropTypes.arrayOf(PropTypes.shape({
            clicks: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            finishedAt: PropTypes.string,
        })),
    }

    static defaultProps = {
        links: [],
    }

    constructor(props) {
        super(props)

        const { links } = props

        this.state = {
            links: links,
        }
    }

    handleOnFinish(id) {
        console.warn('handleOnFinish', id)
    }

    handleOnCreate() {
        console.warn('handleOnCreate')
    }

    render() {
        const { links } = this.state

        return <App links={links} onFinish={this.handleOnFinish} onCreate={this.handleOnCreate} />
    }
}

export default AppState
