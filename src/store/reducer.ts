import { UnknownAction } from 'redux'
interface StatesType{
    token: string;
}
const defaultStates:StatesType = {
    token: '',
};

export default (previousState = defaultStates, action: UnknownAction) => {
    if(action.type === 'SETTOKEN'){
        return {
            ...previousState,
            token: action.payload as string,
        }
    }
    return previousState;
}
