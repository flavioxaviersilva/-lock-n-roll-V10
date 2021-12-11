import React from "react";
import {TextInput, View, Text, StyleSheet, Button, Dimensions, ActivityIndicator, Alert, Pressable, Image, navigation} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { tryLogin } from "../actions";
import { connect } from "react-redux";



class PaginaCriarUsuario extends React.Component {
    constructor (props) {              //
        super(props);
        this.state = {
            mail: '',
            password: '',
            isLoading: false,   //para a renderização do load de logar
            isLoadingGoogle: false,
            message: '',        //guarda mensagem de erro que será mostrada ao usuario
            pass: false,           // ok para autenticação certa
            usuarioNovo: true,
        }
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

    
   
    criarUsuario () {
        this.setState ({isLoading: true, message: '', pass: false});
        setTimeout (() => {
            const {mail: email, password, usuarioNovo} = this.state;           
            this.props.tryLogin ({email, password, usuarioNovo})        //aqui chamo a action creator, que não devolve apenas um abjeto, ela consegue fazer ações através do redux thunk 
                .then(user => {                                                         
                    if (user && usuarioNovo) {                        
                        this.setState ({
                            isLoading: false,
                            pass: true,                            
                            message: 'Usuário cadastrado com sucesso!',
                            usuarioNovo: false
                        });                       
                        
                    }else{

                        if  (user && !usuarioNovo) {                                                          
                                //this.props.navigation.reset({index: 0, routes: [{name: 'LocknRoll'}]});
                                
                                //return this.props.navigation.dispatch(StackActions.replace('LocknRoll'))
                                return this.props.navigation.replace('LocknRoll');
                                
                                //return this.props.navigation.replace('LocknRoll');                            
                                
                        }   this.setState ({
                            isLoading: false,      //usuário clicou em não no alert da userActions, então nada é dou outra chance ao usuario de fazer algo
                            message: ''                     
                    });
                    }
                                                    
                })
                .catch (error => {                   
                    this.setState ({
                        isLoading: false, 
                        message: this.getMessageByErrorCode(error.code)
                        
                    });
                })

                

        }, 1500)
    }

    getMessageByErrorCode (errorCode){
        console.log(errorCode);        
        switch (errorCode) {
            case 'auth/wrong-password': 
                return 'Senha incorreta!';
            case 'auth/user-not-found': 
                return 'Usuário não encontrado!';
            case 'auth/invalid-email':
                return 'E-mail inválido!';
            case 'auth/email-already-in-use':
                return 'E-mail já cadastrado!';
            case 'auth/weak-password':
                return 'Senha não permitida!';           
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
                <Text style = {[styles.error, pass ? styles.success : null]}>{message}</Text> 
            </View>
                        
        );               
    }
   

    render() {
        return (   //formrow = margem de linha

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


                <FormRow last>
                    <TextInput style = {styles.input} 
                        placeholder = 'Confirme a Senha'
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

                        {
                            this.state.usuarioNovo
                            ?   <Pressable style={styles.button} onPress={() => this.criarUsuario()}>                             
                                    <Text style={styles.text}>CRIAR USUÁRIO</Text>                          
                                </Pressable>             
                        


                            :   <Pressable style={styles.button} onPress={() => this.criarUsuario()}>                             
                                    <Text style={styles.text}>LOGAR</Text>                          
                                </Pressable>         
                        }
                     {this.renderMessage()}
                                              
                    </View>
                }                
                                                  

                    <View style = {styles.fullpage}>

                        
                                      
                    </View>
            </View>   
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
        marginTop: 40,
        marginBottom: 20,
        
    },  
    imageFoot: {
        alignSelf: 'center',
        width: '90%',
		height: Dimensions.get('window').width / 6,
        aspectRatio: 1,
		marginTop: 10,
        marginBottom: 50,
        
    },

    fullpage: {      
        
        paddingTop: 50,
        paddingBottom: 2000

    },    
    
    container: {              
        backgroundColor: '#cfd1d4',
      
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
        elevation: 3,
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
        paddingTop: 10,
        
    },

    success: {
        color: 'green',
        
    },
        

});

const delay = ms => new Promise ((resolve, reject) => {
    setTimeout(() => resolve(), ms)

});
//export default connect (mapStateToProps, mapDispatchToProps || {actionCreator})(LoginPage)
export default connect (null, {tryLogin} || {actionCreator})(PaginaCriarUsuario)

