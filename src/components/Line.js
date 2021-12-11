import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Line = ({label = '', content = ''}) => {
    return (
        <View style = {styles.line}>
                    <Text style = {[
                        styles.cell, 
                        styles.label, 
                        label.length > 12 ? styles.longLabel : null
                        ]}>{ label }</Text> 
                    <Text style = {[
                        styles.cell, 
                        styles.content,
                        content.length > 15 ? styles.longLabel : null
                        ]}>{ content } </Text>
                   
                </View>

    );

}

const styles = StyleSheet.create ({
    line: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: .5,
        borderColor: '#C5C5C5',
        paddingLeft: 5,
        paddingRight: 5
        

    },

    cell: {
        fontSize: 18,
        paddingLeft: 5,
        
    },

    label: { 
        fontSize: 18,       
        fontWeight: 'bold',
        flex: 2,

    },

    content: {
        flex: 4,

    },

    longLabel: {
        fontSize: 15,


    }

});

export default Line;

