import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import is from 'is_js'
import './App.css'

const css = {
    black: '#2E3540',
    grayDark: '#A0A3A8',
    grayDarker: '#5F6A7D',
    grayLight: '#E6EBEE',
    grayLighter: '#F5F7F8',
    graySmooth: '#A3A3A3',
    red: '#EE344E',
    redDisabled: '#F05C72',
    redHover: '#D3122D',
    redFocus: '#E61331',
    white: '#FFF',
}

const StyledRoot = styled.div`
    background: ${css.grayLighter};
    height: 100%;
    overflow-y: auto;
`

const StyledButton = styled.button`
    -webkit-font-smoothing: antialiased;
    background-color: ${css.red};
    border-radius: 3px;
    border: none;
    box-sizing: border-box;
    color: ${css.white};
    cursor: pointer;
    font-family: "Gibson-SemiBold", "Roboto", Arial, sans-serif;
    font-size: 11px;
    margin: 0 auto;
    outline: 0;
    padding: 10px 8px 8px 8px;
    text-align: center;
    text-shadow: none;
    text-transform: uppercase;
    vertical-align: middle;

    &:hover {
        background-color: ${css.redHover};
    }

    &:focus,
    &:active {
        color: ${css.white};
        background-color: ${css.redFocus};
    }

    &:disabled,
    &[disabled],
    &[disabled]:hover {
        background-color: ${css.redDisabled};
        cursor: not-allowed;
    }
`

const StyledInput = styled.input`
    background-color: ${css.white};
    border-radius: 3px;
    border: 1px solid ${css.grayLight};
    box-sizing: border-box;
    color: ${css.black};
    font-family: Roboto, Arial, sans-serif;
    font-size: 13px;
    font-weight: normal;
    height: 34px;
    line-height: 13px;
    margin-bottom: 15px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    outline: 0;
    padding-bottom: 8px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 8px;
    padding: 8px 10px;
    position: relative;
    vertical-align: top;
    width: 100%;

    &::-webkit-input-placeholder {
        color: ${css.graySmooth};
    }

    &::-webkit-input-placeholder {
        color: ${css.graySmooth};
    }

    &:-moz-placeholder {
        color: ${css.graySmooth};
    }

    &::-moz-placeholder {
        color: ${css.graySmooth};
    }

    &:-ms-input-placeholder {
        color: ${css.graySmooth};
    }

    &:focus {
        border-color: ${css.grayDarker};
        background-color: ${css.white};
    }
`

const StyledTitle = styled.div`
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 18px;
    line-height: 100%;
    font-weight: normal;
    margin: 0 0 25px 4px;
    padding: 0;
    color: ${css.black};
`

const StyledSharedContentForm = styled.div`
    border-bottom: 1px solid #cfd2d5;
    background: #fff;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
`

const SharedContentItem = styled.div`
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 #ECECEC;
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 15px;

    > label {
        color: ${css.black};
        font-size: 13px;
        font-weight: 500;
    }

    > p {
        color: ${css.black};
        font-size: 13px;
        font-weight: 400;
        margin: 0 0 10px 0;
        padding: 0;
    }

    > a {
        color: ${css.red};
        font-size: 13px;
        font-weight: 400;
        margin: 0 0 10px 0;
        padding: 0;
        display: block;
        text-decoration: none;

        &:hover,
        &:focus {
            text-decoration: underline;
            outline: 0 none;
        }
    }
`

class App extends React.Component {
    static propTypes = {
        links: PropTypes.arrayOf(PropTypes.shape({
            clicks: PropTypes.number.isRequired,
            finishedAt: PropTypes.string,
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })),
        name: PropTypes.string,
        onCreate: PropTypes.func.isRequired,
        onFinish: PropTypes.func.isRequired,
        url: PropTypes.string,
    }

    static defaultProps = {
        links: [],
        name: '',
        url: '',
    }

    constructor(props) {
        super(props)

        const { name, url } = props

        this.state = {
            isValid: null,
            name: name,
            url: url,
        }
    }

    handleNameOnChange = e => {
        const name = e.currentTarget.value

        e.stopPropagation()

        this.setState({ name: name })
    }

    handleUrlOnChange = e => {
        const url = e.currentTarget.value.trim()

        e.stopPropagation()

        this.setState({ url: url })
    }

    handleShareClick = e => {
        const { onCreate } = this.props
        const { name, url } = this.state

        const payload = {
            name,
            url,
        }

        e.stopPropagation()

        onCreate(payload)

        this.setState({
            name: '',
            url: '',
        })
    }

    handleFinishClick = (e, id) => {
        const { onFinish } = this.props

        e.stopPropagation()

        onFinish(id)
    }

    isFormValid = e => {
        const { name, url } = this.state
        const isValid = !is.empty(name) && is.url(url)

        e.stopPropagation()

        this.setState({ isValid: isValid })
    }

    render() {
        const { isValid, name, url } = this.state
        const { links } = this.props

        const isDisabled = !isValid

        const Links = links.map(l => {
            const isFinished = !is.null(l.finished_at)

            return (
                <SharedContentItem key={l.id}>
                    <label>Título</label>
                    <p>{l.name}</p>

                    <label>Link ativo</label>
                    <a href="{l.url}">{l.url}</a>

                    <label>Número de cliques</label>
                    <p>{l.clicks}</p>

                    {!isFinished && <StyledButton type="button" onClick={e => this.handleFinishClick(e, l.id)}>Encerrar</StyledButton>}
                </SharedContentItem>
            )
        })

        return (
            <StyledRoot>
                <StyledSharedContentForm>
                    <StyledTitle>Compartilhar link</StyledTitle>

                    <StyledInput type="text" placeholder="Título do link" value={name} onChange={this.handleNameOnChange} onKeyUp={this.isFormValid} />

                    <StyledInput type="text" placeholder="URL de acesso" value={url} onChange={this.handleUrlOnChange} onKeyUp={this.isFormValid} />

                    <StyledButton type="button" disabled={isDisabled} onClick={this.handleShareClick}>Compartilhar</StyledButton>
                </StyledSharedContentForm>

                {Links}
            </StyledRoot>
        )
    }
}

export default App
