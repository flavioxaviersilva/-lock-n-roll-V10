import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";


const AtividadeCard = ({ atividade, isFirstColumn, onNavigate }) => (
    <TouchableOpacity
        onPress={onNavigate}
        style = {[
            styles.container, isFirstColumn ? styles.firstColumn: styles.firstColumn
        ]}>
        <View style = {styles.card}>

            {
                atividade.img64
                ?   <Image 
                    source = {{
                        uri: `data:image/jpeg;base64,${atividade.img64}`
                    }}
                    aspectRatio = {1}  //obrigatorio quando o react native trabalha com imagem
                    resizeMode = 'cover'    //outras opcoes conforme necessidade
                    style = {styles.image}
                    />
                :   <Image
				    source={require('../../resources/tasks.png')}
				    style={styles.image}
			        />
            }
                        {/* <Text>{`${serie.id} - ${serie.title}`}</Text>  como concatenar */}
            <View style = {styles.cardTitleWrapper}>
                <Text style = {styles.cardTitle}>{atividade.title}</Text>                 
            </View>            
        

        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create ({
    container: {
        width: Dimensions.get('window').width / 2,
        flex: 1,  
		padding: 5,        
        height: Dimensions.get('window').width / 2,
		
    },
    card: {
        flex: 1,
        //borderWidth: 1,
        
        
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,
        position: 'absolute',
        bottom: 0,
        opacity: .6,
        width: '100%',

        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft:  5,
        paddingRight:  5,
        borderRadius: 15,
        alignItems: 'center',
        
    },
    cardTitle: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',

    },
    firstColumn: {
        paddingLeft: 10,

    }, 
    lastColumn: {
        paddingRight: 10,

    },
    image: {
		width: '100%',
		height: '100%',
        //height: Dimensions.get('window').width / 2.5,
		alignSelf: 'center',
		justifyContent: 'center',
		//aspectRatio: 1,
        borderRadius: 25
    }


});

export default AtividadeCard;