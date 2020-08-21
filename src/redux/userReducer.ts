import { User } from "../types";
import { FETCH_API_SUCCESS } from "./userSaga";

interface UserReducerState {
    users: User[]
}

const initialState: UserReducerState = {
    users: []
}

const userReducer = (
    state = initialState,
    action: any
): UserReducerState => {
    switch (action.type) {
        case FETCH_API_SUCCESS:
            return {
                users: action.data
            }
        default:
            return state
    }
}

export default userReducer
