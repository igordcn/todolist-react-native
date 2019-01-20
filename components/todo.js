import React, {Component} from  'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

class Todo extends Component{
    render(){
        return (
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('TodoDetails', { todo: this.props.todo})
            }}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {this.props.todo.text}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 7.5,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 7.5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 8, height:8},
        shadowRadius: 5,
        elevation: 5
    },
    text:{

    }
})

export default Todo;