import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";

import AtividadeCard from '../components/AtividadeCard';
import AddAtividadeCard from "../components/AddAtividadeCard";

//import series from '../../series.json'; aqui o o json esta no redux, não será mais importado daqui
// para conectar o objeto series, tem que conectar as props atraves do redux, ai vem o connect
import { connect } from "react-redux";
import { LOAD_FIREBASE, watchAtividades } from '../actions';

//todas as pages estão virando classes por que estamos utilizando o life ciccle ou o state local
//agora será feito um refactory para a leitura do banco para montar a página do menu principal (transformar um class component)
const isImpar = number => number % 2 === 0;
//const isLast = number => number % 3 === 0;

//const AtividadesPage = ({ series, navigation}) => (

class AtividadesPage extends React.Component {
    componentDidMount() {     //significa que o componente acabou de ser montado, quem é responsável por chama-lo é o react
        this.props.watchAtividades();
    }
    render()  {
        const { atividades, navigation} = this.props;
        if (atividades === null) {
            return <ActivityIndicator size= 'large' color ='black' />
        }


        return (
            <View>
                <FlatList keyboardShouldPersistTaps='handled' 
                    //data={atividades}               //sprad operator para unir vetores
                    data = {[...atividades, {isLast: true}]} 
                    renderItem = {({ item, index }) => (       
                        
                        item.isLast
                        ?   <View style = {styles.container}>                 
                                <AddAtividadeCard                                    
                                    isFirstColumn = {isImpar(index)}
                                    //isLastColumn = {isLast(index)}
                                    onPress={() => navigation.navigate('atividadeForm')} />
                            </View>
                        :
                        <View style = {styles.container}>
                            <AtividadeCard
                                atividade={item}
                                isFirstColumn = {isImpar(index)}   //se for impar renderizo como segunda coluna
                                onNavigate={() => navigation.navigate ('DetailPage', {atividade: item})}
                                //funcao que recebe a serie e depois cuido da navegacao. Tenho a chave e vou passar a série como objeto
                            />   
                        </View>

                )}
                keyExtractor = {item => item.id}  //no react é necessário o componente key ao renderizar um objeto. caso na objeto não tenha o componente key, deve-se usar o keyextractor
                numColumns = {2}
                ListHeaderComponent = {props => (<View style = {styles.marginTop}/>)}
                ListFooterComponent = {props => (<View style = {styles.marginBottom}/>)}
            />
            </View>
        )
    }
}



const styles = StyleSheet.create ({
    container: {
        flex: .5,
        
    },
    marginBottom: {
        marginBottom: 5

    },
    marginTop: {
        marginTop: 5

    }



})

//técnica carry o padrão será esse abaixo (esse refactory é para por o moc das séries no redux)
// explicação na página "AtividadesFormPage.js"
//export default AtividadesPage;


const mapStateToProps = state => {
    const { atividades } = state;
    //obter as chaves das séries

    if (atividades === null) {
        return {atividades}
    }

    const keys = Object.keys(atividades);
    const atividadesWithKeys = keys.map (id => {
        return {...atividades[id], id}
    })
    return { atividades: atividadesWithKeys };
}
//primeiro peguei todas as chaves do objeto através do "object.keys". Guardo-as no "keys"
//crio um objeto novo, clonando as propriedades e acada objeto, vou colar o seu próprio ID para poder listar no array

export default connect(mapStateToProps, {watchAtividades})(AtividadesPage);
