import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './nav.css'
import {connect} from 'react-redux'

class Nav extends Component {
    constructor (){
        super()

        this.state = {}
    }

    render(){
        // console.log(this.props)
        if(this.props.location.pathname === '/'){return(
            <div>
            
            </div>
        )} else{
            return(
                <div className="nav">
                    {this.props.username}
                    {this.props.profilePic}
                    <Link to="/">Home</Link>
                    <Link to="/new">New Post</Link>
                    <Link to="/">Logout</Link>
                </div>
            )
        }
        
    }
}

const mapStateToProps = reduxState => {
    return {
        username: reduxState.username,
        profilePic: reduxState.profilePic
    }
}

export default connect(mapStateToProps)(withRouter(Nav))