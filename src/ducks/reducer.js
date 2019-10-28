const initialState = {
    username: '',
    userId: 0,
    profilePic:''
}
const UPDATE_USER = 'UPDATE_USER'

export function updateUser(userObj){
    console.log('action function hit', userObj)
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}



export default function reducer(state = initialState, action){
    const {type, payload } = action
    switch(type){
        case UPDATE_USER:
            return {...state, username: payload.username, userId: payload.id, profilePic: payload.profic_pic}
            
        default:
            return state
    }
}