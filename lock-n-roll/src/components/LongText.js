import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, LayoutAnimation, NativeModules} from 'react-native';



// Variaveis para Android apenas. Para usar o LayoutAnimation precisa ativar essa flag

NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.
setLayoutAnimationEnabledExperimental(true);

//se comparar com o componente Line, aqui transformamos um functional component em um class component 
export default class LongText extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isExpanded: false,
            showText: 'Mostrar mais...',
              
        }
    }

    toogleIsExpanded () {
        const {isExpanded} = this.state;
        this.setState ({
            isExpanded: !isExpanded
          
        });
        
    }

    // componentDidUpdate (nextProps, nextState) {
    //     LayoutAnimation.spring();
    // }


   

    render () {
        const {label = '', content = ''} = this.props;
        const {isExpanded} = this.state;
        const {showText} = this.state;
        //console.log (showText)
        //console.log (isExpanded)
        return (
            <View style = {styles.line}>
                        <Text style = {[
                            styles.cell, 
                            styles.label, 
                        ]}>{ label }</Text> 
                        <TouchableWithoutFeedback onPress = {() => this.toogleIsExpanded()}>
                            <View>
                                <Text style = {[
                                    styles.cell, 
                                    styles.content,
                                    isExpanded ? styles.expanded : styles.collapsed]}>

                                        { content }
                                
                                </Text>

                                <Text style = {[
                                    isExpanded ? styles.notShow : styles.showMore]}>{showText}
                                </Text>

                             
                                                           
                                   
                            </View>
                       </TouchableWithoutFeedback>
                    </View>
        );
    }
}


const styles = StyleSheet.create ({
    line: {
        //flexDirection: 'row',
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
        paddingRight: 5,
        
    },

    label: { 
        fontSize: 18,       
        fontWeight: 'bold',
        flex: 2,
        //textDecorationLine: 'underline',
        paddingBottom: 5

    },

    content: {
        flex: 4,
        textAlign: 'justify'

    },

    collapsed: {
        maxHeight: 85,

    },
    expanded: {
        flex: 1,

    },
    showMore: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'black'

    }, 
    notShow: {
        color: 'white'

    }


});


