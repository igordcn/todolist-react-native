import React, {Component} from  'react';
import {View, Text} from 'react-native';

class Todo extends Component{
    render(){
        return (
            <View>
                <Text>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

export default Todo;