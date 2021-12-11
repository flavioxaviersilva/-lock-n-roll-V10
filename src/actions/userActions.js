import firebase from 'firebase';



export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({                     //action creator
	type: USER_LOGIN_SUCCESS,
	user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
	type: USER_LOGOUT,
});

// const loginUserSuccess = user => {
//     this.setState ({ message: 'Sucesso!', pass: true});    // pass é variavel para formatacao verde
//     this.props.navigation.navigate ('Main');
// }

// const loginUserFailed = error => {
//     this.setState ({
//         message: this.getMessageByErrorCode(error)
//     });

// }


export const signOutUser = () => async dispatch => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            const action = userLogout();
            dispatch(action);
           
        })
        
}


// devolveu essa função pro redux, o redux thunk a chamou pelo dispath (middleware), nossa store cuida de tudi
//caiu no firebase, tentou fazer a autenticacao, suceeeo, caiu no then. Agora podemos dispachar acoes assincronas,
//todas as actions foram sincronas até agora. 
export const tryLogin = ({ email, password, usuarioNovo}) => async dispatch => {    
    if (usuarioNovo) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // .then (resolve)           
            // .catch (reject) 
            .then(user => {
                const action = userLoginSuccess (user); //motivo do dispach é ser livre pra poder colocar quantos dispath quiser
                //console.log(user);
                dispatch(action);
                return user;
            })
            .catch(error => {                  //caso retorne erro, cai no catch              
                
                return Promise.reject(error)        //loginUserFailed(error.code)        
            }) 

    }

        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        //vou receber um user, quando tiver o usuario aqui, quando dá certo, cai no then, agora eu passo isso
        //pra alguma lugar, pra alguma store, o fluxo é dispachar a action pelo dispatch, isso vai ser tratado
        //por um reducer e ai sim vai lá pra store pra poder trabalhar com esse dado na aplicação toda.
        .then(user => {
            const action = userLoginSuccess (user); //motivo do dispach é ser livre pra poder colocar quantos dispath quiser
            //console.log(user);
            dispatch(action);
            return user;
        })
        .catch(error => {                  //caso retorne erro, cai no catch
            //console.log(error.code)
            
            return Promise.reject(error)        //loginUserFailed(error.code)        
        })
        //.then(() => this.setState({isLoading: false}));
            
}


// export const criarUsuario = ({ email, password}) => async dispatch => {
//     return firebase
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then (resolve)           //(loginUserSuccess)
//             .catch (reject)           //(loginUserFailed)
            
            // .then(user => {
            //     const action = userLoginSuccess (user);  
            //     console.log(user);
            //     dispatch(action);
            //     return user;
            // })
            // .catch(error => {                  //caso retorne erro, cai no catch
            //     //console.log(error.code)
                
            //     return Promise.reject(error)        //loginUserFailed(error.code)        
            // })
            // //.then(() => this.setState({isLoading: false}));   
// }


// if (error.code === 'auth/user-not-found') {   //aqui trocamos o alert que é sincrono e não uma promise, ele retona callbacks de funções
//     return new Promise ((resolve, reject) => {
//         Alert.alert (
//             'Usuário não encontrado!',
//             'Deseja se cadastrar com esse e-mail?',
//             [{
//                 text: 'Não',   //aqui não é um erro, é uma escolha do usuario, então é um resolve e não um reject
//                 onPress: () => resolve (),                      //console.log ('Usuário cancelou o cadastro rápido'),
//                 style: 'cancel',  // IOS
//                 //message: this.getMessageByErrorCode(error.code)
//             },{
//                 text: 'Sim',
//                 // onPress: () => {this.props.navigation.navigate('NewUser')}
//                 onPress: () => {
//                     firebase
//                         .auth()
//                         .createUserWithEmailAndPassword(email, password)
//                         .then (resolve)           //(loginUserSuccess)
//                         .catch (reject)           //(loginUserFailed)
//                 }
//             }],
//             {cancelable: false}   //obriga o usuario a escolher a opcao do alert                
//             )
//     })                   
// }               