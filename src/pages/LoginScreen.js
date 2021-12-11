import RNAndroidInstalledApps from 'react-native-android-installed-apps-categories'
//import RNAndroidAppList from 'react-native-android-app-list';
import React from "react";
import {TextInput, View, Text, StyleSheet, Button, ScrollView, Dimensions, ActivityIndicator, Alert, Pressable, Image, navigation} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { tryLogin } from "../actions";
import { connect } from "react-redux";
import * as Google from 'expo-google-app-auth'
import {tryLoginGoogle} from "../actions";
import { signOutGoogle} from "../actions";
import { signOutUser} from "../actions";
import {limparAtividades} from "../actions";





class LoginPage extends React.Component {
    constructor (props) {              //
        super(props);
        this.state = {
            mail: '',
            password: '',
            isLoading: false,   //para a renderização do load de logar
            isLoadingGoogle: false,
            message: '',        //guarda mensagem de erro que será mostrada ao usuario
            pass: true,           // ok para autenticação certa
            usuarioNovo: false,
        }
    }

    
 
    handleGoogleSignin = async() => {
        this.setState ({isLoadingGoogle: true, message: ''});
        this.props.signOutGoogle();
        this.props.signOutUser();
        this.props.limparAtividades();       
        
        setTimeout (() => {           

            const config = {
                androidClientId:`768166117592-c7ak2k3fajsg86nsakovg8tav7r5up7d.apps.googleusercontent.com`,
                //ClientId:`768166117592-26f7n2satp7dq49utbifs9o8cr3ib7s8.apps.googleusercontent.com`,
                androidStandaloneAppClientId:`768166117592-0eh2jio56pgqsko1cvv733r7kluush43.apps.googleusercontent.com`,
                scopes: ['profile', 'email']
            };            
            
            Google
                .logInAsync(config)
                .then ((result) => {
                    const {type, accessToken, idToken, user} = result;                   
                                        
                    if (type === 'success'){
                        const {email, name, photoUrl, id} = user;
                        
                        const credencial = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                        this.props.tryLoginGoogle(credencial)
                        .then(userGoogle => {
                            
                            if (userGoogle) {
                                return this.props.navigation.replace('LocknRoll'); 
                                                                                       
                            }      
                            this.setState ({
                                isLoadingGoogle: false,     
                                message: ''
                            });                                                                
                        })
                        .catch (error => {
                            
                            this.setState ({
                                isLoadingGoogle: false,                               
                                message: this.getMessageByErrorCode(error.code)                                
                            });
                        })
                       
                        //firebase.auth().signInWithCredential(credencial)
                            
                        //setTimeout(() => this.props.navigation.replace('Main'),2500);                                         
                        
                    }else {
                        this.setState ({
                            isLoadingGoogle: false, 
                            message: 'Login do Google foi cancelado',                               
                        });
                        
                    }                    
                })
                .catch(error => {
                    this.setState ({
                        isLoadingGoogle: false,                         
                        message: this.getMessageByErrorCode(error.code)
                                                        
                    });                    
                    
                })
        },1500)       
    
    }   

    componentDidMount() {
        
        const config = {
            apiKey: "AIzaSyBx0mGSdSxyuN2PRoeJgh6qjaXIIMvLCr4",
            authDomain: "locknroll-22a.firebaseapp.com",
            projectId: "locknroll-22a",
            storageBucket: "locknroll-22a.appspot.com",
            messagingSenderId: "768166117592",
            appId: "1:768166117592:web:e35495da0571c4d55097ad",
            measurementId: "G-R6MWY3LJJG"
        };
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();   //para erro do hotreload  
               
    }

  
    onChangeHandler (field, value) {            //funcao responsavel pela mudanca nos campos de componentes controlados
        // const newState = {};
        // newState[field] = value;
        // this.setState(newState);
        this.setState ({
            [field]: value

        });
    }

   
    tryLogin () {
        this.setState ({isLoading: true, message: '', pass: false});
        this.props.signOutGoogle();
        this.props.signOutUser();
        this.props.limparAtividades();


        setTimeout (() => {
            //console.log (this.state);
            const {mail: email, password, usuarioNovo} = this.state;
            
            this.props.tryLogin ({email, password, usuarioNovo})        //aqui chamo a action creator, que não devolve apenas um abjeto, ela consegue fazer ações através do redux thunk 
                .then(user => {
                    console.log(user);
                    //this.setState ({ message: 'Sucesso!', pass: true});    // pass é variavel para formatacao verde
                    if (user) {
                        return this.props.navigation.replace('LocknRoll');   //replace ao inves de navigate evita a seta
                                                        //de voltar no menu principal.
                    }       //aqui podia usar o else e colocar o this.setstate de baixo dentro, mas pode usar o return pra garantir que a parte de baixo não será executada
                    this.setState ({
                        isLoading: false,      //usuário clicou em não no alert da userActions, então nada é dou outra chance ao usuario de fazer algo
                        message: ''
                    });
                    
                                                    
                })
                .catch (error => {
                    console.log ('catch da login page', error.code);
                    this.setState ({
                        isLoading: false, 
                        message: this.getMessageByErrorCode(error.code)
                        
                    });
                })

                

        }, 1500)
    }

    // const loginUserSuccess = user => {
//     this.setState ({ message: 'Sucesso!', pass: true});    // pass é variavel para formatacao verde
//     this.props.navigation.navigate ('Main');
// }

// const loginUserFailed = error => {
//     this.setState ({
//         message: this.getMessageByErrorCode(error)
//     });

