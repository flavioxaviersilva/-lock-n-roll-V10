import firebase from 'firebase';
import { Alert } from 'react-native';
//import firebase from "@firebase/app";
import "@firebase/database";

export const LOAD_FIREBASE = 'LOAD_FIREBASE';
const loadFirebase = atividades => ({
    type: LOAD_FIREBASE,
    atividades,
});


export const limparAtividades = () => {    
    return dispatch => {
      
           
		return dispatch(loadFirebase({}))
			
            
    }
}

export const watchAtividades = () => {
    const {currentUser} = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/atividades`) 
            .on('value', Snapshot => {       //registrar um callback sempre que um evento acontecer no firebase
                //console.log(Snapshot.val());           //once executa apenas uma vez o callback uma unica vez e o on sempre que o value vier
                const atividades = Snapshot.val();

                if (!atividades) {
					return dispatch(loadFirebase({}))
				}

                const action = loadFirebase(atividades);
                dispatch(action)
            });  
    }
}

export const deletarAtividade = atividadeToDelete => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert('Deletar',
            `Deseja deletar a atividade ${atividadeToDelete.title}`,
            [{
                text: 'Não',
                onPress: () => {
                    resolve(false);
                },
                style: 'cancel'

            },{
                text: 'Sim',
                onPress: async() => {
                    const {currentUser} = firebase.auth();
                    try {
                        await firebase
                        .database()
                        .ref(`/user/${currentUser.uid}/atividades/${atividadeToDelete.id}`)
                        .remove();
                        resolve(true);
                    } catch (error) {
                        reject(error);
                        console.log(error)
                    }                    
                },

            }],
            {cancelable: false}              
            )
        })
    }
}




// const {currentUser} = firebase.auth();
// return async dispatch => {             // o await do firebase precisa de uma função assincrona pra funcionar      
//     //throw new Error('Meu Erro!');   //forçar erro para testar o try catch
//     await firebase              //colocando o return aqui eu estou devolvendo uma primise (rejected ou resolved) 
//         .database()                     //dessa forma quem chamou a função saveAtividade (botão da AtividadesFormPage) tem o método .then
//         .ref(`/user/${currentUser.uid}/series`)
//         .push(serie)
//     dispatch(atividadeSaveSuccess())       //pra voltar ao initial state do formulário, mando a action atividadeSaveSuccess
//     console.log(serie)                     // e no reducer (atividadeFormReducer), coloco mais um case com essa action e chamo

        
// }   
