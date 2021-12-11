import React from 'react';
import { StyleSheet, View, Button, TextInput, Text, Platform, ScrollView, ActivityIndicator, Alert, Image, Dimensions, Pressable} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

import { KeyboardAvoidingView } from 'react-native';

import FormRow from '../components/FormRow';
import { connect } from 'react-redux';

import { setField } from '../actions';
import { saveAtividade } from '../actions';
import { setTodaAtividade } from '../actions';
import { limparFormulario } from '../actions';

//import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker  from '@react-native-community/datetimepicker';



// 1- colocar piece of state, pedacinho de estado, criando um novo reduncer
// 2 - criar o reducer e criar algo pra alterar esse estado, mandar algo pra que o reducer trabalhe, a action faz isso
// 3 - criar a Action - por fim, conectar o compromente serie form page. Agora ele é um funcional component, sem necessidade
//de estado dentro dele
// 4 - conectar o AtividadesFormPage

//colocar o state, constructor recebe o propos e temos que chamar o props pelo super
// e o this.state vai ser o loading.

class AtividadesFormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            showPickerStart: false,
            showPickerEnd: false
            

        }
    }

    componentDidMount() {           //codigo onde vou carregar os dados da série a ser editada no formulário
        const { navigation, setTodaAtividade, limparFormulario } = this.props;
        const { params} = navigation.state;
        if (params && params.atividadeToEdit) {         //se tiver o params e o params.serie.toedit é que será feito um SET_TODA_SETIE
            setTodaAtividade(params.atividadeToEdit);

        } else {
            limparFormulario()
        }
    }

    //aqui poderia criar a função renderButton -> 
    // renderButton() {  codigo  }
    // como está fora do render, não exite ainda o saveAtividade, atividadeForm e navigation, então precisa fazer o destruct ->
    // dentro do try colocar: const {saveAtividade, atividadeForm, navigation} = this.props;

    async pickImage() {         //ImagePicker.requestMediaLibraryPermissionsAsync()     //permissão para galeria
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()  //ImagePicker.requestCameraPermissionsAsync()      //permissão para camera          
        if (status !== 'granted') {
            Alert.alert ('Você precisa permitir o acesso a sua Biblotera de fotos! :)')
            return;
        }
        //const result = await ImagePicker.launchCameraAsync({          //camera
        const result = await ImagePicker.launchImageLibraryAsync({      //galeria
            quality: 0.2,
            base64: true,
            allowsEditing: true,
            aspect: [1,1]
        });

        if (!result.cancelled) {
            this.props.setField('img64', result.base64)                        
        }

    }


    async pickCamera() {        
        const {status} = await ImagePicker.requestCameraPermissionsAsync()         
        if (status !== 'granted') {
            Alert.alert ('Você precisa permitir o acesso a sua Câmera! :)')
            return;
        }
        
        const result = await ImagePicker.launchCameraAsync({     
            quality: 0.2,
            base64: true,
            allowsEditing: true,
            aspect: [1,1]
        });

        if (!result.cancelled) {
            this.props.setField('img64', result.base64)                    
        }

    }

    showPickerStart() {
        this.setState ({
            showPickerStart: true
        })        
    }

    showPickerEnd() {
        this.setState ({
            showPickerEnd: true
        })        
    }
    

    render () {
        const { atividadeForm, setField, saveAtividade, navigation} = this.props;

        const setDataInicial = (event, selectedDate) => {            
            this.setState ({
                showPickerStart: false
            })              
            if (event.type == 'set') {
                this.props.setField('dataInicial', `${selectedDate}`);                
            } 
        }

        const setDataFinal = (event, selectedDate) => {            
            this.setState ({
                showPickerEnd: false
            })              
            if (event.type == 'set') {
                this.props.setField('dataFinal', `${selectedDate}`);                
            } 
        }

       
        return (

            // <KeyboardAvoidingView behavior = 'padding' enabled keyboardVerticalOffset = {0}  >
                <ScrollView keyboardShouldPersistTaps='handled'>
                        <FormRow first>   
                                <TextInput style = {styles.input}    
                                    placeholder = 'Título da Atividade'
                                    value = {atividadeForm.title}
                                    onChangeText = {value => setField('title', value) }                                    
                                /> 
                        </FormRow>
        
                        <FormRow>
                                    <View style = {styles.sameRow}>
                                        <Text style = {styles.label}>Data de início </Text>
                                        <Text style = {styles.label}>Data de Término </Text>
                                    </View>
                                    
                                    
                                    <View style = {styles.sameRowData}>
                                        
                                        <Pressable onPress = {() => this.showPickerStart()}>                                                
                                            <Image
                                                source={require('../../resources/calendarioV2.png')}
                                                style={styles.imageFoot}
                                            />                                                  
                                        </Pressable>                                
                                        <View>
                                            {this.state.showPickerStart && (
                                                <DateTimePicker                                    
                                                    testID="dateTimePicker"
                                                    value= {new Date(atividadeForm.dataInicial)}
                                                    mode={'date'}                                   
                                                    display="default"
                                                    onChange={setDataInicial}                        
                                            />
                                            )}                         
                                        </View> 

                                        <Pressable onPress = {() => this.showPickerStart()}>
                                            <Text style = {styles.labelData}>{`${new Date(atividadeForm.dataInicial)
                                                .getDate()}/${new Date(atividadeForm.dataInicial)
                                                .getMonth()+1}/${new Date(atividadeForm.dataInicial)
                                                .getFullYear()}`}</Text>
                                        </Pressable>
                                        
                                        <Pressable onPress = {() => this.showPickerEnd()}>                                                
                                            <Image
                                                source={require('../../resources/calendarioV2.png')}
                                                style={styles.imageFoot}
                                            />                                                  
                                        </Pressable>                                
                                        <View>
                                            {this.state.showPickerEnd && (
                                                <DateTimePicker                                    
                                                    testID="dateTimePicker"
                                                    value= {new Date(atividadeForm.dataFinal)}
                                                    mode={'date'}                                   
                                                    display="default"
                                                    onChange={setDataFinal}                        
                                            />
                                            )}                         
                                        </View>

                                        <Pressable onPress = {() => this.showPickerEnd()}>
                                            <Text style = {styles.labelData}>{`${new Date(atividadeForm.dataFinal)
                                                .getDate()}/${new Date(atividadeForm.dataFinal)
                                                .getMonth()+1}/${new Date(atividadeForm.dataFinal)
                                                .getFullYear()}`}</Text>
                                        </Pressable>

                                    </View>
                                           
                        </FormRow>
        
                        <FormRow>
                            <Text style = {styles.label}>  Tipo de Atividade</Text>
                            <Picker                    
                                    selectedValue={atividadeForm.tipoAtividade}
                                    onValueChange={(itemValue) => setField('tipoAtividade', itemValue) }>
        
                                    <Picker.Item label="Atividade de Foco" value="Atividade de Foco" />
                                    <Picker.Item label="Atividade de Bonus" value="Atividade de Bonus" />
                                    <Picker.Item label="Atividade Obrigatória" value="Atividade Obrigatória" />
                            </Picker>
        
                        </FormRow>
        
        
                        <FormRow>
                            <View style = {styles.sameRow}>
                                <Text style = {styles.label}>Quantos pontos?</Text>
                                <Text style = {styles.label}>{atividadeForm.pontosAtividade}</Text>
                            </View>
                            <Slider
                                onValueChange = {value => setField('pontosAtividade', value)}
                                value = {atividadeForm.pontosAtividade}
                                minimumValue = {0}
                                maximumValue = {100}
                                step={5}
                            />                
                        </FormRow>
        
                        <FormRow>
                            <TextInput style = {styles.input} 
                                placeholder = 'Descrição'
                                value = {atividadeForm.description}
                                onChangeText = {value => setField('description', value) }   //funçao de callback
                                numberOfLines = {5}
                                multiline = {true}
                            /> 
        
                        </FormRow>


                        <FormRow>                                                               
                                                           
                                {
                                atividadeForm.img64
                                    ? <Pressable onPress = {() =>  
                                        Alert.alert ('Remover', 
                                            'Deseja remover a foto selecionada?',
                                            [{
                                                text: 'Não',    
                                                //onPress: () => (),         
                                                style: 'cancel',                                                 
                                            },{
                                                text: 'Sim',
                                                onPress: () => setField('img64', null) 
                                            }],
                                            {cancelable: false}   //obriga o usuario a escolher a opcao do alert                
                                            )                                    
                                    }>
                                        <Image
                                            source = {{
                                                uri: `data:image/jpeg;base64,${atividadeForm.img64}`
                                            }}                                        
                                            style={styles.img}                                            
                                        />

                                    </Pressable>
                                   
                                       
                                    : null
                                }

                                <View style = {styles.sameRow}>


                                    <Pressable onPress = {() => this.pickCamera()}>
                                        <Image
                                            source={require('../../resources/camera.png')}
                                            style={styles.imageFoot}
                                        />                                    
                                    </Pressable>

                                    <Text style = {styles.labelRow}>Precisa de imagem? </Text>


                                    <Pressable onPress = {() => this.pickImage()}>
                                        <Image
                                            source={require('../../resources/galeria.png')}
                                            style={styles.imageFoot}
                                        />                                    
                                    </Pressable>

                                </View>


                        </FormRow>


                        {
                        this.state.isLoading
                        ?<View style={styles.buttonView}>
                            <ActivityIndicator size='large' color ='black' />
                        </View>  
                                        
                        :<View style={styles.buttonView}>                        
                                <Pressable style={styles.button} 
                                    onPress = {async() => {
                                        this.setState({ isLoading: true});
                                        try {
                                            await saveAtividade(atividadeForm);     //removi o .then depois do saveAtividade e inseri o await
                                            navigation.navigate('Main');           //é como se dissesse ao java "espera o saveAtividade pra só depois"
                                                                        //fazer o navigation
                                        } catch (error) {
                                            Alert.alert('Erro!', error.message);

                                        } finally {             //aqui será executado dando erro ou não
                                            this.setState({ isLoading: false});
                                        }                                                                                                     
                                    }}
                                >
                                    <Text style={styles.text}>SALVAR ATIVIDADE</Text>
                                </Pressable>             
                                                     
                        </View>
                        }       

        
                </ScrollView>
            // </KeyboardAvoidingView>
        
        
        );
    }
}



