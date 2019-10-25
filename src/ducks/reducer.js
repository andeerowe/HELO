const initialState = {
    username: 'a',
    userId: 'b',
    profilePic:'c'
}
const UPDATE_USER = 'UPDATE_USER'

export function updateUser(userObj){
    console.log('action function hit')
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