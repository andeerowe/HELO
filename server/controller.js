const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: async(req,res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        // const {session} = req
        console.log('backend register function hit')
        let user = await db.check_user(username)
        user = user[0]
        if(user){
            return status(400).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register_user(username, hash)
        newUser = newUser[0]
        // session.user = newUser
        res.status(200).send(newUser)
    },
    login: async (req,res) => {
        console.log('backend login function hit')
        const {username, password} = req.body
        console.log(username, password)
        const db = req.app.get('db')
        let foundUser = await db.login(username)
        foundUser= foundUser[0]
        if (!foundUser){
            console.log('found user if statement falsy')
            res.status(404).send('Incorrect username or password')} 
        let authenticated = bcrypt.compareSync(password, foundUser.password)
        if (authenticated){
            console.log('Authentication successful')
            delete foundUser.password
            res.status(200).send(foundUser)
        } else {
            res.status(400).send('Incorrect Password')
        }
        
    },
    // getUser:(req,res) => {
    //     const {user} = req.session
    //     if(user){
    //         res.status(200).send(user)
    //     } else {
    //         res.status(500).send('User not on session')
    //     }
    // },
    // logout:(req,res) => {
    //     req.session.destroy()
    //     res.sendStatus(200)
    // },
    getPosts: async (req,res) => {
        let {userId} = req.params
        userId = +userId
        const {myPosts, search} = req.query
        console.log(myPosts, search, userId)
        const db = req.app.get('db')

        let posts = await db.get_posts()

        let matchingPosts = []

        if(myPosts !== 'false' && search){
            console.log('hit 1')
            for(let i = 0; i < posts.length; i++){
                if(posts[i].title.includes(search)){
                    matchingPosts.push(posts[i])
                }
            }
            res.status(200).send(matchingPosts)
        } else if(myPosts ==='false' && !search){
            console.log('hit 2')
            for(let i = 0; i < posts.length; i++){
                if(posts[i].id !== userId){
                    matchingPosts.push(posts[i])
                }
            }
            res.status(200).send(matchingPosts)
        } else if(myPosts === 'false' && search){
            console.log('hit 3')
            for(let i = 0; i < posts.length; i++){
                if(posts[i].author_id !== userId && posts[i].title.includes(search)){
                    matchingPosts.push(posts[i])
                }
            }
            res.status(200).send(matchingPosts)
        } else {
            console.log('hit 4')
            res.status(200).send(posts)
        }



    }
}