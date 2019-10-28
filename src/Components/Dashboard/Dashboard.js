import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './dashboard.css'

class Dashboard extends Component {
    constructor (){
        super()

        this.state = {
            search: '',
            myPosts: false,
            // userId: 0,
            posts: []
        }
    }
    componentDidMount = () => {
        this.search()
    }
    search = () => {
        console.log('search hit')
        axios.get(`/api/posts/${this.props.userId}?myPosts=${this.state.myPosts}&search=${this.state.search}`,)
        .then(res => {
            console.log('hit', res.data)
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log('NOOOO', err))
    }

    handleSearchChange = (value) => {
        this.setState({
            search: value
        })
        
    }

    toggleCheck = () => {
        if(this.state.myPosts){
            this.setState({
                myPosts: false
            })
            // console.log(this.state.myPosts)
        } else {
            this.setState({
                myPosts: true
            })
            
        }
    }

    resetSearch = () => {
        axios.get(`/api/posts/${this.props.userId}?myPosts=${this.state.myPosts}`,)
        .then(res => {
            console.log('hit', res.data)
            this.setState({
                posts: res.data,
                search: ''
            })
        })
        .catch(err => console.log('NOOOO', err))
    }

    render(){
        console.log(this.props.userId)
        // console.log(this.state.myPosts)
        // console.log(this.state.search)
        return(
            <div>
                <h4>Search by Title: </h4>
                <input value={this.state.search} onChange={e => this.handleSearchChange(e.target.value)}/>
                <button onClick={() => this.search()}>Search</button>
                <button onClick={ () => this.resetSearch()}>Reset</button>
                <br/>
                Include My Posts:
                <input type="checkbox" onChange={() => this.toggleCheck()}/>
                <h3>POSTS</h3>
                {/* userId:{this.props.userId} */}
                {this.state.posts.map((e, i) => {
                    return (
                        <div className="post-container" key={i}>
                            Post Title: {e.title}
                            <br />
                            Post Author: {e.username}
                            <br />
                            Post Content: {e.content}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.userId
    }
}

export default connect(mapStateToProps)(Dashboard)