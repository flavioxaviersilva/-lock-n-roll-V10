//import seriesMock from '../../series.json';
import { LOAD_FIREBASE } from '../actions';

export default function (state = null, action) {
    switch (action.type) {
        case LOAD_FIREBASE:
            return action.atividades;
          
    
        default:
            return state;  
    }

    
}