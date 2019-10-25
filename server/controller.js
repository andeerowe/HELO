module.exports = {
    registerUser: async(req,res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        let newUser = await db.register_user(username, password)
        newUser = newUser[0]
        res.status(200).send(newUser)
    },
    login: async (req,res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        let foundUser = await db.login(username, password)
        foundUser= foundUser[0]
        if (!foundUser){res.status(404).send('Incorrect username or password')} else {res.status(200).send(foundUser)}
    },
    getPosts: async (req,res) => {
        const {userId} = req.params
        const {myPosts, search} = req.query
        const db = req.app.get('db')

        let posts = await db.get_posts()
        // res.status(200).send(posts)

        let matchingPosts = []

        if(myPosts && search){
            for(let i = 0; i < posts.length; i++){
                if(posts[i].title.includes(search)){
                    matchingPosts.push(posts[i])
                }
            }
            res.status(200).send(matchingPosts)
        }



    }
}