const styles = StyleSheet.create ({
    dateComponent: {
        width: 350
    },

    labelData: {
        marginBottom: 5,
        marginRight: 20,
        marginTop: 14,
        lineHeight: 25,
        fontSize: 12,
        //fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',

    },

    label : {
        marginBottom:0,
        marginTop: 8,
        lineHeight: 25,
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        
        
    },

    labelRow : {
        lineHeight: 60,
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },

    imageFoot: {
        alignSelf: 'center',
        //width: '20%',
		height: Dimensions.get('window').width / 10,
        aspectRatio: 1,
		marginTop: 10,
        marginBottom: 10,
        
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



    container: {
        paddingLeft: 10,
        paddingRight: 10,

    },

    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,

    },

    sameRowData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 0,
        paddingBottom: 0,
        
    },


    input: {
        // paddingLeft: 5,
        // paddingRight: 5,
        // paddingBottom: 5,
        // backgroundColor: 'white'     
        paddingLeft: 5,
        paddingRight:5,
        paddingBottom: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15
        //height: 40   

    },
    
    error: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 15,
        paddingTop: 50,
    },

    pass: {
        color: 'green',

    },
    img: {
        aspectRatio: 1,
        width: '100%'

    }
        

});

//funcao que vai receber o state e quem vai chamar ela é a lib do react redux.
//Cada chave desse objeto vai ser injetado no compoente AtividadesFormPage
//mapStateToProps - tudo que preciso de valor do meu state e eu tenho que injetar de props eu faco aqui
function mapStateToProps (state) {
    return {
        atividadeForm: state.atividadeForm
    }
}

const mapDispatchToProps = {
    setField,
    saveAtividade,
    setTodaAtividade,
    limparFormulario

}


//mapDispatchToProps -  ele pode ser apenas um objeto e vou passar uma action creator pra ele, essa action creator ela
//vai envolver com o metodo dispatch e vai entregar outra função. Assim é apenas chamar a action creator passando
//os paramentos que quiser

//cary - uma função que retorna outra função
export default connect(mapStateToProps, mapDispatchToProps) (AtividadesFormPage);