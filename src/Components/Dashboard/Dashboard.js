import React, {Component} from 'react'
import axios from 'axios'

class Dashboard extends Component {
    constructor (){
        super()

        this.state = {
            search: 'a',
            myPosts: true,
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
        axios.get(`/api/posts?myPosts=${true}&search=${'a'}`,)
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
            console.log(this.state.myPosts)
        } else {
            this.setState({
                myPosts: true
            })
            console.log(this.state.myPosts)
        }
    }

    render(){
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

export default Dashboard