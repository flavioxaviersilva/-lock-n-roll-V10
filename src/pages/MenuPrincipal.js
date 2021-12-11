import React from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions, Pressable, Alert } from "react-native";
import firebase from "firebase";
import MenuCard from "../components/MenuCard";

import menu from '../../menu.json';
import { connect } from "react-redux";


const isImpar = number => number % 2 === 0;

const MenuPrincipal = props => (

    <View>
            {
                props.userGoogle
                ?<Pressable onPress = {() =>  
                    Alert.alert ('Fazer Logof', 
                        `Deseja realmente fazer logof do usuário ${props.userGoogle.user.displayName}`,
                        [{
                            text: 'Não',    
                            //onPress: () => (),         
                            style: 'cancel',                                                 
                        },{
                            text: 'Sim',
                            onPress: async () => {                                
                                                                
                                props.navigation.replace('Login');                                                                                                                      
                               
                            } 
                        }],
                        {cancelable: false}   //obriga o usuario a escolher a opcao do alert                
                        )                                    
                }>
                    <Image                
                        source = {{
                            uri: `${props.userGoogle.user.photoURL}`                        
                        }}
                        style={styles.image}
                    />   

                </Pressable>  
                
                     
                              
                :   <Pressable onPress = {() =>  
                    Alert.alert ('Fazer Logof', 
                        `Deseja realmente fazer logof do usuário ${props.user.user.email}`,
                        [{
                            text: 'Não',    
                            //onPress: () => (),         
                            style: 'cancel',                                                 
                        },{
                            text: 'Sim',
                            onPress: () => {
                                
                                props.navigation.replace('Login');
                            }                                          
                            
                        }],
                        {cancelable: false}   //obriga o usuario a escolher a opcao do alert                
                        )                                    
                }>
                    <Image
                        source={require('../../resources/newUser.png')}
                        style={styles.image}
			        />   

                </Pressable>
            }
    
            
            {   
                props.userGoogle
                ?   <Text style={styles.label}>Olá, {props.userGoogle.user.displayName}!</Text>

                :   <Text style={styles.label}>Olá, {props.user.user.email}!</Text>

            }
          
          
                

        <FlatList 
            data={menu}
            renderItem = {({ item, index }) => (
                <View style = {styles.container}>
                    <MenuCard
                        serie={item}
                        isFirstColumn = {isImpar(index)}   //se for impar renderizo como segunda coluna              
                        onNavigate={() => 
                            
                            item.title == 'Atividades'
                            ?   props.navigation.navigate('Main')

                            :   item.title == 'Aplicativos'
                                ?   props.navigation.navigate('Aplicativos')

                                :   item.title == 'Controle de Foco'
                                    ?   props.navigation.navigate('ControleFoco')

                                    :   props.navigation.navigate('GestaoDependentes')
                        }
                        
                    />   
                </View>

            )}
            keyExtractor = {item => item.id}  //no react é necessário o componente key ao renderizar um objeto. caso na objeto não tenha o componente key, deve-se usar o keyextractor
            numColumns = {2}
            ListHeaderComponent = {props => (<View style = {styles.marginTop}/>)}
            ListFooterComponent = {props => (<View style = {styles.marginBottom}/>)}
        />

    </View>
);

const styles = StyleSheet.create ({
    label: {
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        fontSize: 18
    },
    
    container: {
        flex: .5


    },
    marginBottom: {
        marginBottom: 5

    },
    marginTop: {
        marginTop: 15

    },

    image: {
	    alignSelf: 'center',
		aspectRatio: 1,
        height: Dimensions.get('window').width / 4,
       
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 30
        
    },   



})
const mapStateToProps = state => {    
    const { user } = state;
    if (user == null) {
        const { userGoogle } = state;
        return {userGoogle};

    }else{

        return { user };

    }

   
}

export default connect(mapStateToProps) (MenuPrincipal);


// export default connect (null, {tryLogin, tryLoginGoogle} || {actionCreator})(LoginPage)