import React from 'react'
import PropTypes from 'prop-types'
import App from './App'

class AppState extends React.Component {
    static propTypes = {
        api: PropTypes.object.isRequired,
        links: PropTypes.arrayOf(PropTypes.shape({
            clicks: PropTypes.number.isRequired,
            finishedAt: PropTypes.string,
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
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

    componentDidMount() {
        const { api } = this.props

        api.onCallToActionStatus(this.handleApiOnStatus)
        api.onCallToActionStart(this.handleApiOnCreate)
        api.onCallToActionFinish(this.handleApiFinish)

        api.calltoactionStatus()
    }

    handleApiFinish = payload => {
        const { links } = this.state

        const newLinks = links.map(l => {
            if (l.id === payload.id) {
                return { ...l, 'finished_at': payload.finished_at }
            }

            return l
        })

        this.setState({ links: newLinks })
    }

    handleApiOnCreate = payload => {
        const { links } = this.state

        const newLinks = links.concat(payload)

        this.setState({ links: newLinks })
    }

    handleApiOnStatus = data => {
        this.setState({ links: data })
    }

    handleOnFinish = id => {
        const { api } = this.props

        api.calltoactionFinish(id)
    }

    handleOnCreate = payload => {
        const { api } = this.props

        api.calltoactionStart(payload.name, payload.url)
    }

    render() {
        const { links } = this.state

        return <App links={links} onFinish={this.handleOnFinish} onCreate={this.handleOnCreate} />
    }
}

export default AppState