    getMessageByErrorCode (errorCode){        
        switch (errorCode) {
            case 'auth/wrong-password': 
                return 'Senha incorreta!';
            case 'auth/user-not-found': 
                return 'Usuário não encontrado!';
            case 'auth/invalid-email':
                return 'E-mail inválido!';
            default:
                return  'Erro desconhecido!';   
        }
    }

  
    renderMessage () {
        const { message, pass } = this.state;
        if (!message)                       //if not, se não tiver nada na mensagem, não renderiza nada
            return null;
        return (       
                       
            <View >
                <Text style = {[styles.error, pass ? styles.pass : null]}>{message}</Text> 
            </View>            
        );               
    }

    getAplications () {
       
        RNAndroidInstalledApps.getApps()
        .then((apps) => {
            //this.setState({ apps })
            console.log({apps});
        })
        .catch((error) => {
            alert(error)
        })       

        // RNAndroidAppList.getAllPermissions().then(data=>{
        //     console.log(data);
        // }); 


    }
   

    render() {
        return (   //formrow = margem de linha
            
                <ScrollView keyboardShouldPersistTaps='handled'>
                                      

                    <View style = {styles.container}>

                        <Image
                            source={require('../../resources/locklogoPB2.png')}
                            style={styles.image}
                        />

                        <FormRow first> 
                            <TextInput style = {styles.input} 
                                placeholder = 'E-mail de Usuário'
                                value = {this.state.mail}
                                onChangeText={value => this.onChangeHandler('mail', value)}   //funçao de callback
                                keyboardType = 'email-address'
                                autoCapitalize = 'none'
                            /> 
                        </FormRow>


                        <FormRow last>
                            <TextInput style = {styles.input} 
                                placeholder = 'Senha'
                                secureTextEntry = {true}
                                value = {this.state.password} 
                                onChangeText={value => this.onChangeHandler('password', value)}
                            />  
                        </FormRow>

                    
                    {
                        this.state.isLoading
                        ?<View style={styles.buttonView}>
                            <ActivityIndicator size='large' color ='black' />
                            </View>  
                                        
                        :<View style={styles.buttonView}>                        
                                <Pressable style={styles.button} onPress={() => this.tryLogin()}>
                                    <Text style={styles.text}>LOGIN</Text>
                                </Pressable>             
                                {this.renderMessage()}                      
                        </View>
                        }                
                                    
                                                        
                
                            <View style = {styles.sameRow}>

                                <Pressable onPress={() => this.props.navigation.navigate('NewUser')}>
                                    <Text style = {styles.links}>Registrar</Text>
                                </Pressable> 

                                <Pressable onPress={() => this.props.navigation.navigate('ResetPassword')}>
                                    <Text style = {styles.links}>Esqueceu a senha</Text>
                                </Pressable>                        
                                            
                            </View>                    
                    

                            <View style = {styles.fullpage}>

                                <View style = {styles.sameRowline}>
                                    <Text style = {styles.line}>_________</Text>
                                    <Text style = {styles.label}>Outras formas de login</Text>
                                    <Text style = {styles.line}>_________</Text>

                                </View>



                                {/* <Pressable onPress={this.handleGoogleSignin}>
                                    <Text>Google</Text>
                                </Pressable> */}

                        
                                {
                                this.state.isLoadingGoogle
                                ?<View>
                                    <ActivityIndicator size='large' color ='black' />
                                </View>  
                                                
                                //:<Pressable onPress={this.handleGoogleSignin}>
                                :<Pressable onPress={this.getAplications}>
                                    <Image
                                        source={require('../../resources/google-icon.png')}
                                        style={styles.imageFoot}
                                    />                                    
                                </Pressable>                                           
                                }                    
                                            
                            </View>
                    </View>               
                       
                </ScrollView>   
            
        )   
    }
}

const styles = StyleSheet.create ({
    links: {
        color: '#3fa5d1'
    },

    line: {
        color: '#3fa5d1',
        lineHeight: 14,
        paddingLeft: 5,
        paddingRight: 5,
       
    },

    sameRowline: {
        flexDirection: 'row',
        alignSelf: 'center'
    },

    label: {
        fontWeight: 'bold',
        color: 'grey'
    },

    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 20,
        

    },

    image: {
	    alignSelf: 'center',
		aspectRatio: 1,
        height: Dimensions.get('window').width / 4,
        borderRadius: 30,
        marginTop: 25,
        marginBottom: 25,
        
    },  
    imageFoot: {
        alignSelf: 'center',
        width: '10%',
		height: Dimensions.get('window').width / 6,
        aspectRatio: 1,
		marginTop: 10,
        marginBottom: 10,
        
    },

 
    fullpage: {      
        
        paddingTop: 50,
        paddingBottom: 10

    },    
    
    container: {              
        backgroundColor: '#cfd1d4',
        height: Dimensions.get('window').height - 15
      
    },

    input: {
        paddingLeft: 5,
        paddingRight:5,
        paddingBottom: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        height: 40

    },
    buttonView: {
        marginTop: 25,
        paddingLeft: 40,
        paddingRight: 40,
        //flex: 1,
        height: Dimensions.get('window').width / 4,
       
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: '#3fa5d1',
        paddingLeft: 40,
        paddingRight: 40,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },


    error: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 15,
        paddingTop: 10
        
    },

    pass: {
        color: 'green',

    }
        

});

const delay = ms => new Promise ((resolve, reject) => {
    setTimeout(() => resolve(), ms)

});
//export default connect (mapStateToProps, mapDispatchToProps || {actionCreator})(LoginPage)
export default connect (null, {tryLogin, tryLoginGoogle, signOutGoogle, signOutUser, limparAtividades} || {actionCreator})(LoginPage)