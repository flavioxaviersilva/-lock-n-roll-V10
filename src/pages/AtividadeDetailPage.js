import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, Button, Dimensions, Pressable } from "react-native";
import Line from "../components/Line";
import LongText from  "../components/LongText";
import FormRow from '../components/FormRow';

import { connect} from 'react-redux';
import { deletarAtividade } from '../actions';


class AtividadeDetailPage extends React.Component {
    render () {
        const { atividade } = this.props.navigation.state.params;


        return (
            <ScrollView>
                <FormRow>
                    {
                        atividade.img64
                        ?<Image
                            style={styles.image}
                            source = {{
                                uri: `data:image/jpeg;base64,${atividade.img64}`
                            }}
                        />

                        : null
                    }


                </FormRow>           
               

                <Line label = 'Atividade' content = {this.props.navigation.state.params.atividade.title} />
                <Line label = 'Data Inicial' content = {`${new Date(this.props.navigation.state.params.atividade.dataInicial)
                    .getDate()}/${new Date(this.props.navigation.state.params.atividade.dataInicial)
                        .getMonth()+1}/${new Date(this.props.navigation.state.params.atividade.dataInicial).getFullYear()}`}
                />
                <Line label = 'Data Final' content = {`${new Date(this.props.navigation.state.params.atividade.dataFinal)
                    .getDate()}/${new Date(this.props.navigation.state.params.atividade.dataFinal)
                        .getMonth()+1}/${new Date(this.props.navigation.state.params.atividade.dataFinal).getFullYear()}`}
                />
                
                <Line label = 'Tipo' content = {this.props.navigation.state.params.atividade.tipoAtividade} />
                <Line label = 'Pontos' content = {this.props.navigation.state.params.atividade.pontosAtividade} />
                <LongText label = 'Descrição' content = {this.props.navigation.state.params.atividade.description} />          
                
               

               <View style={styles.buttonView}>                        
                        <Pressable style={styles.button} onPress={() => {
                            this.props.navigation.navigate('atividadeForm', { atividadeToEdit: atividade })
                        }}
                        >
                            <Text style={styles.text}>EDITAR</Text>
                        </Pressable> 

                        <Pressable style={styles.buttonDelete} onPress={ async () => {
                            const hasDeleted = await this.props.deletarAtividade(atividade)
                            if (hasDeleted) {
                                this.props.navigation.goBack();
                            }
                        }}
                        >
                            <Text style={styles.text}>DELETAR</Text>
                        </Pressable>                                   
                                             
                </View>             
               
              
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create ({

    buttonView: {
        marginTop: 25,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        //flex: 1,
        height: Dimensions.get('window').width / 4,
        marginBottom: 50
       
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
        marginBottom: 15
    
    },

      buttonDelete: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: 'red',
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 20
      },

      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },


    image: {
        alignSelf: 'center',
        height: Dimensions.get('window').width / 1.3,
        aspectRatio: 1,
		marginTop: 10,
        marginBottom: 20,
        borderRadius: 20
        

    },

   

});

export default connect (null, {deletarAtividade}) (AtividadeDetailPage);
            
   