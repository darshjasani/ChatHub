export const initialState ={
    user:null,
    userId:null,
    isSocial:null,
    profileUrl:null
};

export const  actionTypes = {
    SET_USER :   "SET_USER", 
};

const Reducer = (state,action)=>{
    //console.log(action);

    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user,
                userId:action.userId,
                isSocial:action.isSocial,
                profileUrl:action.profileUrl
            }
        
        default:
            return state;
    }
}

export default Reducer;