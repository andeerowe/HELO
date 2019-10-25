import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor (){
        super()

        this.state = {
            search: '',
            myPosts: false,
            userId: 1,
            posts: [
                {
                    title: 'fake',
                    author: 'fake',
                    profilePic: 'fake',
                    postContent: 'fake'
                },
                {
                    title: 'fake',
                    author: 'fake',
                    profilePic: 'fake',
                    postContent: 'fake'
                },
                {
                    title: 'fake',
                    author: 'fake',
                    profilePic: 'fake',
                    postContent: 'fake'
                }
            ]
        }
    }

    search = () => {
        console.log('search hit')
        axios.get(`/api/posts/${this.state.userId}?myPosts=${this.state.myPosts}&search=${this.state.search}`,)
        .then(res => {
            console.log('hit', res.data)
            // if(res.data)
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

    render(){
        console.log(this.state.userId)
        console.log(this.state.myPosts)
        return(
            <div>
                Dashboard
                <input onChange={e => this.handleSearchChange(e.target.value)}/>
                <button onClick={() => this.search()}>Search</button>
                <button>Reset</button>
                My Posts:
                <input type="checkbox" onChange={() => this.toggleCheck()}/>
                <h2>Posts</h2>
                {this.state.posts.map((e, i) => {
                    return (
                        <div key={i}>
                            {e.title}
                            {e.author}
                            {e.profilePic}
                            {e.postContent}
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