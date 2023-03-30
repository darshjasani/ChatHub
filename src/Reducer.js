export const initialState ={
    user:"dj",
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
                user:action.user
            }
        
        default:
            return state;
    }
}

export default Reducer;