import React from "react";
import {View, Text, StyleSheet} from 'react-native';

                                    //envolvendo em chaves, transformo numa função com corpo
const FormRow = props => {          //componente funcional, não terá state, so recebe o props 
    const { children, first, last } = props;     //componente children permite a possibilidade de abrir a TAG 
    return (                                        //e não precisa ser na mesma linha
        <View style = {[
            styles.container,
            first ? styles.first : null,
            last? styles.last : null            
            
            ]}>

            {children}

        </View>


    )
};

const styles = StyleSheet.create ({
    container: {
        padding: 0,
        paddingRight: 40,
        paddingLeft: 40,
        //backgroundColor: 'white',
        marginTop: 0,
        marginBottom: 5,
        //elevation: 1,
    },
    first: {
        marginTop: 10,
    },
    last: {
        marginBottom: 10,
    }


})

export default FormRow;