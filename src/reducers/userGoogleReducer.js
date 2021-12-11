
import {USER_GOOGLE_DATA, USER_GOOGLE_LOGOUT} from '../actions';

export default function userGoogleReducer (state = null, action) {
    switch (action.type) {
        case USER_GOOGLE_DATA:
                return action.userGoogle;
        case USER_GOOGLE_LOGOUT:
            return null;
    
        default:
            return state;
    }
    
}