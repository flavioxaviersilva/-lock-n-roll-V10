
import { ATIVIDADE_SAVED_SUCCESS, SET_FIELD, SET_TODA_ATIVIDADE, LIMPAR_FORMULARIO } from '../actions';
//recebendo o set_field vou alterar o estado de alguma forma


//se o state vier underfined, o redux vai passar assim a primeira vez, tem que providenciar o state default. 
//se não for esse pedaço de state, se não for esse a chave usada, devolvo o próprio state (return do default: state)
//aqui o state inicial deverá ser mais completo que o null do userReducer. Aqui será passado um objeto.

const INITIAL_STATE = {             //constant pra não se alterar. obs quanto as aspas: no json não aceita aspas simples, apenas duplas                                    
    id: null,                       //e as chaves precisam estar envoltas de chaves. Aqui, no JS não necessita.
    title: '',
    tipoAtividade: 'Atividade de Foco',
    pontosAtividade: 0,
    //img: '',
    img64: '',
    description: '',
    dataInicial: `${new Date()}`,
    dataFinal: `${new Date()}`,
}
//imutabilidade (mutar state): Caracteristica de não alterar o objeto, você não pode mudar, você vai criar um novo 
//objeto para subistituir o antigo 
//exemplo errado: state[action.field] = action.value e depois, return state. Aqui eu estou mutando o state.
export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_FIELD:
                //action.field
                //action.value
            
            //const newState = Object.assign ({}, state)  //clonar o objeto, passo um objeto vazio e o state
            //newState[action.field] = action.value;   //aqui eu estou mutando esse mewState, mas não o INITIAL_STATE e também 
                                                       //não pode mutar o state

            //usando o spred operator que funciona pra vetor e pra objeto
            const newState = {...state}
            newState[action.field] = action.value;
            return newState;

        case SET_TODA_ATIVIDADE:
            return action.atividadeToEdit;

        case LIMPAR_FORMULARIO:
            return INITIAL_STATE;

        case ATIVIDADE_SAVED_SUCCESS:
            return INITIAL_STATE;
        
        default: 
            return state;




    }

}

//todos os reducers recebem e uma state (providenciar um estado inicial) e uma action. 
//switch case chegando o action.type. SET_FIEL espera que nossa action receba chave e valor
//chave (campo por exemplo) e valor (quando o usuario digita eu quero saber o campo que o usuario digitou e o valor)
//
//
//