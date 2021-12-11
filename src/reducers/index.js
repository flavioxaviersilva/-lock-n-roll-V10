import { combineReducers } from 'redux';

import userReducer from './userReducer';
import atividadeFormReducer from './atividadeFormReducer';
import atividadesReducer from './atividadesReducer';
import userGoogleReducer from './userGoogleReducer';

export default combineReducers({
	user: userReducer,
	atividadeForm: atividadeFormReducer,
	atividades: atividadesReducer,
	userGoogle: userGoogleReducer,
});

