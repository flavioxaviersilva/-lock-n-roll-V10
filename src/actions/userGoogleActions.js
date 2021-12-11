import firebase from 'firebase';

export const USER_GOOGLE_DATA = 'USER_GOOGLE_DATA';
export const USER_GOOGLE_LOGOUT = 'USER_GOOGLE_LOGOUT';

const userLoginGoogle = userGoogle => ({
    type: USER_GOOGLE_DATA,
    userGoogle
});

const userGoogleLogout = () => ({
    type: USER_GOOGLE_LOGOUT,
    
});

export const signOutGoogle = () => async dispatch => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            const action = userGoogleLogout();
            dispatch(action);
           
        })
        
}



export const tryLoginGoogle = (credencial) => async dispatch => {
    return firebase
            .auth()
            .signInWithCredential(credencial)
            .then(userGoogle => {
                const action = userLoginGoogle (userGoogle);                
                dispatch(action);
                return userGoogle;
            })
            .catch(error => {                  //caso retorne erro, cai no catch
                //console.log(error.code)
                
                return Promise.reject(error)        //loginUserFailed(error.code)        
            })
            //.then(() => this.setState({isLoading: false}));   
}
