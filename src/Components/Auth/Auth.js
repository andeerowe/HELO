import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/reducer'

class Auth extends Component {
    constructor (){
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerUser = () => {
        console.log('registerUser fired')
        const {username, password} = this.state
        axios.post('/auth/register',{username, password}).then( res => {
            this.props.updateUser(res.data)
            this.setState({
                username: '',
                password:''
            })
            this.props.history.push('/dashboard')
        }
            
        )
        
    }

    login = () => {
        console.log('login method fired')
        const {username, password} = this.state
        axios.post('/auth/login', {username, password}).then( res => {
            console.log(res.data)
            console.log(this.props)
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        }
            
        )

    }

    render(){
        console.log(this.state.username)
        console.log(this.state.password)
        return(
            <div>
                Username:
                <input name="username" onChange={e => this.handleInput(e)}/>
                Password:
                <input name="password" onChange={e => this.handleInput(e)}/>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.registerUser()}>Register</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Auth)