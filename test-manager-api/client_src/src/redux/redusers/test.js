import constants from '../constants';

const tests = (state={},action)=>{

    switch(action.type){
        case constants.tests.CREATE_TEST:
        var id = action.payload.id;
        return {
            ...state,
            [id]:{
                id: id
            }
        }
    }
    return state;
}
export default tests;