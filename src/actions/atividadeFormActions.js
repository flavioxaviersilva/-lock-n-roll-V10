import firebase from 'firebase';
//import firebase from "@firebase/app";
import "@firebase/database";
import { Alert, RecyclerViewBackedScrollViewBase } from 'react-native';

//obs. dois reducers podem reagir a uma mesma action type

export const SET_FIELD = 'SET_FIELD';   ///action type (tipo de acão)
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    }
}

export const SET_TODA_ATIVIDADE = 'SET_TODA_ATIVIDADE';
export const setTodaAtividade = atividadeToEdit => ({
    type: SET_TODA_ATIVIDADE,
    atividadeToEdit

});

export const LIMPAR_FORMULARIO = 'LIMPAR_FORMULARIO';
export const limparFormulario = () => ({
    type: LIMPAR_FORMULARIO

});


export const ATIVIDADE_SAVED_SUCCESS = 'ATIVIDADE_SAVED_SUCCESS';   //toda ection precisa de um type que será o nome da constante
const atividadeSaveSuccess = () => ({
    type: ATIVIDADE_SAVED_SUCCESS

});

export const saveAtividade = atividade => {

    const {currentUser} = firebase.auth();
    return async dispatch => {             // o await do firebase precisa de uma função assincrona pra funcionar      
        //throw new Error('Meu Erro!');   //forçar erro para testar o try catch
        const db = firebase.database();

        if (atividade.id) {
            await db.ref(`/user/${currentUser.uid}/atividades/${atividade.id}`)
            .set(atividade)
        } else {
            await db.ref(`/user/${currentUser.uid}/atividades`) //colocando o return aqui eu estou devolvendo uma primise (rejected ou resolved) 
            .push(atividade)                     //dessa forma quem chamou a função saveAtividade (botão da AtividadesFormPage) tem o método .then
                                              //pra voltar ao initial state do formulário, mando a action atividadeSaveSuccess
                                            // e no reducer (atividadeFormReducer), coloco mais um case com essa action e chamo
        }
        dispatch(atividadeSaveSuccess())            
    }   

}


// const delay = ms => new Promise ((resolve, reject) => {
//     setTimeout(() => resolve(), ms)

// })

